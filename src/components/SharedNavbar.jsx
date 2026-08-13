import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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
}) {
  const [currentHref, setCurrentHref] = useState(activeHref ?? "#home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const usesDynamicActiveLine = enableScrollSpy || activeHref !== null;
  const overflowStateRef = useRef({
    body: "",
    html: "",
  });

  const handleNavClick = (event, href) => {
    event.preventDefault();

    const scrollToSection = () => {
      if (href === "#home") {
        window.history.pushState(null, "", href);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        return;
      }

      const sectionId = href.replace("#", "");
      const section = document.getElementById(sectionId);

      if (section) {
        if (href === "#what-we-do") {
          window.history.pushState(null, "", href);
          section.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          return;
        }

        const computedScrollPaddingTop = Number.parseFloat(
          window.getComputedStyle(document.documentElement).scrollPaddingTop
        );
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const targetTop =
          Math.max(
            sectionTop - (Number.isNaN(computedScrollPaddingTop) ? 0 : computedScrollPaddingTop),
            0
          );

        window.history.pushState(null, "", href);
        window.scrollTo({
          top: targetTop,
          behavior: "smooth",
        });
      }
    };

    if (usesDynamicActiveLine) {
      setCurrentHref(href);
    }

    setIsMobileMenuOpen(false);

    window.setTimeout(scrollToSection, 10);
  };

  useEffect(() => {
    if (!enableScrollSpy) {
      const nextHref = activeHref ?? "#home";

      if (currentHref !== nextHref) {
        const syncTimer = window.setTimeout(() => {
          setCurrentHref(nextHref);
        }, 0);

        return () => {
          window.clearTimeout(syncTimer);
        };
      }

      return undefined;
    }

    const sectionIds = desktopItems
      .map((item) => item.href.replace("#", ""))
      .filter(Boolean);

    const getActiveHref = () => {
      const offset = 140;
      let nextHref = desktopItems[0]?.href ?? "#home";

      sectionIds.forEach((id, index) => {
        const section = document.getElementById(id);

        if (section && window.scrollY + offset >= section.offsetTop) {
          nextHref = desktopItems[index].href;
        }
      });

      setCurrentHref(nextHref);
    };

    getActiveHref();
    window.addEventListener("scroll", getActiveHref, { passive: true });
    window.addEventListener("resize", getActiveHref);

    return () => {
      window.removeEventListener("scroll", getActiveHref);
      window.removeEventListener("resize", getActiveHref);
    };
  }, [activeHref, currentHref, desktopItems, enableScrollSpy]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.overflow = overflowStateRef.current.body;
      document.documentElement.style.overflow = overflowStateRef.current.html;
      return undefined;
    }

    overflowStateRef.current = {
      body: document.body.style.overflow,
      html: document.documentElement.style.overflow,
    };

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflowStateRef.current.body;
      document.documentElement.style.overflow = overflowStateRef.current.html;
    };
  }, [isMobileMenuOpen]);

  return (
    <nav
      className={`relative px-4 pt-6 sm:px-6 sm:pt-7 md:px-10 lg:px-[88px] lg:pt-[37px] ${className}`.trim()}
    >
      <div className="flex items-center justify-between gap-4">
        <a
          href="#home"
          onClick={(event) => handleNavClick(event, "#home")}
          className={`max-w-[11.5rem] font-body text-[18px] font-medium leading-[1.05] tracking-[0.02em] sm:max-w-none sm:text-[21px] md:text-[23px] ${textClassName} ${logoClassName}`.trim()}
        >
          Ancestors &amp; Anecdotes
        </a>

        <div className="hidden items-center xl:flex">
          <div className="flex items-center gap-7 xl:gap-[30px]">
            {desktopItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(event) => handleNavClick(event, item.href)}
                className={`relative font-body text-[23px] font-medium leading-none xl:text-[21px] ${textClassName} ${itemClassName}`.trim()}
              >
                {item.label}

                {(usesDynamicActiveLine
                  ? currentHref === item.href
                  : showHomeUnderline && item.label === "Home") ? (
                  <motion.span
                    layoutId="shared-navbar-active-line"
                    initial={false}
                    transition={{
                      layout: {
                        duration: 0.18,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    }}
                    className={`absolute -bottom-[9px] left-0 h-[2px] w-full ${textClassName === "text-white" ? "bg-white" : "bg-current"}`}
                  />
                ) : null}
              </a>
            ))}
          </div>

          {cta && (
            <a
              href={cta.href}
              onClick={(event) => handleNavClick(event, cta.href)}
              className={`
                ml-7
                inline-flex
                items-center
                justify-center
                rounded-full
                bg-[#111111]
                px-6
                py-4
                font-body
                text-[20px]
                font-semibold
                leading-none
                text-white
                shadow-[0_8px_20px_rgba(0,0,0,0.16)]
                transition-transform
                duration-200
                hover:-translate-y-[1px]
              `}
            >
              {cta.label}
            </a>
          )}
        </div>

        <button
          type="button"
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className={`inline-flex h-12 w-12 items-center justify-center rounded-full sm:h-[52px] sm:w-[52px] xl:hidden ${textClassName} ${mobileButtonClassName}`.trim()}
        >
          <span className="sr-only">
            {isMobileMenuOpen ? "Close" : "Menu"}
          </span>
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-[2px] w-5 rounded-full bg-current transition-transform duration-200 ease-out ${
                isMobileMenuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-[2px] w-5 rounded-full bg-current transition-opacity duration-200 ease-out ${
                isMobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] h-[2px] w-5 rounded-full bg-current transition-transform duration-200 ease-out ${
                isMobileMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <motion.div
        initial={false}
        animate={{
          height: isMobileMenuOpen ? "auto" : 0,
          opacity: isMobileMenuOpen ? 1 : 0,
          marginTop: isMobileMenuOpen ? 16 : 0,
        }}
        transition={{
          duration: 0.24,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 overflow-hidden xl:hidden"
      >
        <div
          className={`rounded-[1.65rem] px-4 py-4 shadow-[0_14px_34px_rgba(0,0,0,0.14)] sm:px-5 ${mobilePanelClassName}`.trim()}
        >
          <div className="flex flex-col gap-1">
            {desktopItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(event) => handleNavClick(event, item.href)}
                className={`rounded-2xl px-4 py-3 font-body text-[18px] font-medium leading-none transition-colors duration-200 ${textClassName} ${mobileItemClassName} ${
                  currentHref === item.href ? "bg-black/8" : ""
                }`.trim()}
              >
                {item.label}
              </a>
            ))}
          </div>

          {cta && (
            <a
              href={cta.href}
              onClick={(event) => handleNavClick(event, cta.href)}
              className={`mt-4 inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-5 py-3.5 font-body text-[18px] font-semibold leading-none text-white shadow-[0_8px_20px_rgba(0,0,0,0.16)] ${mobileCtaClassName}`.trim()}
            >
              {cta.label}
            </a>
          )}
        </div>
      </motion.div>
    </nav>
  );
}
