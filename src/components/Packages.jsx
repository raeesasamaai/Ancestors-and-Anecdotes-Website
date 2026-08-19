import ScrollReveal from "./ScrollReveal";


/* =========================================================
   PACKAGE DATA
========================================================= */

const packages = [
  {
    id: "two-branch-trace",

    title: (
      <>
        Two Branch
        <br />
        Trace
      </>
    ),

    name: "Two Branch Trace",

    price: "R6 300",

    image:
      "/Images/package-1.png",

    imageAlt:
      "Two Branch Trace package illustration",

    features: [
      "2 surnames traced to the late 1700s/early 1800s*",
      "Traces ancestors in South Africa",
      "2 Family Tree Charts (1 for each surname)",
      "Personalised family tree book (digital)",
      "Digital copies of documents (census records, death notices etc.)",
      "Ready in 8 weeks",
    ],
  },

  {
    id: "life-story",

    title: (
      <>
        Life Story and
        <br />
        Oral History
      </>
    ),

    name:
      "Life Story and Oral History",

    price: "R9 000",

    image:
      "/Images/package-2.png",

    imageAlt:
      "Life Story and Oral History package illustration",

    features: [
      "Interview and recording of your relative’s life story or your own story",
      "4 - 6 in-person interviews (30-60 minutes each) (Cape Town only)",
      "Audio recordings of each interview",
      "Transcripts of each interview",
      "10 minute digital story (a slideshow of scanned photographs narrated with extracts from the interviews)",
      "Ready in 6 - 8 weeks",
    ],
  },

  {
    id: "grandparent-trace",

    title: (
      <>
        Grandparent
        <br />
        Trace
      </>
    ),

    name:
      "Grandparent Trace",

    price: "R10 500",

    image:
      "/Images/package-3.png",

    imageAlt:
      "Grandparent Trace package illustration",

    features: [
      "4 surnames to late 1700s/early 1800s*",
      "Traces ancestors in South Africa",
      "4 Family Tree Charts (1 for each surname)",
      "Personalised family tree book (digital)",
      "Digital copies of documents (census records, death notices etc.)",
      "Ready in 12 weeks",
    ],
  },

  {
    id: "comprehensive-trace",

    title: (
      <>
        Comprehensive
        <br />
        Ancestry Trace
      </>
    ),

    name:
      "Comprehensive Ancestry Trace",

    price: "R14 000",

    image:
      "/Images/package-4.png",

    imageAlt:
      "Comprehensive Ancestry Trace package illustration",

    features: [
      "16 great, great grandparents",
      "Traces ancestors in South Africa",
      "5+ Family Tree Charts (4 surnames + pedigree)",
      "Personalised family tree book",
      "Digital copies of documents (census records, death notices etc.)",
      "Ready in 16 weeks",
    ],
  },
];


/* =========================================================
   PACKAGE CARD
========================================================= */

function PackageCard({
  packageItem,
}) {
  return (
    <article
      className="
        flex
        h-full
        flex-col

        overflow-hidden

        rounded-[28px]

        bg-[#FFF6E8]

        p-6

        drop-shadow-md

        sm:rounded-3xl
        sm:p-7

        lg:p-8

        xl:p-6

        2xl:p-7

        [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:p-6
      "
    >
      {/* =================================================
          PACKAGE ICON
      ================================================= */}

      <img
        src={
          packageItem.image
        }
        data-cursor-theme="light"
        alt={
          packageItem.imageAlt
        }
        loading="lazy"
        decoding="async"
        className="
          mb-6
          mt-2

          h-[6.1rem]
          w-auto

          self-start

          object-contain

          sepia-[6%]

          sm:mb-7
          sm:h-[6rem]

          lg:h-[6.1rem]

          xl:h-[6.1rem]

          2xl:h-[6.1rem]

          [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mb-5

          [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:h-[3.8rem]
        "
      />


      {/* =================================================
          PACKAGE NAME
      ================================================= */}

      <h3
        className="
          section-heading

          text-[1.5rem]

          leading-[1.2]

          text-[#704214]

          sm:text-[1.6rem]

          md:min-h-[4rem]

          lg:text-[1.7rem]

          xl:min-h-[4.4rem]
          xl:text-[1.45rem]

          2xl:text-[1.55rem]

          [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:min-h-0

          [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:text-[1.4rem]
        "
      >
        {packageItem.title}
      </h3>


      {/* =================================================
          PRICE
      ================================================= */}

      <p
        className="
          section-heading

          pt-5

          text-[1.65rem]
          font-bold

          tracking-wider

          text-[#704214]

          sm:pt-6
          sm:text-[1.7rem]

          xl:pt-5
          xl:text-[1.55rem]

          2xl:text-[1.7rem]

          [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:pt-4

          [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:text-[1.5rem]
        "
      >
        {packageItem.price}
      </p>


      {/* =================================================
          PACKAGE FEATURES
      ================================================= */}

      <ul
        className="
          mb-8
          mt-7

          space-y-4

          sm:mb-9

          xl:mt-6
          xl:space-y-3.5

          2xl:space-y-4

          [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mb-7

          [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-5

          [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:space-y-3
        "
      >
        {packageItem.features.map(
          (feature) => (
            <li
              key={feature}
              className="
                flex
                items-start

                gap-3

                section-body

                text-[1.1rem]

                leading-[1.45]

                sm:gap-4
                sm:text-[1.09rem]
                sm:leading-7

                xl:gap-3
                xl:text-[1.12rem]
                xl:leading-[1.45]

                2xl:gap-4
                2xl:text-[1.06rem]

                [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:gap-3

                [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:text-[1rem]

                [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:leading-[1.4]
              "
            >
              {/* CHECK */}

              <span
                aria-hidden="true"
                className="
                  flex
                  shrink-0

                  items-center
                  justify-center

                  text-[1.25rem]
                  font-extrabold

                  leading-none

                  text-[#704214]

                  sm:text-[1.3rem]

                  [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:text-[1.15rem]
                "
              >
                ✓
              </span>


              {/* FEATURE TEXT */}

              <span
                className="
                  font-semibold
                "
              >
                {feature}
              </span>
            </li>
          ),
        )}
      </ul>


      {/* =================================================
          CTA

          mt-auto keeps all buttons aligned at the bottom
          whenever cards share the same grid-row height.
      ================================================= */}

      <a
        href="#contact-us"
        aria-label={`Get started with ${packageItem.name}`}
        className="
          mt-auto

          flex

          min-h-[48px]
          w-full

          items-center
          justify-center

          rounded-full

          bg-[#566735]

          px-5
          py-2.5

          text-center

          section-body

          text-[1.18rem]
          font-semibold

          text-white

          transition
          duration-300

          hover:bg-[#704214]

          focus:outline-none

          focus-visible:ring-2
          focus-visible:ring-[#704214]
          focus-visible:ring-offset-2
          focus-visible:ring-offset-[#FFF6E8]

          sm:min-h-[50px]
          sm:text-[1.3rem]

          xl:text-[1.15rem]

          2xl:text-[1.28rem]

          [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:min-h-[46px]

          [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:text-[1.1rem]
        "
      >
        Get Started
      </a>
    </article>
  );
}


/* =========================================================
   PACKAGES SECTION
========================================================= */

export default function Packages() {
  return (
    <section
      id="packages"
      className="
        min-h-screen

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
      <div
        className="
          mx-auto
          max-w-7xl
        "
      >
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
          Our Packages
        </ScrollReveal>


        {/* =================================================
            MAIN HEADING
        ================================================= */}

        <ScrollReveal
          as="h2"
          className="
            mt-8
            max-w-7xl

            section-heading

            [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-6
          "
        >
          Genealogy Packages Designed Around Your Family Story
        </ScrollReveal>


        {/* =================================================
            INTRODUCTION
        ================================================= */}

        <ScrollReveal
          as="p"
          className="
            mt-7
            max-w-5xl

            section-body

            [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-5
          "
        >
          Whether you are just beginning your ancestry journey or ready to
          preserve a more complete family history, our packages are designed to
          help you uncover, preserve, and honour the lives lived by your
          ancestors .
        </ScrollReveal>


        {/* =================================================
            RESEARCH DISCLAIMER
        ================================================= */}

        <ScrollReveal
          as="p"
          className="
            mt-6
            max-w-5xl

            section-body
            cursive
            italic

            [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-4
          "
        >
          *Genealogical tracing in South Africa depends heavily on historical
          record availability. We cannot guarantee a specific ancestral depth
          for every surname. Document destruction, systemic historical gaps, and
          changing naming traditions can limit research. We use all available
          archives but cannot guarantee connections prior to official
          documentation.
        </ScrollReveal>


        {/* =================================================
            PACKAGE GRID

            MOBILE:
            1 column

            TABLET / IPAD:
            2 columns

            LAPTOP 1024–1279:
            2 columns

            LAPTOP / DESKTOP 1280+:
            4 columns
        ================================================= */}

        <ScrollReveal
          as="div"
          className="
            mt-12

            grid
            grid-cols-1

            items-stretch

            gap-8

            md:grid-cols-2

            xl:grid-cols-4
            xl:gap-6

            2xl:gap-8

            [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-9

            [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:gap-6
          "
        >
          {packages.map(
            (packageItem) => (
              <PackageCard
                key={
                  packageItem.id
                }
                packageItem={
                  packageItem
                }
              />
            ),
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}