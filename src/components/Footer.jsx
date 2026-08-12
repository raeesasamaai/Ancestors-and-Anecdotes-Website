export default function Footer() {
  const quickLinks = [
    {
      label: "Home",
      href: "#home",
    },
    {
      label: "What We Do",
      href: "#what-we-do",
    },
    {
      label: "Examples",
      href: "#examples",
    },
    {
      label: "Packages",
      href: "#packages",
    },
    {
      label: "Our Process",
      href: "#process",
    },
    {
      label: "About Us",
      href: "#about-us",
    },
    {
      label: "Testimonials",
      href: "#testimonials",
    },
    {
      label: "FAQ",
      href: "#faq",
    },
    {
      label: "Contact Us",
      href: "#contact-us",
    },
  ];

  const legalLinks = [
    {
      label: "Privacy Policy",
      href: "/privacy-policy",
    },
    {
      label: "Terms of Service",
      href: "/terms-of-service",
    },
    {
      label: "Research Disclaimer",
      href: "/research-disclaimer",
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
              href="#home"
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
                Cape Town, South Africa
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
                Response within 1–2 business days
              </p>
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