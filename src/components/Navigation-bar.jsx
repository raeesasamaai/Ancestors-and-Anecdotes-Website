import { useState } from "react";

const navItems = [
  "Home",
  "What We Do",
  "About Us",
  "Packages",
  "Process",
  "FAQ",
  "Contact Us",
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="absolute left-0 top-0 z-50 w-full">
      <nav className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-7 sm:px-10 lg:px-16">
        {/* Logo */}
        <a
          href="#home"
          className="brand font-display text-3xl font-medium tracking-wide text-white sm:text-4xl"
        >
          Ancestors & Anecdotes
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-9 lg:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
              className={`nav-item relative font-display text-2xl text-white/90 transition duration-300 hover:text-white ${
                item === "Home" ? "text-white" : ""
              }`}
            >
              {item}

              {item === "Home" && (
                <span className="absolute -bottom-2 left-0 h-[2px] w-full bg-white" />
              )}
            </a>
          ))}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="nav-item flex h-11 w-11 items-center justify-center border border-white/40 text-white lg:hidden"
          aria-label="Toggle menu"
        >
          <span className="text-2xl">{isOpen ? "×" : "☰"}</span>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mx-6 rounded-2xl border border-white/15 bg-black/80 p-6 backdrop-blur-md lg:hidden">
          <div className="flex flex-col gap-5">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
                onClick={() => setIsOpen(false)}
                className="font-display text-2xl text-white/90"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}