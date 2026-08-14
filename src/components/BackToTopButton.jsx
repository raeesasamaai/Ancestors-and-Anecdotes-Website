import { useEffect, useState } from "react";

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isInQuoteSection, setIsInQuoteSection] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 320);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const quoteSection = document.getElementById("quote");

    if (!quoteSection) {
      return undefined;
    }

    const updateQuoteVisibility = () => {
      const rect = quoteSection.getBoundingClientRect();
      const isIntersectingViewport = rect.top < window.innerHeight && rect.bottom > 0;

      setIsInQuoteSection(isIntersectingViewport);
    };

    const observer = new IntersectionObserver(() => {
      updateQuoteVisibility();
    });

    observer.observe(quoteSection);
    updateQuoteVisibility();
    window.addEventListener("scroll", updateQuoteVisibility, { passive: true });
    window.addEventListener("resize", updateQuoteVisibility);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateQuoteVisibility);
      window.removeEventListener("resize", updateQuoteVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      className={`back-to-top ${isVisible && !isInQuoteSection ? "visible" : ""}`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
        className="back-to-top__icon"
      >
        <path
          d="M12 5.5 5.75 11.75l1.5 1.5 3.69-3.69V19h2.12V9.56l3.69 3.69 1.5-1.5z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
}
