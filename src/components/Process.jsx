import ScrollReveal from "./ScrollReveal";
import ScrollRevealGroup from "./ScrollRevealGroup";

const processSteps = [
  {
    number: "1",
    titleLines: ["Select the package you want"],
    description:
      "Choose the package that suits your needs or commission a custom project. Pay a 50% deposit to secure your research slot and for work to begin.",
    image: "/Images/open-book.png",
    alt: "Family photographs, notes, and historical documents",
  },
  {
    number: "2",
    titleLines: ["Share What You Know"],
    description:
      "Complete the form we send you which captures the information you already have, such as names, dates, places, and family stories.",
    image: "/Images/book.png",
    alt: "An open historical record with a magnifying glass",
  },
  {
    number: "3",
    titleLines: ["Research Begins"],
    description:
      "We research your family by looking for available records such as birth certificates, parish register entries, marriage certificates, census records, and death notices, and update you weekly.",
    image: "/Images/book-stack.png",
    alt: "Historical books, archive boxes, and research documents",
  },
  {
    number: "4",
    titleLines: ["The write-up"],
    description:
      "The research is carefully written up into a personal family history document and family tree charts are put together so you can understand the connections and discoveries. We will send you drafts to check.",
    image: "/Images/book-file.png",
    alt: "Organized family history documents and archive folders",
  },
  {
    number: "5",
    titleLines: ["Your Family Story", "Is Shared"],
    description:
      "After paying the balance, you receive your personal family history document and family tree charts for you to enjoy and share with others.",
    image: "/Images/family-book.png",
    alt: "A completed family history story with a feather and ink",
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
        py-20
        text-[#1C1C1C]
        md:px-20
      "
    >
      <div className="mx-auto max-w-7xl">
        {/* Section name */}
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

        {/* Main heading */}
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
          "
        >
          How the Research Journey Works
        </ScrollReveal>

        {/* Introduction */}
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
          "
        >
          You do not need to have everything figured out before starting. 
          We begin with what you already know and guide the research from there.
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative mt-16 sm:mt-20">
          {/* Desktop horizontal line */}
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
              lg:block
            "
          />

          {/* Mobile vertical line */}
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
              lg:hidden
            "
          />

          {/* Animated timeline steps */}
          <ScrollRevealGroup
            y={45}
            duration={0.8}
            stagger={0.16}
            start="top 82%"
            className="
              relative
              z-10
              grid
              gap-y-16
              lg:grid-cols-5
              lg:gap-x-9
              lg:gap-y-0
            "
          >
            {processSteps.map((step) => (
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
                  lg:block
                "
              >
                {/* Number circle */}
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
                  "
                >
                  {step.number}
                </div>

                {/* Step content */}
                <div
                  className="
                    col-start-2
                    row-start-1
                    min-w-0
                    text-left
                    lg:col-auto
                    lg:row-auto
                    lg:mt-8
                  "
                >
                  {/* Image wrapper */}
                  <div
                    className="
                      flex
                      h-[95px]
                      w-[155px]
                      items-center
                      justify-start
                      sm:h-[130px]
                      sm:w-[170px]
                      lg:h-[100px]
                      xl:h-[100px]
                    "
                  >
                    <img
                      src={step.image}
                      alt={step.alt}
                      loading="lazy"
                      className="
                        max-h-full
                        max-w-full
                        object-contain
                        object-left
                      "
                    />
                  </div>

                  {/* Step heading */}
                  <h3
                    className="
                       mt-4
    font-['Book_Antiqua','Palatino_Linotype',Palatino,serif]
    text-[1.4rem]
    font-normal
    leading-[1.15]
    text-[#704214]
    sm:text-[1.5rem]
    lg:text-[1.3rem]
    xl:text-[1.45rem]
                    "
                  >
                    {step.titleLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>

                  {/* Step description */}
                  <p
                    className="
                      mt-3
                      max-w-[230px]
                      section-body
                      text-[1.05rem]
                      leading-[1.3]
                      text-[#1C1C1C]
                      sm:text-[1.12rem]
                      lg:text-[1rem]
                      xl:text-[1.1rem]
                    "
                  >
                    {step.description}
                  </p>
                </div>
              </article>
            ))}
          </ScrollRevealGroup>
        </div>
      </div>
    </section>
  );
}