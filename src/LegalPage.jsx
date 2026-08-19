// src/components/LegalPage.jsx

import LegalNavbar from "./LegalNavbar";
import Footer from "./Footer";
import BackToTopButton from "./BackToTopButton";
import ScrollProgressBar from "./ScrollProgressBar";


const legalNavigation = [
  {
    label: "Privacy Policy",
    slug: "privacy-policy",
    href: "/privacy-policy/",
  },

  {
    label: "Terms of Service",
    slug: "terms-of-service",
    href: "/terms-of-service/",
  },

  {
    label: "Research Disclaimer",
    slug: "research-disclaimer",
    href: "/research-disclaimer/",
  },
];


export default function LegalPage({
  page,
}) {
  const currentSlug =
    document.body.dataset.legalPage;


  return (
    <>
      {/* =====================================================
          GLOBAL UI
      ===================================================== */}

      <ScrollProgressBar />

      <LegalNavbar />


      {/* =====================================================
          LEGAL PAGE
      ===================================================== */}

      <main
        id="main-content"
        data-cursor-theme="dark"
        className="
          min-h-screen

          bg-[#F5E6CC]

          px-6
          py-14

          text-[#1C1C1C]

          sm:px-8
          sm:py-16

          md:px-12
          md:py-20

          lg:px-16
          lg:py-24

          xl:px-20
        "
      >
        <article
          className="
            mx-auto
            max-w-5xl
          "
        >
          {/* =================================================
              PAGE HEADER
          ================================================= */}

          <header>
            {/* ===============================================
                EYEBROW

                Uses the exact same section-name styling
                as the main website.
            =============================================== */}

            <p
              className="
                section-name
              "
            >
              {page.eyebrow}
            </p>


            {/* ===============================================
                PAGE TITLE

                Uses the main website heading system.
            =============================================== */}

            <h1
              className="
                mt-7

                max-w-[900px]

                section-heading

                text-pretty

                sm:mt-8
              "
            >
              {page.title}
            </h1>


            {/* ===============================================
                INTRODUCTION
            =============================================== */}

            <p
              className="
                mt-6

                max-w-[800px]

                section-body

                leading-[1.6]

                sm:mt-7

                md:leading-[1.65]
              "
            >
              {page.intro}
            </p>


            {/* ===============================================
                HEADER DIVIDER
            =============================================== */}

            <div
              aria-hidden="true"
              className="
                mt-9

                h-px
                w-full

                bg-[#704214]/20

                sm:mt-10

                md:mt-12
              "
            />
          </header>


          {/* =================================================
              LEGAL CONTENT
          ================================================= */}

          <div
            className="
              mt-10

              space-y-10

              sm:mt-12
              sm:space-y-12

              md:mt-14
              md:space-y-14

              lg:space-y-16
            "
          >
            {page.sections.map(
              (
                section,
                sectionIndex,
              ) => (
                <section
                  key={
                    section.heading
                  }
                  aria-labelledby={`legal-section-${sectionIndex}`}
                  className="
                    max-w-[850px]
                  "
                >
                  {/* =========================================
                      SECTION HEADING
                  ========================================= */}

                  <h2
                    id={`legal-section-${sectionIndex}`}
                    className="
                      font-['Book_Antiqua','Palatino_Linotype',Palatino,serif]

                      text-[1.4rem]
                      font-normal

                      leading-[1.25]

                      text-[#704214]

                      text-pretty

                      sm:text-[1.5rem]

                      md:text-[1.65rem]

                      lg:text-[1.75rem]
                    "
                  >
                    {section.heading}
                  </h2>


                  {/* =========================================
                      DECORATIVE DIVIDER
                  ========================================= */}

                  <span
                    aria-hidden="true"
                    className="
                      mt-3

                      block

                      h-[2px]
                      w-10

                      bg-[#9C645E]

                      sm:w-12
                    "
                  />


                  {/* =========================================
                      PARAGRAPHS
                  ========================================= */}

                  {section.paragraphs?.length >
                    0 && (
                    <div
                      className="
                        mt-5

                        space-y-4

                        sm:mt-6
                        sm:space-y-5

                        md:space-y-6
                      "
                    >
                      {section.paragraphs.map(
                        (
                          paragraph,
                          paragraphIndex,
                        ) => (
                          <p
                            key={
                              paragraphIndex
                            }
                            className="
                              max-w-[800px]

                              section-body

                              leading-[1.6]

                              md:leading-[1.65]
                            "
                          >
                            {paragraph}
                          </p>
                        ),
                      )}
                    </div>
                  )}


                  {/* =========================================
                      OPTIONAL BULLET LIST

                      None of the current legalPages data
                      uses this yet, but this keeps spacing
                      consistent if list content is added.
                  ========================================= */}

                  {section.items?.length >
                    0 && (
                    <ul
                      className="
                        mt-6

                        max-w-[800px]

                        space-y-3

                        pl-5

                        sm:space-y-4
                        sm:pl-6
                      "
                    >
                      {section.items.map(
                        (
                          item,
                          itemIndex,
                        ) => (
                          <li
                            key={
                              itemIndex
                            }
                            className="
                              relative

                              pl-2

                              section-body

                              leading-[1.6]

                              marker:text-[#704214]
                            "
                          >
                            {item}
                          </li>
                        ),
                      )}
                    </ul>
                  )}


                  {/* =========================================
                      OPTIONAL NUMBERED LIST
                  ========================================= */}

                  {section.numberedItems
                    ?.length >
                    0 && (
                    <ol
                      className="
                        mt-6

                        max-w-[800px]

                        list-decimal

                        space-y-3

                        pl-6

                        sm:space-y-4
                        sm:pl-7
                      "
                    >
                      {section.numberedItems.map(
                        (
                          item,
                          itemIndex,
                        ) => (
                          <li
                            key={
                              itemIndex
                            }
                            className="
                              pl-2

                              section-body

                              leading-[1.6]

                              marker:font-semibold
                              marker:text-[#704214]
                            "
                          >
                            {item}
                          </li>
                        ),
                      )}
                    </ol>
                  )}
                </section>
              ),
            )}
          </div>


          {/* =================================================
              LEGAL PAGE NAVIGATION
          ================================================= */}

          <nav
            aria-label="Legal pages"
            className="
              mt-14

              border-t
              border-[#704214]/20

              pt-8

              sm:mt-16
              sm:pt-10

              md:mt-20
            "
          >
            <p
              className="
                font-['Book_Antiqua','Palatino_Linotype',Palatino,serif]

                text-[1.2rem]
                font-normal

                text-[#704214]

                sm:text-[1.3rem]

                md:text-[1.4rem]
              "
            >
              Legal Information
            </p>


            <div
              className="
                mt-5

                grid
                grid-cols-1

                gap-3

                sm:grid-cols-3
                sm:gap-4
              "
            >
              {legalNavigation.map(
                (item) => {
                  const isCurrent =
                    currentSlug ===
                    item.slug;


                  return (
                    <a
                      key={
                        item.slug
                      }
                      href={
                        item.href
                      }
                      aria-current={
                        isCurrent
                          ? "page"
                          : undefined
                      }
                      className={`
                        flex

                        min-h-[52px]

                        items-center
                        justify-between

                        gap-4

                        rounded-[16px]

                        border

                        px-4
                        py-3

                        font-['Book_Antiqua','Palatino_Linotype',Palatino,serif]

                        text-[0.95rem]

                        leading-[1.25]

                        transition
                        duration-300

                        focus:outline-none

                        focus-visible:ring-2
                        focus-visible:ring-[#704214]
                        focus-visible:ring-offset-3
                        focus-visible:ring-offset-[#F5E6CC]

                        sm:px-5

                        md:text-[1rem]

                        ${
                          isCurrent
                            ? `
                              border-[#704214]/30
                              bg-[#704214]
                              text-[#FFF6E8]
                            `
                            : `
                              border-[#704214]/15
                              bg-[#FFF6E8]
                              text-[#704214]

                              hover:border-[#566735]/30
                              hover:bg-[#566735]
                              hover:text-[#FFF6E8]
                            `
                        }
                      `}
                    >
                      <span>
                        {
                          item.label
                        }
                      </span>


                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="
                          h-4
                          w-4

                          shrink-0
                        "
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </a>
                  );
                },
              )}
            </div>
          </nav>


          {/* =================================================
              RETURN TO MAIN WEBSITE
          ================================================= */}

          <div
            className="
              mt-10

              flex

              border-t
              border-[#704214]/20

              pt-8

              sm:mt-12
            "
          >
            <a
              href="/"
              className="
                group

                inline-flex

                items-center

                gap-2

                font-['Book_Antiqua','Palatino_Linotype',Palatino,serif]

                text-[1rem]

                text-[#704214]

                transition-colors
                duration-300

                hover:text-[#566735]

                focus:outline-none
                focus-visible:underline

                sm:text-[1.05rem]
              "
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="
                  h-4
                  w-4

                  transition-transform
                  duration-300

                  group-hover:-translate-x-1
                "
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>

              Back to Ancestors &amp; Anecdotes
            </a>
          </div>
        </article>
      </main>


      {/* =====================================================
          SITE FOOTER

          mainSitePrefix ensures footer section links return
          to sections on the homepage from a legal subpage.
      ===================================================== */}

      <Footer
        mainSitePrefix="/"
      />


      {/* =====================================================
          BACK TO TOP
      ===================================================== */}

      <BackToTopButton />
    </>
  );
}