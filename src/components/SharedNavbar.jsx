import {
  AnimatePresence,
  motion,
} from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import { scrollToHashSection } from "../utils/scrollToHashSection";

const navItems = [
  { label: "Home", href: "#home" },
  {
    label: "What We Do",
    href: "#what-we-do",
  },
  {
    label: "Examples",
    href: "#examples",
  },
  {
    label: "Packages",
    href: "#packages",
  },
  {
    label: "Process",
    href: "#process",
  },
  {
    label: "About Us",
    href: "#about-us",
  },
  {
    label: "FAQ",
    href: "#faq",
  },
  {
    label: "Contact Us",
    href: "#contact-us",
  },
];

export default function SharedNavbar({
  className = "",
  textClassName = "text-white",
  desktopItems = navItems,
  showHomeUnderline = true,
  cta = null,
  logoClassName = "",
  itemClassName = "",
  mobileButtonClassName = "",
  mobilePanelClassName = "",
  mobileItemClassName = "",
  mobileCtaClassName = "",
  activeHref = null,
  enableScrollSpy = false,
  logoHref = "#home",
}) {
  const [currentHref, setCurrentHref] =
    useState(activeHref ?? "#home");

  const [
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  ] = useState(false);

  /*
   * Same responsive behaviour as HomeHero.
   *
   * Full navbar:
   * - normal laptops/desktops
   *
   * Hamburger:
   * - phones
   * - tablets
   * - iPads
   * - large touch devices
   */
  const [isCompactNav, setIsCompactNav] =
    useState(() => {
      if (typeof window === "undefined") {
        return false;
      }

      return window.matchMedia(
        "(max-width: 1279px), (hover: none) and (pointer: coarse)"
      ).matches;
    });

  const usesDynamicActiveLine =
    enableScrollSpy ||
    activeHref !== null;

  const ctaHref = cta?.href ?? null;

  const overflowStateRef = useRef({
    body: "",
    html: "",
  });

  /*
   * ==========================================
   * NAVIGATION
   * ==========================================
   */

  const handleNavClick = (
    event,
    href
  ) => {
    if (!href.startsWith("#")) {
      return;
    }

    event.preventDefault();

    const scrollToSection = () => {
      scrollToHashSection(
        href
      );
    };

    if (usesDynamicActiveLine) {
      setCurrentHref(href);
    }

    /*
     * Close hamburger menu before
     * navigating.
     */
    setIsMobileMenuOpen(false);

    window.setTimeout(
      scrollToSection,
      10
    );
  };

  /*
   * ==========================================
   * ACTIVE NAV ITEM / SCROLL SPY
   * ==========================================
   */

  useEffect(() => {
    if (!enableScrollSpy) {
      const nextHref =
        activeHref ?? "#home";

      if (
        currentHref !== nextHref
      ) {
        const syncTimer =
          window.setTimeout(() => {
            setCurrentHref(
              nextHref
            );
          }, 0);

        return () => {
          window.clearTimeout(
            syncTimer
          );
        };
      }

      return undefined;
    }

    const scrollSpyItems = [
      ...desktopItems,
      ...(ctaHref
        ? [
            {
              href: ctaHref,
            },
          ]
        : []),
    ];

    const sectionIds =
      scrollSpyItems
        .map((item) =>
          item.href.replace(
            "#",
            ""
          )
        )
        .filter(Boolean);

    const getActiveHref = () => {
      const offset = 140;

      let nextHref =
        scrollSpyItems[0]?.href ??
        "#home";

      sectionIds.forEach(
        (id, index) => {
          const section =
            document.getElementById(
              id
            );

          if (
            section &&
            window.scrollY +
              offset >=
              section.offsetTop
          ) {
            nextHref =
              scrollSpyItems[
                index
              ].href;
          }
        }
      );

      setCurrentHref(nextHref);
    };

    getActiveHref();

    window.addEventListener(
      "scroll",
      getActiveHref,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "resize",
      getActiveHref
    );

    return () => {
      window.removeEventListener(
        "scroll",
        getActiveHref
      );

      window.removeEventListener(
        "resize",
        getActiveHref
      );
    };
  }, [
    activeHref,
    currentHref,
    desktopItems,
    enableScrollSpy,
  ]);

  /*
   * ==========================================
   * RESPONSIVE NAV DETECTION
   * ==========================================
   *
   * Same logic used in the Home Hero navbar.
   *
   * This means:
   * - phones = hamburger
   * - tablets = hamburger
   * - iPads = hamburger
   * - iPad Pro landscape = hamburger
   * - normal desktop/laptop = full nav
   */

  useEffect(() => {
    const mediaQuery =
      window.matchMedia(
        "(max-width: 1279px), (hover: none) and (pointer: coarse)"
      );

    const handleChange = (
      event
    ) => {
      setIsCompactNav(
        event.matches
      );

      if (!event.matches) {
        setIsMobileMenuOpen(
          false
        );
      }
    };

    setIsCompactNav(
      mediaQuery.matches
    );

    mediaQuery.addEventListener(
      "change",
      handleChange
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleChange
      );
    };
  }, []);

  /*
   * Close the menu when switching
   * back to normal desktop nav.
   */
  useEffect(() => {
    if (!isCompactNav) {
      setIsMobileMenuOpen(false);
    }
  }, [isCompactNav]);

  /*
   * ==========================================
   * BODY SCROLL LOCK
   * ==========================================
   */

  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.overflow =
        overflowStateRef.current
          .body;

      document.documentElement.style.overflow =
        overflowStateRef.current
          .html;

      return undefined;
    }

    overflowStateRef.current = {
      body:
        document.body.style
          .overflow,

      html:
        document.documentElement
          .style.overflow,
    };

    document.body.style.overflow =
      "hidden";

    document.documentElement.style.overflow =
      "hidden";

    return () => {
      document.body.style.overflow =
        overflowStateRef.current
          .body;

      document.documentElement.style.overflow =
        overflowStateRef.current
          .html;
    };
  }, [isMobileMenuOpen]);

  /*
   * ==========================================
   * ACTIVE UNDERLINE
   * ==========================================
   */

  const isItemActive = (item) => {
    if (usesDynamicActiveLine) {
      return (
        currentHref === item.href
      );
    }

    return (
      showHomeUnderline &&
      item.label === "Home"
    );
  };

  /*
   * ==========================================
   * MOBILE MENU ANIMATION
   * ==========================================
   */

  const mobileMenuVariants = {
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
  };

  const mobileItemVariants = {
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
  };

  return (
    <nav
      className={`
        relative

        px-4
        pt-5

        sm:px-6
        sm:pt-6

        md:px-8
        md:pt-6

        lg:px-10
        lg:pt-7

        xl:px-[88px]
        xl:pt-[37px]

        ${className}
      `.trim()}
    >
      {/* ======================================
          MAIN NAVBAR ROW
      ====================================== */}

      <div
        className="
          flex
          items-center
          justify-between
          gap-4
          pr-4
        "
      >
        {/* BRAND */}
        <a
          href={logoHref}
          onClick={(event) =>
            handleNavClick(
              event,
              logoHref
            )
          }
          className={`
            max-w-[15rem]
            pl-[1.6rem]
            font-body
            text-[20px]
            font-[800]
            leading-[1.05]
            tracking-[0.02em]

            sm:max-w-none
            sm:text-[21px]

            md:text-[23px]

            ${textClassName}
            ${logoClassName}
          `.trim()}
        >
          Ancestors &amp; Anecdotes
        </a>

        {/* ======================================
            DESKTOP NAVBAR
        ====================================== */}

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
              {desktopItems.map(
                (item) => {
                  const active =
                    isItemActive(
                      item
                    );

                  return (
                    <a
                      key={
                        item.label
                      }
                      href={
                        item.href
                      }
                      onClick={(
                        event
                      ) =>
                        handleNavClick(
                          event,
                          item.href
                        )
                      }
                      className={`
                        group
                        relative

                        font-body
                        text-[23px]
                        font-medium
                        leading-none

                        xl:text-[21px]

                        ${textClassName}
                        ${itemClassName}
                      `.trim()}
                    >
                      {item.label}

                      {/* HOVER UNDERLINE */}
                      {!active && (
                        <span
                          aria-hidden="true"
                          className={`
                            absolute
                            -bottom-[7px]
                            left-0

                            h-[1.9px]
                            w-full

                            origin-left
                            scale-x-0

                            rounded-full

                            transition-transform
                            duration-300

                            ease-[cubic-bezier(0.22,1,0.36,1)]

                            group-hover:scale-x-100

                            ${
                              textClassName ===
                              "text-white"
                                ? "bg-white"
                                : "bg-current"
                            }
                          `}
                        />
                      )}

                      {/* ACTIVE UNDERLINE */}
                      {active && (
                        <motion.span
                          layoutId="shared-navbar-active-line"
                          initial={
                            false
                          }
                          transition={{
                            layout: {
                              duration: 0.22,

                              ease: [
                                0.22,
                                1,
                                0.36,
                                1,
                              ],
                            },
                          }}
                          className={`
                            absolute
                            -bottom-[7px]
                            left-0

                            h-[1.9px]
                            w-full

                            rounded-full

                            ${
                              textClassName ===
                              "text-white"
                                ? "bg-white"
                                : "bg-current"
                            }
                          `}
                        />
                      )}
                    </a>
                  );
                }
              )}
            </div>

            {/* DESKTOP CTA */}
            {cta && (
              <a
                href={cta.href}
                onClick={(event) =>
                  handleNavClick(
                    event,
                    cta.href
                  )
                }
                className={`
                  ml-7

                  inline-flex
                  items-center
                  justify-center

                  rounded-full
                  bg-[#704214]

                  px-5
                  py-3

                  font-body
                  text-[18px]
                  font-semibold
                  leading-none

                  text-white

                  shadow-[0_8px_20px_rgba(0,0,0,0.16)]

                  transition
                  duration-300

                  hover:-translate-y-[1px]
                  hover:shadow-[0_10px_24px_rgba(0,0,0,0.22)]
                  hover:bg-[#566735]
                `}
              >
                {cta.label}
              </a>
            )}
          </div>
        )}

        {/* ======================================
            TABLET / MOBILE MENU BUTTON
        ====================================== */}

        {isCompactNav && (
          <button
            type="button"
            aria-expanded={
              isMobileMenuOpen
            }
            aria-controls="shared-navigation-menu"
            aria-label={
              isMobileMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            onClick={() =>
              setIsMobileMenuOpen(
                (previous) =>
                  !previous
              )
            }
            className={`
              relative
              flex
              h-[39px]
              w-[39px]
              shrink-0
              items-center
              justify-center
              rounded-full
              transition
              duration-300
              hover:bg-current/10
              active:scale-95
              sm:h-[48px]
              sm:w-[48px]
              md:h-[50px]
              md:w-[50px]
              ${textClassName}
              ${mobileButtonClassName}
            `.trim()}
          >
            <span className="sr-only">
              {isMobileMenuOpen
                ? "Close menu"
                : "Open menu"}
            </span>

            {/* HAMBURGER / X */}
            <span
              className="
                relative
                block
                h-[20px]
                w-[26px]
              "
            >
              {/* TOP LINE */}
              <motion.span
                initial={false}
                animate={{
                  y: isMobileMenuOpen
                    ? 8
                    : 0,

                  rotate:
                    isMobileMenuOpen
                      ? 45
                      : 0,
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
                className="
                  absolute
                  left-0
                  top-[1px]
                  h-[2.4px]
                  w-[26px]
                  rounded-full
                  bg-current
                "
              />

              {/* MIDDLE LINE */}
              <motion.span
                initial={false}
                animate={{
                  opacity:
                    isMobileMenuOpen
                      ? 0
                      : 1,

                  scaleX:
                    isMobileMenuOpen
                      ? 0
                      : 1,
                }}
                transition={{
                  duration: 0.22,
                  ease: "easeOut",
                }}
                className="
                  absolute
                  left-0
                  top-[9px]
                  h-[2.4px]
                  w-[26px]
                  rounded-full
                  bg-current
                "
              />

              {/* BOTTOM LINE */}
              <motion.span
                initial={false}
                animate={{
                  y: isMobileMenuOpen
                    ? -8
                    : 0,

                  rotate:
                    isMobileMenuOpen
                      ? -45
                      : 0,
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
                className="
                  absolute
                  bottom-[1px]
                  left-0
                  h-[2.4px]
                  w-[26px]
                  rounded-full
                  bg-current
                "
              />
            </span>
          </button>
        )}
      </div>

      {/* ======================================
          TABLET / MOBILE DROPDOWN
      ====================================== */}

      <AnimatePresence>
        {isCompactNav &&
          isMobileMenuOpen && (
            <motion.div
              id="shared-navigation-menu"
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
              className={`
                relative
                z-50
                overflow-hidden
                rounded-[28px]
                bg-transparent
                p-3
                sm:p-4

                md:mt-6
                md:rounded-[32px]
                md:p-5

                ${mobilePanelClassName}
              `.trim()}
            >
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={
                  mobileMenuVariants
                }
                className="
                  flex
                  flex-col
                "
              >
                {desktopItems.map(
                  (item) => (
                    <motion.a
                      key={
                        item.label
                      }
                      href={
                        item.href
                      }
                      variants={
                        mobileItemVariants
                      }
                      onClick={(
                        event
                      ) =>
                        handleNavClick(
                          event,
                          item.href
                        )
                      }
                      className={`
                        group
                        relative
                        flex
                        items-center
                        justify-between
                        rounded-[18px]
                        px-4
                        py-[13px]
                        font-[700]
                        font-body
                        text-[19px]
                        font-medium
                        leading-none
                        text-[#704214]
                        transition-colors
                        duration-300
                        sm:px-5
                        sm:py-[15px]
                        sm:text-[20px]

                        md:text-[22px]

                        ${mobileItemClassName}
                      `.trim()}
                    >
                      <span
                        className="
                          relative
                          inline-block
                        "
                      >
                        {item.label}

                        {/* HOVER LINE */}
                        <span
                          className="
                            absolute
                            -bottom-[6px]
                            left-0

                            h-[1.9px]
                            w-full

                            origin-left
                            scale-x-0

                            bg-[#704214]

                            transition-transform
                            duration-300

                            ease-[cubic-bezier(0.22,1,0.36,1)]

                            group-hover:scale-x-100
                          "
                        />

                        {/* ACTIVE LINE */}
                        {currentHref ===
                          item.href && (
                          <motion.span
                            layoutId="shared-mobile-navbar-active-line"
                            className="
                              absolute
                              -bottom-[6px]
                              left-0

                              h-[1.9px]
                              w-full

                              rounded-full

                              bg-[#704214]
                            "
                          />
                        )}
                      </span>

                      {/* ARROW */}
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
                        transition={{
                          duration: 0.2,
                        }}
                      >
                        →
                      </motion.span>
                    </motion.a>
                  )
                )}

                {/* MOBILE CTA */}
                {cta && (
                  <motion.a
                    href={cta.href}
                    variants={
                      mobileItemVariants
                    }
                    onClick={(event) =>
                      handleNavClick(
                        event,
                        cta.href
                      )
                    }
                    className={`
                      mt-4

                      inline-flex
                      w-full

                      items-center
                      justify-center

                      rounded-full
                      bg-[#111111]

                      px-5
                      py-3.5

                      font-body
                      text-[18px]
                      font-semibold
                      leading-none

                      text-white

                      transition
                      duration-300

                      hover:bg-[#262626]

                      active:scale-[0.98]

                      sm:py-4
                      sm:text-[19px]

                      ${mobileCtaClassName}
                    `.trim()}
                  >
                    {cta.label}
                  </motion.a>
                )}
              </motion.div>
            </motion.div>
          )}
      </AnimatePresence>
    </nav>
  );
}
