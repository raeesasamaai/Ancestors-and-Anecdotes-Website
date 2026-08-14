import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ScrollReveal from "./ScrollReveal";

const exampleDetails = [
  {
    id: "family-tree",
    modalTitle: "Family Tree Charts",
    subtitle:
      "Turning names, dates, and relationships into a clear family structure",
    description:
      "A family tree chart helps bring your ancestry into focus by organising family members, relationships, and generations in a visual format.",
    features: [
      "Family members organised across generations",
      "Clear parent, child, and sibling relationships",
      "Visual structure of family branches",
      "Important names, dates, and family connections",
      "A clean layout suitable for sharing or printing",
    ],
    bestFor:
      "This is best for individuals and families who want a clear overview of their family connections and a visual record of their ancestry.",
    cta: "I Want to Build My Family Tree",
    media: [
      {
        type: "image",
        src: "/Images/family-tree.png",
        alt: "Visual family tree example",
        fit: "cover",
      },
    ],
  },
  {
    id: "family-history",
    modalTitle: "Family History Document",
    subtitle:
      "Turning research findings into a meaningful written record of your family's story",
    description:
      "A family history document brings together names, dates, locations, records, photographs, and family memories in a clear, story-led format. It gives the research greater context and creates a lasting record that can be read, printed, and shared with relatives.",
    features: [
      "A structured written account of family history findings",
      "Profiles of important ancestors and family branches",
      "Historical context around significant people, places, and events",
      "Organised timelines, photographs, records, and supporting notes",
      "A polished document suitable for reading, printing, and sharing",
    ],
    bestFor:
      "This is best for families who want their research preserved as a meaningful written keepsake that can be read, printed, and passed down to future generations.",
    cta: "I Want to Preserve My Family Story",
    media: [
      {
        type: "image",
        src: "/Images/family-history.png",
        alt: "Family history document example",
        fit: "cover",
      },
    ],
  },
  {
    id: "research-video",
    modalTitle: "Oral History & Digital Story",
    subtitle: "Sharing your story through an engaging visual story",
    description:
      "Oral history is the audio recording of a person's personal account of their lives or a historical event. A digital story takes this a step further by creating a short film (5 - 10 minutes) using photographs supplied by the client, narrated using extracts from the recordings.",
    features: [
      "Personal oral history interview",
      "5-10 minute narrated digital story",
      "Client photographs woven into the final film",
    ],
    bestFor:
      "This is best for families who want to experience and share their findings in a more visual, emotional, and accessible format.",
    cta: "I Want an Oral history & Digital story",
    media: [
      {
        type: "image",
        src: "/Images/family-video.png",
        alt: "Research findings video example",
        fit: "cover",
      },
    ],
  },
];

const exampleCards = [
  {
    example: exampleDetails[0],
    imageSrc: "/Images/family-tree.png",
    imageAlt: "Visual Family Tree",
    imageClassName: "sepia-[8%]",
    title: (
      <>
        Family Tree
        <br />
        Charts
      </>
    ),
  },
  {
    example: exampleDetails[1],
    imageSrc: "/Images/family-history.png",
    imageAlt: "Family History Document",
    imageClassName: "sepia-[25%]",
    title: (
      <>
        Family History
        <br />
        Document
      </>
    ),
  },
  {
    example: exampleDetails[2],
    imageSrc: "/Images/family-video.png",
    imageAlt: "Research Findings Video",
    imageClassName: "sepia-[25%]",
    title: (
      <>
        Oral History &
        <br />
        Digital Story
      </>
    ),
  },
];

function ExampleModal({
  example,
  onClose,
  isCompactLayout = false,
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const onCloseRef = useRef(onClose);
  const previousExampleIdRef = useRef(example?.id);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const media = example?.media ?? [];
  const totalSlides = media.length;
  const activeMedia = media[currentSlide];

  const showPrevious = () => {
    if (totalSlides <= 1) return;

    setCurrentSlide((current) =>
      current === 0 ? totalSlides - 1 : current - 1
    );
  };

  const showNext = () => {
    if (totalSlides <= 1) return;

    setCurrentSlide((current) =>
      current === totalSlides - 1 ? 0 : current + 1
    );
  };

  const handleGoToPackages = () => {
    onClose();

    window.setTimeout(() => {
      const packagesSection = document.getElementById("packages");

      packagesSection?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 450);
  };

  useEffect(() => {
    if (previousExampleIdRef.current === example?.id) {
      return undefined;
    }

    previousExampleIdRef.current = example?.id;

    const resetTimer = window.setTimeout(() => {
      setCurrentSlide(0);
    }, 0);

    return () => window.clearTimeout(resetTimer);
  }, [example?.id]);

  useLayoutEffect(() => {
    if (!example) return undefined;

    const html = document.documentElement;
    const body = document.body;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    const previous = {
      htmlOverflow: html.style.overflow,
      htmlOverscroll: html.style.overscrollBehavior,
      htmlScrollBehavior: html.style.scrollBehavior,
      bodyOverflow: body.style.overflow,
      bodyOverscroll: body.style.overscrollBehavior,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyWidth: body.style.width,
      bodyPaddingRight: body.style.paddingRight,
    };

    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";

    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = `-${scrollX}px`;
    body.style.right = "0";
    body.style.width = "100%";

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      html.style.scrollBehavior = "auto";

      html.style.overflow = previous.htmlOverflow;
      html.style.overscrollBehavior = previous.htmlOverscroll;

      body.style.overflow = previous.bodyOverflow;
      body.style.overscrollBehavior = previous.bodyOverscroll;
      body.style.position = previous.bodyPosition;
      body.style.top = previous.bodyTop;
      body.style.left = previous.bodyLeft;
      body.style.right = previous.bodyRight;
      body.style.width = previous.bodyWidth;
      body.style.paddingRight = previous.bodyPaddingRight;

      window.scrollTo({
        left: scrollX,
        top: scrollY,
        behavior: "auto",
      });

      requestAnimationFrame(() => {
        html.style.scrollBehavior = previous.htmlScrollBehavior;
      });
    };
  }, [example]);

  useEffect(() => {
    if (!example) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onCloseRef.current?.();
        return;
      }

      if (totalSlides <= 1) return;

      if (event.key === "ArrowLeft") {
        setCurrentSlide((current) =>
          current === 0 ? totalSlides - 1 : current - 1
        );
      }

      if (event.key === "ArrowRight") {
        setCurrentSlide((current) =>
          current === totalSlides - 1 ? 0 : current + 1
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [example, totalSlides]);

  useEffect(() => {
    if (!example || totalSlides <= 1 || activeMedia?.type === "video") {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setCurrentSlide((current) =>
        current === totalSlides - 1 ? 0 : current + 1
      );
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [example, currentSlide, totalSlides, activeMedia?.type]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {example && (
        <motion.div
          data-cursor-theme="light"
          className="
            fixed inset-0 z-[9000]
            flex items-center justify-center
            overflow-hidden overscroll-none
            bg-[radial-gradient(circle_at_top,rgba(156,100,94,0.30),rgba(28,28,28,0.84)_50%,rgba(12,8,5,0.96)_100%)]
            px-3 py-5
            backdrop-blur-md
            sm:px-6 sm:py-8
          "
          initial={
            isCompactLayout
              ? false
              : { opacity: 0 }
          }
          animate={{ opacity: 1 }}
          exit={
            isCompactLayout
              ? { opacity: 1 }
              : { opacity: 0 }
          }
          transition={{
            duration: isCompactLayout ? 0 : 0.3,
          }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onCloseRef.current?.();
            }
          }}
          onWheel={(event) => {
            if (event.target === event.currentTarget) {
              event.preventDefault();
            }
          }}
          onTouchMove={(event) => {
            if (event.target === event.currentTarget) {
              event.preventDefault();
            }
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`example-title-${example.id}`}
            data-cursor-theme="dark"
            className="
              relative my-auto
              max-h-[calc(100dvh-2rem)]
              w-full max-w-[980px]
              overflow-hidden
              rounded-[28px]
              bg-[#F5E6CC]
              text-[#1C1C1C]
              shadow-[0_30px_100px_rgba(0,0,0,0.55)]
              sm:rounded-[38px]
              md:max-h-[calc(100dvh-4rem)]
              lg:rounded-[48px]
            "
            initial={
              isCompactLayout
                ? false
                : {
                    opacity: 0,
                    y: 45,
                    scale: 0.96,
                  }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              isCompactLayout
                ? {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }
                : {
                    opacity: 0,
                    y: 35,
                    scale: 0.97,
                  }
            }
            transition={{
              duration: isCompactLayout ? 0 : 0.42,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <button
              type="button"
              onClick={() => onCloseRef.current?.()}
              aria-label="Close example"
              data-cursor="Close"
              className="
                absolute right-4 top-4 z-40
                group grid h-11 w-11 place-items-center
                rounded-full p-0
                bg-[#F5E6CC]/95
                text-[#704214]
                shadow-md backdrop-blur-md
                transition duration-300
                hover:bg-white
                focus:outline-none focus:ring-2
                focus:ring-[#704214]
                sm:right-6 sm:top-6
              "
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.25"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </svg>
            </button>

            <div
              className="
                max-h-[calc(100dvh-2rem)]
                overflow-y-auto overscroll-contain touch-pan-y
                [scrollbar-width:none]
                [-ms-overflow-style:none]
                [&::-webkit-scrollbar]:hidden
                md:max-h-[calc(100dvh-4rem)]
              "
            >
              <div className="p-4 pb-0 sm:p-7 sm:pb-0 lg:p-12 lg:pb-0">
                <div
                  className="
                    relative aspect-[16/10]
                    overflow-hidden
                    rounded-[20px]
                    bg-[#1C1C1C]
                    sm:rounded-[28px]
                    lg:rounded-[34px]
                  "
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${example.id}-${currentSlide}`}
                      className="absolute inset-0"
                      initial={{ opacity: 0, x: 35, scale: 1.02 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -35, scale: 0.99 }}
                      transition={{
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {activeMedia?.type === "video" ? (
                        <video
                          src={activeMedia.src}
                          poster={activeMedia.poster}
                          controls
                          playsInline
                          preload="metadata"
                          aria-label={activeMedia.alt}
                          className="h-full w-full bg-black object-cover object-center"
                        />
                      ) : (
                        <img
                          src={activeMedia?.src}
                          alt={activeMedia?.alt ?? ""}
                          className="h-full w-full scale-[1.01] object-cover object-center"
                          style={{
                            objectPosition: activeMedia?.position ?? "center",
                          }}
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {activeMedia?.type !== "video" && (
                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none absolute inset-0
                        bg-gradient-to-t
                        from-[#422508]/25
                        via-transparent
                        to-[#F5E6CC]/10
                        mix-blend-multiply
                      "
                    />
                  )}

                  {totalSlides > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={showPrevious}
                        aria-label="Show previous media"
                        className="
                          absolute left-3 top-1/2 z-20
                          flex h-10 w-10 -translate-y-1/2
                          items-center justify-center rounded-full
                          bg-[#1C1C1C]/55 text-[24px] text-white
                          backdrop-blur-md transition
                          hover:bg-[#704214]
                          focus:outline-none focus:ring-2
                          focus:ring-white
                          sm:left-5 sm:h-12 sm:w-12
                        "
                      >
                        {"<"}
                      </button>

                      <button
                        type="button"
                        onClick={showNext}
                        aria-label="Show next media"
                        className="
                          absolute right-3 top-1/2 z-20
                          flex h-10 w-10 -translate-y-1/2
                          items-center justify-center rounded-full
                          bg-[#1C1C1C]/55 text-[24px] text-white
                          backdrop-blur-md transition
                          hover:bg-[#704214]
                          focus:outline-none focus:ring-2
                          focus:ring-white
                          sm:right-5 sm:h-12 sm:w-12
                        "
                      >
                        {">"}
                      </button>

                      <div
                        className="
                          absolute bottom-3 right-3 z-20
                          rounded-full bg-black/55
                          px-3 py-1
                          font-body text-[14px] text-white
                          backdrop-blur-md
                          sm:bottom-5 sm:right-5
                        "
                      >
                        {currentSlide + 1} / {totalSlides}
                      </div>
                    </>
                  )}
                </div>

                {totalSlides > 1 && (
                  <div className="mt-4 flex items-center justify-center gap-2">
                    {media.map((slide, index) => (
                      <button
                        key={`${slide.src}-${index}`}
                        type="button"
                        onClick={() => setCurrentSlide(index)}
                        aria-label={`Show slide ${index + 1}`}
                        className={`
                          h-2.5 rounded-full
                          transition-all duration-300
                          focus:outline-none focus:ring-2
                          focus:ring-[#704214]
                          ${
                            currentSlide === index
                              ? "w-9 bg-[#704214]"
                              : "w-2.5 bg-[#704214]/30 hover:bg-[#704214]/60"
                          }
                        `}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="px-5 pb-6 pt-9 sm:px-10 sm:pb-10 lg:px-14 lg:pb-14 lg:pt-11">
                <div>
                  <h2
                    id={`example-title-${example.id}`}
                    className="section-heading text-[2rem] sm:text-[2.35rem] lg:text-[2.7rem]"
                  >
                    {example.modalTitle}
                  </h2>

                  <span className="mt-3 block h-[3px] w-[58px] bg-[#704214]" />
                </div>

                <p className="mt-8 section-body text-[1.35rem] font-bold italic text-[#704214]">
                  {example.subtitle}
                </p>

                <p className="mt-7 section-body leading-[1.6]">
                  {example.description}
                </p>

                <div className="mt-9">
                  <ul className="mt-5 space-y-4">
                    {example.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-4 section-body"
                      >
                        <span
                          aria-hidden="true"
                          className="
                            mt-1 flex h-7 w-7 shrink-0
                            items-center justify-center
                            rounded-full bg-[#704214]
                            text-[14px] text-[#F5E6CC]
                          "
                        >
                          ✓
                        </span>

                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={handleGoToPackages}
                  className="
                    mt-10 flex min-h-[58px] w-full
                    items-center justify-center
                    rounded-[18px]
                    bg-[#566735]
                    px-5 py-3
                    text-center
                    section-body
                    text-[20px]
                    font-semibold
                    text-[#F5E6CC]
                    transition duration-300
                    hover:bg-[#704214]
                    focus:outline-none
                    focus:ring-2
                    focus:ring-[#ffffff]
                    focus:ring-offset-2
                    sm:text-[24px]
                  "
                >
                  View Our Packages
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default function Examples() {
  const [selectedExample, setSelectedExample] = useState(null);
  const [isCompactLayout, setIsCompactLayout] =
    useState(() => {
      if (typeof window === "undefined") {
        return false;
      }

      return window.matchMedia(
        "(max-width: 1279px), (hover: none) and (pointer: coarse)"
      ).matches;
    });

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(max-width: 1279px), (hover: none) and (pointer: coarse)"
    );

    const handleChange = (event) => {
      setIsCompactLayout(
        event.matches
      );
    };

    setIsCompactLayout(
      mediaQuery.matches
    );

    mediaQuery.addEventListener(
      "change",
      handleChange
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleChange
      );
    };
  }, []);

  return (
    <>
      <section
        id="examples"
        className="min-h-screen bg-[#F5E6CC] px-6 py-20 text-[#1C1C1C] md:px-20"
      >
        <div className="mx-auto max-w-7xl">
          <ScrollReveal
            as="p"
            className="mb-2 section-name "
            style={{
              WebkitTextStroke: "0.45px currentColor",
            }}
          >
            Examples of Our Client Work
          </ScrollReveal>

          <ScrollReveal as="h2" className="mt-8 max-w-5xl section-heading">
            A Glimpse Into Preserved Family Stories
          </ScrollReveal>

          <ScrollReveal as="p" className="mt-7 max-w-5xl section-body">
            Every family history project is unique. Some clients want to understand where they come from
            and want to trace a particular family line generations back and see this depicted in family
            tree charts and written up family histories, and others want a living relative's life story
            captured by means of oral history interviews. Below are examples of the types of work that
            can be created through our genealogy research process.
          </ScrollReveal>

          <ScrollReveal as="p" className="mt-6 max-w-4xl section-body cursive italic">
            All examples shown here are sample or anonymised representations of client work.
          </ScrollReveal>

          <ScrollReveal as="div" className="mt-12 grid gap-8 md:grid-cols-3">
            {exampleCards.map((card) => (
              <div
                key={card.example.id}
                className={`
                  relative
                  h-[300px]
                  overflow-hidden
                  rounded-[34px]
                  bg-[#FFF6E8]
                  shadow-[0_14px_35px_rgba(112,66,20,0.18)]
                  group
                  ${isCompactLayout ? "cursor-pointer" : ""}
                `}
                data-cursor-theme="light"
                onClick={() => {
                  if (isCompactLayout) {
                    setSelectedExample(card.example);
                  }
                }}
              >
                <img
                  src={card.imageSrc}
                  data-cursor-theme="light"
                  alt={card.imageAlt}
                  className={`
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                    object-center
                    ${card.imageClassName}
                    ${isCompactLayout ? "" : "transition-transform duration-700 group-hover:scale-110"}
                  `}
                />

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-[#422508]/75
                    via-[#DEDEDE]/9
                    to-transparent
                  "
                />

                {!isCompactLayout && (
                  <div
                    className="
                      absolute
                      inset-0
                      z-20
                      flex
                      items-center
                      justify-center
                      pointer-events-none
                    "
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedExample(card.example)}
                      aria-haspopup="dialog"
                      className="
                        pointer-events-auto
                        translate-y-24
                        opacity-0
                        group-hover:translate-y-0
                        group-hover:opacity-100
                        transition-all
                        duration-500
                        rounded-2xl
                        border
                        border-[#F5E6CC]
                        bg-[#F5E6CC]/10
                        backdrop-blur-sm
                        px-8
                        py-3
                        text-[#F5E6CC]
                        text-[1.18rem]
                        section-body
                        tracking-[0.1em]
                        hover:bg-[#566735]
                        hover:text-[#ffffff]
                        hover:border-[#566735]
                      "
                    >
                      See More →
                    </button>
                  </div>
                )}

                <div
                  className={`
                    absolute
                    bottom-8
                    left-0
                    right-0
                    z-20
                    px-6
                    text-center
                    ${isCompactLayout ? "" : "transition-all duration-500 group-hover:translate-y-8 group-hover:opacity-0"}
                  `}
                >
                  <h3 className="text-[1.67rem] leading-tight text-[#FEFBF6] section-body">
                    {card.title}
                  </h3>
                </div>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <ExampleModal
        example={selectedExample}
        onClose={() => setSelectedExample(null)}
        isCompactLayout={isCompactLayout}
      />
    </>
  );
}
