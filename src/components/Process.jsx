import ScrollReveal from "./ScrollReveal";
import ScrollRevealGroup from "./ScrollRevealGroup";


const processSteps = [
  {
    number: "1",

    titleLines: [
      "Select the package you want",
    ],

    description:
      "Choose the package that suits your needs or commission a custom project. Pay a 50% deposit to secure your research slot and for work to begin.",

    image:
      "/Images/step-1.png",

    alt:
      "Family photographs, notes, and historical documents",
  },

  {
    number: "2",

    titleLines: [
      "Share What You Know",
    ],

    description:
      "Complete the form we send you which captures the information you already have, such as names, dates, places, and family stories.",

    image:
      "/Images/step-2.png",

    alt:
      "An open historical record with a magnifying glass",
  },

  {
    number: "3",

    titleLines: [
      "Research Begins",
    ],

    description:
      "We research your family by looking for available records such as birth certificates, parish register entries, marriage certificates, census records, and death notices, and update you weekly.",

    image:
      "/Images/step-3.png",

    alt:
      "Historical books, archive boxes, and research documents",
  },

  {
    number: "4",

    titleLines: [
      "The write-up",
    ],

    description:
      "The research is carefully written up into a personal family history document and family tree charts are put together so you can understand the connections and discoveries. We will send you drafts to check.",

    image:
      "/Images/step-4.png",

    alt:
      "Organized family history documents and archive folders",
  },

  {
    number: "5",

    titleLines: [
      "Your Family Story Is Shared",
    ],

    description:
      "After paying the balance, you receive your personal family history document and family tree charts for you to enjoy and share with others.",

    image:
      "/Images/step-5.png",

    alt:
      "A completed family history story with a feather and ink",
  },
];


export default function Process() {
  return (
    <section
      id="process"
      data-cursor-theme="dark"
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
          y={45}
          duration={0.8}
          start="top 88%"
          className="
            mb-2

            section-name

            [-webkit-text-stroke:0.45px_currentColor]
          "
        >
          Our Process
        </ScrollReveal>


        {/* =================================================
            MAIN HEADING
        ================================================= */}

        <ScrollReveal
          as="h2"
          y={45}
          duration={0.8}
          delay={0.1}
          start="top 88%"
          className="
            mt-8

            max-w-5xl

            section-heading

            [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-6
          "
        >
          How the Research Journey Works
        </ScrollReveal>


        {/* =================================================
            INTRODUCTION
        ================================================= */}

        <ScrollReveal
          as="p"
          y={45}
          duration={0.8}
          delay={0.2}
          start="top 88%"
          className="
            mt-7

            max-w-4xl

            section-body

            [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-5
          "
        >
          You do not need to have everything figured out before starting. We
          begin with what you already know and guide the research from there.
        </ScrollReveal>


        {/* =================================================
            TIMELINE
        ================================================= */}

        <div
          className="
            relative

            mt-14

            sm:mt-16

            md:mt-18

            xl:mt-20

            [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-10
          "
        >
          {/* =================================================
              DESKTOP HORIZONTAL LINE

              Only starts at 1280px.

              This prevents the five-column timeline from
              becoming cramped on tablets and small laptops.
          ================================================= */}

          <div
            aria-hidden="true"
            className="
              absolute

              left-6
              right-0
              top-6

              hidden

              h-px

              bg-[#704214]/60

              xl:block
            "
          />


          {/* =================================================
              MOBILE / TABLET / SMALL LAPTOP VERTICAL LINE
          ================================================= */}

          <div
            aria-hidden="true"
            className="
              absolute

              bottom-6
              left-6
              top-6

              w-px

              -translate-x-1/2

              bg-[#704214]/45

              xl:hidden
            "
          />


          {/* =================================================
              ANIMATED STEPS

              Mobile / tablet / small laptop:
              vertical

              1280px+:
              five-column horizontal timeline
          ================================================= */}

          <ScrollRevealGroup
            y={45}
            duration={0.8}
            stagger={0.16}
            start="top 82%"
            className="
              relative
              z-10

              grid

              gap-y-14

              sm:gap-y-16

              xl:grid-cols-5
              xl:gap-x-8
              xl:gap-y-0

              2xl:gap-x-9

              [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:gap-y-10
            "
          >
            {processSteps.map(
              (step) => (
                <article
                  key={step.number}
                  data-reveal-item
                  className="
                    relative

                    grid

                    grid-cols-[48px_minmax(0,1fr)]

                    items-start

                    gap-x-5

                    text-left

                    will-change-[opacity,transform]

                    sm:gap-x-6

                    xl:block
                  "
                >
                  {/* =========================================
                      NUMBER
                  ========================================= */}

                  <div
                    className="
                      relative
                      z-20

                      col-start-1
                      row-start-1

                      flex

                      h-12
                      w-12

                      items-center
                      justify-center

                      rounded-full

                      bg-[#704214]

                      font-['Book_Antiqua','Palatino_Linotype',Palatino,serif]

                      text-[1.5rem]
                      font-normal
                      leading-none

                      text-[#FFF6E8]

                      [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:h-11

                      [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:w-11

                      [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:text-[1.35rem]
                    "
                  >
                    {step.number}
                  </div>


                  {/* =========================================
                      STEP CONTENT

                      Phone:
                      Image above heading/text.

                      Tablet/iPad:
                      Image on the left, text on the right.

                      Desktop 1280px+:
                      Returns to the original vertical card
                      arrangement beneath the number.
                  ========================================= */}

                  <div
                    className="
                      col-start-2
                      row-start-1

                      min-w-0

                      text-left

                      md:grid
                      md:grid-cols-[180px_minmax(0,1fr)]
                      md:grid-rows-[auto_auto]
                      md:gap-x-8

                      lg:grid-cols-[200px_minmax(0,1fr)]
                      lg:gap-x-10

                      xl:col-auto
                      xl:row-auto
                      xl:mt-8
                      xl:block
                    "
                  >
                    {/* =====================================
                        IMAGE
                    ===================================== */}

                    <div
                      className="
                        flex

                        h-[95px]
                        w-[145px]

                        items-center
                        justify-start

                        sm:h-[120px]
                        sm:w-[170px]

                        md:col-start-1
                        md:row-span-2
                        md:row-start-1

                        md:h-[135px]
                        md:w-[180px]

                        lg:h-[145px]
                        lg:w-[200px]

                        xl:h-[100px]
                        xl:w-[155px]

                        2xl:w-[170px]

                        [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:h-[85px]

                        [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:w-[135px]
                      "
                    >
                      <img
                        src={step.image}
                        alt={step.alt}
                        loading="lazy"
                        decoding="async"
                        className="
                          max-h-full
                          max-w-full

                          object-contain
                          object-left
                        "
                      />
                    </div>


                    {/* =====================================
                        STEP HEADING
                    ===================================== */}

                    <h3
                      className="
                        mt-6

                        font-['Book_Antiqua','Palatino_Linotype',Palatino,serif]

                        text-[1.4rem]
                        font-normal

                        leading-[1.15]

                        text-[#704214]

                        sm:text-[1.5rem]

                        md:col-start-2
                        md:row-start-1
                        md:mt-1

                        md:text-[1.55rem]

                        lg:text-[1.6rem]

                        xl:mt-6
                        xl:text-[1.3rem]

                        2xl:text-[1.45rem]

                        [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:text-[1.3rem]
                      "
                    >
                      {step.titleLines.map(
                        (line) => (
                          <span
                            key={line}
                            className="block"
                          >
                            {line}
                          </span>
                        ),
                      )}
                    </h3>


                    {/* =====================================
                        STEP DESCRIPTION
                    ===================================== */}

                    <p
                      className="
                        mt-3

                        md:mt-0

                        xl:mt-4

                        max-w-[32rem]

                        section-body

                        text-[1.1rem]

                        leading-[1.35]

                        text-[#1C1C1C]

                        sm:text-[1.12rem]

                        md:col-start-2
                        md:row-start-2

                        md:max-w-[38rem]

                        md:text-[1.12rem]
                        md:leading-[1.45]

                        lg:max-w-[44rem]

                        lg:text-[1.15rem]

                        xl:col-auto
                        xl:row-auto

                        xl:max-w-[230px]

                        xl:text-[1.12rem]
                        xl:leading-[1.35]

                        2xl:text-[1.1rem]

                        [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-2

                        [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:text-[1rem]

                        [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:leading-[1.35]
                      "
                    >
                      {step.description}
                    </p>
                  </div>
                </article>
              ),
            )}
          </ScrollRevealGroup>
        </div>
      </div>
    </section>
  );
}