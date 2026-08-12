import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ScrollReveal({
  children,
  as: Tag = "div",
  className = "",
  y = 60,
  duration = 0.9,
  delay = 0,
  start = "top 85%",
  once = true,
}) {
  const elementRef = useRef(null);

  useGSAP(
    () => {
      const element = elementRef.current;

      if (!element) return;

      const mediaQuery = gsap.matchMedia();

      /*
       * Normal motion
       */
      mediaQuery.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          gsap.fromTo(
            element,
            {
              autoAlpha: 0,
              y,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration,
              delay,
              ease: "power3.out",

              scrollTrigger: {
                trigger: element,

                /*
                 * Start when the top of the element reaches
                 * 85% down the viewport.
                 */
                start,

                /*
                 * Play once, or reverse when scrolling upward.
                 */
                toggleActions: once
                  ? "play none none none"
                  : "play none none reverse",
              },
            }
          );
        }
      );

      /*
       * Reduced-motion accessibility
       */
      mediaQuery.add(
        "(prefers-reduced-motion: reduce)",
        () => {
          gsap.set(element, {
            autoAlpha: 1,
            y: 0,
          });
        }
      );

      return () => mediaQuery.revert();
    },
    {
      scope: elementRef,
      dependencies: [
        y,
        duration,
        delay,
        start,
        once,
      ],
      revertOnUpdate: true,
    }
  );

  return (
    <Tag
      ref={elementRef}
      className={`
        will-change-[opacity,transform]
        ${className}
      `}
    >
      {children}
    </Tag>
  );
}