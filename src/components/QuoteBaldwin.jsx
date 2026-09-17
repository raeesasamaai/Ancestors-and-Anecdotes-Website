import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);


export default function QuoteBaldwin() {
  const sectionRef = useRef(null);
  const quoteRef = useRef(null);
  const wipeRef = useRef(null);
  const authorRef = useRef(null);
  const lineRef = useRef(null);


  useGSAP(
    () => {
      const quote = quoteRef.current;
      const wipe = wipeRef.current;
      const author = authorRef.current;
      const line = lineRef.current;
      const section = sectionRef.current;


      if (
        !section ||
        !quote ||
        !wipe ||
        !author ||
        !line
      ) {
        return;
      }


      /* =====================================================
         ORIGINAL REVEAL WIPE ANIMATION

         Same animation on:
         - mobile portrait
         - mobile landscape
         - tablets
         - iPads
         - laptops
         - desktops
      ===================================================== */

      const timeline = gsap.timeline({
        paused: true,
      });


      timeline
        .set(
          quote,
          {
            opacity: 1,
          },
        )

        .from(
          quote,
          {
            y: 28,

            duration: 0.8,

            ease: "power3.out",
          },
          0,
        )

        .fromTo(
          wipe,
          {
            scaleX: 1,

            transformOrigin:
              "left center",
          },
          {
            scaleX: 0,

            transformOrigin:
              "right center",

            duration: 1.25,

            ease:
              "power4.inOut",
          },
          0.05,
        )

        .from(
          author,
          {
            y: 18,

            opacity: 0,

            duration: 0.7,

            ease:
              "power3.out",
          },
          "-=0.3",
        )

        .from(
          line,
          {
            scaleX: 0,

            transformOrigin:
              "left center",

            duration: 0.7,

            ease:
              "power3.out",
          },
          "-=0.45",
        );


      /* =====================================================
         SCROLL TRIGGER

         No device-specific trigger logic.
         No pinning.
         No ScrollTrigger.refresh().
      ===================================================== */

      const trigger = ScrollTrigger.create({
        trigger: section,

        start: "top 82%",

        animation: timeline,

        toggleActions:
          "play none none reverse",

        invalidateOnRefresh:
          true,
      });


      return () => {
        trigger.kill();
        timeline.kill();
      };
    },
    {
      scope: sectionRef,
    },
  );


  return (
    <section
      ref={sectionRef}
      data-cursor-theme="dark"
      className="
        relative

        flex

        h-screen
        h-[100svh]

        items-center

        overflow-hidden

        bg-[#FFF6E8]

        px-6

        text-[#1C1C1C]

        sm:px-8

        md:px-12

        lg:px-16

        xl:px-20
      "
    >
      <div
        className="
          mx-auto

          w-full
          max-w-7xl
        "
      >
        <div
          className="
            mx-auto

            max-w-5xl

            text-center
          "
        >
          {/* =================================================
              QUOTE MARK
          ================================================= */}

          <div
            aria-hidden="true"
            className="
              mb-[clamp(0.4rem,1.6vh,1.25rem)]

              font-[Georgia]

              text-[clamp(2.6rem,7vh,5rem)]

              font-bold

              leading-none

              text-[#9C645E]
            "
          >
            “
          </div>


          {/* =================================================
              REVEAL WIPE
          ================================================= */}

          <div
            className="
              relative

              overflow-hidden
            "
          >
            <blockquote
              ref={quoteRef}
              className="
                relative
                z-10

                opacity-0

                font-['Book_Antiqua','Palatino_Linotype',Palatino,serif]

                text-[clamp(1.55rem,4vw,2.9rem)]

                font-normal

                leading-[1.28]

                text-[#704214]

                [@media(max-height:500px)]:text-[1.4rem]

                [@media(max-height:400px)]:text-[1.25rem]

                [@media(max-height:340px)]:text-[1.1rem]
              "
            >
              Know from whence you came. If you know whence you came,
              there are absolutely no limitations to where you can go.
            </blockquote>


            <div
              ref={wipeRef}
              aria-hidden="true"
              className="
                pointer-events-none

                absolute
                inset-0

                z-20

                bg-[#9C645E]
              "
            />
          </div>


          {/* =================================================
              ACCENT LINE
          ================================================= */}

          <div
            ref={lineRef}
            aria-hidden="true"
            className="
              mx-auto

              mt-[clamp(1rem,3vh,2.25rem)]

              h-[2px]

              w-14

              bg-[#9C645E]

              sm:w-16
            "
          />


          {/* =================================================
              AUTHOR
          ================================================= */}

          <p
            ref={authorRef}
            className="
              mt-[clamp(0.75rem,2vh,1.5rem)]

              font-['Cormorant_Garamond',serif]

              text-[clamp(1rem,2.4vh,1.35rem)]

              font-semibold

              tracking-[0.04em]

              text-[#566735]

              [@media(max-height:400px)]:text-[0.95rem]
            "
          >
            — James Baldwin
          </p>
        </div>
      </div>
    </section>
  );
}