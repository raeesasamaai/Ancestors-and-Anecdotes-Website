import ScrollReveal from "./ScrollReveal";

export default function WhatWeDo() {
  return (
    <section
      id="what-we-do"
      className="
        min-h-screen
        bg-[#F5E6CC]
        px-6
        py-16
        text-[#1C1C1C]

        sm:px-8
        sm:py-18

        md:px-12
        md:py-20

        lg:px-20

        [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:px-8
        [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:py-14
      "
    >
      <div className="mx-auto max-w-7xl">
        {/* ========================================
            SECTION NAME
        ======================================== */}

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
          What we do
        </ScrollReveal>

        {/* ========================================
            MAIN HEADING
        ======================================== */}

        <ScrollReveal
          as="h2"
          className="
            mt-8
            max-w-5xl
            section-heading

            [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-6
          "
        >
          Helping You Uncover the People, Places, and Stories That Came Before
          You
        </ScrollReveal>

        {/* ========================================
            INTRODUCTION
        ======================================== */}

        <ScrollReveal
          as="p"
          className="
            mt-7
            max-w-5xl
            section-body

            [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-5
          "
        >
          Ancestors and Anecdotes transforms names and dates on a page into a
          vivid, multi-generational story. We design beautiful, custom family
          trees and reconstruct your ancestors&apos; lives through narrative
          histories, historical context, and archival imagery, so that complex
          historical records are turned into a captivating, easy-to-read story
          anyone in your family can enjoy.
        </ScrollReveal>

        {/* ========================================
            CARDS

            Mobile:
            1 column

            Tablet:
            2 columns

            Desktop 1280px+:
            3 columns
        ======================================== */}

        <ScrollReveal
          as="div"
          className="
            mt-12
            grid
            grid-cols-1
            gap-8

            md:grid-cols-2

            xl:grid-cols-3

            [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-9
            [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:gap-6
          "
        >
          {/* ======================================
              CARD 1
          ====================================== */}

          <article
            className="
              flex
              h-full
              flex-col
              overflow-hidden
              rounded-3xl
              bg-[#FFF6E8]
              drop-shadow-md
            "
          >
            <img
              src="/Images/hero-bg-2.jpg"
              data-cursor-theme="light"
              alt="Historical family records used for genealogy research"
              loading="lazy"
              decoding="async"
              className="
                mx-auto
                h-52
                w-full
                object-cover
                object-center
                sepia-[6%]

                sm:h-56

                md:h-52

                lg:h-56

                xl:h-56

                [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:h-48
              "
            />

            <div
              className="
                flex
                flex-1
                flex-col
                p-6
                text-center

                sm:p-7

                lg:p-8

                [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:p-6
              "
            >
              <h3
                className="
                  section-heading
                  pt-1
                  text-[1.55rem]
                  text-[#704214]

                  sm:text-[1.65rem]

                  lg:text-2xl
                "
              >
                We Trace Your Family Roots
              </h3>

              <p
                className="
                  mt-5
                  pb-1
                  section-body
                  text-[1.08rem]
                  leading-7

                  sm:text-[1.14rem]

                  lg:text-[1.19rem]

                  [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-4
                  [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:text-[1.05rem]
                  [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:leading-6
                "
              >
                We conduct in-person research at the Western Cape Archives and
                online research of digital databases such as MyHeritage and
                FamilySearch to uncover names, dates, places, relationships,
                and historical connections that form part of your family
                history.
              </p>
            </div>
          </article>

          {/* ======================================
              CARD 2
          ====================================== */}

          <article
            className="
              flex
              h-full
              flex-col
              overflow-hidden
              rounded-3xl
              bg-[#FFF6E8]
              drop-shadow-md
            "
          >
            <img
              src="/Images/card-2.jpg"
              data-cursor-theme="light"
              alt="Historical family photographs used to create family tree charts"
              loading="lazy"
              decoding="async"
              className="
                mx-auto
                h-52
                w-full
                object-cover
                object-center
                sepia-[40%]

                sm:h-56

                md:h-52

                lg:h-56

                xl:h-56

                [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:h-48
              "
            />

            <div
              className="
                flex
                flex-1
                flex-col
                p-6
                text-center

                sm:p-7

                lg:p-8

                [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:p-6
              "
            >
              <h3
                className="
                  section-heading
                  pt-1
                  text-[1.55rem]
                  text-[#704214]

                  sm:text-[1.65rem]

                  lg:text-2xl
                "
              >
                We Create Family Tree Charts
              </h3>

              <p
                className="
                  mt-5
                  pb-1
                  section-body
                  text-[1.08rem]
                  leading-7

                  sm:text-[1.14rem]

                  lg:text-[1.19rem]

                  [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-4
                  [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:text-[1.05rem]
                  [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:leading-6
                "
              >
                We use professional genealogical software to create a visual
                representation of your family history, making it easier to
                understand how your ancestors connect to one another and how
                they relate to you, where they lived and died and other
                interesting details about them that perhaps you did not know or
                can now be confirmed.
              </p>
            </div>
          </article>

          {/* ======================================
              CARD 3
          ====================================== */}

          <article
            className="
              flex
              h-full
              flex-col
              overflow-hidden
              rounded-3xl
              bg-[#FFF6E8]
              drop-shadow-md

              md:col-span-2

              xl:col-span-1
            "
          >
            <img
              src="/Images/hero-bg-3.jpg"
              data-cursor-theme="light"
              alt="Family history materials preserved as part of a genealogy story"
              loading="lazy"
              decoding="async"
              className="
                mx-auto
                h-52
                w-full
                object-cover
                object-center
                sepia-[40%]

                sm:h-56

                md:h-60

                lg:h-64

                xl:h-56

                [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:h-52
              "
            />

            <div
              className="
                flex
                flex-1
                flex-col
                p-6
                text-center

                sm:p-7

                lg:p-8

                [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:p-6
              "
            >
              <h3
                className="
                  section-heading
                  pt-1
                  text-[1.55rem]
                  text-[#704214]

                  sm:text-[1.65rem]

                  lg:text-2xl
                "
              >
                We Preserve Family Stories
              </h3>

              <p
                className="
                  mt-5
                  pb-1
                  section-body
                  text-[1.08rem]
                  leading-7

                  sm:text-[1.14rem]

                  lg:text-[1.19rem]

                  [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-4
                  [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:text-[1.05rem]
                  [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:leading-6
                "
              >
                We believe genealogy is more than a family tree. It is about
                preserving the anecdotes, memories, and details that make your
                family history meaningful. We use a combination of a family
                tree chart, personalised family history book, digital stories
                and oral history to give a full perspective from the past to
                the present.
              </p>
            </div>
          </article>
        </ScrollReveal>
      </div>
    </section>
  );
}