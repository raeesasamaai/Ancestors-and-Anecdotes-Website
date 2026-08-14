import { useRef } from "react";
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

  useGSAP(
    () => {
      /*
       * This now selects:
       * - opening quotation mark
       * - every word
       * - closing quotation mark
       */
      const wordElements =
        quoteRef.current?.querySelectorAll(".quote-word");

      if (!wordElements?.length) return;

      const mediaQuery = gsap.matchMedia();

      /*
       * Desktop and tablet animation
       */
      mediaQuery.add("(min-width: 768px)", () => {
        gsap.set(wordElements, {
          color: "rgba(255, 246, 232, 0.2)",
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=170%",
            pin: true,
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(wordElements, {
            color: "#FFF6E8",
            stagger: {
              each: 0.075,
              from: "start",
            },
            ease: "none",
          })
          .fromTo(
            ".quote-author",
            {
              opacity: 0,
              y: 20,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: "power2.out",
            },
            "-=0.15"
          );
      });

      /*
       * Mobile animation
       *
       * It remains scroll-driven, but the pin duration is shorter
       * so the section does not feel too slow on a small screen.
       */
      mediaQuery.add("(max-width: 767px)", () => {
        gsap.set(wordElements, {
          color: "rgba(255, 246, 232, 0.2)",
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=120%",
            pin: true,
            scrub: 0.55,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(wordElements, {
            color: "#FFF6E8",
            stagger: {
              each: 0.06,
              from: "start",
            },
            ease: "none",
          })
          .fromTo(
            ".quote-author",
            {
              opacity: 0,
              y: 14,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.35,
              ease: "power2.out",
            },
            "-=0.1"
          );
      });

      /*
       * Accessibility:
       * disable the motion when reduced motion is requested.
       */
      mediaQuery.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(wordElements, {
          clearProps: "all",
          color: "#FFF6E8",
        });

        gsap.set(".quote-author", {
          clearProps: "all",
          opacity: 1,
          y: 0,
        });
      });

      return () => mediaQuery.revert();
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
        flex h-[100svh] min-h-[100svh]
        w-full
        items-center
        overflow-hidden
        border-0
        bg-[#462505]
        px-6
        py-20
        text-[#FFF6E8]
        will-change-opacity
        shadow-[0_2px_0_#F5E6CC]
        outline-none
        sm:px-10
        md:px-16
        lg:px-20
        xl:px-24
      "
    >
      <div className="mx-auto w-full max-w-[1500px]">
        {/* Small section label */}
        <div
          className="
            mb-10
            flex items-center
            gap-4
            md:mb-12
            lg:mb-14
          "
        >
          <span
            aria-hidden="true"
            className="
              block h-px
              w-10
              bg-[#FFF6E8]
              sm:w-14
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
            "
          >
            A Thought on Stories
          </p>
        </div>

        <blockquote
          aria-label={`${quote} Salman Rushdie, Haroun and the Sea of Stories`}
          className="m-0"
        >
          {/* Quote */}
          <p
            ref={quoteRef}
            aria-hidden="true"
            className="
              m-0
              max-w-[1400px]
              font-['Book_Antiqua','Palatino_Linotype',Palatino,serif]
              text-[clamp(2.15rem,5.1vw,5.8rem)]
              font-normal
              leading-[1.04]
              tracking-[-0.035em]
            "
          >
            {/* Opening quotation mark - sits above the quote
            and remains part of the GSAP scrolling reveal */}
              <span
                aria-hidden="true"
                className="
                  quote-word
                  block
                  h-10
                  w-fit
                  mb-8
                  font-['Georgia',serif]
                  text-[1.6em]
                  font-bold
                  
                  will-change-[color]
                  sm:mb-12
                "
              >
                “
              </span>

            {/* Quote words */}
            {words.map((word, index) => (
              <span
                key={`${word}-${index}`}
                className="
                  quote-word
                  inline-block
                  will-change-[color]
                "
              >
                {word}
                {index !== words.length - 1 && "\u00A0"}
              </span>
            ))}

            {/* Closing quotation mark
                quote-word makes it the final part of the GSAP reveal */}
            {/* <span
              aria-hidden="true"
              className="
                quote-word
                ml-2
                inline-block
                align-[-0.08em]
                font-['Georgia',serif]
                text-[1.25em]
                font-bold
                leading-none
                will-change-[color]
                sm:ml-3
              "
            >
              ”
            </span> */}
          </p>

          {/* Author */}
          <footer
            aria-hidden="true"
            className="
              quote-author
              mt-10
              flex flex-col
              items-start
              gap-1
              opacity-0
              sm:mt-12
              md:mt-14
            "
          >
            <cite
              className="
                section-body
                not-italic
                text-[1.15rem]
                font-semibold
                text-[#FFF6E8]
                sm:text-[1.4rem]
              "
            >
              Salman Rushdie
            </cite>

            <span
              className="
                section-body
                text-[1rem]
                italic
                font
                text-[#FFF6E8]/75
                sm:text-[1.2rem]
              "
            >
              Haroun and the Sea of Stories
            </span>
          </footer>
        </blockquote>
      </div>

      {/* Covers the thin full-width seam created at the pinned boundary */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          z-10
          h-[2px]
          bg-[#F5E6CC]
        "
      />

      {/* Decorative corner marker */}
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
        "
      />
    </section>
  );
}