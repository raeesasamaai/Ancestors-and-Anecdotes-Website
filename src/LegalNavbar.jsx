// src/components/LegalNavbar.jsx

export default function LegalNavbar() {
  return (
    <header
      className="
        sticky
        top-0
        z-50

        border-b
        border-[#704214]/15

        bg-[#FFF6E8]/95

        backdrop-blur-md
      "
    >
      <nav
        aria-label="Legal page navigation"
        className="
          mx-auto

          flex
          max-w-7xl

          items-center
          justify-between

          gap-4

          px-6
          py-4

          sm:px-8

          md:px-12

          lg:px-16

          xl:px-20
        "
      >
        {/* =================================================
            BRAND / HOME
        ================================================= */}

        <a
          href="/"
          aria-label="Ancestors and Anecdotes homepage"
          className="
            group

            inline-flex
            min-w-0

            items-center

            gap-3

            focus:outline-none

            focus-visible:ring-2
            focus-visible:ring-[#704214]
            focus-visible:ring-offset-4
            focus-visible:ring-offset-[#FFF6E8]
          "
        >
          <img
            src="/Images/tree.png"
            alt=""
            aria-hidden="true"
            className="
              h-10
              w-auto

              shrink-0

              object-contain

              sm:h-11

              md:h-12
            "
          />

          <span
            className="
              truncate

              font-['Book_Antiqua','Palatino_Linotype',Palatino,serif]

              text-[1.05rem]
              font-normal

              leading-tight

              text-[#704214]

              transition-colors
              duration-300

              group-hover:text-[#566735]

              sm:text-[1.15rem]

              md:text-[1.25rem]
            "
          >
            Ancestors &amp; Anecdotes
          </span>
        </a>


        {/* =================================================
            BACK TO WEBSITE
        ================================================= */}

        <a
          href="/"
          className="
            group

            inline-flex
            shrink-0

            items-center
            justify-center

            gap-2

            rounded-full

            border
            border-[#704214]/20

            bg-[#F5E6CC]

            px-4
            py-2.5

            font-['Book_Antiqua','Palatino_Linotype',Palatino,serif]

            text-[0.9rem]

            leading-none

            text-[#704214]

            transition
            duration-300

            hover:border-[#566735]/30
            hover:bg-[#566735]
            hover:text-[#FFF6E8]

            focus:outline-none

            focus-visible:ring-2
            focus-visible:ring-[#704214]
            focus-visible:ring-offset-3
            focus-visible:ring-offset-[#FFF6E8]

            sm:px-5
            sm:text-[0.98rem]

            md:text-[1rem]
          "
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="
              h-4
              w-4

              transition-transform
              duration-300

              group-hover:-translate-x-0.5
            "
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>

          <span className="hidden sm:inline">
            Back to Website
          </span>

          <span className="sm:hidden">
            Back
          </span>
        </a>
      </nav>
    </header>
  );
}