import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);


export default function QuoteAtlas() {
  const sectionRef = useRef(null);

  const quoteMarkRef = useRef(null);

  const foldOneRef = useRef(null);
  const foldTwoRef = useRef(null);
  const foldThreeRef = useRef(null);

  const authorRef = useRef(null);


  useGSAP(
    () => {
      const section =
        sectionRef.current;

      const quoteMark =
        quoteMarkRef.current;

      const foldOne =
        foldOneRef.current;

      const foldTwo =
        foldTwoRef.current;

      const foldThree =
        foldThreeRef.current;

      const author =
        authorRef.current;


      if (
        !section ||
        !quoteMark ||
        !foldOne ||
        !foldTwo ||
        !foldThree ||
        !author
      ) {
        return;
      }


      const folds = [
        foldOne,
        foldTwo,
        foldThree,
      ];


      /* =====================================================
         ORIGAMI SETUP
      ===================================================== */

      gsap.set(
        folds,
        {
          transformPerspective:
            1200,

          transformOrigin:
            "top center",

          backfaceVisibility:
            "hidden",
        },
      );


      /* =====================================================
         ORIGAMI ANIMATION

         Same animation on every device.
      ===================================================== */

      const timeline = gsap.timeline({
        paused: true,
      });


      timeline
        .from(
          quoteMark,
          {
            opacity: 0,

            y: -20,

            duration: 0.6,

            ease:
              "power2.out",
          },
        )

        .from(
          folds,
          {
            rotateX: -88,

            y: -24,

            opacity: 0,

            scaleY: 0.72,

            duration: 1,

            stagger: 0.18,

            ease:
              "power4.out",
          },
          "-=0.25",
        )

        .from(
          author,
          {
            opacity: 0,

            y: 20,

            duration: 0.75,

            ease:
              "power3.out",
          },
          "-=0.2",
        );


      /* =====================================================
         SCROLL TRIGGER

         Same trigger on every device.
         No pinning.
         No global refresh.
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
      data-cursor-theme="light"
      className="
        relative

        flex

        h-screen
        h-[100svh]

        items-center

        overflow-hidden

        bg-[#704214]

        px-5

        text-[#FFF6E8]

        sm:px-8

        md:px-10

        lg:px-14

        xl:px-20
      "
    >
      {/* =================================================
          SUBTLE BACKGROUND RULE
      ================================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          left-0
          top-1/2

          h-px
          w-full

          bg-[#FFF6E8]/10
        "
      />


      <div
        className="
          relative
          z-10

          mx-auto

          w-full
          max-w-7xl
        "
      >
        <div
          className="
            mx-auto

            w-full
            max-w-5xl

            lg:max-w-6xl
          "
        >
          {/* =================================================
              QUOTE MARK
          ================================================= */}

          <div
            ref={quoteMarkRef}
            aria-hidden="true"
            className="
              mb-3

              font-[Georgia]

              text-[3rem]
              font-bold

              leading-[0.8]

              text-[#F5E6CC]

              sm:mb-4
              sm:text-[3.4rem]

              md:mb-5
              md:text-[4rem]

              lg:text-[4.5rem]

              xl:text-[5rem]

              [@media(max-height:650px)]:mb-3

              [@media(max-height:650px)]:text-[3.2rem]

              [@media(max-height:500px)]:mb-2

              [@media(max-height:500px)]:text-[2.5rem]

              [@media(max-height:400px)]:text-[2rem]
            "
          >
            “
          </div>


          {/* =================================================
              ORIGAMI QUOTE
          ================================================= */}

          <blockquote
            className="
              flex
              flex-col

              gap-3

              font-['Book_Antiqua','Palatino_Linotype',Palatino,serif]

              text-[0.96rem]
              font-normal

              leading-[1.42]

              sm:gap-4
              sm:text-[1.05rem]

              md:text-[1.18rem]

              lg:gap-5
              lg:text-[1.28rem]

              xl:text-[1.67rem]

              2xl:text-[1.45rem]

              [perspective:1200px]

              [@media(max-height:700px)]:gap-3

              [@media(max-height:700px)]:text-[1.08rem]

              [@media(max-height:600px)]:gap-2.5

              [@media(max-height:600px)]:text-[1rem]

              [@media(max-height:500px)]:gap-2

              [@media(max-height:500px)]:text-[0.88rem]

              [@media(max-height:500px)]:leading-[1.3]

              [@media(max-height:420px)]:text-[0.8rem]

              [@media(max-height:420px)]:leading-[1.25]

              [@media(max-height:350px)]:text-[0.72rem]

              [@media(max-height:350px)]:leading-[1.18]
            "
          >
            {/* =================================================
                FOLD ONE
            ================================================= */}

            <div
              ref={foldOneRef}
              className="
                border
                border-[#FFF6E8]/15

                bg-[#FFF6E8]/[0.06]

                px-5
                py-4

                backdrop-blur-[2px]

                sm:px-7
                sm:py-5

                md:px-8
                md:py-5

                lg:px-10
                lg:py-6

                xl:px-11
                xl:py-6

                [transform-style:preserve-3d]

                [@media(max-height:700px)]:py-4

                [@media(max-height:600px)]:py-3

                [@media(max-height:500px)]:px-5

                [@media(max-height:500px)]:py-2.5

                [@media(max-height:420px)]:py-2

                [@media(max-height:350px)]:py-1.5
              "
            >
              In ways that often feel mysterious, emotional material left
              unprocessed tends to appear and reappear in our lives.
            </div>


            {/* =================================================
                FOLD TWO
            ================================================= */}

            <div
              ref={foldTwoRef}
              className="
                border
                border-[#FFF6E8]/15

                bg-[#FFF6E8]/[0.08]

                px-5
                py-4

                backdrop-blur-[2px]

                sm:px-7
                sm:py-5

                md:px-8
                md:py-5

                lg:px-10
                lg:py-6

                xl:px-11
                xl:py-6

                [transform-style:preserve-3d]

                [@media(max-height:700px)]:py-4

                [@media(max-height:600px)]:py-3

                [@media(max-height:500px)]:px-5

                [@media(max-height:500px)]:py-2.5

                [@media(max-height:420px)]:py-2

                [@media(max-height:350px)]:py-1.5
              "
            >
              The unexamined life repeats itself and reverberates through the
              generations. The untold stories clamor for reenactment - they
              insist on being told.
            </div>


            {/* =================================================
                FOLD THREE
            ================================================= */}

            <div
              ref={foldThreeRef}
              className="
                border
                border-[#FFF6E8]/15

                bg-[#FFF6E8]/[0.1]

                px-5
                py-4

                backdrop-blur-[2px]

                sm:px-7
                sm:py-5

                md:px-8
                md:py-5

                lg:px-10
                lg:py-6

                xl:px-11
                xl:py-6

                [transform-style:preserve-3d]

                [@media(max-height:700px)]:py-4

                [@media(max-height:600px)]:py-3

                [@media(max-height:500px)]:px-5

                [@media(max-height:500px)]:py-2.5

                [@media(max-height:420px)]:py-2

                [@media(max-height:350px)]:py-1.5
              "
            >
              That which cannot be consciously identified forces itself into
              our reality and repeats itself.
            </div>
          </blockquote>


          {/* =================================================
              AUTHOR
          ================================================= */}

          <div
            ref={authorRef}
            className="
              mt-5

              border-l-2
              border-[#9C645E]

              pl-4

              sm:mt-6
              sm:pl-5

              md:mt-7

              lg:mt-8
              lg:pl-6

              [@media(max-height:700px)]:mt-5

              [@media(max-height:600px)]:mt-4

              [@media(max-height:500px)]:mt-3

              [@media(max-height:420px)]:mt-2
            "
          >
            <p
              className="
                font-['Cormorant_Garamond',serif]

                text-[1.25rem]
                font-semibold

                leading-[1.25]

                text-[#F5E6CC]

                sm:text-[1.1rem]

                md:text-[1.2rem]

                lg:text-[1.3rem]

                xl:text-[1.4rem]

                [@media(max-height:700px)]:text-[1.05rem]

                [@media(max-height:600px)]:text-[0.95rem]

                [@media(max-height:500px)]:text-[0.85rem]

                [@media(max-height:420px)]:text-[0.78rem]
              "
            >
              — Galit Atlas
            </p>


            <p
              className="
                mt-1

                font-['Cormorant_Garamond',serif]

                text-[0.85rem]

                italic

                leading-[1.25]

                text-[#FFF6E8]/75

                sm:text-[0.95rem]

                md:text-[1rem]

                lg:text-[1.05rem]

                xl:text-[1.2rem]

                [@media(max-height:700px)]:text-[0.88rem]

                [@media(max-height:600px)]:text-[0.8rem]

                [@media(max-height:500px)]:text-[0.72rem]

                [@media(max-height:420px)]:text-[0.66rem]
              "
            >
              Emotional Inheritance: A Therapist, Her Patients, and the Legacy
              of Trauma
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}