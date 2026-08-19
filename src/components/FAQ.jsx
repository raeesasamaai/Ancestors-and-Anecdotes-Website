import { useState } from "react";
import ScrollReveal from "./ScrollReveal";


const faqItems = [
  {
    question: "What information do I need to start?",
    answer:
      "We will send you a short form to complete where you can fill in the information you already have. This may include names, dates, places, and family stories.",
  },
  {
    question: "How long does genealogy research take?",
    answer:
      "The timeframe depends on the package, the size and complexity of the family line, and the availability of relevant records. Typically our research projects take 6 - 8 weeks, and the bigger projects take 12 - 16 weeks.",
  },
  {
    question: "Can you guarantee that records will be found?",
    answer:
      "No. Historical records may be missing, damaged, restricted, incorrectly recorded, or unavailable online. We cannot promise a particular discovery, but we will follow the strongest available leads and explain clearly what was found, what could not be confirmed, and what may still be worth exploring.",
  },
  {
    question: "What will I receive after the research?",
    answer:
      "The family research packages all include family tree charts and a written family history document; the oral history and digital story package includes audio recordings and transcripts of the oral history interviews and a digital story.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Yes, we welcome genealogy enquiries from anywhere in the world to help you discover your roots. Since South Africa is a historic melting pot, many families have ancestors who arrived generations ago from countries like the UK, Europe, or the Americas. We will update you on the specific records we have managed to access.",
  },
  {
    question: "Is my family information kept private?",
    answer:
      "Yes. Family information, documents, photographs, and personal stories are treated with care and confidentiality. We will not share client details or use family material publicly without clear permission.",
  },
  {
    question: "Why does genealogy matter?",
    answer:
      "Genealogy helps people understand where they come from, preserve memories before they are lost, and connect present-day families with earlier generations. It gives names, records, photographs, and stories a meaningful place within the wider family journey.",
  },
];


export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);


  const handleToggle = (index) => {
    setOpenIndex((currentIndex) =>
      currentIndex === index ? null : index,
    );
  };


  return (
    <section
      id="faq"
      data-cursor-theme="dark"
      className="
        min-h-screen

        bg-[#F5E6CC]

        px-6
        py-16

        text-[#1C1C1C]

        sm:px-8
        sm:py-20

        md:px-8
        md:py-20

        lg:px-12

        xl:px-20

        [@media(max-width:767px)_and_(orientation:landscape)_and_(max-height:600px)]:px-8
        [@media(max-width:767px)_and_(orientation:landscape)_and_(max-height:600px)]:py-14
      "
    >
      <div className="mx-auto max-w-7xl">
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
            WebkitTextStroke: "0.45px currentColor",
          }}
        >
          Frequently Asked Questions
        </ScrollReveal>


        {/* =================================================
            MAIN HEADING
        ================================================= */}

        <ScrollReveal
          as="h2"
          className="
            mt-8

            max-w-[980px]

            section-heading

            [@media(max-width:767px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-6
          "
        >
          Answers to Common Questions About Family History Research
        </ScrollReveal>


        {/* =================================================
            INTRODUCTION
        ================================================= */}

        <ScrollReveal
          as="p"
          className="
            mt-7

            max-w-[900px]

            section-body

            [@media(max-width:767px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-5
          "
        >
          If you are new to genealogy research, it is completely normal to have
          questions. Here are a few of the most common things people ask before
          getting started.
        </ScrollReveal>


        {/* =================================================
            FAQ CONTENT

            PHONE:
            stacked

            TABLET / IPAD:
            image left + FAQs right

            LAPTOP / DESKTOP:
            same exact structure

            Both columns stretch to equal height.
        ================================================= */}

        <div
          className="
            mt-12

            grid
            grid-cols-1

            items-stretch

            gap-10

            sm:mt-14

            md:grid-cols-[minmax(230px,0.78fr)_minmax(0,1.22fr)]
            md:gap-8

            lg:grid-cols-[minmax(300px,0.82fr)_minmax(0,1.08fr)]
            lg:gap-12

            xl:mt-12
            xl:grid-cols-[460px_minmax(0,1fr)]
            xl:gap-16

            [@media(max-width:767px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-9
          "
        >
          {/* =================================================
              LEFT IMAGE
          ================================================= */}

          <ScrollReveal
            as="div"
            className="
              relative

              mx-auto
              w-full

              max-w-[430px]

              overflow-hidden

              md:mx-0
              md:h-full
              md:max-w-none
              md:self-stretch
            "
          >
            <div
              className="
                aspect-[4/5]

                w-full

                overflow-hidden

                bg-[#E7D3AE]

                sm:aspect-[3/4]

                md:h-full
                md:min-h-full
                md:aspect-auto

                [@media(max-width:767px)_and_(orientation:landscape)_and_(max-height:600px)]:aspect-[16/7]
              "
            >
              <img
                data-cursor-theme="light"
                src="/Images/genealogy-matters-1.jpg"
                alt="Historical family photographs, handwritten records, and archived documents"
                loading="lazy"
                decoding="async"
                className="
                  h-full
                  w-full

                  object-cover
                  object-center

                  sepia-[12%]
                "
              />
            </div>
          </ScrollReveal>


          {/* =================================================
              FAQ ACCORDION
          ================================================= */}

          <ScrollReveal
            as="div"
            className="
              flex
              h-full
              min-w-0
              w-full

              flex-col
            "
          >
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;

              const answerId =
                `faq-answer-${index}`;

              const buttonId =
                `faq-button-${index}`;


              return (
                <article
                  key={item.question}
                  className="
                    border-b
                    border-[#704214]/35
                  "
                >
                  {/* =========================================
                      QUESTION
                  ========================================= */}

                  <button
                    id={buttonId}
                    type="button"
                    onClick={() => handleToggle(index)}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    className="
                      group

                      flex
                      w-full

                      items-start
                      justify-between

                      gap-4

                      py-5

                      text-left

                      focus:outline-none

                      focus-visible:ring-2
                      focus-visible:ring-[#704214]
                      focus-visible:ring-offset-4
                      focus-visible:ring-offset-[#F5E6CC]

                      sm:gap-5

                      md:gap-4
                      md:py-4

                      lg:gap-5
                      lg:py-5

                      xl:gap-6
                      xl:py-6

                      [@media(max-width:767px)_and_(orientation:landscape)_and_(max-height:600px)]:py-4
                    "
                  >
                    {/* QUESTION TEXT */}

                    <span
                      className="
                        min-w-0
                        max-w-[720px]

                        section-body

                        text-[1.15rem]
                        font-bold

                        leading-[1.25]

                        text-[#704214]

                        transition-colors
                        duration-300

                        group-hover:text-[#9C645E]

                        sm:text-[1.28rem]

                        md:text-[1.08rem]
                        md:leading-[1.2]

                        lg:text-[1.25rem]

                        xl:text-[1.55rem]
                      "
                    >
                      {item.question}
                    </span>


                    {/* =====================================
                        PLUS / MINUS
                    ===================================== */}

                    <span
                      aria-hidden="true"
                      className={`
                        mt-[-2px]

                        flex

                        h-8
                        w-8

                        shrink-0

                        items-center
                        justify-center

                        rounded-full

                        transition-all
                        duration-300

                        md:h-7
                        md:w-7

                        lg:h-8
                        lg:w-8

                        xl:h-9
                        xl:w-9

                        ${
                          isOpen
                            ? "rotate-0 bg-[#704214] text-[#FFF6E8]"
                            : "bg-[#566735] text-[#FFF6E8] group-hover:bg-[#704214]"
                        }
                      `}
                    >
                      <span
                        className="
                          relative

                          block

                          h-3.5
                          w-3.5

                          xl:h-4
                          xl:w-4
                        "
                      >
                        {/* Horizontal line */}

                        <span
                          className="
                            absolute
                            left-1/2
                            top-1/2

                            h-[2px]
                            w-full

                            -translate-x-1/2
                            -translate-y-1/2

                            rounded-full

                            bg-current
                          "
                        />


                        {/* Vertical line */}

                        <span
                          className={`
                            absolute
                            left-1/2
                            top-1/2

                            h-full
                            w-[2px]

                            -translate-x-1/2
                            -translate-y-1/2

                            rounded-full

                            bg-current

                            transition-all
                            duration-300

                            ${
                              isOpen
                                ? "rotate-90 opacity-0"
                                : "rotate-0 opacity-100"
                            }
                          `}
                        />
                      </span>
                    </span>
                  </button>


                  {/* =========================================
                      ANSWER
                  ========================================= */}

                  <div
                    id={answerId}
                    role="region"
                    aria-labelledby={buttonId}
                    aria-hidden={!isOpen}
                    className={`
                      grid

                      transition-[grid-template-rows,opacity]
                      duration-500

                      ease-[cubic-bezier(0.22,1,0.36,1)]

                      ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }
                    `}
                  >
                    <div className="overflow-hidden">
                      <p
                        className="
                          max-w-[700px]

                          pb-6

                          pr-0

                          section-body

                          text-[1.03rem]

                          leading-[1.45]

                          text-[#1C1C1C]

                          sm:text-[1.1rem]

                          md:pb-5
                          md:pr-4
                          md:text-[0.92rem]
                          md:leading-[1.4]

                          lg:pb-6
                          lg:pr-8
                          lg:text-[1.05rem]
                          lg:leading-[1.45]

                          xl:pb-7
                          xl:pr-16
                          xl:text-[1.3rem]
                        "
                      >
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}