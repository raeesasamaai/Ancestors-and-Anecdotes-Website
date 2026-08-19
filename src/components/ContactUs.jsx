import { useState } from "react";
import ScrollReveal from "./ScrollReveal";


const initialFormData = {
  fullName: "",
  email: "",
  phone: "",
  familyLocation: "",
  package: "",
  budget: "",
  message: "",

  // Honeypot field for basic spam protection.
  website: "",
};


export default function ContactUs() {
  const [formData, setFormData] = useState(initialFormData);

  const [submission, setSubmission] = useState({
    status: "idle",
    message: "",
  });

  const isSubmitting =
    submission.status === "submitting";


  /* =========================================================
     UPDATE FORM FIELDS
  ========================================================= */

  const handleChange = (event) => {
    const { name, value } =
      event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    if (
      submission.status === "success" ||
      submission.status === "error"
    ) {
      setSubmission({
        status: "idle",
        message: "",
      });
    }
  };


  /* =========================================================
     SUBMIT FORM
  ========================================================= */

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    setSubmission({
      status: "submitting",
      message: "",
    });

    try {
      const response = await fetch(
        "/api/send-contact",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            formData,
          ),
        },
      );

      const responseText =
        await response.text();

      let result;

      try {
        result =
          JSON.parse(responseText);
      } catch {
        console.error(
          "Non-JSON API response:",
          {
            status:
              response.status,
            statusText:
              response.statusText,
            body:
              responseText,
          },
        );

        throw new Error(
          "The server returned an invalid response. Please try again.",
        );
      }


      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "We could not send your enquiry. Please try again.",
        );
      }


      setSubmission({
        status: "success",
        message:
          result.message ||
          "Your message has been sent successfully.",
      });


      setFormData(
        initialFormData,
      );
    } catch (error) {
      console.error(
        "Contact form submission error:",
        error,
      );

      setSubmission({
        status: "error",
        message:
          error.message ||
          "Something went wrong while sending your enquiry. Please try again.",
      });
    }
  };


  /* =========================================================
     SHARED FORM STYLES
  ========================================================= */

  const inputClasses = `
    h-[56px]
    w-full

    rounded-[18px]

    border
    border-[#704214]/10

    bg-[#FFF6E8]

    px-4

    section-body

    text-[1rem]
    font-semibold

    leading-[1.4]

    text-[#1C1C1C]

    shadow-[0_6px_18px_rgba(112,66,20,0.11)]

    outline-none

    transition
    duration-300

    placeholder:text-[#1C1C1C]/45

    hover:border-[#704214]/25

    focus:border-[#704214]/45
    focus:ring-2
    focus:ring-[#704214]/15

    disabled:cursor-not-allowed
    disabled:opacity-60

    sm:h-[58px]
    sm:px-5
    sm:text-[1.08rem]

    md:h-[60px]
    md:px-6
    md:text-[1.13rem]

    xl:h-[62px]
    xl:rounded-[20px]
    xl:text-[1.2rem]

    [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:h-[52px]
    [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:px-4
    [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:text-[1rem]
  `;


  const labelClasses = `
    mb-2.5
    block

    font-['Book_Antiqua','Palatino_Linotype',Palatino,serif]

    text-[1.08rem]
    font-normal

    leading-none

    text-[#704214]

    sm:text-[1.15rem]

    md:mb-3
    md:text-[1.22rem]

    xl:text-[1.3rem]

    [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mb-2
    [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:text-[1.05rem]
  `;


  const infoHeadingClasses = `
    font-['Book_Antiqua','Palatino_Linotype',Palatino,serif]

    text-[1.2rem]
    font-medium

    leading-tight

    text-[#704214]

    sm:text-[1.3rem]

    md:text-[1.4rem]

    xl:text-[1.5rem]

    [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:text-[1.15rem]
  `;


  const wideFormFieldClasses = `
    md:col-span-2

    [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:col-span-1
  `;


  return (
    <section
      id="contact-us"
      data-cursor-theme="dark"
      className="
        min-h-screen
        scroll-mt-28

        bg-[#F5E6CC]

        px-6
        py-16

        text-[#1C1C1C]

        sm:px-8
        sm:py-20

        md:px-12

        lg:px-16

        xl:px-20

        [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:px-8
        [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:py-14
      "
    >
      <div className="mx-auto max-w-7xl">
        {/* =================================================
            SECTION NAME
        ================================================= */}

        <ScrollReveal
          as="p"
          className="
            mb-2
            section-name
          "
          style={{
            WebkitTextStroke:
              "0.45px currentColor",
          }}
        >
          Contact Us
        </ScrollReveal>


        {/* =================================================
            MAIN HEADING
        ================================================= */}

        <ScrollReveal
          as="h2"
          className="
            mt-8

            max-w-5xl

            section-heading

            [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-6
          "
        >
          Ready to Begin Your Family History Journey?
        </ScrollReveal>


        {/* =================================================
            INTRODUCTION
        ================================================= */}

        <ScrollReveal
          as="p"
          className="
            mt-7

            max-w-4xl

            section-body

            [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-5
          "
        >
          Share what you know so far, whether it is a name, a place, a
          document, or a family story. We will help you explore the next step.
        </ScrollReveal>


        {/* =================================================
            MAIN CONTACT LAYOUT

            PHONE:
            stacked

            TABLET / IPAD:
            contact details above
            form below

            SMALL LAPTOP:
            same stacked structure

            1280PX+:
            contact details left
            form right
        ================================================= */}

        <ScrollReveal
          as="div"
          className="
            mt-12

            grid
            grid-cols-1

            items-start

            gap-12

            sm:mt-14
            sm:gap-14

            md:gap-16

            xl:grid-cols-[minmax(320px,0.86fr)_minmax(0,1.14fr)]
            xl:gap-16

            2xl:grid-cols-[minmax(360px,0.86fr)_minmax(0,1.14fr)]
            2xl:gap-20

            [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-10
            [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:gap-10
          "
        >
          {/* =================================================
              CONTACT INFORMATION

              PHONE:
              1 column

              PHONE LANDSCAPE / TABLET / IPAD:
              2 columns

              DESKTOP:
              returns to single vertical column
          ================================================= */}

          <div
            className="
              grid
              grid-cols-1

              gap-x-10
              gap-y-8

              sm:grid-cols-2
              sm:gap-y-9

              md:gap-x-12
              md:gap-y-10

              xl:grid-cols-1
              xl:gap-y-9
              xl:pt-1
            "
          >
            {/* ===============================================
                LOCATION
            =============================================== */}

            <div
              className="
                flex

                items-start

                gap-4

                sm:gap-5

                md:gap-6

                xl:gap-7
              "
            >
              <div
                className="
                  flex

                  h-12
                  w-12

                  shrink-0

                  items-center
                  justify-center

                  rounded-full

                  bg-[#704214]

                  text-[#FFF6E8]

                  sm:h-[50px]
                  sm:w-[50px]
                "
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="
                    h-5
                    w-5

                    sm:h-6
                    sm:w-6
                  "
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                  <circle
                    cx="12"
                    cy="10"
                    r="2.7"
                  />
                </svg>
              </div>


              <div
                className="
                  min-w-0
                  pt-1
                "
              >
                <h3
                  className={
                    infoHeadingClasses
                  }
                >
                  Location
                </h3>

                <p
                  className="
                    mt-2

                    section-body

                    text-[1rem]

                    leading-snug

                    sm:text-[1.1rem]

                    md:text-[1.18rem]

                    xl:text-[1.25rem]
                  "
                >
                  Cape Town, South Africa
                </p>
              </div>
            </div>


            {/* ===============================================
                EMAIL
            =============================================== */}

            <div
              className="
                flex

                items-start

                gap-4

                sm:gap-5

                md:gap-6

                xl:gap-7
              "
            >
              <div
                className="
                  flex

                  h-12
                  w-12

                  shrink-0

                  items-center
                  justify-center

                  rounded-full

                  bg-[#704214]

                  text-[#FFF6E8]

                  sm:h-[50px]
                  sm:w-[50px]
                "
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="
                    h-5
                    w-5

                    sm:h-6
                    sm:w-6
                  "
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="14"
                    rx="1"
                  />

                  <path d="m4 7 8 6 8-6" />
                </svg>
              </div>


              <div
                className="
                  min-w-0
                  pt-1
                "
              >
                <h3
                  className={
                    infoHeadingClasses
                  }
                >
                  Email
                </h3>

                <a
                  href="mailto:ancestorsandanecdotes@gmail.com"
                  className="
                    mt-2
                    block

                    break-words

                    section-body

                    text-[0.95rem]

                    leading-snug

                    transition-colors
                    duration-300

                    hover:text-[#704214]

                    sm:text-[1rem]

                    md:text-[1.12rem]

                    lg:text-[1.18rem]

                    xl:text-[1.2rem]
                  "
                >
                  ancestorsandanecdotes@gmail.com
                </a>
              </div>
            </div>


            {/* ===============================================
                RESPONSE TIME
            =============================================== */}

            <div
              className="
                flex

                items-start

                gap-4

                sm:gap-5

                md:gap-6

                xl:gap-7
              "
            >
              <div
                className="
                  flex

                  h-12
                  w-12

                  shrink-0

                  items-center
                  justify-center

                  rounded-full

                  bg-[#704214]

                  text-[#FFF6E8]

                  sm:h-[50px]
                  sm:w-[50px]
                "
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="
                    h-5
                    w-5

                    sm:h-6
                    sm:w-6
                  "
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m13 2-7 12h6l-1 8 7-12h-6l1-8Z" />
                </svg>
              </div>


              <div
                className="
                  min-w-0
                  pt-1
                "
              >
                <h3
                  className={
                    infoHeadingClasses
                  }
                >
                  Response Time
                </h3>

                <p
                  className="
                    mt-2

                    section-body

                    text-[1rem]

                    leading-snug

                    sm:text-[1.1rem]

                    md:text-[1.18rem]

                    xl:text-[1.25rem]
                  "
                >
                  We respond within 1–2 business days
                </p>
              </div>
            </div>


            {/* ===============================================
                CONFIDENTIALITY
            =============================================== */}

            <div
              className="
                flex

                items-start

                gap-4

                sm:gap-5

                md:gap-6

                xl:gap-7
              "
            >
              <div
                className="
                  flex

                  h-12
                  w-12

                  shrink-0

                  items-center
                  justify-center

                  rounded-full

                  bg-[#704214]

                  text-[#FFF6E8]

                  sm:h-[50px]
                  sm:w-[50px]
                "
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="
                    h-5
                    w-5

                    sm:h-6
                    sm:w-6
                  "
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3 20 6v5c0 5-3.3 8.5-8 10-4.7-1.5-8-5-8-10V6l8-3Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>


              <p
                className="
                  max-w-[360px]

                  pt-1

                  font-['Book_Antiqua','Palatino_Linotype',Palatino,serif]

                  text-[1.02rem]
                  font-[600]

                  leading-[1.4]

                  text-[#704214]

                  sm:text-[1.08rem]

                  md:text-[1.12rem]

                  xl:text-[1.13rem]
                "
              >
                Your family information will be treated with care, respect, and
                confidentiality.
              </p>
            </div>
          </div>


          {/* =================================================
              CONTACT FORM

              MOBILE:
              1 column

              TABLET / IPAD:
              2 columns

              SHORT PHONE LANDSCAPE:
              forced back to 1 column

              DESKTOP:
              2 columns
          ================================================= */}

          <form
            onSubmit={
              handleSubmit
            }
            className="
              grid
              grid-cols-1

              gap-y-6

              md:grid-cols-2
              md:gap-x-6
              md:gap-y-7

              xl:gap-x-6

              [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:grid-cols-1
              [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:gap-y-5
            "
          >
            {/* ===============================================
                HONEYPOT
            =============================================== */}

            <div
              aria-hidden="true"
              className="
                absolute
                -left-[9999px]

                h-0
                w-0

                overflow-hidden
              "
            >
              <label htmlFor="website">
                Website
              </label>

              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={
                  formData.website
                }
                onChange={
                  handleChange
                }
              />
            </div>


            {/* ===============================================
                FULL NAME
            =============================================== */}

            <div>
              <label
                htmlFor="fullName"
                className={
                  labelClasses
                }
              >
                Full Name
                <span className="font-semibold text-[#C11013]">
                  *
                </span>
              </label>

              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                autoComplete="name"
                value={
                  formData.fullName
                }
                onChange={
                  handleChange
                }
                disabled={
                  isSubmitting
                }
                placeholder="Your full name"
                className={
                  inputClasses
                }
              />
            </div>


            {/* ===============================================
                EMAIL ADDRESS
            =============================================== */}

            <div>
              <label
                htmlFor="email"
                className={
                  labelClasses
                }
              >
                Email Address
                <span className="font-semibold text-[#C11013]">
                  *
                </span>
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
                disabled={
                  isSubmitting
                }
                placeholder="e.g. johndoe@gmail.com"
                className={
                  inputClasses
                }
              />
            </div>


            {/* ===============================================
                PHONE NUMBER
            =============================================== */}

            <div>
              <label
                htmlFor="phone"
                className={
                  labelClasses
                }
              >
                Phone Number
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={
                  formData.phone
                }
                onChange={
                  handleChange
                }
                disabled={
                  isSubmitting
                }
                placeholder="Your phone number (optional)"
                className={
                  inputClasses
                }
              />
            </div>


            {/* ===============================================
                FAMILY LOCATION
            =============================================== */}

            <div>
              <label
                htmlFor="familyLocation"
                className={
                  labelClasses
                }
              >
                Family Location
              </label>

              <input
                id="familyLocation"
                name="familyLocation"
                type="text"
                value={
                  formData.familyLocation
                }
                onChange={
                  handleChange
                }
                disabled={
                  isSubmitting
                }
                placeholder="e.g. South Africa / UK / Unsure"
                className={
                  inputClasses
                }
              />
            </div>


            {/* ===============================================
                PACKAGE
            =============================================== */}

            <div>
              <label
                htmlFor="package"
                className={
                  labelClasses
                }
              >
                Package
              </label>

              <div className="relative">
                <select
                  id="package"
                  name="package"
                  value={
                    formData.package
                  }
                  onChange={
                    handleChange
                  }
                  disabled={
                    isSubmitting
                  }
                  className={`
                    ${inputClasses}

                    cursor-pointer
                    appearance-none

                    pr-12

                    sm:pr-14
                  `}
                >
                  <option value="">
                    Select a package
                  </option>

                  <option value="Two Branch Trace">
                    Two Branch Trace
                  </option>

                  <option value="Grandparent Trace">
                    Grandparent Trace
                  </option>

                  <option value="Comprehensive Ancestry Trace">
                    Comprehensive Ancestry Trace
                  </option>

                  <option value="Life Story and Oral History">
                    Life Story and Oral History
                  </option>
                </select>

                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="
                    pointer-events-none

                    absolute

                    right-4
                    top-1/2

                    h-5
                    w-5

                    -translate-y-1/2

                    text-[#1C1C1C]

                    sm:right-5
                  "
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>


            {/* ===============================================
                BUDGET RANGE
            =============================================== */}

            <div>
              <label
                htmlFor="budget"
                className={
                  labelClasses
                }
              >
                Budget Range
                <span className="font-semibold text-[#C11013]">
                  *
                </span>
              </label>

              <div className="relative">
                <select
                  id="budget"
                  name="budget"
                  required
                  value={
                    formData.budget
                  }
                  onChange={
                    handleChange
                  }
                  disabled={
                    isSubmitting
                  }
                  className={`
                    ${inputClasses}

                    cursor-pointer
                    appearance-none

                    pr-12

                    sm:pr-14
                  `}
                >
                  <option value="">
                    Select an option
                  </option>

                  <option value="Under R2,500">
                    Under R2,500
                  </option>

                  <option value="R2,500 – R5,000">
                    R2,500 – R5,000
                  </option>

                  <option value="R5,000 – R10,000">
                    R5,000 – R10,000
                  </option>

                  <option value="R10,000+">
                    R10,000+
                  </option>

                  <option value="Unsure">
                    Unsure
                  </option>
                </select>

                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="
                    pointer-events-none

                    absolute

                    right-4
                    top-1/2

                    h-5
                    w-5

                    -translate-y-1/2

                    text-[#1C1C1C]

                    sm:right-5
                  "
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>


            {/* ===============================================
                MESSAGE
            =============================================== */}

            <div
              className={
                wideFormFieldClasses
              }
            >
              <label
                htmlFor="message"
                className={
                  labelClasses
                }
              >
                Message
                <span className="font-semibold text-[#C11013]">
                  *
                </span>
              </label>

              <textarea
                id="message"
                name="message"
                required
                value={
                  formData.message
                }
                onChange={
                  handleChange
                }
                disabled={
                  isSubmitting
                }
                placeholder="Tell us a little about your family history enquiry and what you would like to achieve"
                className="
                  min-h-[150px]

                  w-full

                  resize-y

                  rounded-[18px]

                  border
                  border-[#704214]/10

                  bg-[#FFF6E8]

                  px-4
                  py-4

                  section-body

                  text-[1rem]
                  font-medium

                  leading-[1.45]

                  text-[#1C1C1C]

                  shadow-[0_6px_18px_rgba(112,66,20,0.11)]

                  outline-none

                  transition
                  duration-300

                  placeholder:text-[#1C1C1C]/45

                  hover:border-[#704214]/25

                  focus:border-[#704214]/45
                  focus:ring-2
                  focus:ring-[#704214]/15

                  disabled:cursor-not-allowed
                  disabled:opacity-60

                  sm:min-h-[165px]
                  sm:px-5
                  sm:py-5
                  sm:text-[1.08rem]

                  md:min-h-[175px]
                  md:px-6
                  md:text-[1.13rem]

                  xl:min-h-[185px]
                  xl:rounded-[20px]
                  xl:text-[1.2rem]

                  [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:min-h-[135px]
                  [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:px-4
                  [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:py-4
                  [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:text-[1rem]
                "
              />
            </div>


            {/* ===============================================
                ERROR MESSAGE
            =============================================== */}

            {submission.status ===
              "error" && (
              <div
                role="alert"
                aria-live="assertive"
                className={`
                  ${wideFormFieldClasses}

                  rounded-[16px]

                  border
                  border-[#C11013]/25

                  bg-[#C11013]/5

                  px-5
                  py-4
                `}
              >
                <p
                  className="
                    font-['Book_Antiqua','Palatino_Linotype',Palatino,serif]

                    text-[1.1rem]
                    font-semibold

                    leading-tight

                    text-[#C11013]

                    sm:text-[1.15rem]
                  "
                >
                  We could not send your enquiry.
                </p>

                <p
                  className="
                    mt-2

                    section-body

                    text-[0.95rem]

                    leading-[1.4]

                    text-[#1C1C1C]

                    sm:text-[1rem]
                  "
                >
                  {
                    submission.message
                  }
                </p>
              </div>
            )}


            {/* ===============================================
                SUCCESS MESSAGE
            =============================================== */}

            {submission.status ===
              "success" && (
              <div
                role="status"
                aria-live="polite"
                className={`
                  ${wideFormFieldClasses}

                  rounded-[16px]

                  border
                  border-[#566735]/25

                  bg-[#566735]/10

                  px-5
                  py-4
                `}
              >
                <p
                  className="
                    font-['Book_Antiqua','Palatino_Linotype',Palatino,serif]

                    text-[1.1rem]
                    font-semibold

                    leading-tight

                    text-[#566735]

                    sm:text-[1.2rem]
                  "
                >
                  Thank you for your enquiry.
                </p>

                <p
                  className="
                    mt-2

                    section-body

                    text-[0.95rem]

                    leading-[1.4]

                    text-[#1C1C1C]

                    sm:text-[1rem]
                  "
                >
                  Your message has been sent successfully. We will respond
                  within 1–2 business days.
                </p>
              </div>
            )}


            {/* ===============================================
                SUBMIT BUTTON
            =============================================== */}

            <button
              type="submit"
              disabled={
                isSubmitting
              }
              className={`
                ${wideFormFieldClasses}

                flex

                min-h-[52px]
                w-full

                items-center
                justify-center

                rounded-[14px]

                bg-[#566735]

                px-6
                py-3

                font-['Book_Antiqua','Palatino_Linotype',Palatino,serif]

                text-[1.15rem]

                text-[#FFF6E8]

                shadow-[0_5px_14px_rgba(86,103,53,0.2)]

                transition
                duration-300

                hover:-translate-y-0.5
                hover:bg-[#704214]
                hover:shadow-[0_8px_20px_rgba(112,66,20,0.25)]

                focus:outline-none

                focus-visible:ring-2
                focus-visible:ring-[#704214]
                focus-visible:ring-offset-4
                focus-visible:ring-offset-[#F5E6CC]

                disabled:cursor-not-allowed
                disabled:opacity-60

                disabled:hover:translate-y-0
                disabled:hover:bg-[#566735]
                disabled:hover:shadow-[0_5px_14px_rgba(86,103,53,0.2)]

                sm:min-h-[54px]
                sm:text-[1.25rem]

                md:min-h-[56px]
                md:text-[1.3rem]

                xl:text-[1.35rem]

                [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:min-h-[50px]
                [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:text-[1.1rem]
              `}
            >
              {isSubmitting
                ? "Sending Enquiry..."
                : "Send Enquiry"}
            </button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}