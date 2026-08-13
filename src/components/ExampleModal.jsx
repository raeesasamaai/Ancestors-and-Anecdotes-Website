import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function ExampleModal({ example, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const previousExampleIdRef = useRef(example?.id);

  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previousFocusRef = useRef(null);

  const media = example?.media ?? [];
  const totalSlides = media.length;
  const activeMedia = media[currentSlide];

  const showPrevious = useCallback(() => {
    if (totalSlides <= 1) return;

    setCurrentSlide((current) =>
      current === 0 ? totalSlides - 1 : current - 1
    );
  }, [totalSlides]);

  const showNext = useCallback(() => {
    if (totalSlides <= 1) return;

    setCurrentSlide((current) =>
      current === totalSlides - 1 ? 0 : current + 1
    );
  }, [totalSlides]);

  // Reset the slideshow when another example opens.
  useEffect(() => {
    if (previousExampleIdRef.current === example?.id) {
      return undefined;
    }

    previousExampleIdRef.current = example?.id;

    const resetTimer = window.setTimeout(() => {
      setCurrentSlide(0);
    }, 0);

    return () => window.clearTimeout(resetTimer);
  }, [example?.id]);

  useEffect(() => {
    if (!example) return undefined;

    previousFocusRef.current = document.activeElement;

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
        return;
      }

      if (event.key === "ArrowRight") {
        showNext();
        return;
      }

      /*
       * Keep keyboard focus inside the modal.
       */
      if (event.key === "Tab" && dialogRef.current) {
        const focusableElements =
          dialogRef.current.querySelectorAll(
            `
              button:not([disabled]),
              a[href],
              video[controls],
              input:not([disabled]),
              select:not([disabled]),
              textarea:not([disabled]),
              [tabindex]:not([tabindex="-1"])
            `
          );

        const focusable = Array.from(focusableElements);

        if (!focusable.length) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (
          event.shiftKey &&
          document.activeElement === firstElement
        ) {
          event.preventDefault();
          lastElement.focus();
        }

        if (
          !event.shiftKey &&
          document.activeElement === lastElement
        ) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);

      document.body.style.overflow = previousBodyOverflow;

      previousFocusRef.current?.focus?.();
    };
  }, [example, onClose, showNext, showPrevious]);

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {example && (
        <motion.div
          className="
            fixed inset-0 z-[99999]
            flex items-center justify-center
            overflow-y-auto
            bg-[radial-gradient(circle_at_top,rgba(156,100,94,0.28),rgba(28,28,28,0.82)_48%,rgba(12,8,5,0.94)_100%)]
            px-3 py-4
            backdrop-blur-md
            sm:px-6 sm:py-8
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`example-title-${example.id}`}
            aria-describedby={`example-description-${example.id}`}
            data-cursor-theme="dark"
            className="
              relative my-auto
              max-h-[calc(100svh-2rem)]
              w-full max-w-[1000px]
              overflow-y-auto overscroll-contain
              rounded-[28px]
              bg-[#F5E6CC]
              text-[#1C1C1C]
              shadow-[0_30px_100px_rgba(0,0,0,0.55)]
              sm:rounded-[38px]
              md:max-h-[calc(100svh-4rem)]
              lg:rounded-[48px]
            "
            initial={{
              opacity: 0,
              y: 45,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 35,
              scale: 0.97,
            }}
            transition={{
              duration: 0.42,
              ease: [0.22, 1, 0.36, 1],
            }}
            onMouseDown={(event) => {
              event.stopPropagation();
            }}
          >
            {/* Close button */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close example"
              data-cursor="Close"
              className="
                absolute right-4 top-4 z-40
                flex h-11 w-11 items-center justify-center
                rounded-full
                bg-[#F5E6CC]/90
                font-body text-[32px] leading-none
                text-[#704214]
                shadow-md backdrop-blur-md
                transition
                hover:rotate-90 hover:bg-white
                focus:outline-none focus:ring-2
                focus:ring-[#704214]
                sm:right-6 sm:top-6
              "
            >
              ×
            </button>

            {/* Slideshow */}
            <div className="p-4 pb-0 sm:p-7 sm:pb-0 lg:p-12 lg:pb-0">
              <div
                className="
                  relative aspect-[16/10]
                  overflow-hidden
                  rounded-[20px]
                  bg-[#E8D4AE]
                  sm:rounded-[28px]
                  lg:rounded-[34px]
                "
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${example.id}-${currentSlide}`}
                    className="absolute inset-0"
                    initial={{
                      opacity: 0,
                      x: 35,
                      scale: 1.02,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      x: -35,
                      scale: 0.99,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {activeMedia?.type === "video" ? (
                      <video
                        src={activeMedia.src}
                        poster={activeMedia.poster}
                        controls
                        playsInline
                        preload="metadata"
                        aria-label={activeMedia.alt}
                        className="h-full w-full bg-black object-contain"
                      />
                    ) : (
                      <img
                        src={activeMedia?.src}
                        alt={activeMedia?.alt ?? ""}
                        className={
                          activeMedia?.fit === "contain"
                            ? "h-full w-full bg-[#E8D4AE] object-contain"
                            : "h-full w-full object-cover object-center"
                        }
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Sepia visual treatment */}
                {activeMedia?.type !== "video" && (
                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none absolute inset-0
                      bg-gradient-to-t
                      from-[#422508]/25
                      via-transparent
                      to-[#F5E6CC]/10
                      mix-blend-multiply
                    "
                  />
                )}

                {/* Previous arrow */}
                {totalSlides > 1 && (
                  <button
                    type="button"
                    onClick={showPrevious}
                    aria-label="Show previous media"
                    className="
                      absolute left-3 top-1/2 z-20
                      flex h-10 w-10 -translate-y-1/2
                      items-center justify-center rounded-full
                      bg-[#1C1C1C]/55 text-[24px] text-white
                      backdrop-blur-md transition
                      hover:bg-[#704214]
                      focus:outline-none focus:ring-2
                      focus:ring-white
                      sm:left-5 sm:h-12 sm:w-12
                    "
                  >
                    ‹
                  </button>
                )}

                {/* Next arrow */}
                {totalSlides > 1 && (
                  <button
                    type="button"
                    onClick={showNext}
                    aria-label="Show next media"
                    className="
                      absolute right-3 top-1/2 z-20
                      flex h-10 w-10 -translate-y-1/2
                      items-center justify-center rounded-full
                      bg-[#1C1C1C]/55 text-[24px] text-white
                      backdrop-blur-md transition
                      hover:bg-[#704214]
                      focus:outline-none focus:ring-2
                      focus:ring-white
                      sm:right-5 sm:h-12 sm:w-12
                    "
                  >
                    ›
                  </button>
                )}

                {/* Slide count */}
                {totalSlides > 1 && (
                  <div
                    className="
                      absolute bottom-3 right-3 z-20
                      rounded-full bg-black/55
                      px-3 py-1
                      font-body text-[14px] text-white
                      backdrop-blur-md
                      sm:bottom-5 sm:right-5
                    "
                  >
                    {currentSlide + 1} / {totalSlides}
                  </div>
                )}
              </div>

              {/* Slide indicators */}
              {totalSlides > 1 && (
                <div
                  className="
                    mt-4 flex items-center justify-center gap-2
                  "
                >
                  {media.map((slide, index) => (
                    <button
                      key={`${slide.src}-${index}`}
                      type="button"
                      onClick={() => setCurrentSlide(index)}
                      aria-label={`Show slide ${index + 1}`}
                      aria-current={
                        currentSlide === index ? "true" : undefined
                      }
                      className={`
                        h-2.5 rounded-full transition-all duration-300
                        focus:outline-none focus:ring-2
                        focus:ring-[#704214]
                        ${
                          currentSlide === index
                            ? "w-9 bg-[#704214]"
                            : "w-2.5 bg-[#704214]/30 hover:bg-[#704214]/60"
                        }
                      `}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Modal content */}
            <div
              className="
                px-5 pb-6 pt-9
                sm:px-10 sm:pb-10
                lg:px-14 lg:pb-14 lg:pt-11
              "
            >
              <div>
                <h2
                  id={`example-title-${example.id}`}
                  className="
                    font-heading
                    text-[32px] font-normal leading-tight
                    text-[#704214]
                    sm:text-[40px]
                    lg:text-[46px]
                  "
                >
                  {example.modalTitle}
                </h2>

                <span
                  aria-hidden="true"
                  className="
                    mt-3 block h-[3px] w-[58px]
                    bg-[#704214]
                  "
                />
              </div>

              <p
                className="
                  mt-8 font-body text-[21px]
                  font-semibold italic leading-relaxed
                  text-[#704214]
                  sm:text-[24px]
                "
              >
                {example.subtitle}
              </p>

              <p
                id={`example-description-${example.id}`}
                className="
                  mt-7 font-body text-[19px]
                  font-medium leading-[1.6]
                  text-[#1C1C1C]
                  sm:text-[21px]
                "
              >
                {example.description}
              </p>

              <div className="mt-9">
                <h3
                  className="
                    font-heading text-[26px]
                    font-normal text-[#704214]
                    sm:text-[30px]
                  "
                >
                  What This Example Shows
                </h3>

                <ul className="mt-5 space-y-4">
                  {example.features.map((feature) => (
                    <li
                      key={feature}
                      className="
                        flex items-start gap-4
                        font-body text-[18px]
                        font-medium leading-relaxed
                        sm:text-[20px]
                      "
                    >
                      <span
                        aria-hidden="true"
                        className="
                          mt-1 flex h-7 w-7 shrink-0
                          items-center justify-center
                          rounded-full bg-[#704214]
                          text-[14px] text-[#F5E6CC]
                        "
                      >
                        ✓
                      </span>

                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-9">
                <h3
                  className="
                    font-heading text-[26px]
                    font-normal text-[#704214]
                    sm:text-[30px]
                  "
                >
                  Best For
                </h3>

                <p
                  className="
                    mt-4 font-body text-[19px]
                    font-medium leading-[1.6]
                    sm:text-[21px]
                  "
                >
                  {example.bestFor}
                </p>
              </div>

              <a
                href="#contact-us"
                onClick={onClose}
                className="
                  mt-10 flex min-h-[58px] w-full
                  items-center justify-center
                  rounded-[18px]
                  bg-[#566735]
                  px-5 py-3 text-center
                  font-body text-[20px]
                  font-semibold text-[#F5E6CC]
                  transition duration-300
                  hover:bg-[#704214]
                  focus:outline-none focus:ring-2
                  focus:ring-[#704214]
                  focus:ring-offset-2
                  sm:text-[24px]
                "
              >
                {example.cta}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
