import { useEffect, useState } from "react";
import {
  useForm,
  ValidationError,
} from "@formspree/react";

const initialFormData = {
  fullName: "",
  email: "",
  phone: "",
  familyLocation: "",
  package: "",
  budget: "",
  message: "",
};

export default function ContactUs() {
  const [formData, setFormData] = useState(initialFormData);

  /*
   * Formspree form:
   * https://formspree.io/f/xjybvgzp
   */
  const [state, submitToFormspree] = useForm("xjybvgzp");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  /*
   * Clear the controlled fields after Formspree
   * confirms that the submission succeeded.
   */
  useEffect(() => {
    if (!state.succeeded) return;

    setFormData(initialFormData);
  }, [state.succeeded]);

  const inputClasses = `
    h-[62px]
    w-full
    rounded-[20px]
    border
    border-[#704214]/10
    bg-[#FFF6E8]
    px-5
    section-body
    text-[1.1rem]
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
    sm:px-6
    sm:text-[1.2rem]
  `;

  const labelClasses = `
    mb-3
    block
    font-['Book_Antiqua','Palatino_Linotype',Palatino,serif]
    text-[1.2rem]
    font-normal
    leading-none
    text-[#704214]
    sm:text-[1.3rem]
  `;

  const infoHeadingClasses = `
    font-['Book_Antiqua','Palatino_Linotype',Palatino,serif]
    text-[1.35rem]
    font-medium
    leading-tight
    text-[#704214]
    sm:text-[1.5rem]
  `;

  const errorClasses = `
    mt-2
    block
    section-body
    text-[0.95rem]
    leading-snug
    text-[#C11013]
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
        py-20
        text-[#1C1C1C]
        md:px-20
      "
    >
      <div className="mx-auto max-w-7xl">
        {/* Section name */}
        <p
          className="mb-2 section-name"
          style={{
            WebkitTextStroke: "0.45px currentColor",
          }}
        >
          Contact Us
        </p>

        {/* Main heading */}
        <h2 className="mt-8 max-w-5xl section-heading">
          Ready to Begin Your Family History Journey?
        </h2>

        {/* Introduction */}
        <p className="mt-7 max-w-4xl section-body">
          Share what you know so far, whether it is a name, a place, a document, and a family story. 
          We will help you explore the next step.
        </p>

        {/* Contact information and form */}
        <div
          className="
            mt-14
            grid
            grid-cols-1
            items-start
            gap-14
            lg:mt-14
            lg:grid-cols-[minmax(310px,0.82fr)_minmax(0,1.18fr)]
            lg:gap-16
            xl:grid-cols-[minmax(360px,0.86fr)_minmax(0,1.14fr)]
            xl:gap-20
          "
        >
          {/* Left-side contact details */}
          <div className="space-y-9 lg:pt-1">
            {/* Location */}
            <div className="flex items-center gap-7">
              <div
                className="
                  flex
                  h-14
                  w-14
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
                  className="h-6 w-6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                  <circle cx="12" cy="10" r="2.7" />
                </svg>
              </div>

              <div className="pt-1">
                <h3 className={infoHeadingClasses}>
                  Location
                </h3>

                <p className="mt-2 section-body text-[1.1rem] leading-snug sm:text-[1.25rem]">
                  Cape Town, South Africa
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-7">
              <div
                className="
                  flex
                  h-14
                  w-14
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
                  className="h-6 w-6"
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

              <div className="min-w-0 pt-1">
                <h3 className={infoHeadingClasses}>
                  Email
                </h3>

                <a
                  href="mailto:ancestorsandanecdotes@gmail.com"
                  className="
                    mt-1
                    block
                    break-all
                    section-body
                    text-[1.05rem]
                    leading-snug
                    transition-colors
                    duration-300
                    hover:text-[#704214]
                    sm:text-[1.3rem]
                  "
                >
                  ancestorsandanecdotes@gmail.com
                </a>
              </div>
            </div>

            {/* Response time */}
            <div className="flex items-center gap-7">
              <div
                className="
                  flex
                  h-14
                  w-14
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
                  className="h-6 w-6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m13 2-7 12h6l-1 8 7-12h-6l1-8Z" />
                </svg>
              </div>

              <div className="pt-1">
                <h3 className={infoHeadingClasses}>
                  Response Time
                </h3>

                <p className="mt-2 section-body text-[1.1rem] leading-snug sm:text-[1.25rem]">
                  We respond within 1–2 business days
                </p>
              </div>
            </div>

            {/* Confidentiality */}
            <div className="flex items-center gap-7">
              <div
                className="
                  flex
                  h-14
                  w-14
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
                  className="h-6 w-6"
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
                  text-[1.12rem]
                  font-[600]
                  leading-[1.35]
                  text-[#704214]
                  sm:text-[1.13rem]
                "
              >
                Your family information will be treated with care, respect, and confidentiality.
              </p>
            </div>
          </div>

          {/* Formspree contact form */}
          <form
            onSubmit={submitToFormspree}
            className="
              grid
              grid-cols-1
              gap-x-6
              gap-y-7
              sm:grid-cols-2
            "
          >
            {/* Full name */}
            <div>
              <label
                htmlFor="fullName"
                className={labelClasses}
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
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                className={inputClasses}
              />

              <ValidationError
                prefix="Full Name"
                field="fullName"
                errors={state.errors}
                className={errorClasses}
              />
            </div>

            {/* Email address */}
            <div>
              <label
                htmlFor="email"
                className={labelClasses}
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
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. johndoe@gmail.com"
                className={inputClasses}
              />

              <ValidationError
                prefix="Email Address"
                field="email"
                errors={state.errors}
                className={errorClasses}
              />
            </div>

            {/* Phone number */}
            <div>
              <label
                htmlFor="phone"
                className={labelClasses}
              >
                Phone Number
                <span className="font-semibold text-[#C11013]">
                  *
                </span>
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your phone number"
                className={inputClasses}
              />

              <ValidationError
                prefix="Phone Number"
                field="phone"
                errors={state.errors}
                className={errorClasses}
              />
            </div>

            {/* Family location */}
            <div>
              <label
                htmlFor="familyLocation"
                className={labelClasses}
              >
                Family Location
              </label>

              <input
                id="familyLocation"
                name="familyLocation"
                type="text"
                value={formData.familyLocation}
                onChange={handleChange}
                placeholder="e.g. South Africa / UK / Unsure"
                className={inputClasses}
              />

              <ValidationError
                prefix="Family Location"
                field="familyLocation"
                errors={state.errors}
                className={errorClasses}
              />
            </div>

            {/* Package */}
            <div>
              <label
                htmlFor="package"
                className={labelClasses}
              >
                Package
              </label>

              <div className="relative">
                <select
                  id="package"
                  name="package"
                  value={formData.package}
                  onChange={handleChange}
                  className={`
                    ${inputClasses}
                    cursor-pointer
                    appearance-none
                    pr-14
                  `}
                >
                  <option value="">
                    Select a package
                  </option>

                  <option value="Getting Started">
                    Two Branch Trace
                  </option>

                  <option value="Family Tree Essentials">
                    Grandparent Trace
                  </option>

                  <option value="Family History Research">
                    Comprehensive Ancestry Trace
                  </option>

                  <option value="Family Story Document">
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
                    right-5
                    top-1/2
                    h-5
                    w-5
                    -translate-y-1/2
                    text-[#1C1C1C]
                  "
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>

              <ValidationError
                prefix="Package"
                field="package"
                errors={state.errors}
                className={errorClasses}
              />
            </div>

            {/* Budget range */}
            <div>
              <label
                htmlFor="budget"
                className={labelClasses}
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
                  value={formData.budget}
                  onChange={handleChange}
                  className={`
                    ${inputClasses}
                    cursor-pointer
                    appearance-none
                    pr-14
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
                    right-5
                    top-1/2
                    h-5
                    w-5
                    -translate-y-1/2
                    text-[#1C1C1C]
                  "
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>

              <ValidationError
                prefix="Budget Range"
                field="budget"
                errors={state.errors}
                className={errorClasses}
              />
            </div>

            {/* Message */}
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className={labelClasses}
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
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us a little about your family history enquiry and what you would like to achieve"
                className="
                  min-h-[175px]
                  w-full
                  resize-y
                  rounded-[20px]
                  border
                  border-[#704214]/10
                  bg-[#FFF6E8]
                  px-5
                  py-5
                  section-body
                  text-[1.1rem]
                  font-medium
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
                  sm:min-h-[185px]
                  sm:px-6
                  sm:text-[1.2rem]
                "
              />

              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
                className={errorClasses}
              />
            </div>

            {/* General Formspree error */}
            <ValidationError
              errors={state.errors}
              className="
                rounded-[14px]
                border
                border-[#C11013]/25
                bg-[#C11013]/5
                px-4
                py-3
                section-body
                text-[1rem]
                leading-snug
                text-[#C11013]
                sm:col-span-2
              "
            />

            {/* Successful submission */}
            {state.succeeded && (
              <div
                role="status"
                aria-live="polite"
                className="
                  rounded-[16px]
                  border
                  border-[#566735]/25
                  bg-[#566735]/10
                  px-5
                  py-4
                  sm:col-span-2
                "
              >
                <p
                  className="
                    font-['Book_Antiqua','Palatino_Linotype',Palatino,serif]
                    text-[1.2rem]
                    font-semibold
                    leading-tight
                    text-[#566735]
                  "
                >
                  Thank you for your enquiry.
                </p>

                <p
                  className="
                    mt-2
                    section-body
                    text-[1rem]
                    leading-[1.4]
                    text-[#1C1C1C]
                  "
                >
                  Your message has been sent successfully. We will respond
                  within 1–2 business days.
                </p>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={state.submitting}
              className="
                flex
                min-h-[56px]
                w-full
                items-center
                justify-center
                rounded-[14px]
                bg-[#566735]
                px-6
                py-3
                font-['Book_Antiqua','Palatino_Linotype',Palatino,serif]
                text-[1.25rem]
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
                sm:col-span-2
                sm:text-[1.35rem]
              "
            >
              {state.submitting
                ? "Sending Enquiry..."
                : "Send Enquiry"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}