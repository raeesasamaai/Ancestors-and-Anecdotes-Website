import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const quote =
  "Nothing comes from nothing, Thieflet; no story comes from nowhere; new stories are born from old—it is the new combinations that make them new.";

export default function QuoteReveal() {
  const sectionRef = useRef(null);
  const quoteRef = useRef(null);

  const words = quote.split(" ");

  /*
   * =====================================================
   * REFRESH SCROLLTRIGGER WHEN VIEWPORT DIMENSIONS CHANGE
   *
   * Important for:
   * - mobile browser bars
   * - phone rotation
   * - tablet rotation
   * - fullscreen changes
   * - responsive font/layout changes
   * =====================================================
   */

  useEffect(() => {
    let refreshFrame = 0;
    let refreshTimeout = 0;
    let isMounted = true;
    let lastViewportWidth = window.innerWidth;

    const refreshScrollTrigger = () => {
      window.cancelAnimationFrame(
        refreshFrame,
      );

      window.clearTimeout(
        refreshTimeout,
      );

      refreshFrame =
        window.requestAnimationFrame(() => {
          if (!isMounted) {
            return;
          }

          ScrollTrigger.refresh();
        });

      /*
       * Some mobile browsers update the
       * viewport dimensions slightly later.
       */
      refreshTimeout =
        window.setTimeout(() => {
          if (!isMounted) {
            return;
          }

          ScrollTrigger.refresh();
        }, 180);
    };

    const handleResize = () => {
      const nextViewportWidth = window.innerWidth;

      if (nextViewportWidth === lastViewportWidth) {
        return;
      }

      lastViewportWidth = nextViewportWidth;
      refreshScrollTrigger();
    };

    window.addEventListener(
      "resize",
      handleResize,
    );

    window.addEventListener(
      "orientationchange",
      refreshScrollTrigger,
    );

    document.addEventListener(
      "fullscreenchange",
      refreshScrollTrigger,
    );

    /*
     * Font loading can change the number of
     * lines in the quote, so refresh once the
     * fonts have settled.
     */
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (isMounted) {
          refreshScrollTrigger();
        }
      });
    }

    return () => {
      isMounted = false;

      window.cancelAnimationFrame(
        refreshFrame,
      );

      window.clearTimeout(
        refreshTimeout,
      );

      window.removeEventListener(
        "resize",
        handleResize,
      );

      window.removeEventListener(
        "orientationchange",
        refreshScrollTrigger,
      );

      document.removeEventListener(
        "fullscreenchange",
        refreshScrollTrigger,
      );

    };
  }, []);

  /*
   * =====================================================
   * QUOTE REVEAL ANIMATION
   * =====================================================
   */

  useGSAP(
    () => {
      const wordElements =
        quoteRef.current?.querySelectorAll(
          ".quote-word",
        );

      const authorElement =
        sectionRef.current?.querySelector(
          ".quote-author",
        );

      if (
        !wordElements?.length ||
        !authorElement
      ) {
        return undefined;
      }

      const mediaQuery =
        gsap.matchMedia();

      /*
       * One matchMedia context handles:
       *
       * - desktop / tablet
       * - mobile portrait
       * - short mobile/tablet landscape
       * - reduced motion
       *
       * The order below matters:
       *
       * reduced motion wins first,
       * then short landscape,
       * then desktop/mobile.
       */

      mediaQuery.add(
        {
          reduceMotion:
            "(prefers-reduced-motion: reduce)",

          shortLandscape:
            "(max-width: 1023px) and (orientation: landscape) and (max-height: 600px)",

          desktopLarge:
            "(min-width: 1024px)",

          tablet:
            "(min-width: 768px) and (max-width: 1023px)",

          mobile:
            "(max-width: 767px)",
        },

        (context) => {
          const {
            reduceMotion,
            shortLandscape,
            desktopLarge,
            tablet,
          } = context.conditions;

          /*
           * ==========================================
           * REDUCED MOTION
           *
           * No pinning.
           * No scrub.
           * Everything is immediately readable.
           * ==========================================
           */

          if (reduceMotion) {
            gsap.set(
              wordElements,
              {
                color: "#FFF6E8",
              },
            );

            gsap.set(
              authorElement,
              {
                opacity: 1,
                y: 0,
              },
            );

            return undefined;
          }

          /*
           * Start all words faded.
           */

          gsap.set(
            wordElements,
            {
              color:
                "rgba(255, 246, 232, 0.2)",
            },
          );

          /*
           * ==========================================
           * SHORT LANDSCAPE
           *
           * Examples:
           *
           * 667 × 375
           * 740 × 360
           * 812 × 375
           * 844 × 390
           * 932 × 430
           *
           * We intentionally DO NOT pin this layout.
           *
           * The quote still reveals as the visitor
           * scrolls through the section, but the
           * screen is not trapped inside a very
           * short viewport.
           * ==========================================
           */

          if (shortLandscape) {
            gsap.set(
              authorElement,
              {
                opacity: 0,
                y: 10,
              },
            );

            const timeline =
              gsap.timeline({
                scrollTrigger: {
                  trigger:
                    sectionRef.current,

                  start:
                    "top 78%",

                  end:
                    "bottom 24%",

                  scrub: 0.45,

                  invalidateOnRefresh:
                    true,
                },
              });

            timeline
              .to(
                wordElements,
                {
                  color:
                    "#FFF6E8",

                  stagger: {
                    each: 0.035,
                    from: "start",
                  },

                  ease: "none",
                },
              )
              .to(
                authorElement,
                {
                  opacity: 1,
                  y: 0,

                  duration: 0.25,

                  ease:
                    "power2.out",
                },

                "-=0.08",
              );

            return undefined;
          }

          /*
           * ==========================================
           * TABLET / DESKTOP
           * ==========================================
           */

          if (
            desktopLarge ||
            tablet
          ) {
            gsap.set(
              authorElement,
              {
                opacity: 0,
                y: 20,
              },
            );

            const timeline =
              gsap.timeline({
                scrollTrigger: {
                  trigger:
                    sectionRef.current,

                  start:
                    "top top",

                  end:
                    "+=170%",

                  pin: true,

                  scrub: 0.7,

                  anticipatePin: 1,

                  invalidateOnRefresh:
                    true,
                },
              });

            timeline
              .to(
                wordElements,
                {
                  color:
                    "#FFF6E8",

                  stagger: {
                    each: 0.075,
                    from: "start",
                  },

                  ease: "none",
                },
              )
              .to(
                authorElement,
                {
                  opacity: 1,
                  y: 0,

                  duration: 0.4,

                  ease:
                    "power2.out",
                },

                "-=0.15",
              );

            return undefined;
          }

          /*
           * ==========================================
           * MOBILE PORTRAIT
           * ==========================================
           */

          gsap.set(
            authorElement,
            {
              opacity: 0,
              y: 14,
            },
          );

          const timeline =
            gsap.timeline({
              scrollTrigger: {
                trigger:
                  sectionRef.current,

                start:
                  "top 78%",

                end:
                  "bottom 68%",

                scrub: 0.2,

                invalidateOnRefresh:
                  true,
              },
            });

          timeline
            .to(
              wordElements,
              {
                color:
                  "#FFF6E8",

                stagger: {
                  each: 0.034,
                  from: "start",
                },

                ease: "none",
              },
            )
            .to(
              authorElement,
              {
                opacity: 1,
                y: 0,

                duration: 0.35,

                ease:
                  "power2.out",
              },

              "-=0.48",
            );

          return undefined;
        },
      );

      return () => {
        mediaQuery.revert();
      };
    },

    {
      scope: sectionRef,
    },
  );

  return (
    <section
      ref={sectionRef}
      id="quote"
      data-cursor-theme="light"
      className="
        relative
        z-10

        flex
        h-auto
        min-h-[100svh]
        w-full
        items-center

        overflow-visible

        border-0
        bg-[#462505]

        px-6
        py-12

        text-[#FFF6E8]

        outline-none

        sm:px-10
        sm:py-14

        md:h-[100svh]
        md:min-h-[100svh]
        md:overflow-hidden
        md:px-16
        md:py-16

        lg:px-20
        lg:py-20

        xl:px-24

        [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:!h-auto
        [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:!min-h-[100svh]
        [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:!overflow-visible
        [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:!px-8
        [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:!py-6
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1500px]
        "
      >
        {/* ========================================
            SECTION LABEL
        ======================================== */}

        <div
          className="
            mb-7
            flex
            items-center
            gap-4

            sm:mb-9

            md:mb-12

            lg:mb-14

            [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:!mb-4
          "
        >
          <span
            aria-hidden="true"
            className="
              block
              h-px
              w-10

              bg-[#FFF6E8]

              sm:w-14

              [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:!w-8
            "
          />

          <p
            className="
              section-body

              text-[0.9rem]
              font-bold
              uppercase
              tracking-[0.18em]

              text-[#FFF6E8]

              sm:text-[1rem]

              [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:!text-[0.78rem]
            "
          >
            A Thought on Stories
          </p>
        </div>

        {/* ========================================
            QUOTE
        ======================================== */}

        <blockquote
          aria-label={`${quote} Salman Rushdie, Haroun and the Sea of Stories`}
          className="m-0"
        >
          <p
            ref={quoteRef}
            aria-hidden="true"
            className="
              m-0

              max-w-[1400px]

              font-['Book_Antiqua','Palatino_Linotype',Palatino,serif]

              text-[clamp(2rem,8.6vw,2.5rem)]

              font-normal

              leading-[1.06]

              tracking-[-0.035em]

              md:text-[clamp(2.4rem,5.1vw,5.8rem)]
              md:leading-[1.04]

              [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:!text-[clamp(1.8rem,4.2vw,2.35rem)]

              [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:!leading-[1.05]
            "
          >
            {/* ========================================
                OPENING QUOTATION MARK

                Remains the first .quote-word, so it
                is still the first part of the reveal.
            ======================================== */}

            <span
              aria-hidden="true"
              className="
                quote-word

                mb-5
                block

                h-8
                w-fit

                font-['Georgia',serif]

                text-[1.45em]

                font-bold
                leading-[0.65]

                will-change-[color]

                sm:mb-10
                sm:h-10
                sm:text-[1.6em]

                md:mb-12

                [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:!mb-4

                [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:!h-6

                [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:!text-[1.35em]
              "
            >
              “
            </span>

            {/* ========================================
                QUOTE WORDS
            ======================================== */}

            {words.map(
              (word, index) => (
                <span
                  key={`${word}-${index}`}
                  className="
                    quote-word
                    inline-block
                    will-change-[color]
                  "
                >
                  {word}

                  {index !==
                    words.length - 1 &&
                    "\u00A0"}
                </span>
              ),
            )}
          </p>

          {/* ========================================
              AUTHOR
          ======================================== */}

          <footer
            aria-hidden="true"
            className="
              quote-author

              mt-7

              flex
              flex-col
              items-start

              gap-1

              opacity-0

              sm:mt-10

              md:mt-14

              [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:!mt-5
            "
          >
            <cite
              className="
                section-body

                not-italic

                text-[1.1rem]
                font-semibold

                text-[#FFF6E8]

                sm:text-[1.4rem]

                [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:!text-[1rem]
              "
            >
              Salman Rushdie
            </cite>

            <span
              className="
                section-body

                text-[1rem]
                italic

                text-[#FFF6E8]/75

                sm:text-[1.2rem]

                [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:!text-[0.9rem]
              "
            >
              Haroun and the Sea of Stories
            </span>
          </footer>
        </blockquote>
      </div>

      {/* ========================================
          DECORATIVE CORNER
      ======================================== */}

      <div
        aria-hidden="true"
        className="
          absolute
          bottom-6
          right-6
          z-20

          hidden

          h-16
          w-16

          border-b
          border-r
          border-[#FFF6E8]/30

          md:block

          lg:bottom-10
          lg:right-10

          [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:!hidden
        "
      />
    </section>
  );
}
