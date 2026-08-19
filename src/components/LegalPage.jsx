import CustomCursor from "./CustomCursor";
import Footer from "./Footer";
import LegalNavbar from "./LegalNavbar";


export default function LegalPage({
  page,
}) {
  return (
    <>
      <CustomCursor />

      <LegalNavbar />


      <main
        id="main-content"
        data-cursor-theme="dark"
        className="
          min-h-screen

          bg-[#F5E6CC]

          pt-[7.25rem]

          text-[#1C1C1C]

          md:pt-[8.25rem]
        "
      >
        {/* =================================================
            LEGAL PAGE CONTENT

            Uses the same horizontal spacing system
            as the main website sections.
        ================================================= */}

        <section
          className="
            px-6
            pb-20
            pt-14

            sm:px-8
            sm:pb-24
            sm:pt-16

            md:px-12
            md:pt-20

            lg:px-16

            xl:px-20
            xl:pb-28
          "
        >
          <div
            className="
              mx-auto
              max-w-7xl
            "
          >
            {/* =================================================
                PAGE LABEL
            ================================================= */}

            <p className="section-name">
              {page.title}
            </p>


            {/* =================================================
                PAGE TITLE

                Same general width and typography behaviour
                as headings on the main website.
            ================================================= */}

            {/* <h1
              className="
                mt-8

                max-w-5xl

                section-heading

                text-pretty
              "
            >
              {page.title}
            </h1> */}


            {/* =================================================
                INTRODUCTION

                Wider than the previous max-w-3xl so it lines
                up more closely with main website content.
            ================================================= */}

            <p
              className="
                mt-10

                max-w-6xl

                section-body

                leading-[1.55]

                sm:leading-[1.6]
              "
            >
              {page.intro}
            </p>


            {/* =================================================
                DIVIDER
            ================================================= */}

            <div
              aria-hidden="true"
              className="
                mt-10

                h-px
                w-full

                max-w-6xl

                bg-[#704214]/20

                sm:mt-12
              "
            />


            {/* =================================================
                LEGAL SECTIONS

                The overall page uses max-w-7xl.

                The written legal content uses max-w-6xl,
                matching the wider text blocks used throughout
                the main website without becoming difficult
                to read on very large screens.
            ================================================= */}

            <div
              className="
                mt-12

                max-w-6xl

                space-y-12

                sm:mt-14
                sm:space-y-14

                md:mt-16
                md:space-y-16

                xl:space-y-18
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
                    aria-labelledby={`legal-heading-${sectionIndex}`}
                  >
                    {/* =========================================
                        SECTION HEADING
                    ========================================= */}

                    <h2
                      id={`legal-heading-${sectionIndex}`}
                      className="
                        max-w-5xl

                        font-['Book_Antiqua','Palatino_Linotype',Palatino,serif]

                        text-[1.45rem]
                        font-normal

                        leading-[1.25]

                        text-[#704214]

                        text-pretty

                        sm:text-[1.55rem]

                        md:text-[1.7rem]

                        lg:text-[1.8rem]

                        xl:text-[1.9rem]
                      "
                    >
                      {section.heading}
                    </h2>


                    {/* =========================================
                        SMALL ACCENT LINE
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

                    <div
                      className="
                        mt-5

                        max-w-6xl

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
                              `${section.heading}-${paragraphIndex}`
                            }
                            className="
                              section-body

                              leading-[1.55]

                              sm:leading-[1.6]

                              md:leading-[1.65]
                            "
                          >
                            {paragraph}
                          </p>
                        ),
                      )}
                    </div>


                    {/* =========================================
                        OPTIONAL BULLET LIST

                        Ready in case legalPages.js later uses
                        an items array.
                    ========================================= */}

                    {section.items?.length >
                      0 && (
                      <ul
                        className="
                          mt-6

                          max-w-6xl

                          list-disc

                          space-y-3

                          pl-6

                          sm:space-y-4
                          sm:pl-7
                        "
                      >
                        {section.items.map(
                          (
                            item,
                            itemIndex,
                          ) => (
                            <li
                              key={
                                `${section.heading}-item-${itemIndex}`
                              }
                              className="
                                pl-1

                                section-body

                                leading-[1.55]

                                marker:text-[#704214]

                                sm:leading-[1.6]

                                md:leading-[1.65]
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

                          max-w-6xl

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
                                `${section.heading}-number-${itemIndex}`
                              }
                              className="
                                pl-1

                                section-body

                                leading-[1.55]

                                marker:font-semibold
                                marker:text-[#704214]

                                sm:leading-[1.6]

                                md:leading-[1.65]
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
                BACK TO WEBSITE
            ================================================= */}

            <div
              className="
                mt-14

                max-w-6xl

                border-t
                border-[#704214]/20

                pt-7

                sm:mt-16
                sm:pt-8

                md:mt-20
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

                  focus-visible:ring-2
                  focus-visible:ring-[#704214]
                  focus-visible:ring-offset-3
                  focus-visible:ring-offset-[#F5E6CC]

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
          </div>
        </section>
      </main>


      <Footer
        mainSitePrefix="/"
      />
    </>
  );
}