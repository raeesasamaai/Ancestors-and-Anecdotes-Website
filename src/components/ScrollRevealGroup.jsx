import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ScrollRevealGroup({
  children,
  className = "",
  y = 45,
  duration = 0.8,
  stagger = 0.16,
  start = "top 82%",
}) {
  const groupRef = useRef(null);

  useGSAP(
    () => {
      const group = groupRef.current;

      if (!group) return;

      const items = gsap.utils.toArray(
        "[data-reveal-item]",
        group
      );

      if (!items.length) return;

      const mediaQuery = gsap.matchMedia();

      /*
       * Desktop:
       * Reveal all five cards from left to right,
       * with a small delay between each card.
       */
      mediaQuery.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.fromTo(
            items,
            {
              autoAlpha: 0,
              y,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration,
              stagger,
              ease: "power3.out",

              scrollTrigger: {
                trigger: group,
                start,
                toggleActions: "play none none none",
              },
            }
          );
        }
      );

      /*
       * Mobile and tablet:
       * Reveal each step when that individual step
       * enters the viewport.
       */
      mediaQuery.add(
        "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        () => {
          items.forEach((item) => {
            gsap.fromTo(
              item,
              {
                autoAlpha: 0,
                y,
              },
              {
                autoAlpha: 1,
                y: 0,
                duration,
                ease: "power3.out",

                scrollTrigger: {
                  trigger: item,
                  start: "top 88%",
                  toggleActions: "play none none none",
                },
              }
            );
          });
        }
      );

      /*
       * Accessibility:
       * Show everything immediately when reduced
       * motion is enabled.
       */
      mediaQuery.add(
        "(prefers-reduced-motion: reduce)",
        () => {
          gsap.set(items, {
            autoAlpha: 1,
            y: 0,
          });
        }
      );

      return () => {
        mediaQuery.revert();
      };
    },
    {
      scope: groupRef,
      dependencies: [
        y,
        duration,
        stagger,
        start,
      ],
      revertOnUpdate: true,
    }
  );

  return (
    <div
      ref={groupRef}
      className={className}
    >
      {children}
    </div>
  );
}