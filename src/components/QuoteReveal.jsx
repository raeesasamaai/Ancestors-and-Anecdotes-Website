
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const quote =
  "Nothing comes from nothing, Thieflet; no story comes from nowhere; new stories are born from old—it is the new combinations that make them new.";

export default function QuoteReveal() {
  const sectionRef = useRef(null);
  const washRef = useRef(null);
  const quoteMarkRef = useRef(null);
  const quoteRef = useRef(null);
  const authorRef = useRef(null);
  const labelRef = useRef(null);
  const labelLineRef = useRef(null);
  const cornerRef = useRef(null);

  // Keep the original word structure and layout.
  const words = quote.split(" ");

  /* =====================================================
     MATCH THE OTHER QUOTE SECTION ANIMATIONS

     - Cream background
     - Dusty rose wash from left to right
     - Quote fades upward
     - Author fades upward
     - Quote mark scales into view
     - Reverses when scrolling back
     - No pinning or word-by-word reveal
  ===================================================== */

  useGSAP(
    () => {
      const section = sectionRef.current;
      const wash = washRef.current;
      const quoteMark = quoteMarkRef.current;
      const quoteElement = quoteRef.current;
      const author = authorRef.current;
      const label = labelRef.current;
      const labelLine = labelLineRef.current;
      const corner = cornerRef.current;

      if (
        !section ||
        !wash ||
        !quoteMark ||
        !quoteElement ||
        !author ||
        !label ||
        !labelLine ||
        !corner
      ) {
        return;
      }

      const mediaQuery = gsap.matchMedia();

      /* =====================================================
         NORMAL MOTION

         Uses the same trigger, duration, and easing
         as QuoteBaldwin, QuoteAtlas, and QuoteAngelou.
      ===================================================== */

      mediaQuery.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          const timeline = gsap.timeline({
            paused: true,
          });

          timeline
            /* -----------------------------------------
               BACKGROUND COLOR WASH
            ----------------------------------------- */
            .fromTo(
              wash,
              {
                scaleX: 0,
                transformOrigin: "left center",
              },
              {
                scaleX: 1,
                duration: 1.35,
                ease: "power4.inOut",
              },
              0
            )

            /* -----------------------------------------
               QUOTE TEXT COLOR
            ----------------------------------------- */
            .to(
              quoteElement,
              {
                color: "#FFF6E8",
                duration: 0.8,
                ease: "power2.out",
              },
              0.45
            )

            /* -----------------------------------------
               AUTHOR COLOR
            ----------------------------------------- */
            .to(
              author,
              {
                color: "#F5E6CC",
                duration: 0.8,
                ease: "power2.out",
              },
              0.5
            )

            /* -----------------------------------------
               SECTION LABEL COLOR
            ----------------------------------------- */
            .to(
              label,
              {
                color: "#FFF6E8",
                duration: 0.8,
                ease: "power2.out",
              },
              0.45
            )

            /* -----------------------------------------
               LABEL DECORATIVE LINE
            ----------------------------------------- */
            .to(
              labelLine,
              {
                backgroundColor: "#FFF6E8",
                duration: 0.8,
                ease: "power2.out",
              },
              0.45
            )

            /* -----------------------------------------
               DECORATIVE CORNER COLOR
            ----------------------------------------- */
            .to(
              corner,
              {
                borderColor: "rgba(255,246,232,0.3)",
                duration: 0.8,
                ease: "power2.out",
              },
              0.45
            )

            /* -----------------------------------------
               QUOTE FADE AND SLIDE
            ----------------------------------------- */
            .fromTo(
              quoteElement,
              {
                y: 35,
                opacity: 0,
              },
              {
                y: 0,
                opacity: 1,
                duration: 0.9,
                ease: "power3.out",
              },
              0.45
            )

            /* -----------------------------------------
               AUTHOR FADE AND SLIDE
            ----------------------------------------- */
            .fromTo(
              author,
              {
                y: 18,
                opacity: 0,
              },
              {
                y: 0,
                opacity: 1,
                duration: 0.65,
                ease: "power3.out",
              },
              0.85
            )

            /* -----------------------------------------
               OPENING QUOTE MARK
            ----------------------------------------- */
            .fromTo(
              quoteMark,
              {
                opacity: 0,
                scale: 0.7,
                transformOrigin: "left center",
              },
              {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                ease: "back.out(1.5)",
              },
              0.45
            );

          /* -----------------------------------------
             SAME SCROLL TRIGGER AS OTHER QUOTES
          ----------------------------------------- */

          const trigger = ScrollTrigger.create({
            trigger: section,
            start: "top 82%",
            animation: timeline,
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          });

          return () => {
            trigger.kill();
            timeline.kill();
          };
        }
      );

      /* =====================================================
         REDUCED MOTION

         Show the finished colour scheme and all text
         immediately without animation.
      ===================================================== */

      mediaQuery.add(
        "(prefers-reduced-motion: reduce)",
        () => {
          gsap.set(wash, {
            scaleX: 1,
            transformOrigin: "left center",
          });

          gsap.set(quoteElement, {
            color: "#FFF6E8",
            opacity: 1,
            y: 0,
          });

          gsap.set(author, {
            color: "#F5E6CC",
            opacity: 1,
            y: 0,
          });

          gsap.set(quoteMark, {
            opacity: 1,
            scale: 1,
          });

          gsap.set(label, {
            color: "#FFF6E8",
          });

          gsap.set(labelLine, {
            backgroundColor: "#FFF6E8",
          });

          gsap.set(corner, {
            borderColor: "rgba(255,246,232,0.3)",
          });
        }
      );

      return () => {
        mediaQuery.revert();
      };
    },
    {
      scope: sectionRef,
    }
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
        w-full
        min-h-[100svh]
        items-center

        overflow-visible

        border-0
        bg-[#F5E6CC]

        px-6
        py-12

        text-[#704214]

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
      {/* ========================================
          COLOR WASH

          Matches the other quote sections.
          Absolute positioning preserves layout.
      ======================================== */}

      <div
        ref={washRef}
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-0

          origin-left
          scale-x-0

          bg-[#9C645E]
        "
      />

      {/* ========================================
          ORIGINAL CONTENT CONTAINER

          Same width, alignment, and spacing.
      ======================================== */}

      <div
        className="
          relative
          z-10

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
            ref={labelLineRef}
            aria-hidden="true"
            className="
              block
              h-px
              w-10

              bg-[#704214]

              sm:w-14

              [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:!w-8
            "
          />

          <p
            ref={labelRef}
            className="
              section-body

              text-[0.9rem]
              font-bold
              uppercase
              tracking-[0.18em]

              text-[#704214]

              sm:text-[1rem]

              [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:!text-[0.78rem]
            "
          >
            A Thought on Stories
          </p>
        </div>

        {/* ========================================
            QUOTE

            Original text, font sizing, line height,
            letter spacing, and word layout retained.
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

                Same position and dimensions.
            ======================================== */}

            <span
              ref={quoteMarkRef}
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

                Keeping inline-block and non-breaking
                spaces preserves the existing wrapping.
            ======================================== */}

            {words.map((word, index) => (
              <span
                key={`${word}-${index}`}
                className="
                  quote-word
                  inline-block
                "
              >
                {word}

                {index !== words.length - 1 && "\u00A0"}
              </span>
            ))}
          </p>

          {/* ========================================
              AUTHOR

              Same original position and spacing.
          ======================================== */}

          <footer
            ref={authorRef}
            aria-hidden="true"
            className="
              quote-author

              mt-7

              flex
              flex-col
              items-start

              gap-1

              text-[#566735]

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

                text-inherit

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

                text-inherit
                opacity-75

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

          Same exact position and size.
          Only the border colour changes.
      ======================================== */}

      <div
        ref={cornerRef}
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
          border-[#704214]/30

          md:block

          lg:bottom-10
          lg:right-10

          [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:!hidden
        "
      />
    </section>
  );
}
