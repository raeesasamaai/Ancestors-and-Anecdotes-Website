import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ScrollFadeTransition({
  from,
  to,
  start = "top bottom",
  end = "top 20%",
  fadeInNext = true,
  scalePrevious = 0.98,
}) {
  useGSAP(
    () => {
      const previousSection = document.querySelector(from);
      const nextSection = document.querySelector(to);

      if (!previousSection || !nextSection) {
        console.warn(
          `ScrollFadeTransition could not find "${from}" or "${to}".`
        );

        return;
      }

      const mediaQuery = gsap.matchMedia();

      mediaQuery.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: nextSection,

              // Begins when the next section first enters the viewport.
              start,

              // Finishes when the next section reaches 35% from the top.
              end,

              // Connects animation progress directly to scrolling.
              scrub: true,

              invalidateOnRefresh: true,
            },
          });

          // Fade and slightly scale the previous section.
          timeline.fromTo(
            previousSection,
            {
              opacity: 1,
              
            },
            {
              opacity: 0,
              
              transformOrigin: "center center",
              ease: "none",
            },
            0
          );

          // Optionally fade the incoming section in.
          if (fadeInNext) {
            timeline.fromTo(
              nextSection,
              {
                opacity: 0.5,
              },
              {
                opacity: 1,
                ease: "0.5",
              },
              0
            );
          }

          return () => {
            timeline.kill();
          };
        }
      );

      mediaQuery.add(
        "(prefers-reduced-motion: reduce)",
        () => {
          gsap.set([previousSection, nextSection], {
            clearProps: "opacity,transform,visibility",
          });
        }
      );

      return () => {
        mediaQuery.revert();

        gsap.set([previousSection, nextSection], {
          clearProps: "opacity,transform,visibility",
        });
      };
    },
    {
      dependencies: [
        from,
        to,
        start,
        end,
        fadeInNext,
        
      ],
    }
  );

  return null;
}