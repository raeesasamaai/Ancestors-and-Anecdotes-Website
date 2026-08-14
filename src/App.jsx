// import AnimatedNavbar from "./components/AnimatedNavbar";
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
  useEffect(() => {
    const scrollFromHash = () => {
      const { hash } = window.location;

      if (!hash) {
        return;
      }

      window.requestAnimationFrame(() => {
        window.setTimeout(() => {
          scrollToHashSection(
            hash,
            { updateHistory: false }
          );
        }, 40);
      });
    };

    scrollFromHash();

    window.addEventListener(
      "hashchange",
      scrollFromHash
    );

    return () => {
      window.removeEventListener(
        "hashchange",
        scrollFromHash
      );
    };
  }, []);

  return (
    <>
    <ScrollProgressBar />
    <SiteNavbar />

    <main>
      <CustomCursor />
      <ScrollFadeTransition
          from="#home"
          to="#quote"
        />
      <HomeHero data-cursor-theme="dark" />
      <QuoteReveal />
      <WhatWeDo />
      <Examples/>
      <Packages />
      <Process />
      <AboutUs />
      <Testimonials />
      <FAQ />
      <ContactUs />
      <Footer />
      <BackToTopButton />
    </main>
    </>
  );
}

// export default function App() {
//   return (
//     <>
//       <AnimatedNavbar/>
//       <main>
//         <CustomCursor />
//         <HomeHero data-cursor-theme="dark"/>
//         <WhatWeDo />
//         <AboutUs />
//         <Examples />
//         <Packages />
//         <Process />
//         <Testimonials />
//         <FAQ />
//         <ContactUs />
//       </main>

//       <Footer />
//     </>
//   );
// }
