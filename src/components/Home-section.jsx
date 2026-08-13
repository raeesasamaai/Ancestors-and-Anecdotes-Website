import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const handleWhatWeDoClick = (event) => {
    event.preventDefault();

    const whatWeDoSection = document.getElementById("what-we-do");

    if (!whatWeDoSection) {
      return;
    }

    const sectionTop =
      whatWeDoSection.getBoundingClientRect().top + window.scrollY;

    window.history.pushState(null, "", "#what-we-do");
    window.scrollTo({
      top: sectionTop,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="home"
      data-cursor-theme="light"
      className="relative h-[100svh] min-h-[100svh] w-full overflow-hidden text-white will-change-[opacity,transform]"
    >
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <motion.img
            key={image}
            src={image}
            alt="Vintage genealogy archive desk"
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ scale: 1.09, opacity: 0 }}
            animate={{
              opacity: currentImage === index ? 1 : 0,
              scale: currentImage === index ? 1 : 1.09,
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

      <div className="absolute inset-0 bg-black/18" />

      <header className="absolute left-0 top-0 z-20 w-full">
        <motion.nav className="flex items-center justify-between px-6 pt-8 md:px-12 lg:px-[88px] lg:pt-[37px]">
          <a
            href="#home"
            className="font-body text-[22px] font-medium leading-none tracking-[0.02em] text-white md:text-[25px]"
          >
            Ancestors &amp; Anecdotes
          </a>

          <div className="hidden items-center lg:flex">
            <div className="flex items-center gap-7 xl:gap-[30px]">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={
                    item.href === "#what-we-do"
                      ? handleWhatWeDoClick
                      : undefined
                  }
                  className="relative font-body text-[23px] font-medium leading-none text-white xl:text-[21px]"
                >
                  {item.label}

                  {item.label === "Home" && (
                    <span className="absolute -bottom-[9px] left-0 h-[2px] w-full bg-white" />
                  )}
                </a>
              ))}
            </div>
          </div>

          <button className="block font-body text-[22px] text-white lg:hidden">
            Menu
          </button>
        </motion.nav>
      </header>

      <div className="absolute bottom-[92px] left-4 right-4 z-10 sm:left-6 sm:right-6 md:left-12 md:right-12 lg:bottom-[75px] lg:left-[88px] lg:right-auto">
        <motion.h1
          className="font-section text-[2.95rem] font-normal leading-[0.95] tracking-[0.0em] text-white sm:text-[4.3rem] md:text-[5.4rem] lg:text-[6.55rem]"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        >
          <span className="block">Uncover The Stories That</span>
          <span className="block">Are Waiting To Be Told</span>
        </motion.h1>

        <motion.p
          className="mt-5 max-w-[44rem] font-body text-[1.2rem] font-medium leading-[1.35] tracking-[0.02em] text-white sm:mt-6 sm:text-[1.45rem] md:text-[1.6rem] lg:mt-[30px] lg:text-[26px]"
          initial={{ x: -90, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.5 }}
        >
          Personalized genealogy research to uncover, preserve,
          <br className="hidden sm:block" />
          and share the stories behind your ancestry.
        </motion.p>
      </div>

      <motion.div
        className="absolute bottom-[58px] right-4 z-10 hidden items-center gap-[14px] text-white md:flex md:right-8 lg:bottom-[75px] lg:right-[70px] lg:gap-[18px]"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <p className="font-body text-[16px] font-medium leading-none lg:text-[20px]">
          Scroll to explore
        </p>

        <div className="relative h-[42px] w-[28px] rounded-full border-[2px] border-white opacity-75 lg:h-[50px] lg:w-[32px]">
          <motion.div
            className="absolute left-1/2 top-[0.5rem] h-[5px] w-[5px] rounded-full bg-white opacity-70 will-change-transform lg:top-[0.6rem] lg:h-[6px] lg:w-[6px]"
            style={{ x: "-50%" }}
            animate={{
              y: [0, 22, 0],
              opacity: [0.45, 1, 0.45],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: [0.45, 0, 0.55, 1],
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
