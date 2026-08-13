import { Resend } from "resend";

const processEnv = globalThis.process?.env ?? {};

function createJsonResponse(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      ...extraHeaders,
    },
  });
}

function cleanText(value, maximumLength = 2000) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maximumLength);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const characters = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };

    return characters[character];
  });
}

function displayValue(value) {
  return value || "Not provided";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isEnabled(value) {
  return String(value || "").toLowerCase() === "true";
}

export default {
  async fetch(request) {
    /*
     * Only allow POST requests.
     */
    if (request.method !== "POST") {
      return createJsonResponse(
        {
          success: false,
          message: "Method not allowed.",
        },
        405,
        {
          Allow: "POST",
        },
      );
    }

    /*
     * Reject unusually large requests.
     */
    const contentLength = Number(
      request.headers.get("content-length") || 0,
    );

    if (contentLength > 20_000) {
      return createJsonResponse(
        {
          success: false,
          message: "The submitted form is too large.",
        },
        413,
      );
    }

    /*
     * Environment variables.
     */
    const apiKey = cleanText(
      processEnv.RESEND_API_KEY,
      500,
    );

    const testMode = isEnabled(
      processEnv.RESEND_TEST_MODE,
    );

    const testEmail = cleanText(
      processEnv.RESEND_TEST_EMAIL,
      254,
    ).toLowerCase();

    const configuredFromEmail = cleanText(
      processEnv.RESEND_FROM_EMAIL,
      320,
    );

    const configuredAdminEmail = cleanText(
      processEnv.CONTACT_ADMIN_EMAIL,
      254,
    ).toLowerCase();

    /*
     * During testing, onboarding@resend.dev is used
     * unless RESEND_FROM_EMAIL contains another value.
     */
    const fromEmail =
      configuredFromEmail ||
      (testMode
        ? "Ancestors & Anecdotes <onboarding@resend.dev>"
        : "");

    /*
     * During testing, the test email can also serve
     * as the temporary admin email.
     */
    const adminEmail =
      configuredAdminEmail ||
      (testMode ? testEmail : "");

    /*
     * Validate the required environment variables.
     */
    if (
      !apiKey ||
      !fromEmail ||
      !adminEmail ||
      (testMode && !testEmail)
    ) {
      console.error("Missing Resend environment variables.", {
        hasApiKey: Boolean(apiKey),
        hasFromEmail: Boolean(fromEmail),
        hasAdminEmail: Boolean(adminEmail),
        hasTestEmail: Boolean(testEmail),
        testMode,
      });

      return createJsonResponse(
        {
          success: false,
          message:
            "The email service has not been configured correctly.",
        },
        500,
      );
    }

    if (!isValidEmail(adminEmail)) {
      console.error("CONTACT_ADMIN_EMAIL is invalid.");

      return createJsonResponse(
        {
          success: false,
          message:
            "The admin email address has not been configured correctly.",
        },
        500,
      );
    }

    if (testMode && !isValidEmail(testEmail)) {
      console.error("RESEND_TEST_EMAIL is invalid.");

      return createJsonResponse(
        {
          success: false,
          message:
            "The Resend test email has not been configured correctly.",
        },
        500,
      );
    }

    /*
     * Read the submitted JSON body.
     */
    let requestBody;

    try {
      requestBody = await request.json();
    } catch {
      return createJsonResponse(
        {
          success: false,
          message: "The submitted form data is invalid.",
        },
        400,
      );
    }

    /*
     * Clean and limit all submitted values.
     */
    const formData = {
      fullName: cleanText(
        requestBody.fullName,
        120,
      ),

      email: cleanText(
        requestBody.email,
        254,
      ).toLowerCase(),

      phone: cleanText(
        requestBody.phone,
        50,
      ),

      familyLocation: cleanText(
        requestBody.familyLocation,
        150,
      ),

      packageName: cleanText(
        requestBody.package,
        150,
      ),

      budget: cleanText(
        requestBody.budget,
        100,
      ),

      message: cleanText(
        requestBody.message,
        5000,
      ),

      /*
       * Hidden honeypot field.
       * Real visitors should never fill this in.
       */
      website: cleanText(
        requestBody.website,
        200,
      ),
    };

    /*
     * Silently accept bot submissions without
     * sending any emails.
     */
    if (formData.website) {
      return createJsonResponse({
        success: true,
        message: "Your enquiry has been sent.",
      });
    }

    /*
     * Validate required form fields.
     */
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.budget ||
      !formData.message
    ) {
      return createJsonResponse(
        {
          success: false,
          message: "Please complete all required fields.",
        },
        400,
      );
    }

    if (!isValidEmail(formData.email)) {
      return createJsonResponse(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        400,
      );
    }

    /*
     * Escape values before inserting them into HTML.
     */
    const safeData = {
      fullName: escapeHtml(
        formData.fullName,
      ),

      email: escapeHtml(
        formData.email,
      ),

      phone: escapeHtml(
        formData.phone,
      ),

      familyLocation: escapeHtml(
        displayValue(formData.familyLocation),
      ),

      packageName: escapeHtml(
        displayValue(formData.packageName),
      ),

      budget: escapeHtml(
        formData.budget,
      ),

      message: escapeHtml(
        formData.message,
      ).replace(/\n/g, "<br />"),
    };

    /*
     * In test mode, both emails are routed to the
     * Resend account email.
     *
     * In production:
     * - Admin email goes to CONTACT_ADMIN_EMAIL.
     * - Client email goes to the submitted email.
     */
    const adminRecipient = testMode
      ? testEmail
      : adminEmail;

    const clientRecipient = testMode
      ? testEmail
      : formData.email;

    const adminSubject = testMode
      ? `[ADMIN TEST] New enquiry from ${formData.fullName}`
      : `New family history enquiry from ${formData.fullName}`;

    const clientSubject = testMode
      ? "[CLIENT TEST] We received your family history enquiry"
      : "We received your family history enquiry";

    const adminTestLabel = testMode
      ? `
        <p
          style="
            margin: 0 0 8px;
            font-size: 12px;
            font-weight: bold;
            letter-spacing: 1.4px;
            text-transform: uppercase;
            color: #fff6e8;
          "
        >
          Admin Test Email
        </p>
      `
      : "";

    const clientTestLabel = testMode
      ? `
        <p
          style="
            margin: 0 0 8px;
            font-size: 12px;
            font-weight: bold;
            letter-spacing: 1.4px;
            text-transform: uppercase;
            color: #fff6e8;
          "
        >
          Client Confirmation Test
        </p>
      `
      : "";

    const clientTestNotice = testMode
      ? `
        <div
          style="
            margin-top: 24px;
            padding: 16px;
            border: 1px solid rgba(112, 66, 20, 0.18);
            border-radius: 12px;
            background: #fff6e8;
            color: #704214;
            font-size: 14px;
            line-height: 1.5;
          "
        >
          <strong>Testing mode:</strong>
          This confirmation email was routed to the Resend test
          inbox. In production, it will be delivered to
          ${safeData.email}.
        </div>
      `
      : "";

    /*
     * Plain-text admin email.
     */
    const adminPlainText = `
${testMode ? "ADMIN TEST EMAIL\n\n" : ""}New Ancestors & Anecdotes enquiry

Full name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
Family location: ${displayValue(formData.familyLocation)}
Package: ${displayValue(formData.packageName)}
Budget: ${formData.budget}

Message:
${formData.message}

${
  testMode
    ? `Testing mode is enabled.
The client confirmation was routed to ${testEmail}.
In production, it will be sent to ${formData.email}.`
    : ""
}
    `.trim();

    /*
     * Plain-text client confirmation.
     */
    const clientPlainText = `
${testMode ? "CLIENT CONFIRMATION TEST\n\n" : ""}Hi ${formData.fullName},

Thank you for contacting Ancestors & Anecdotes.

We have successfully received your enquiry. We will review the information you submitted and respond within 1–2 business days.

Your family information, photographs, documents, and stories will be handled with care, respect, and confidentiality.

Kind regards,
Ancestors & Anecdotes
Cape Town, South Africa

${
  testMode
    ? `Testing mode is enabled.
This confirmation was routed to ${testEmail}.
In production, it will be sent to ${formData.email}.`
    : ""
}
    `.trim();

    /*
     * HTML admin email.
     */
    const adminHtml = `
      <!doctype html>

      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />

          <title>New Family History Enquiry</title>
        </head>

        <body
          style="
            margin: 0;
            padding: 0;
            background: #f5e6cc;
            color: #1c1c1c;
            font-family: Georgia, 'Times New Roman', serif;
          "
        >
          <div style="padding: 32px 16px;">
            <div
              style="
                max-width: 680px;
                margin: 0 auto;
                overflow: hidden;
                border-radius: 22px;
                background: #fff6e8;
                box-shadow: 0 10px 30px rgba(112, 66, 20, 0.12);
              "
            >
              <div
                style="
                  padding: 28px 32px;
                  background: #566735;
                  color: #fff6e8;
                "
              >
                ${adminTestLabel}

                <h1
                  style="
                    margin: 0;
                    font-size: 28px;
                    font-weight: 500;
                    line-height: 1.25;
                  "
                >
                  New Family History Enquiry
                </h1>

                <p
                  style="
                    margin: 10px 0 0;
                    font-size: 16px;
                    line-height: 1.5;
                  "
                >
                  Submitted through the Ancestors &amp; Anecdotes
                  website.
                </p>
              </div>

              <div style="padding: 30px 32px;">
                <table
                  role="presentation"
                  style="
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 16px;
                    line-height: 1.5;
                  "
                >
                  <tr>
                    <td
                      style="
                        width: 145px;
                        padding: 10px 0;
                        color: #704214;
                        font-weight: bold;
                        vertical-align: top;
                      "
                    >
                      Full Name
                    </td>

                    <td style="padding: 10px 0;">
                      ${safeData.fullName}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding: 10px 0;
                        color: #704214;
                        font-weight: bold;
                        vertical-align: top;
                      "
                    >
                      Email
                    </td>

                    <td style="padding: 10px 0;">
                      ${safeData.email}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding: 10px 0;
                        color: #704214;
                        font-weight: bold;
                        vertical-align: top;
                      "
                    >
                      Phone
                    </td>

                    <td style="padding: 10px 0;">
                      ${safeData.phone}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding: 10px 0;
                        color: #704214;
                        font-weight: bold;
                        vertical-align: top;
                      "
                    >
                      Family Location
                    </td>

                    <td style="padding: 10px 0;">
                      ${safeData.familyLocation}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding: 10px 0;
                        color: #704214;
                        font-weight: bold;
                        vertical-align: top;
                      "
                    >
                      Package
                    </td>

                    <td style="padding: 10px 0;">
                      ${safeData.packageName}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding: 10px 0;
                        color: #704214;
                        font-weight: bold;
                        vertical-align: top;
                      "
                    >
                      Budget
                    </td>

                    <td style="padding: 10px 0;">
                      ${safeData.budget}
                    </td>
                  </tr>
                </table>

                <div
                  style="
                    margin-top: 24px;
                    padding-top: 24px;
                    border-top: 1px solid rgba(112, 66, 20, 0.2);
                  "
                >
                  <h2
                    style="
                      margin: 0 0 12px;
                      color: #704214;
                      font-size: 20px;
                      font-weight: 600;
                    "
                  >
                    Message
                  </h2>

                  <div
                    style="
                      padding: 18px;
                      border-radius: 14px;
                      background: #f5e6cc;
                      font-size: 16px;
                      line-height: 1.6;
                      word-break: break-word;
                    "
                  >
                    ${safeData.message}
                  </div>
                </div>

                <p
                  style="
                    margin: 26px 0 0;
                    color: #566735;
                    font-size: 14px;
                    line-height: 1.5;
                  "
                >
                  Reply directly to this email to respond to
                  ${safeData.fullName}.
                </p>

                ${
                  testMode
                    ? `
                      <div
                        style="
                          margin-top: 20px;
                          padding: 16px;
                          border-radius: 12px;
                          background: #f5e6cc;
                          color: #704214;
                          font-size: 14px;
                          line-height: 1.5;
                        "
                      >
                        <strong>Testing mode is enabled.</strong>
                        Both the admin notification and client
                        confirmation are being sent to the configured
                        Resend test inbox.
                      </div>
                    `
                    : ""
                }
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    /*
     * HTML client confirmation email.
     */
    const clientHtml = `
      <!doctype html>

      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />

          <title>Enquiry Received</title>
        </head>

        <body
          style="
            margin: 0;
            padding: 0;
            background: #f5e6cc;
            color: #1c1c1c;
            font-family: Georgia, 'Times New Roman', serif;
          "
        >
          <div style="padding: 32px 16px;">
            <div
              style="
                max-width: 640px;
                margin: 0 auto;
                overflow: hidden;
                border-radius: 22px;
                background: #fff6e8;
                box-shadow: 0 10px 30px rgba(112, 66, 20, 0.12);
              "
            >
              <div
                style="
                  padding: 32px;
                  background: #566735;
                  color: #fff6e8;
                  text-align: center;
                "
              >
                ${clientTestLabel}

                <h1
                  style="
                    margin: 0;
                    font-size: 29px;
                    font-weight: 500;
                    line-height: 1.25;
                  "
                >
                  Enquiry Received
                </h1>

                <p
                  style="
                    margin: 12px 0 0;
                    font-size: 16px;
                    line-height: 1.5;
                  "
                >
                  Ancestors &amp; Anecdotes
                </p>
              </div>

              <div style="padding: 32px;">
                <p
                  style="
                    margin: 0;
                    color: #704214;
                    font-size: 21px;
                    line-height: 1.4;
                  "
                >
                  Hi ${safeData.fullName},
                </p>

                <p
                  style="
                    margin: 20px 0 0;
                    font-size: 17px;
                    line-height: 1.65;
                  "
                >
                  Thank you for contacting Ancestors &amp; Anecdotes.
                  We have successfully received your family history
                  enquiry.
                </p>

                <p
                  style="
                    margin: 18px 0 0;
                    font-size: 17px;
                    line-height: 1.65;
                  "
                >
                  We will review the information you submitted and
                  respond within
                  <strong>1–2 business days</strong>.
                </p>

                <div
                  style="
                    margin-top: 26px;
                    padding: 20px;
                    border-left: 4px solid #704214;
                    border-radius: 12px;
                    background: #f5e6cc;
                    font-size: 16px;
                    line-height: 1.6;
                  "
                >
                  Your family information, photographs, documents,
                  and stories will be handled with care, respect,
                  and confidentiality.
                </div>

                ${clientTestNotice}

                <p
                  style="
                    margin: 28px 0 0;
                    font-size: 17px;
                    line-height: 1.6;
                  "
                >
                  Kind regards,<br />

                  <strong style="color: #704214;">
                    Ancestors &amp; Anecdotes
                  </strong><br />

                  Cape Town, South Africa
                </p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    try {
      const resend = new Resend(apiKey);

      /*
       * Send two separate emails:
       *
       * 1. Admin notification
       * 2. Client confirmation
       */
      const [adminResult, clientResult] = await Promise.all([
        resend.emails.send({
          from: fromEmail,
          to: [adminRecipient],
          replyTo: formData.email,
          subject: adminSubject,
          text: adminPlainText,
          html: adminHtml,
        }),

        resend.emails.send({
          from: fromEmail,
          to: [clientRecipient],
          replyTo: adminEmail,
          subject: clientSubject,
          text: clientPlainText,
          html: clientHtml,
        }),
      ]);

      /*
       * Resend returns an error value separately
       * for each send request.
       */
      if (adminResult.error || clientResult.error) {
        console.error(
          "Admin email error:",
          adminResult.error,
        );

        console.error(
          "Client email error:",
          clientResult.error,
        );

        return createJsonResponse(
          {
            success: false,
            message:
              adminResult.error?.message ||
              clientResult.error?.message ||
              "Your enquiry could not be sent. Please try again.",
          },
          502,
        );
      }

      console.log("Admin email sent:", {
        id: adminResult.data?.id,
        recipient: adminRecipient,
        testMode,
      });

      console.log("Client email sent:", {
        id: clientResult.data?.id,
        recipient: clientRecipient,
        intendedClient: formData.email,
        testMode,
      });

      return createJsonResponse({
        success: true,

        message: testMode
          ? "Both test emails were sent successfully to the Resend test inbox."
          : "Your enquiry has been sent successfully.",

        testMode,
      });
    } catch (error) {
      console.error(
        "Resend contact-form error:",
        error,
      );

      return createJsonResponse(
        {
          success: false,
          message:
            error instanceof Error
              ? error.message
              : "Your enquiry could not be sent. Please try again.",
        },
        500,
      );
    }
  },
};
