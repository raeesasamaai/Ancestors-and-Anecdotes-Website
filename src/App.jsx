import { useEffect } from "react";

import SiteNavbar from "./components/SiteNavbar";

import HomeHero from "./components/Home-section";
import QuoteReveal from "./components/QuoteReveal";
import WhatWeDo from "./components/WhatWeDo";
import Examples from "./components/Examples";
import Packages from "./components/Packages";
import Process from "./components/Process";
import AboutUs from "./components/AboutUs";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import ContactUs from "./components/ContactUs";

import Footer from "./components/Footer";

import CustomCursor from "./components/CustomCursor";
import ScrollFadeTransition from "./components/ScrollFadeTransition";
import BackToTopButton from "./components/BackToTopButton";
import ScrollProgressBar from "./components/ScrollProgressBar";

import { scrollToHashSection } from "./utils/scrollToHashSection";

export default function App() {
  /* =========================================================
     HASH NAVIGATION

     Handles:
     - loading the website directly with a section hash
     - browser back/forward navigation
     - hash changes
  ========================================================= */

  useEffect(() => {
    let animationFrameId;
    let timeoutId;

    const scrollFromHash = () => {
      const { hash } =
        window.location;

      if (!hash) {
        return;
      }

      /*
       * Give React and the page layout a moment to render
       * before calculating the target section position.
       */

      animationFrameId =
        window.requestAnimationFrame(() => {
          timeoutId =
            window.setTimeout(() => {
              scrollToHashSection(
                hash,
                {
                  updateHistory: false,
                },
              );
            }, 40);
        });
    };

    scrollFromHash();

    window.addEventListener(
      "hashchange",
      scrollFromHash,
    );

    return () => {
      window.removeEventListener(
        "hashchange",
        scrollFromHash,
      );

      if (animationFrameId) {
        window.cancelAnimationFrame(
          animationFrameId,
        );
      }

      if (timeoutId) {
        window.clearTimeout(
          timeoutId,
        );
      }
    };
  }, []);

  return (
    <>
      {/* =====================================================
          GLOBAL UI
      ===================================================== */}

      <ScrollProgressBar />

      <CustomCursor />

      <SiteNavbar />

      {/* =====================================================
          HOME TO QUOTE TRANSITION
      ===================================================== */}

      <ScrollFadeTransition
        from="#home"
        to="#quote"
      />

      {/* =====================================================
          MAIN WEBSITE CONTENT

          SECTION ORDER:

          1. Home
          2. Quote
          3. What We Do
          4. Examples
          5. Packages
          6. Process
          7. About Us
          8. Testimonials
          9. FAQ
          10. Contact Us

          FinalCTA is intentionally NOT used.
      ===================================================== */}

      <main id="main-content">
        <HomeHero />

        <QuoteReveal />

        <WhatWeDo />

        <Examples />

        <Packages />

        <Process />

        <AboutUs />

        <Testimonials />

        <FAQ />

        <ContactUs />
      </main>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <Footer />

      {/* =====================================================
          GLOBAL FLOATING CONTROLS
      ===================================================== */}

      <BackToTopButton />
    </>
  );
}
