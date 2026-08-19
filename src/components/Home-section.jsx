import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useLayoutEffect, useState } from "react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "What We Do", href: "#what-we-do" },
  { label: "Examples", href: "#examples" },
  { label: "Packages", href: "#packages" },
  { label: "Process", href: "#process" },
  { label: "About Us", href: "#about-us" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact Us", href: "#contact-us" },
];

const backgroundImages = [
  "/Images/hero-bg-1.png",
  "/Images/hero-bg-2.jpg",
  "/Images/hero-bg-3.jpg",
];

export default function HomeHero() {
  const [currentImage, setCurrentImage] = useState(0);

  const [isCompactNav, setIsCompactNav] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }

    return !window.matchMedia(
      "(min-width: 1280px)"
    ).matches;
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /*
   * Hero background slideshow
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(
        (prev) => (prev + 1) % backgroundImages.length
      );
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  /*
   * Keep iPads and tablets on the hamburger menu, and only
   * switch to the full nav on larger laptop/desktop screens.
   */
  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(min-width: 1280px)"
    );

    const handleChange = (event) => {
      setIsCompactNav(!event.matches);

      if (event.matches) {
        setIsMenuOpen(false);
      }
    };

    setIsCompactNav(!mediaQuery.matches);

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleChange
      );
    };
  }, []);

  /*
   * Close the menu when moving back to desktop.
   */
  useEffect(() => {
    if (!isCompactNav) {
      setIsMenuOpen(false);
    }
  }, [isCompactNav]);

  /*
   * Lock the page in place while the compact hero menu is open.
   *
   * Using fixed positioning prevents the background from drifting on
   * iPads and mobile Safari, where overflow hidden alone is not enough.
   */
  useLayoutEffect(() => {
    if (!isCompactNav || !isMenuOpen) {
      return undefined;
    }

    const html = document.documentElement;
    const body = document.body;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    const previous = {
      htmlOverflow: html.style.overflow,
      htmlOverscroll: html.style.overscrollBehavior,
      htmlScrollBehavior: html.style.scrollBehavior,
      bodyOverflow: body.style.overflow,
      bodyOverscroll: body.style.overscrollBehavior,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyWidth: body.style.width,
      bodyPaddingRight: body.style.paddingRight,
    };

    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";

    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = `-${scrollX}px`;
    body.style.right = "0";
    body.style.width = "100%";

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      html.style.scrollBehavior = "auto";

      html.style.overflow = previous.htmlOverflow;
      html.style.overscrollBehavior = previous.htmlOverscroll;

      body.style.overflow = previous.bodyOverflow;
      body.style.overscrollBehavior = previous.bodyOverscroll;
      body.style.position = previous.bodyPosition;
      body.style.top = previous.bodyTop;
      body.style.left = previous.bodyLeft;
      body.style.right = previous.bodyRight;
      body.style.width = previous.bodyWidth;
      body.style.paddingRight = previous.bodyPaddingRight;

      window.scrollTo({
        left: scrollX,
        top: scrollY,
        behavior: "auto",
      });

      requestAnimationFrame(() => {
        html.style.scrollBehavior = previous.htmlScrollBehavior;
      });
    };
  }, [isCompactNav, isMenuOpen]);

  /*
   * Existing What We Do navigation functionality.
   */
  const handleWhatWeDoClick = (event) => {
    event.preventDefault();

    const whatWeDoSection =
      document.getElementById("what-we-do");

    if (!whatWeDoSection) {
      return;
    }

    const sectionTop =
      whatWeDoSection.getBoundingClientRect().top +
      window.scrollY;

    window.history.pushState(
      null,
      "",
      "#what-we-do"
    );

    window.scrollTo({
      top: sectionTop,
      behavior: "smooth",
    });
  };

  /*
   * Mobile / tablet menu link handler.
   *
   * Existing navigation behaviour remains unchanged.
   * We only close the menu when a link is selected.
   */
  const handleCompactNavClick = (event, item) => {
    setIsMenuOpen(false);

    if (item.href === "#what-we-do") {
      handleWhatWeDoClick(event);
    }
  };

  return (
    <section
      id="home"
      data-cursor-theme="light"
      className="
        relative
        h-[100svh]
        min-h-[100svh]
        w-full
        overflow-hidden
        text-white
        will-change-[opacity,transform]
      "
    >
      {/* ========================================
          BACKGROUND SLIDESHOW
      ======================================== */}

      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <motion.img
            key={image}
            src={image}
            alt="Vintage genealogy archive desk"
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
            "
            initial={{
              scale: 1.09,
              opacity: 0,
            }}
            animate={{
              opacity:
                currentImage === index ? 1 : 0,

              scale:
                currentImage === index
                  ? 1
                  : 1.09,
            }}
            transition={{
              opacity: {
                duration: 2.2,
                ease: "easeInOut",
              },

              scale: {
                duration: 6,
                ease: "easeOut",
              },
            }}
          />
        ))}
      </div>

      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/18" />

      {/* ========================================
          NAVBAR
      ======================================== */}

      <header
        className="
          absolute
          left-0
          top-0
          z-20
          w-full
        "
      >
        <motion.nav
          className="
            px-6
            pt-8

            md:px-12

            lg:px-[88px]
            lg:pt-[37px]

            [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:pt-5
          "
        >
          {/* Main navbar row */}
          <div
            className="
              flex
              items-center
              justify-between
            "
          >
            {/* Logo / Brand */}
            <a
              href="#home"
              className="
              font-body
              text-[20px]
              pl-[0.5rem]
              font-medium
              leading-none
              tracking-[0.02em]
              text-white

              sm:text-[20px]

              [@media(min-width:768px)_and_(max-width:1023px)_and_(orientation:portrait)]:text-[21px]

              [@media(min-width:768px)_and_(max-width:1023px)_and_(orientation:landscape)]:text-[19px]

              lg:text-[28px]
            "
            >
              Ancestors &amp; Anecdotes
            </a>

            {/* ========================================
                DESKTOP NAVBAR
            ======================================== */}

            {!isCompactNav && (
              <div className="flex items-center">
                <div
                  className="
                    flex
                    items-center
                    gap-7
                    xl:gap-[30px]
                  "
                >
                  {navItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={
                        item.href ===
                        "#what-we-do"
                          ? handleWhatWeDoClick
                          : undefined
                      }
                      className="
                        group
                        relative
                        font-body
                        text-[23px]
                        font-medium
                        leading-none
                        text-white
                        xl:text-[21px]
                      "
                    >
                      {item.label}

                      {/* 
                          ACTIVE / HOVER LINE

                          Home remains underlined like before.

                          All other items animate their
                          underline from left to right on hover.
                      */}
                      <span
                        className={`
                          absolute
                          -bottom-[9px]
                          left-0
                          h-[1.9px]
                          w-full
                          origin-left
                          bg-white
                          transition-transform
                          duration-300
                          ease-[cubic-bezier(0.22,1,0.36,1)]

                          ${
                            item.label === "Home"
                              ? "scale-x-100"
                              : "scale-x-0 group-hover:scale-x-100"
                          }
                        `}
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================
                TABLET / MOBILE HAMBURGER
            ======================================== */}

            {isCompactNav && (
              <button
                type="button"
                aria-label={
                  isMenuOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
                }
                aria-expanded={isMenuOpen}
                aria-controls="home-navigation-menu"
                onClick={() =>
                  setIsMenuOpen(
                    (previous) => !previous
                  )
                }
                className="
                  relative
                  flex
                  h-[46px]
                  w-[46px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  text-white
                  transition
                  duration-300
                  hover:bg-white/10
                  active:scale-95
                  sm:h-[48px]
                  sm:w-[48px]
                "
              >
                <span className="sr-only">
                  {isMenuOpen
                    ? "Close menu"
                    : "Open menu"}
                </span>

                {/* Animated hamburger */}
                <span
                  className="
                    relative
                    block
                    h-[20px]
                    w-[26px]
                  "
                >
                  {/* Top line */}
                  <motion.span
                    className="
                      absolute
                      left-0
                      top-[1px]
                      h-[2px]
                      w-[26px]
                      rounded-full
                      bg-current
                    "
                    initial={false}
                    animate={{
                      y: isMenuOpen ? 8 : 0,
                      rotate: isMenuOpen ? 45 : 0,
                    }}
                    transition={{
                      duration: 0.32,
                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
                    }}
                  />

                  {/* Middle line */}
                  <motion.span
                    className="
                      absolute
                      left-0
                      top-[9px]
                      h-[2px]
                      w-[26px]
                      rounded-full
                      bg-current
                    "
                    initial={false}
                    animate={{
                      opacity:
                        isMenuOpen ? 0 : 1,

                      scaleX:
                        isMenuOpen ? 0 : 1,
                    }}
                    transition={{
                      duration: 0.22,
                      ease: "easeOut",
                    }}
                  />

                  {/* Bottom line */}
                  <motion.span
                    className="
                      absolute
                      bottom-[1px]
                      left-0
                      h-[2px]
                      w-[26px]
                      rounded-full
                      bg-current
                    "
                    initial={false}
                    animate={{
                      y: isMenuOpen ? -8 : 0,

                      rotate:
                        isMenuOpen ? -45 : 0,
                    }}
                    transition={{
                      duration: 0.32,
                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
                    }}
                  />
                </span>
              </button>
            )}
          </div>

          {/* ========================================
              TABLET / MOBILE MENU
          ======================================== */}

          <AnimatePresence>
            {isCompactNav && isMenuOpen && (
              <motion.div
                id="home-navigation-menu"
                initial={{
                  opacity: 0,
                  y: -18,
                  scale: 0.98,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -14,
                  scale: 0.985,
                }}
                transition={{
                  duration: 0.38,
                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
                className="
                mt-5
                overflow-hidden
                rounded-[28px]
                border
                border-white/15
                bg-black/45
                p-3
                shadow-[0_18px_50px_rgba(0,0,0,0.28)]
                backdrop-blur-xl

                sm:p-4

                md:mt-6
                md:rounded-[32px]
                md:p-5

                [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-3
                [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:max-h-[calc(100dvh-5.5rem)]
                [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:overflow-y-auto
                [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:overscroll-contain
                [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:touch-pan-y
              "
              >
                <motion.div
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={{
                    closed: {
                      transition: {
                        staggerChildren: 0.025,
                        staggerDirection: -1,
                      },
                    },

                    open: {
                      transition: {
                        delayChildren: 0.06,
                        staggerChildren: 0.055,
                      },
                    },
                  }}
                  className="
                    flex
                    flex-col
                  "
                >
                  {navItems.map((item) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      onClick={(event) =>
                        handleCompactNavClick(
                          event,
                          item
                        )
                      }
                      variants={{
                        closed: {
                          opacity: 0,
                          y: -10,
                        },

                        open: {
                          opacity: 1,
                          y: 0,

                          transition: {
                            duration: 0.3,
                            ease: [
                              0.22,
                              1,
                              0.36,
                              1,
                            ],
                          },
                        },
                      }}
                      className="
                        group
                        relative
                        flex
                        items-center
                        justify-between
                        rounded-[18px]
                        px-4
                        py-[13px]
                        font-body
                        text-[19px]
                        font-medium
                        leading-none
                        text-white
                        transition-colors
                        duration-300
                        hover:bg-white/10
                        sm:px-5
                        sm:py-[15px]
                        sm:text-[20px]
                        md:text-[22px]
                      "
                    >
                      <span className="relative">
                        {item.label}

                        {/* Mobile hover line */}
                        <span
                          className="
                            absolute
                            -bottom-[6px]
                            left-0
                            h-[1.8px]
                            w-full
                            origin-left
                            scale-x-0
                            bg-white
                            transition-transform
                            duration-300
                            ease-[cubic-bezier(0.22,1,0.36,1)]
                            group-hover:scale-x-100
                          "
                        />
                      </span>

                      {/* Small directional accent */}
                      <motion.span
                        aria-hidden="true"
                        className="
                          text-[20px]
                          font-light
                          text-white/60
                        "
                        initial={{
                          x: 0,
                        }}
                        whileHover={{
                          x: 4,
                        }}
                      >
                        →
                      </motion.span>
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </header>

      {/* ========================================
          HERO CONTENT
      ======================================== */}

      <div
        className="
          absolute
          bottom-[70px]
          left-8
          right-5
          z-10

          sm:left-6
          sm:right-6

          md:left-12
          md:right-12

          lg:bottom-[75px]
          lg:left-[88px]
          lg:right-auto

          [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:bottom-7

          [@media(min-width:640px)_and_(max-width:767px)_and_(orientation:landscape)_and_(max-height:600px)]:left-8
          [@media(min-width:640px)_and_(max-width:767px)_and_(orientation:landscape)_and_(max-height:600px)]:right-8

          [@media(min-width:768px)_and_(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:left-[56px]
          [@media(min-width:768px)_and_(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:right-[56px]
        "
      >
        <motion.h1
          className="
            font-section
            text-[clamp(3.4rem,10vw,2.9rem)]
            font-normal
            leading-[1.06]
            tracking-[0em]
            text-white

            sm:text-[4rem]
            sm:leading-[0.95]

            md:text-[5.4rem]

            lg:text-[6.55rem]

            [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:text-[clamp(1.8rem,4.1vw,2.3rem)]
            [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:leading-none
          "
          initial={{
            x: -100,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
            delay: 0.4,
          }}
        >
          {/* ========================================
                MOBILE PORTRAIT HEADING
            ======================================== */}

            <span
              className="
                block
                sm:hidden

                [@media(orientation:landscape)_and_(max-height:600px)]:hidden
              "
            >
              <span className="block whitespace-nowrap">
                Uncover The Stories
              </span>

              <span className="block whitespace-nowrap">
                That Are Waiting
              </span>

              <span className="block whitespace-nowrap">
                To Be Told
              </span>
            </span>


            {/* ========================================
                MOBILE LANDSCAPE HEADING
                Entire heading on one line
            ======================================== */}

            <span
              className="
                hidden
                text-[clamp(2.2rem,7vw,2.6rem)]
                [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:block
                [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:whitespace-nowrap
              "
            >
              Uncover The Stories That Are Waiting To Be Told
            </span>


            {/* ========================================
                TABLET / DESKTOP HEADING
            ======================================== */}

            <span
              className="
                hidden
                sm:block
                md:text-[5.7rem]
                [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:hidden
              "
            >
              <span className="block">
                Uncover The Stories That
              </span>

              <span className="block">
                Are Waiting To Be Told
              </span>
            </span>
        </motion.h1>

        <motion.p
          className="
            mt-5
            max-w-[20rem]
            font-body
            text-[clamp(1.28rem,4.6vw,1.2rem)]
            font-medium
            leading-[1.45]
            tracking-[0.02em]
            text-white

            sm:mt-6
            sm:max-w-[44rem]
            sm:text-[1.45rem]
            sm:leading-[1.35]

            md:text-[1.6rem]

            lg:mt-[30px]
            lg:text-[26px]

            [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-3
            [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:max-w-[31rem]
            [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:text-[0.95rem]
            [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:leading-[1.3]
          "
          initial={{
            x: -90,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.9,
            ease: "easeOut",
            delay: 0.5,
          }}
        >
          <span
            className="
              inline

              [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:hidden
            "
          >
            Personalized genealogy research to uncover,
            preserve,
            <br className="hidden sm:block" />
            and share the stories behind your ancestry.
          </span>

          {/* Short landscape phone copy */}
          <span
            className="
              hidden

              [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:inline
            "
          >
            Personalized genealogy research to uncover, preserve,
            and share the stories behind your ancestry.
          </span>
        </motion.p>
      </div>

      {/* ========================================
          SCROLL INDICATOR
      ======================================== */}

      <motion.div
        className="
          absolute
          bottom-[58px]
          right-4
          z-10
          hidden
          items-center
          gap-[14px]
          text-white

          md:flex
          md:right-8

          lg:bottom-[75px]
          lg:right-[70px]
          lg:gap-[18px]

          [@media(min-width:768px)_and_(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:bottom-7
          [@media(min-width:768px)_and_(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:right-[56px]
        "
        initial={{
          opacity: 0,
          y: 50,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          delay: 0.6,
        }}
      >
        <p
          className="
            font-body
            text-[16px]
            font-medium
            leading-none
            lg:text-[20px]
          "
        >
          Scroll to explore
        </p>

        <div
          className="
            relative
            h-[42px]
            w-[28px]
            rounded-full
            border-[2px]
            border-white
            opacity-75
            lg:h-[50px]
            lg:w-[32px]
          "
        >
          <motion.div
            className="
              absolute
              left-1/2
              top-[0.5rem]
              h-[5px]
              w-[5px]
              rounded-full
              bg-white
              opacity-70
              will-change-transform
              lg:top-[0.6rem]
              lg:h-[6px]
              lg:w-[6px]
            "
            style={{
              x: "-50%",
            }}
            animate={{
              y: [0, 22, 0],
              opacity: [
                0.45,
                1,
                0.45,
              ],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: [
                0.45,
                0,
                0.55,
                1,
              ],
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
