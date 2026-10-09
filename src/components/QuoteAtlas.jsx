import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);


export default function QuoteAtlas() {
  const sectionRef = useRef(null);
  const washRef = useRef(null);
  const quoteMarkRef = useRef(null);
  const quoteRef = useRef(null);
  const authorRef = useRef(null);


  useGSAP(
    () => {
      const section =
        sectionRef.current;

      const wash =
        washRef.current;

      const quoteMark =
        quoteMarkRef.current;

      const quote =
        quoteRef.current;

      const author =
        authorRef.current;


      if (
        !section ||
        !wash ||
        !quoteMark ||
        !quote ||
        !author
      ) {
        return;
      }


      /* =====================================================
         ORIGINAL COLOR WASH ANIMATION
      ===================================================== */

      const timeline = gsap.timeline({
        paused: true,
      });


      timeline
        .fromTo(
          wash,
          {
            scaleX: 0,

            transformOrigin:
              "left center",
          },
          {
            scaleX: 1,

            duration: 1.35,

            ease:
              "power4.inOut",
          },
        )

        .to(
          quote,
          {
            color:
              "#FFF6E8",

            duration: 0.8,

            ease:
              "power2.out",
          },
          0.45,
        )

        .to(
          author,
          {
            color:
              "#F5E6CC",

            duration: 0.8,

            ease:
              "power2.out",
          },
          0.5,
        )

        .from(
          quote,
          {
            y: 35,

            opacity: 0,

            duration: 0.9,

            ease:
              "power3.out",
          },
          0.45,
        )

        .from(
          author,
          {
            y: 18,

            opacity: 0,

            duration: 0.65,

            ease:
              "power3.out",
          },
          0.85,
        )

        .from(
          quoteMark,
          {
            opacity: 0,

            scale: 0.7,

            duration: 0.6,

            ease:
              "back.out(1.5)",
          },
          0.45,
        );


      /* =====================================================
         SAME TRIGGER ON EVERY DEVICE
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

        bg-[#F5E6CC]

        px-5

        text-[#1C1C1C]

        sm:px-8

        md:px-10

        lg:px-14

        xl:px-20
      "
    >
      {/* =================================================
          COLOR WASH
      ================================================= */}

      <div
        ref={washRef}
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0

          z-0

          bg-[#9C645E]
        "
      />


      {/* =================================================
          DECORATIVE GLOW
      ================================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          left-1/2
          top-1/2

          z-[1]

          h-[min(70vw,650px)]
          w-[min(70vw,650px)]

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          bg-[#FFF6E8]/10

          blur-[100px]
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

              text-[#FFF6E8]

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
              QUOTE
          ================================================= */}

          <blockquote
            ref={quoteRef}
            className="
              flex
              flex-col

              gap-6

              font-['Book_Antiqua','Palatino_Linotype',Palatino,serif]

              text-[0.96rem]
              font-normal

              leading-[1.42]

              sm:gap-4
              sm:text-[1.05rem]

              md:text-[1.18rem]

              lg:gap-9
              lg:text-[1.28rem]

              xl:text-[1.67rem]

              2xl:text-[1.45rem]

              text-[#704214]

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
                PARAGRAPH ONE
            ================================================= */}

            <p>
              In ways that often feel mysterious, emotional material left
              unprocessed tends to appear and reappear in our lives.
            </p>


            {/* =================================================
                PARAGRAPH TWO
            ================================================= */}

            <p>
              The unexamined life repeats itself and reverberates through the
              generations. The untold stories clamor for reenactment - they
              insist on being told.
            </p>


            {/* =================================================
                PARAGRAPH THREE
            ================================================= */}

            <p>
              That which cannot be consciously identified forces itself into
              our reality and repeats itself.
            </p>
          </blockquote>


          {/* =================================================
              AUTHOR
          ================================================= */}

          <div
            ref={authorRef}
            className="
              mt-11

              border-l-2
              border-[#F5E6CC]

              pl-4

              text-[#566735]

              sm:mt-6
              sm:pl-5

              md:mt-7

              lg:mt-12
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

                text-inherit

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

                text-[1rem]

                italic

                leading-[1.25]

                text-inherit

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