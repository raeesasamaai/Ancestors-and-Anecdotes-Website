export default function Footer({
  mainSitePrefix = "",
}) {
  const socialLinks = [
    {
      label: "Instagram",
      href: "https://www.instagram.com/",
      icon: (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
          <circle cx="12" cy="12" r="4.1" />
          <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/",
      icon: (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-6 w-6"
          fill="currentColor"
        >
          <path d="M17.52 2.5H6.48A3.98 3.98 0 0 0 2.5 6.48v11.04a3.98 3.98 0 0 0 3.98 3.98h4.12v-7.03H8.24V11.5h2.36V9.24c0-2.5 1.53-3.86 3.76-3.86 1.07 0 1.99.08 2.25.12v2.62h-1.55c-1.21 0-1.45.58-1.45 1.42v1.96h2.9l-.38 2.97h-2.52v7.03h3.91a3.98 3.98 0 0 0 3.98-3.98V6.48A3.98 3.98 0 0 0 17.52 2.5Z" />
        </svg>
      ),
    },
  ];

  const quickLinks = [
    {
      label: "Home",
      href: `${mainSitePrefix}#home`,
    },
    {
      label: "What We Do",
      href: `${mainSitePrefix}#what-we-do`,
    },
    {
      label: "Examples",
      href: `${mainSitePrefix}#examples`,
    },
    {
      label: "Packages",
      href: `${mainSitePrefix}#packages`,
    },
    {
      label: "Our Process",
      href: `${mainSitePrefix}#process`,
    },
    {
      label: "About Us",
      href: `${mainSitePrefix}#about-us`,
    },
    {
      label: "Testimonials",
      href: `${mainSitePrefix}#testimonials`,
    },
    {
      label: "FAQ",
      href: `${mainSitePrefix}#faq`,
    },
    {
      label: "Contact Us",
      href: `${mainSitePrefix}#contact-us`,
    },
  ];

  const legalLinks = [
    {
      label: "Privacy Policy",
      href: "/privacy-policy/",
    },
    {
      label: "Terms of Service",
      href: "/terms-of-service/",
    },
    {
      label: "Research Disclaimer",
      href: "/research-disclaimer/",
    },
  ];

  const footerHeadingClasses = `
    font-['Book_Antiqua','Palatino_Linotype',Palatino,serif]
    text-[1.3rem]
    font-semibold
    leading-tight
    text-[#704214]
    sm:text-[1.17rem]
  `;

  const footerLinkClasses = `
    group
    relative
    inline-flex
    w-fit
    font-['Cormorant_Garamond',serif]
    text-[1.05rem]
    font-medium
    leading-snug
    text-[#1C1C1C]
    transition-colors
    duration-300
    hover:text-[#566735]
    focus:outline-none
    focus-visible:text-[#566735]
    focus-visible:underline
    sm:text-[1.08rem]
  `;

  return (
    <footer
      data-cursor-theme="dark"
      className="
        bg-[#FFF6E8]
        px-6
        py-12
        text-[#1C1C1C]
        md:px-20
        lg:pt-14
        lg:pb-8
      "
    >
      <div className="mx-auto max-w-7xl">
        {/* Main footer content */}
        <div
          className="
            grid
            grid-cols-1
            gap-10
            sm:grid-cols-2
            lg:grid-cols-[minmax(280px,1.35fr)_minmax(240px,0.8fr)_minmax(180px,0.55fr)_minmax(260px,0.85fr)]
            lg:gap-12
          "
        >
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a
              href={`${mainSitePrefix}#home`}
              aria-label="Go to the homepage"
              className="inline-flex flex-col items-start"
            >
              <img
                src="/Images/tree.png"
                alt="Ancestors and Anecdotes tree"
                className="
                  h-[95px]
                  w-auto
                  object-contain
                  sm:h-[105px]
                "
              />

              <h2
                className="
                  mt-4
                  font-['Book_Antiqua','Palatino_Linotype',Palatino,serif]
                  text-[1.45rem]
                  font-normal
                  leading-tight
                  text-[#704214]
                  sm:text-[1.6rem]
                "
              >
                Ancestors and Anecdotes
              </h2>
            </a>

            <p
              className="
                mt-5
                max-w-[350px]
                font-['Cormorant_Garamond',serif]
                text-[1.1rem]
                font-medium
                leading-[1.45]
                text-[#1C1C1C]
                sm:text-[1.1rem]
              "
            >
              Helping families uncover, preserve, and share the stories behind
              their ancestry.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className={footerHeadingClasses}>
              Quick Links
            </h3>

            <nav
              aria-label="Footer navigation"
              className="
                mt-5
                grid
                grid-cols-2
                gap-x-7
                gap-y-3
              "
            >
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={footerLinkClasses}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className="
                      absolute
                      -bottom-[3px]
                      left-0
                      h-[1.5px]
                      w-full
                      origin-left
                      scale-x-0
                      bg-current
                      transition-transform
                      duration-300
                      ease-[cubic-bezier(0.22,1,0.36,1)]
                      group-hover:scale-x-100
                      group-focus-visible:scale-x-100
                    "
                  />
                </a>
              ))}
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h3 className={footerHeadingClasses}>
              Legal
            </h3>

            <nav
              aria-label="Legal information"
              className="
                mt-5
                flex
                flex-col
                gap-3
              "
            >
              {legalLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={footerLinkClasses}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className="
                      absolute
                      -bottom-[3px]
                      left-0
                      h-[1.5px]
                      w-full
                      origin-left
                      scale-x-0
                      bg-current
                      transition-transform
                      duration-300
                      ease-[cubic-bezier(0.22,1,0.36,1)]
                      group-hover:scale-x-100
                      group-focus-visible:scale-x-100
                    "
                  />
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className={footerHeadingClasses}>
              Contact
            </h3>

            <div
              className="
                mt-5
                flex
                flex-col
                gap-3
              "
            >
              <a
                href="mailto:ancestorsandanecdotes@gmail.com"
                className={`
                  ${footerLinkClasses}
                  break-all
                `}
              >
                ancestorsandanecdotes@gmail.com
                <span
                  aria-hidden="true"
                  className="
                    absolute
                    -bottom-[3px]
                    left-0
                    h-[1.5px]
                    w-full
                    origin-left
                    scale-x-0
                    bg-current
                    transition-transform
                    duration-300
                    ease-[cubic-bezier(0.22,1,0.36,1)]
                    group-hover:scale-x-100
                    group-focus-visible:scale-x-100
                  "
                />
              </a>

              <p
                className="
                  font-['Cormorant_Garamond',serif]
                  text-[1.05rem]
                  font-medium
                  leading-snug
                  text-[#1C1C1C]
                  sm:text-[1.1rem]
                "
              >
                Response within 1–2 business days
              </p>

              <p
                className="
                  font-['Cormorant_Garamond',serif]
                  text-[1.05rem]
                  font-medium
                  leading-snug
                  text-[#1C1C1C]
                  sm:text-[1.1rem]
                "
              >
                Cape Town, South Africa
              </p>
              <div
                className="
                  mt-2
                  flex
                  items-center
                  gap-4
                  text-[#704214]
                "
              >
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="
                      inline-flex
                      items-center
                      justify-center
                      transition-colors
                      duration-300
                      hover:text-[#566735]
                      focus:outline-none
                      focus-visible:text-[#566735]
                    "
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div
          className="
            mt-10
            flex
            flex-col
            gap-4
            border-t
            border-[#704214]/30
            pt-5
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <p
            className="
              font-['Cormorant_Garamond',serif]
              text-[0.95rem]
              font-medium
              leading-snug
              text-[#1C1C1C]
              sm:text-[1rem]
            "
          >
            © 2026 Ancestors &amp; Anecdotes. All rights reserved.
          </p>

          <p
            className="
              font-['Cormorant_Garamond',serif]
              text-[0.95rem]
              font-medium
              leading-snug
              text-[#1C1C1C]
              sm:text-[1rem]
            "
          >
            Website by{" "}
            <a
              href="https://nexwebsa.co.za"
              target="_blank"
              rel="noopener noreferrer"
              className="
                font-semibold
                text-[#704214]
                transition-colors
                duration-300
                hover:text-[#566735]
                focus:outline-none
                focus-visible:underline
              "
            >
              NexWeb
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
