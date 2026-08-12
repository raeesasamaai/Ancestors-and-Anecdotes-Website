import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SharedNavbar from "./SharedNavbar";

const siteNavItems = [
  { label: "Home", href: "#home" },
  { label: "What We Do", href: "#what-we-do" },
  { label: "Examples", href: "#examples" },
  { label: "Packages", href: "#packages" },
  { label: "Process", href: "#process" },
  { label: "About Us", href: "#about-us" },
  { label: "FAQ", href: "#faq" },
];

export default function SiteNavbar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const quoteSection = document.getElementById("quote");

    if (!quoteSection) {
      console.warn(
        'Site navbar requires a section with the ID "quote".'
      );
      return undefined;
    }

    const updateVisibility = () => {
      const rect = quoteSection.getBoundingClientRect();
      const isCompletelyAboveViewport = rect.bottom <= 0;

      setIsVisible(isCompletelyAboveViewport);
    };

    const observer = new IntersectionObserver(() => {
      updateVisibility();
    });

    observer.observe(quoteSection);
    updateVisibility();

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <motion.header
      data-cursor-theme="dark"
      className={`
        fixed
        left-0
        top-0
        z-[1000]
        w-full
        ${isVisible ? "pointer-events-auto" : "pointer-events-none"}
      `}
      initial={false}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : -28,
      }}
      transition={{
        duration: 0.42,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div
        className="
          relative
          px-3
          pt-3
          sm:px-4
          md:px-6
          lg:px-8
        "
      >
        <div
          className="
            mx-auto
            max-w-[1380px]
            rounded-[2rem]
            sm:rounded-[2.4rem]
            lg:rounded-full
            border
            border-black/5
            bg-[#f7f7f4]
            shadow-[0_18px_36px_rgba(0,0,0,0.12)]
          "
        >
          <SharedNavbar
            className="pb-4 !px-4 !pt-4 sm:!px-6 md:!px-8 lg:!px-10 lg:!pt-4"
            textClassName="text-[#171717]"
            desktopItems={siteNavItems}
            showHomeUnderline={false}
            activeHref="#what-we-do"
            enableScrollSpy
            logoClassName="text-[18px] font-semibold sm:text-[19px] md:text-[22px]"
            itemClassName="text-[18px] xl:text-[18px]"
            mobileButtonClassName="bg-[#111111] text-white shadow-[0_8px_18px_rgba(0,0,0,0.14)]"
            mobilePanelClassName="bg-white text-[#171717]"
            mobileItemClassName="text-[#171717]"
            mobileCtaClassName="bg-[#111111] text-white"
            cta={{ label: "Contact Us", href: "#contact-us" }}
          />
        </div>
      </div>
    </motion.header>
  );
}
