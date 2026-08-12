import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "What We Do", href: "#what-we-do" },
  { label: "About Us", href: "#about-us" },
  { label: "Examples", href: "#examples" },
  { label: "Packages", href: "#packages" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact Us", href: "#contact-us" },
];

const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

const lerp = (start, end, progress) => {
  return start + (end - start) * progress;
};

const mixColour = (start, end, progress) => {
  const red = Math.round(lerp(start[0], end[0], progress));
  const green = Math.round(lerp(start[1], end[1], progress));
  const blue = Math.round(lerp(start[2], end[2], progress));

  return `rgb(${red}, ${green}, ${blue})`;
};

const getResponsiveLayout = (width) => {
  // Mobile
  if (width < 640) {
    return {
      homeSide: 20,
      finalSide: 10,
      homeTop: 24,
      finalTop: 10,
      finalPaddingX: 18,
      finalPaddingY: 13,
    };
  }

  // Tablet
  if (width < 1024) {
    return {
      homeSide: 48,
      finalSide: 16,
      homeTop: 32,
      finalTop: 16,
      finalPaddingX: 28,
      finalPaddingY: 16,
    };
  }

  // Desktop
  return {
    homeSide: 88,
    finalSide: 18,
    homeTop: 42,
    finalTop: 18,
    finalPaddingX: 48,
    finalPaddingY: 20,
  };
};

export default function AnimatedNavbar() {
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const [viewportWidth, setViewportWidth] = useState(() => {
    return typeof window === "undefined" ? 1440 : window.innerWidth;
  });

  useEffect(() => {
    let animationFrameId;

    const updateNavbar = () => {
      cancelAnimationFrame(animationFrameId);

      animationFrameId = requestAnimationFrame(() => {
        const whatWeDoSection =
          document.getElementById("what-we-do");

        setViewportWidth(window.innerWidth);

        if (!whatWeDoSection) {
          setProgress(0);
          return;
        }

        const sectionTop =
          whatWeDoSection.getBoundingClientRect().top;

        /*
         * progress = 0:
         * What We Do has just entered the bottom of the screen.
         *
         * progress = 1:
         * What We Do has reached the top of the screen.
         */
        const nextProgress = clamp(
          (window.innerHeight - sectionTop) /
            window.innerHeight,
          0,
          1
        );

        setProgress(nextProgress);
      });
    };

    updateNavbar();

    window.addEventListener("scroll", updateNavbar, {
      passive: true,
    });

    window.addEventListener("resize", updateNavbar);

    return () => {
      cancelAnimationFrame(animationFrameId);

      window.removeEventListener(
        "scroll",
        updateNavbar
      );

      window.removeEventListener(
        "resize",
        updateNavbar
      );
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  const layout = getResponsiveLayout(viewportWidth);

  const sideInset = lerp(
    layout.homeSide,
    layout.finalSide,
    progress
  );

  const topPosition = lerp(
    layout.homeTop,
    layout.finalTop,
    progress
  );

  const paddingX = lerp(
    0,
    layout.finalPaddingX,
    progress
  );

  const paddingY = lerp(
    0,
    layout.finalPaddingY,
    progress
  );

  const textColour = mixColour(
    [255, 255, 255],
    [75, 46, 25],
    progress
  );

  const backgroundOpacity = 0.97 * progress;
  const borderOpacity = 0.12 * progress;
  const shadowOpacity = 0.16 * progress;

  return (
    <>
      <header
        className="fixed z-[100] border"
        style={{
          left: `${sideInset}px`,
          right: `${sideInset}px`,
          top: `${topPosition}px`,

          padding: `${paddingY}px ${paddingX}px`,

          borderRadius: `${999 * progress}px`,

          color: menuOpen
            ? "#F5E6CC"
            : textColour,

          backgroundColor: menuOpen
            ? "rgba(28, 28, 28, 0.96)"
            : `rgba(
                245,
                230,
                204,
                ${backgroundOpacity}
              )`,

          borderColor: menuOpen
            ? "rgba(245, 230, 204, 0.15)"
            : `rgba(
                112,
                66,
                20,
                ${borderOpacity}
              )`,

          boxShadow: menuOpen
            ? "none"
            : `0 ${10 * progress}px ${
                34 * progress
              }px rgba(
                28,
                28,
                28,
                ${shadowOpacity}
              )`,

          backdropFilter: `blur(${
            14 * progress
          }px)`,

          WebkitBackdropFilter: `blur(${
            14 * progress
          }px)`,

          transition:
            "background-color 120ms linear, color 120ms linear",
        }}
      >
        <nav className="flex w-full items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={() => setMenuOpen(false)}
            className="relative z-[102] whitespace-nowrap font-body text-[20px] font-medium leading-none tracking-[0.02em] sm:text-[24px] lg:text-[25px]"
          >
            Ancestors & Anecdotes
          </a>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-5 lg:flex xl:gap-[30px]">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative pb-[10px] font-body text-[18px] font-medium leading-none xl:text-[21px]"
              >
                {item.label}

                {item.label === "Home" ? (
                  <span className="absolute bottom-0 left-0 h-[2px] w-full bg-current" />
                ) : (
                  <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-current transition-[width] duration-300 group-hover:w-full" />
                )}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => {
              setMenuOpen((current) => !current);
            }}
            aria-label={
              menuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            className="relative z-[102] flex h-10 w-10 items-center justify-center lg:hidden"
          >
            <span className="relative block h-5 w-6">
              <motion.span
                className="absolute left-0 top-[2px] h-[2px] w-6 bg-current"
                animate={{
                  y: menuOpen ? 8 : 0,
                  rotate: menuOpen ? 45 : 0,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
              />

              <motion.span
                className="absolute left-0 top-[10px] h-[2px] w-6 bg-current"
                animate={{
                  opacity: menuOpen ? 0 : 1,
                }}
                transition={{
                  duration: 0.2,
                }}
              />

              <motion.span
                className="absolute left-0 top-[18px] h-[2px] w-6 bg-current"
                animate={{
                  y: menuOpen ? -8 : 0,
                  rotate: menuOpen ? -45 : 0,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
              />
            </span>
          </button>
        </nav>
      </header>

      {/* Mobile navigation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[99] flex min-h-[100svh] flex-col overflow-y-auto bg-[#1C1C1C] px-6 pb-10 pt-28 text-[#F5E6CC] sm:px-10 lg:hidden"
            initial={{
              opacity: 0,
              y: -25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -25,
            }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="section-name mb-8 text-[#F5E6CC]">
              Explore
            </p>

            <div className="flex flex-col">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between border-b border-white/15 py-4"
                  initial={{
                    opacity: 0,
                    x: -20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <span className="flex items-center gap-4">
                    <span className="font-body text-[13px] text-white/40">
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <span className="font-heading text-[26px] sm:text-[30px]">
                      {item.label}
                    </span>
                  </span>

                  <span className="text-[24px] text-white/50">
                    →
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}