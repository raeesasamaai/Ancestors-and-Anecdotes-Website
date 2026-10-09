import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);


export default function QuoteAngelou() {
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

        px-6

        text-[#1C1C1C]

        sm:px-8

        md:px-12

        lg:px-16

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

            max-w-4xl

            text-center
          "
        >
          {/* =================================================
              QUOTE MARK
          ================================================= */}

          <div
            ref={quoteMarkRef}
            aria-hidden="true"
            className="
              mb-[clamp(0.25rem,1.3vh,1rem)]

              font-[Georgia]

              text-[clamp(3rem,8vh,5.2rem)]

              font-bold

              leading-none

              text-[#FFF6E8]

              [@media(max-height:400px)]:text-[2.5rem]
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
              font-['Book_Antiqua','Palatino_Linotype',Palatino,serif]

              text-[clamp(1.6rem,5vw,3.29rem)]

              font-normal

              leading-[1.22]

              text-[#704214]

              [@media(max-height:500px)]:text-[1.7rem]

              [@media(max-height:400px)]:text-[1.45rem]

              [@media(max-height:340px)]:text-[1.25rem]
            "
          >
            Know from whence you came. If you know whence you came, there are absolutely no limitations to where you can go.
          </blockquote>


          {/* =================================================
              AUTHOR
          ================================================= */}

          <p
            ref={authorRef}
            className="
              mt-[clamp(0.8rem,2.6vh,2.25rem)]

              font-['Cormorant_Garamond',serif]

              text-[clamp(1.5rem,2.4vh,1.4rem)]

              font-semibold

              tracking-[0.05em]

              text-[#566735]

              [@media(max-height:400px)]:text-[0.95rem]
            "
          >
            —  James Baldwin
          </p>
        </div>
      </div>
    </section>
  );
}