import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { createPortal } from "react-dom";
import ScrollReveal from "./ScrollReveal";


/* =========================================================
   EXAMPLE DETAILS
========================================================= */

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

    cta:
      "I Want to Build My Family Tree",

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
      "Turning research findings into a meaningful written record of your family’s story",

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

    cta:
      "I Want to Preserve My Family Story",

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

    modalTitle:
      "Oral History & Digital Story",

    subtitle:
      "Sharing your story through an engaging visual story",

    description:
      "Oral history is the audio recording of a person’s personal account of their lives or a historical event. A digital story takes this a step further by creating a short film (5 - 10 minutes) using photographs supplied by the client, narrated using extracts from the recordings.",

    features: [
      "Personal oral history interview",
      "5-10 minute narrated digital story",
      "Client photographs woven into the final film",
    ],

    bestFor:
      "This is best for families who want to experience and share their findings in a more visual, emotional, and accessible format.",

    cta:
      "I Want an Oral history & Digital story",

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


/* =========================================================
   CARD DATA
========================================================= */

const exampleCards = [
  {
    example: exampleDetails[0],

    image:
      "/Images/family-tree.png",

    alt:
      "Visual Family Tree",

    imageClass:
      "sepia-[8%]",

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

    image:
      "/Images/family-history.png",

    alt:
      "Family History Document",

    imageClass:
      "sepia-[25%]",

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

    image:
      "/Images/family-video.png",

    alt:
      "Research Findings Video",

    imageClass:
      "sepia-[25%]",

    title: (
      <>
        Oral History &amp;
        <br />
        Digital Story
      </>
    ),
  },
];


/* =========================================================
   LAPTOP / TABLET INTERACTION DETECTION
========================================================= */

/*
 * We first determine whether the current device is
 * genuinely a phone/tablet platform.
 *
 * This is intentionally separate from screen width.
 *
 * An iPad Pro can have a 1024px+ viewport, so width
 * alone must NOT enable desktop hover mode.
 */

function isPhoneOrTabletPlatform() {
  if (
    typeof navigator === "undefined" ||
    typeof window === "undefined"
  ) {
    return false;
  }


  const userAgent =
    navigator.userAgent || "";


  const platform =
    navigator.platform || "";


  const maxTouchPoints =
    navigator.maxTouchPoints || 0;


  /*
   * Traditional iPhone/iPad user agents.
   */

  const isIOS =
    /iPhone|iPad|iPod/i.test(
      userAgent,
    );


  /*
   * Modern iPads can identify themselves as
   * Macintosh / MacIntel.
   */

  const isModernIPad =
    /Macintosh/i.test(userAgent) &&
    maxTouchPoints > 1;


  const isMacIntelIPad =
    platform === "MacIntel" &&
    maxTouchPoints > 1;


  /*
   * Android includes both phones and tablets.
   */

  const isAndroid =
    /Android/i.test(
      userAgent,
    );


  /*
   * Additional mobile user-agent protection.
   */

  const isMobileUA =
    /Mobile|Tablet|Silk|Kindle|PlayBook/i.test(
      userAgent,
    );


  /*
   * Chrome DevTools tablet/device emulation normally
   * exposes coarse pointer + no hover.
   *
   * We only use this as a tablet signal when the
   * environment does NOT clearly identify as Windows.
   *
   * This avoids incorrectly classifying touchscreen
   * Windows laptops as tablets.
   */

  const coarsePointer =
    window.matchMedia(
      "(pointer: coarse)",
    ).matches;


  const noHover =
    window.matchMedia(
      "(hover: none)",
    ).matches;


  const isWindows =
    /Win/i.test(
      platform,
    ) ||
    /Windows/i.test(
      userAgent,
    );


  const emulatedTouchDevice =
    coarsePointer &&
    noHover &&
    !isWindows;


  return (
    isIOS ||
    isModernIPad ||
    isMacIntelIPad ||
    isAndroid ||
    isMobileUA ||
    emulatedTouchDevice
  );
}


/*
 * Laptop hover mode:
 *
 * 1024px or wider
 * AND
 * not classified as a phone/tablet.
 *
 * We deliberately don't require pointer:fine here.
 *
 * That allows touchscreen Windows laptops to retain
 * the laptop/desktop card experience.
 */

function shouldUseLaptopHoverMode() {
  if (
    typeof window === "undefined"
  ) {
    return false;
  }


  const hasLaptopWidth =
    window.innerWidth >= 1024;


  const isTouchPlatform =
    isPhoneOrTabletPlatform();


  return (
    hasLaptopWidth &&
    !isTouchPlatform
  );
}


/* =========================================================
   EXAMPLE MODAL
========================================================= */

function ExampleModal({
  example,
  onClose,
}) {
  const [
    currentSlide,
    setCurrentSlide,
  ] = useState(0);


  const onCloseRef =
    useRef(onClose);


  const closeButtonRef =
    useRef(null);


  const dialogRef =
    useRef(null);


  const previousExampleIdRef =
    useRef(example?.id);


  useEffect(() => {
    onCloseRef.current =
      onClose;
  }, [onClose]);


  const media =
    example?.media ?? [];


  const totalSlides =
    media.length;


  const activeMedia =
    media[currentSlide];


  /* =====================================================
     PREVIOUS SLIDE
  ===================================================== */

  const showPrevious = () => {
    if (totalSlides <= 1) {
      return;
    }


    setCurrentSlide(
      (current) =>
        current === 0
          ? totalSlides - 1
          : current - 1,
    );
  };


  /* =====================================================
     NEXT SLIDE
  ===================================================== */

  const showNext = () => {
    if (totalSlides <= 1) {
      return;
    }


    setCurrentSlide(
      (current) =>
        current ===
        totalSlides - 1
          ? 0
          : current + 1,
    );
  };


  /* =====================================================
     VIEW PACKAGES
  ===================================================== */

  const handleGoToPackages = () => {
    /*
     * Close first so the page scroll lock is removed.
     */

    onCloseRef.current?.();


    /*
     * Wait for the modal closing animation.
     */

    window.setTimeout(() => {
      const packagesSection =
        document.getElementById(
          "packages",
        );


      packagesSection?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 450);
  };


  /* =====================================================
     RESET SLIDER
  ===================================================== */

  useEffect(() => {
    if (
      previousExampleIdRef.current ===
      example?.id
    ) {
      return undefined;
    }


    previousExampleIdRef.current =
      example?.id;


    const resetTimer =
      window.setTimeout(() => {
        setCurrentSlide(0);
      }, 0);


    return () => {
      window.clearTimeout(
        resetTimer,
      );
    };
  }, [example?.id]);


  /* =====================================================
     BODY SCROLL LOCK
  ===================================================== */

  useLayoutEffect(() => {
    if (!example) {
      return undefined;
    }


    const html =
      document.documentElement;


    const body =
      document.body;


    const scrollX =
      window.scrollX;


    const scrollY =
      window.scrollY;


    const scrollbarWidth =
      window.innerWidth -
      html.clientWidth;


    const previous = {
      htmlOverflow:
        html.style.overflow,

      htmlOverscroll:
        html.style
          .overscrollBehavior,

      htmlScrollBehavior:
        html.style
          .scrollBehavior,

      bodyOverflow:
        body.style.overflow,

      bodyOverscroll:
        body.style
          .overscrollBehavior,

      bodyPosition:
        body.style.position,

      bodyTop:
        body.style.top,

      bodyLeft:
        body.style.left,

      bodyRight:
        body.style.right,

      bodyWidth:
        body.style.width,

      bodyPaddingRight:
        body.style.paddingRight,
    };


    html.style.overflow =
      "hidden";


    html.style.overscrollBehavior =
      "none";


    body.style.overflow =
      "hidden";


    body.style.overscrollBehavior =
      "none";


    body.style.position =
      "fixed";


    body.style.top =
      `-${scrollY}px`;


    body.style.left =
      `-${scrollX}px`;


    body.style.right =
      "0";


    body.style.width =
      "100%";


    if (scrollbarWidth > 0) {
      body.style.paddingRight =
        `${scrollbarWidth}px`;
    }


    return () => {
      html.style.scrollBehavior =
        "auto";


      html.style.overflow =
        previous.htmlOverflow;


      html.style.overscrollBehavior =
        previous.htmlOverscroll;


      body.style.overflow =
        previous.bodyOverflow;


      body.style.overscrollBehavior =
        previous.bodyOverscroll;


      body.style.position =
        previous.bodyPosition;


      body.style.top =
        previous.bodyTop;


      body.style.left =
        previous.bodyLeft;


      body.style.right =
        previous.bodyRight;


      body.style.width =
        previous.bodyWidth;


      body.style.paddingRight =
        previous.bodyPaddingRight;


      window.scrollTo({
        left: scrollX,
        top: scrollY,
        behavior: "auto",
      });


      requestAnimationFrame(() => {
        html.style.scrollBehavior =
          previous.htmlScrollBehavior;
      });
    };
  }, [example]);


  /* =====================================================
     KEYBOARD + FOCUS MANAGEMENT
  ===================================================== */

  useEffect(() => {
    if (!example) {
      return undefined;
    }


    const previouslyFocused =
      document.activeElement;


    /*
     * Focus the close button when the modal opens.
     */

    requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });


    const handleKeyDown = (
      event,
    ) => {
      /* ESCAPE */

      if (
        event.key === "Escape"
      ) {
        event.preventDefault();

        onCloseRef.current?.();

        return;
      }


      /* PREVIOUS */

      if (
        event.key ===
          "ArrowLeft" &&
        totalSlides > 1
      ) {
        event.preventDefault();


        setCurrentSlide(
          (current) =>
            current === 0
              ? totalSlides - 1
              : current - 1,
        );


        return;
      }


      /* NEXT */

      if (
        event.key ===
          "ArrowRight" &&
        totalSlides > 1
      ) {
        event.preventDefault();


        setCurrentSlide(
          (current) =>
            current ===
            totalSlides - 1
              ? 0
              : current + 1,
        );


        return;
      }


      /*
       * Focus trap.
       */

      if (
        event.key !== "Tab"
      ) {
        return;
      }


      const dialog =
        dialogRef.current;


      if (!dialog) {
        return;
      }


      const focusableElements =
        Array.from(
          dialog.querySelectorAll(
            `
              button:not([disabled]),
              a[href],
              input:not([disabled]),
              select:not([disabled]),
              textarea:not([disabled]),
              video[controls],
              [tabindex]:not([tabindex="-1"])
            `,
          ),
        ).filter(
          (element) =>
            element.offsetParent !==
            null,
        );


      if (
        focusableElements.length ===
        0
      ) {
        return;
      }


      const firstElement =
        focusableElements[0];


      const lastElement =
        focusableElements[
          focusableElements.length - 1
        ];


      if (
        event.shiftKey &&
        document.activeElement ===
          firstElement
      ) {
        event.preventDefault();

        lastElement.focus();

        return;
      }


      if (
        !event.shiftKey &&
        document.activeElement ===
          lastElement
      ) {
        event.preventDefault();

        firstElement.focus();
      }
    };


    window.addEventListener(
      "keydown",
      handleKeyDown,
    );


    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );


      /*
       * Return focus to the card/button
       * that opened the modal.
       */

      requestAnimationFrame(() => {
        if (
          previouslyFocused instanceof
          HTMLElement
        ) {
          previouslyFocused.focus();
        }
      });
    };
  }, [
    example,
    totalSlides,
  ]);


  /* =====================================================
     AUTO ADVANCE SLIDES
  ===================================================== */

  useEffect(() => {
    if (
      !example ||
      totalSlides <= 1 ||
      activeMedia?.type ===
        "video"
    ) {
      return undefined;
    }


    const timer =
      window.setTimeout(() => {
        setCurrentSlide(
          (current) =>
            current ===
            totalSlides - 1
              ? 0
              : current + 1,
        );
      }, 5000);


    return () => {
      window.clearTimeout(
        timer,
      );
    };
  }, [
    example,
    currentSlide,
    totalSlides,
    activeMedia?.type,
  ]);


  if (
    typeof document ===
    "undefined"
  ) {
    return null;
  }


  return createPortal(
    <AnimatePresence>
      {example && (
        <motion.div
          data-cursor-theme="light"
          className="
            fixed
            inset-0
            z-[9000]

            flex
            items-center
            justify-center

            overflow-hidden
            overscroll-none

            bg-[radial-gradient(circle_at_top,rgba(156,100,94,0.30),rgba(28,28,28,0.84)_50%,rgba(12,8,5,0.96)_100%)]

            px-3
            py-5

            backdrop-blur-md

            sm:px-6
            sm:py-8

            [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:px-2

            [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:py-2
          "
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.3,
          }}
          onPointerDown={(
            event,
          ) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              onCloseRef.current?.();
            }
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`example-title-${example.id}`}
            aria-describedby={`example-description-${example.id}`}
            data-cursor-theme="dark"
            className="
              relative
              my-auto

              max-h-[calc(100dvh-2rem)]

              w-full
              max-w-[980px]

              overflow-hidden

              rounded-[28px]

              bg-[#F5E6CC]

              text-[#1C1C1C]

              shadow-[0_30px_100px_rgba(0,0,0,0.55)]

              sm:rounded-[38px]

              md:max-h-[calc(100dvh-4rem)]

              lg:rounded-[48px]

              [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:max-h-[calc(100dvh-1rem)]

              [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:rounded-[24px]
            "
            initial={{
              opacity: 0,
              y: 45,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 35,
              scale: 0.97,
            }}
            transition={{
              duration: 0.42,

              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
          >
            {/* =================================================
                CLOSE BUTTON
            ================================================= */}

            <button
              ref={closeButtonRef}
              type="button"
              onClick={() =>
                onCloseRef.current?.()
              }
              aria-label="Close example"
              data-cursor="Close"
              className="
                group

                absolute
                right-4
                top-4
                z-40

                grid
                h-11
                w-11
                place-items-center

                rounded-full

                bg-[#F5E6CC]/95

                p-0

                text-[#704214]

                shadow-md
                backdrop-blur-md

                transition
                duration-300

                hover:bg-white

                focus:outline-none

                focus-visible:ring-2
                focus-visible:ring-[#704214]
                focus-visible:ring-offset-2

                sm:right-6
                sm:top-6

                [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:right-3

                [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:top-3

                [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:h-9

                [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:w-9
              "
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="
                  h-5
                  w-5

                  transition-transform
                  duration-300

                  group-hover:rotate-90
                "
                fill="none"
                stroke="currentColor"
                strokeWidth="2.25"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </svg>
            </button>


            {/* =================================================
                SCROLLABLE MODAL CONTENT
            ================================================= */}

            <div
              className="
                max-h-[calc(100dvh-2rem)]

                overflow-y-auto
                overscroll-contain
                touch-pan-y

                [scrollbar-width:none]

                [-ms-overflow-style:none]

                [&::-webkit-scrollbar]:hidden

                md:max-h-[calc(100dvh-4rem)]

                [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:max-h-[calc(100dvh-1rem)]
              "
            >
              {/* ===============================================
                  MEDIA
              =============================================== */}

              <div
                className="
                  p-4
                  pb-0

                  sm:p-7
                  sm:pb-0

                  lg:p-12
                  lg:pb-0

                  [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:p-3

                  [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:pb-0
                "
              >
                <div
                  className="
                    relative

                    aspect-[16/10]

                    overflow-hidden

                    rounded-[20px]

                    bg-[#1C1C1C]

                    sm:rounded-[28px]

                    lg:rounded-[34px]

                    [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:aspect-auto

                    [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:h-[170px]

                    [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:rounded-[18px]
                  "
                >
                  <AnimatePresence
                    mode="wait"
                  >
                    <motion.div
                      key={`${example.id}-${currentSlide}`}
                      className="
                        absolute
                        inset-0
                      "
                      initial={{
                        opacity: 0,
                        x: 35,
                        scale: 1.02,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        x: -35,
                        scale: 0.99,
                      }}
                      transition={{
                        duration: 0.4,

                        ease: [
                          0.22,
                          1,
                          0.36,
                          1,
                        ],
                      }}
                    >
                      {activeMedia?.type ===
                      "video" ? (
                        <video
                          src={
                            activeMedia.src
                          }
                          poster={
                            activeMedia.poster
                          }
                          controls
                          playsInline
                          preload="metadata"
                          aria-label={
                            activeMedia.alt
                          }
                          className="
                            h-full
                            w-full

                            bg-black

                            object-cover
                            object-center
                          "
                        />
                      ) : (
                        <img
                          src={
                            activeMedia?.src
                          }
                          alt={
                            activeMedia?.alt ??
                            ""
                          }
                          decoding="async"
                          className={`
                            h-full
                            w-full

                            scale-[1.01]

                            ${
                              activeMedia?.fit ===
                              "contain"
                                ? "object-contain"
                                : "object-cover"
                            }

                            object-center
                          `}
                          style={{
                            objectPosition:
                              activeMedia?.position ??
                              "center",
                          }}
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>


                  {/* IMAGE OVERLAY */}

                  {activeMedia?.type !==
                    "video" && (
                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none

                        absolute
                        inset-0

                        bg-gradient-to-t

                        from-[#422508]/25
                        via-transparent
                        to-[#F5E6CC]/10

                        mix-blend-multiply
                      "
                    />
                  )}


                  {/* SLIDER CONTROLS */}

                  {totalSlides > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={
                          showPrevious
                        }
                        aria-label="Show previous media"
                        className="
                          absolute
                          left-3
                          top-1/2
                          z-20

                          flex
                          h-10
                          w-10
                          -translate-y-1/2

                          items-center
                          justify-center

                          rounded-full

                          bg-[#1C1C1C]/55

                          text-[24px]
                          text-white

                          backdrop-blur-md

                          transition

                          hover:bg-[#704214]

                          focus:outline-none
                          focus:ring-2
                          focus:ring-white

                          sm:left-5
                          sm:h-12
                          sm:w-12
                        "
                      >
                        ‹
                      </button>


                      <button
                        type="button"
                        onClick={
                          showNext
                        }
                        aria-label="Show next media"
                        className="
                          absolute
                          right-3
                          top-1/2
                          z-20

                          flex
                          h-10
                          w-10
                          -translate-y-1/2

                          items-center
                          justify-center

                          rounded-full

                          bg-[#1C1C1C]/55

                          text-[24px]
                          text-white

                          backdrop-blur-md

                          transition

                          hover:bg-[#704214]

                          focus:outline-none
                          focus:ring-2
                          focus:ring-white

                          sm:right-5
                          sm:h-12
                          sm:w-12
                        "
                      >
                        ›
                      </button>


                      <div
                        aria-live="polite"
                        className="
                          absolute
                          bottom-3
                          right-3
                          z-20

                          rounded-full

                          bg-black/55

                          px-3
                          py-1

                          font-body
                          text-[14px]
                          text-white

                          backdrop-blur-md

                          sm:bottom-5
                          sm:right-5
                        "
                      >
                        {currentSlide + 1} /{" "}
                        {totalSlides}
                      </div>
                    </>
                  )}
                </div>


                {/* SLIDER DOTS */}

                {totalSlides > 1 && (
                  <div
                    className="
                      mt-4

                      flex
                      items-center
                      justify-center

                      gap-2
                    "
                  >
                    {media.map(
                      (
                        slide,
                        index,
                      ) => (
                        <button
                          key={`${slide.src}-${index}`}
                          type="button"
                          onClick={() =>
                            setCurrentSlide(
                              index,
                            )
                          }
                          aria-label={`Show slide ${
                            index + 1
                          }`}
                          aria-current={
                            currentSlide ===
                            index
                              ? "true"
                              : undefined
                          }
                          className={`
                            h-2.5

                            rounded-full

                            transition-all
                            duration-300

                            focus:outline-none
                            focus:ring-2
                            focus:ring-[#704214]

                            ${
                              currentSlide ===
                              index
                                ? "w-9 bg-[#704214]"
                                : "w-2.5 bg-[#704214]/30 hover:bg-[#704214]/60"
                            }
                          `}
                        />
                      ),
                    )}
                  </div>
                )}
              </div>


              {/* ===============================================
                  MODAL TEXT
              =============================================== */}

              <div
                className="
                  px-5
                  pb-6
                  pt-9

                  sm:px-10
                  sm:pb-10

                  lg:px-14
                  lg:pb-14
                  lg:pt-11

                  [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:px-5

                  [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:pb-6

                  [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:pt-5
                "
              >
                <div>
                  <h2
                    id={`example-title-${example.id}`}
                    className="
                      section-heading

                      text-[2rem]

                      sm:text-[2.35rem]

                      lg:text-[2.7rem]

                      [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:text-[1.8rem]
                    "
                  >
                    {example.modalTitle}
                  </h2>


                  <span
                    aria-hidden="true"
                    className="
                      mt-3
                      block

                      h-[3px]
                      w-[58px]

                      bg-[#704214]
                    "
                  />
                </div>


                <p
                  className="
                    mt-6

                    section-body

                    text-[1.15rem]
                    font-bold
                    italic

                    text-[#704214]

                    sm:mt-8
                    sm:text-[1.35rem]

                    [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-4

                    [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:text-[1.05rem]
                  "
                >
                  {example.subtitle}
                </p>


                <p
                  id={`example-description-${example.id}`}
                  className="
                    mt-5

                    section-body

                    leading-[1.55]

                    sm:mt-7
                    sm:leading-[1.6]

                    [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-4

                    [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:text-[1rem]

                    [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:leading-[1.45]
                  "
                >
                  {example.description}
                </p>


                {/* FEATURES */}

                <div
                  className="
                    mt-7

                    sm:mt-9

                    [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-5
                  "
                >
                  <ul
                    className="
                      space-y-3

                      sm:space-y-4

                      [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:space-y-2
                    "
                  >
                    {example.features.map(
                      (feature) => (
                        <li
                          key={
                            feature
                          }
                          className="
                            flex
                            items-start

                            gap-4

                            section-body

                            [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:gap-3

                            [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:text-[1rem]
                          "
                        >
                          <span
                            aria-hidden="true"
                            className="
                              mt-1

                              flex
                              h-7
                              w-7
                              shrink-0

                              items-center
                              justify-center

                              rounded-full

                              bg-[#704214]

                              text-[14px]
                              text-[#F5E6CC]

                              [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:h-6

                              [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:w-6

                              [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:text-[12px]
                            "
                          >
                            ✓
                          </span>


                          <span>
                            {feature}
                          </span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>


                {/* PACKAGES BUTTON */}

                <button
                  type="button"
                  onClick={
                    handleGoToPackages
                  }
                  className="
                    mt-8

                    flex
                    min-h-[56px]
                    w-full

                    items-center
                    justify-center

                    rounded-[18px]

                    bg-[#566735]

                    px-5
                    py-3

                    text-center

                    section-body

                    text-[18px]
                    font-semibold

                    text-[#F5E6CC]

                    transition
                    duration-300

                    hover:bg-[#704214]

                    focus:outline-none

                    focus:ring-2
                    focus:ring-[#ffffff]
                    focus:ring-offset-2

                    sm:mt-10
                    sm:min-h-[58px]
                    sm:text-[24px]

                    [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-6

                    [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:min-h-[50px]

                    [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:text-[17px]
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

    document.body,
  );
}


/* =========================================================
   EXAMPLE CARD
========================================================= */

function ExampleCard({
  card,
  laptopHoverMode,
  isLastCard,
  onOpen,
}) {
  /*
   * Tablet:
   * third card fills both columns.
   *
   * Desktop:
   * third card returns to normal.
   */

  const lastCardClass =
    isLastCard
      ? "md:col-span-2 xl:col-span-1"
      : "";


  /* =====================================================
     LAPTOP / DESKTOP CARD

     HOVER:
     - image zooms
     - title moves down
     - title fades
     - button rises
     - button fades in
  ===================================================== */

  if (laptopHoverMode) {
    return (
      <article
        data-cursor-theme="light"
        className={`
          group
          relative

          h-[300px]
          w-full

          overflow-hidden

          rounded-[34px]

          bg-[#FFF6E8]

          shadow-[0_14px_35px_rgba(112,66,20,0.18)]

          ${lastCardClass}
        `}
      >
        {/* IMAGE */}

        <img
          src={card.image}
          alt={card.alt}
          loading="lazy"
          decoding="async"
          className={`
            absolute
            inset-0

            h-full
            w-full

            object-cover
            object-center

            transition-transform
            duration-700

            group-hover:scale-110
            group-focus-within:scale-110

            ${card.imageClass}
          `}
        />


        {/* GRADIENT */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            inset-0

            bg-gradient-to-t

            from-[#422508]/75
            via-[#DEDEDE]/9
            to-transparent
          "
        />


        {/* SEE MORE BUTTON */}

        <div
          className="
            pointer-events-none

            absolute
            inset-0
            z-20

            flex
            items-center
            justify-center
          "
        >
          <button
            type="button"
            onClick={
              onOpen
            }
            aria-haspopup="dialog"
            aria-label={`View ${card.example.modalTitle}`}
            className="
              pointer-events-auto

              translate-y-24
              opacity-0

              rounded-2xl

              border
              border-[#F5E6CC]

              bg-[#F5E6CC]/10

              px-8
              py-3

              backdrop-blur-sm

              section-body

              text-[1.18rem]
              text-[#F5E6CC]

              tracking-[0.1em]

              transition-all
              duration-500

              group-hover:translate-y-0
              group-hover:opacity-100

              focus-visible:translate-y-0
              focus-visible:opacity-100

              hover:border-[#566735]
              hover:bg-[#566735]
              hover:text-white

              focus:outline-none

              focus-visible:ring-2
              focus-visible:ring-[#FFF6E8]
              focus-visible:ring-offset-2
              focus-visible:ring-offset-[#422508]
            "
          >
            See More →
          </button>
        </div>


        {/* TITLE */}

        <div
          className="
            pointer-events-none

            absolute
            bottom-8
            left-0
            right-0
            z-20

            px-6

            text-center

            transition-all
            duration-500

            group-hover:translate-y-8
            group-hover:opacity-0

            group-focus-within:translate-y-8
            group-focus-within:opacity-0
          "
        >
          <h3
            className="
              section-body

              text-[1.67rem]

              leading-tight

              text-[#FEFBF6]
            "
          >
            {card.title}
          </h3>
        </div>
      </article>
    );
  }


  /* =====================================================
     PHONE / TABLET / IPAD CARD

     NO hover animation.

     One tap anywhere on the card opens the modal.
  ===================================================== */

  return (
    <button
      type="button"
      onClick={
        onOpen
      }
      aria-haspopup="dialog"
      aria-label={`View ${card.example.modalTitle}`}
      data-cursor-theme="light"
      className={`
        relative

        h-[280px]
        w-full

        overflow-hidden

        rounded-[30px]

        bg-[#FFF6E8]

        shadow-[0_14px_35px_rgba(112,66,20,0.18)]

        outline-none

        transition-transform
        duration-200

        active:scale-[0.985]

        focus-visible:ring-2
        focus-visible:ring-[#704214]
        focus-visible:ring-offset-4
        focus-visible:ring-offset-[#F5E6CC]

        sm:h-[300px]
        sm:rounded-[34px]

        md:h-[300px]

        ${lastCardClass}

        [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:h-[230px]
      `}
    >
      {/* IMAGE */}

      <img
        src={card.image}
        alt={card.alt}
        loading="lazy"
        decoding="async"
        className={`
          absolute
          inset-0

          h-full
          w-full

          object-cover
          object-center

          ${card.imageClass}
        `}
      />


      {/* GRADIENT */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0

          bg-gradient-to-t

          from-[#422508]/75
          via-[#DEDEDE]/9
          to-transparent
        "
      />


      {/* TITLE */}

      <div
        className="
          pointer-events-none

          absolute
          bottom-7
          left-0
          right-0
          z-20

          px-6

          text-center

          sm:bottom-8
        "
      >
        <h3
          className="
            section-body

            text-[1.5rem]

            leading-tight

            text-[#FEFBF6]

            sm:text-[1.67rem]

            [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:text-[1.4rem]
          "
        >
          {card.title}
        </h3>
      </div>
    </button>
  );
}


/* =========================================================
   EXAMPLES SECTION
========================================================= */

export default function Examples() {
  const [
    selectedExample,
    setSelectedExample,
  ] = useState(null);


  const [
    laptopHoverMode,
    setLaptopHoverMode,
  ] = useState(() =>
    shouldUseLaptopHoverMode(),
  );


  /* =====================================================
     RESPONSIVE INTERACTION MODE
  ===================================================== */

  useEffect(() => {
    let frameId = null;


    const updateInteractionMode =
      () => {
        if (frameId !== null) {
          window.cancelAnimationFrame(
            frameId,
          );
        }


        frameId =
          window.requestAnimationFrame(
            () => {
              setLaptopHoverMode(
                shouldUseLaptopHoverMode(),
              );

              frameId = null;
            },
          );
      };


    /*
     * Calculate once immediately.
     */

    updateInteractionMode();


    /*
     * Recalculate on browser resize.
     */

    window.addEventListener(
      "resize",
      updateInteractionMode,
    );


    /*
     * Recalculate when rotating a device.
     */

    window.addEventListener(
      "orientationchange",
      updateInteractionMode,
    );


    /*
     * These media queries help Chrome update
     * the state correctly when switching between
     * desktop and device emulation.
     */

    const coarseQuery =
      window.matchMedia(
        "(pointer: coarse)",
      );


    const hoverQuery =
      window.matchMedia(
        "(hover: hover)",
      );


    coarseQuery.addEventListener(
      "change",
      updateInteractionMode,
    );


    hoverQuery.addEventListener(
      "change",
      updateInteractionMode,
    );


    return () => {
      window.removeEventListener(
        "resize",
        updateInteractionMode,
      );


      window.removeEventListener(
        "orientationchange",
        updateInteractionMode,
      );


      coarseQuery.removeEventListener(
        "change",
        updateInteractionMode,
      );


      hoverQuery.removeEventListener(
        "change",
        updateInteractionMode,
      );


      if (frameId !== null) {
        window.cancelAnimationFrame(
          frameId,
        );
      }
    };
  }, []);


  return (
    <>
      <section
        id="examples"
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
            Examples of Our Client Work
          </ScrollReveal>


          {/* =================================================
              MAIN HEADING
          ================================================= */}

          <ScrollReveal
            as="h2"
            className="
              mt-8

              max-w-5xl

              section-heading

              [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-6
            "
          >
            A Glimpse Into Preserved Family Stories
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
            Every family history project is unique. Some clients want to
            understand where they come from and want to trace a particular
            family line generations back and see this depicted in family tree
            charts and written up family histories, and others want a living
            relative’s life story captured by means of oral history interviews.
            Below are examples of the types of work that can be created through
            our genealogy research process.
          </ScrollReveal>


          {/* =================================================
              DISCLAIMER
          ================================================= */}

          <ScrollReveal
            as="p"
            className="
              mt-6

              max-w-4xl

              section-body
              cursive
              italic

              [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-4
            "
          >
            All examples shown here are sample or anonymised representations of
            client work.
          </ScrollReveal>


          {/* =================================================
              CARDS

              PHONE
              1 COLUMN

              TABLET / IPAD
              2 COLUMNS

              LAPTOP 1024–1279
              2 COLUMNS + HOVER

              DESKTOP 1280+
              3 COLUMNS + HOVER
          ================================================= */}

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
            {exampleCards.map(
              (
                card,
                index,
              ) => (
                <ExampleCard
                  key={
                    card.example.id
                  }
                  card={card}
                  laptopHoverMode={
                    laptopHoverMode
                  }
                  isLastCard={
                    index === 2
                  }
                  onOpen={() =>
                    setSelectedExample(
                      card.example,
                    )
                  }
                />
              ),
            )}
          </ScrollReveal>
        </div>
      </section>


      {/* =================================================
          EXAMPLE MODAL
      ================================================= */}

      <ExampleModal
        example={
          selectedExample
        }
        onClose={() =>
          setSelectedExample(
            null,
          )
        }
      />
    </>
  );
}