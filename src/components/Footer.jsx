function LinkUnderline() {
  return (
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

        [@media(hover:hover)_and_(pointer:fine)]:transition-transform
        [@media(hover:hover)_and_(pointer:fine)]:duration-300

        [@media(hover:hover)_and_(pointer:fine)]:ease-[cubic-bezier(0.22,1,0.36,1)]

        [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-x-100
        group-focus-visible:scale-x-100
      "
    />
  );
}

export default function Footer({
  mainSitePrefix = "",
}) {
  /* =========================================================
     SOCIAL LINKS
  ========================================================= */

  const socialLinks = [
    {
      label: "Instagram",
      href: "https://www.instagram.com/",
      icon: (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect
            x="3.5"
            y="3.5"
            width="17"
            height="17"
            rx="4.5"
          />

          <circle
            cx="12"
            cy="12"
            r="4.1"
          />

          <circle
            cx="17.3"
            cy="6.7"
            r="0.9"
            fill="currentColor"
            stroke="none"
          />
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
          className="h-5 w-5"
          fill="currentColor"
        >
          <path d="M17.52 2.5H6.48A3.98 3.98 0 0 0 2.5 6.48v11.04a3.98 3.98 0 0 0 3.98 3.98h4.12v-7.03H8.24V11.5h2.36V9.24c0-2.5 1.53-3.86 3.76-3.86 1.07 0 1.99.08 2.25.12v2.62h-1.55c-1.21 0-1.45.58-1.45 1.42v1.96h2.9l-.38 2.97h-2.52v7.03h3.91a3.98 3.98 0 0 0 3.98-3.98V6.48A3.98 3.98 0 0 0 17.52 2.5Z" />
        </svg>
      ),
    },
  ];

  /* =========================================================
     QUICK LINKS
  ========================================================= */

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

  /* =========================================================
     LEGAL LINKS
  ========================================================= */

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

  /* =========================================================
     SHARED TYPOGRAPHY
  ========================================================= */

  const footerHeadingClasses = `
    font-['Book_Antiqua','Palatino_Linotype',Palatino,serif]

    text-[1.15rem]
    font-semibold

    leading-tight

    text-[#704214]

    sm:text-[1.18rem]

    md:text-[1.2rem]

    xl:text-[1.25rem]
  `;

  const footerLinkClasses = `
    group
    relative

    inline-flex
    w-fit

    font-['Cormorant_Garamond',serif]

    text-[0.98rem]
    font-medium

    leading-snug

    text-[#1C1C1C]

    [@media(hover:hover)_and_(pointer:fine)]:transition-colors
    [@media(hover:hover)_and_(pointer:fine)]:duration-300

    [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#566735]

    focus:outline-none
    focus-visible:text-[#566735]
    focus-visible:underline

    sm:text-[1rem]

    xl:text-[1.05rem]
  `;

  const footerTextClasses = `
    font-['Cormorant_Garamond',serif]

    text-[0.98rem]
    font-medium

    leading-[1.35]

    text-[#1C1C1C]

    sm:text-[1rem]

    xl:text-[1.05rem]
  `;

  return (
    <footer
      data-cursor-theme="dark"
      className="
        bg-[#FFF6E8]

        px-6
        py-8

        text-[#1C1C1C]

        sm:px-8
        sm:py-9

        md:px-12
        md:py-10

        lg:px-16

        xl:px-20
        xl:pb-7
        xl:pt-9

        [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:px-8

        [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:py-7
      "
    >
      <div className="mx-auto max-w-7xl">
        {/* =================================================
            MAIN FOOTER

            MOBILE
            Brand
            Quick Links
            Legal
            Contact

            TABLET / IPAD
            Brand        Legal
            Quick Links  Contact

            DESKTOP
            Brand | Quick Links | Legal | Contact
        ================================================= */}

        <div
          className="
            grid
            grid-cols-1

            items-start

            gap-x-10
            gap-y-9

            md:grid-cols-2
            md:gap-x-14

            lg:gap-x-16

            xl:grid-cols-[minmax(270px,1.25fr)_minmax(230px,0.9fr)_minmax(170px,0.65fr)_minmax(250px,0.95fr)]

            xl:gap-x-12
            xl:gap-y-0

            2xl:grid-cols-[minmax(300px,1.3fr)_minmax(250px,0.9fr)_minmax(180px,0.65fr)_minmax(270px,0.95fr)]

            2xl:gap-x-14

            [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:gap-y-7
          "
        >
          {/* =================================================
              BRAND
          ================================================= */}

          <div
            className="
              order-1

              md:col-start-1
              md:row-start-1

              xl:col-auto
              xl:row-auto
            "
          >
            <a
              href={`${mainSitePrefix}#home`}
              aria-label="Go to the homepage"
              className="
                inline-flex
                flex-col

                items-start
              "
            >
              <img
                src="/Images/tree.png"
                alt="Ancestors and Anecdotes tree"
                loading="lazy"
                decoding="async"
                className="
                  h-[70px]
                  w-auto

                  object-contain

                  sm:h-[76px]

                  md:h-[82px]

                  xl:h-[88px]

                  [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:h-[64px]
                "
              />

              <h2
                className="
                  mt-3

                  font-['Book_Antiqua','Palatino_Linotype',Palatino,serif]

                  text-[1.3rem]
                  font-normal

                  leading-tight

                  text-[#704214]

                  sm:text-[1.4rem]

                  md:text-[1.48rem]

                  xl:text-[1.55rem]
                "
              >
                Ancestors and Anecdotes
              </h2>
            </a>

            <p
              className="
                mt-4

                max-w-[350px]

                font-['Cormorant_Garamond',serif]

                text-[1rem]
                font-medium

                leading-[1.4]

                text-[#1C1C1C]

                sm:text-[1.03rem]

                xl:text-[1.08rem]
              "
            >
              Helping families uncover, preserve, and share the stories behind
              their ancestry.
            </p>
          </div>

          {/* =================================================
              QUICK LINKS

              Mobile:
              directly beneath branding.

              Tablet/iPad:
              bottom-left.

              Desktop:
              second column.
          ================================================= */}

          <div
            className="
              order-2

              md:col-start-1
              md:row-start-2

              xl:col-auto
              xl:row-auto
            "
          >
            <h3 className={footerHeadingClasses}>
              Quick Links
            </h3>

            <nav
              aria-label="Footer navigation"
              className="
                mt-4

                grid
                grid-cols-1

                gap-y-2.5

                md:grid-cols-2
                md:gap-x-8
                md:gap-y-3

                xl:mt-5
                xl:grid-cols-2
                xl:gap-x-6
                xl:gap-y-3
              "
            >
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={footerLinkClasses}
                >
                  {link.label}

                  <LinkUnderline />
                </a>
              ))}
            </nav>
          </div>

          {/* =================================================
              LEGAL
          ================================================= */}

          <div
            className="
              order-3

              md:col-start-2
              md:row-start-1

              md:self-end

              xl:col-auto
              xl:row-auto
              xl:self-auto
            "
          >
            {/* =================================================
                EDIT TABLET LEGAL POSITION HERE

                md:self-end
                down
                pushes Legal to the BOTTOM of the tablet/iPad
                row instead of sitting at the very top.

                To move Legal back to the top:
                replace md:self-end with md:self-start

                To vertically centre Legal:
                replace md:self-end with md:self-center

                This is the main change that removes the
                huge empty area between Legal and Contact.
            ================================================= */}

            <h3 className={footerHeadingClasses}>
              Legal
            </h3>

            <nav
              aria-label="Legal information"
              className="
                mt-4

                flex
                flex-col

                gap-2.5

                xl:mt-5
                xl:gap-3
              "
            >
              {legalLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={footerLinkClasses}
                >
                  {link.label}

                  <LinkUnderline />
                </a>
              ))}
            </nav>
          </div>

          {/* =================================================
              CONTACT
          ================================================= */}

          <div
            className="
              order-4

              md:col-start-2
              md:row-start-2

              md:mt-5

              xl:col-auto
              xl:row-auto
              xl:mt-0
            "
          >
            {/* =================================================
                EDIT TABLET LEGAL / CONTACT GAP HERE

                md:mt-5
                down
                controls the final spacing between Legal
                and Contact on tablets/iPads.

                Smaller gap:
                md:mt-2
                md:mt-3
                md:mt-4

                Current:
                md:mt-5

                Larger gap:
                md:mt-6
                md:mt-8

                Desktop resets it using:
                xl:mt-0
            ================================================= */}

            <h3 className={footerHeadingClasses}>
              Contact
            </h3>

            <div
              className="
                mt-4

                flex
                flex-col

                gap-2.5

                xl:mt-5
                xl:gap-3
              "
            >
              {/* EMAIL */}

              <a
                href="mailto:ancestorsandanecdotes@gmail.com"
                className={`
                  ${footerLinkClasses}

                  max-w-full

                  break-words
                `}
              >
                ancestorsandanecdotes@gmail.com

                <LinkUnderline />
              </a>

              {/* RESPONSE TIME */}

              <p className={footerTextClasses}>
                Response within 1-2 business days
              </p>

              {/* LOCATION */}

              <p className={footerTextClasses}>
                Cape Town, South Africa
              </p>

              {/* SOCIAL ICONS */}

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

                      h-8
                      w-8

                      items-center
                      justify-center

                      rounded-full

                      [@media(hover:hover)_and_(pointer:fine)]:transition
                      [@media(hover:hover)_and_(pointer:fine)]:duration-300

                      [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-0.5
                      [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#566735]

                      focus:outline-none

                      focus-visible:ring-2
                      focus-visible:ring-[#704214]
                      focus-visible:ring-offset-2
                      focus-visible:ring-offset-[#FFF6E8]
                    "
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            BOTTOM FOOTER
        ================================================= */}

        <div
          className="
            mt-8

            flex
            flex-col

            gap-2.5

            border-t
            border-[#704214]/25

            pt-4

            sm:mt-9
            sm:pt-5

            md:flex-row
            md:items-center
            md:justify-between

            xl:mt-8

            [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-7
          "
        >
          {/* COPYRIGHT */}

          <p
            className="
              font-['Cormorant_Garamond',serif]

              text-[0.88rem]
              font-medium

              leading-snug

              text-[#1C1C1C]

              sm:text-[0.92rem]

              md:text-[0.95rem]
            "
          >
            &copy; 2026 Ancestors &amp; Anecdotes. All rights reserved.
          </p>

          {/* WEBSITE CREDIT */}

          <p
            className="
              font-['Cormorant_Garamond',serif]

              text-[0.88rem]
              font-medium

              leading-snug

              text-[#1C1C1C]

              sm:text-[0.92rem]

              md:text-[0.95rem]

              md:text-right
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

                [@media(hover:hover)_and_(pointer:fine)]:transition-colors
                [@media(hover:hover)_and_(pointer:fine)]:duration-300

                [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#566735]

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
