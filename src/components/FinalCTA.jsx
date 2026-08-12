export default function FinalCTA() {
  return (
    <section
      id="final-cta"
      data-cursor-theme="light"
      className="
        bg-[#F5E6CC]
        px-6
        py-16
        text-[#FFF6E8]
        md:px-20
        md:py-20
      "
    >
      <div
        className="
          mx-auto
          grid
          w-full
          max-w-[1500px]
          grid-cols-1
          items-center
          gap-12
          overflow-hidden
          rounded-[38px]
          bg-[#566735]
          px-7
          py-14
          sm:px-10
          sm:py-16
          md:rounded-[52px]
          lg:min-h-[430px]
          lg:grid-cols-[0.9fr_1.1fr]
          lg:gap-[15rem]
          lg:rounded-[4rem]
          lg:px-[55px]
          lg:py-[55px]
          xl:grid-cols-[0.95fr_1.05fr]
        "
      >
        {/* Left content */}
        <div className="text-left">
          <h2
            className="
              font-section
              text-[clamp(5.5rem,6vw,6.9rem)]
              font-normal
              leading-[0.9]
              text-[#FFF6E8]
            "
            style={{
              WebkitTextStroke: "0.35px currentColor",
            }}
          >
            Still have questions?
          </h2>

          <p
            className="
              mt-7
              max-w-[500px]
              font-['Book_Antiqua','Palatino_Linotype',Palatino,serif]
              text-[clamp(1.8rem,2vw,3rem)]
              font-normal
              leading-[1.22]
              text-[#FFF6E8]
              sm:mt-9
              lg:mt-11
            "
          >
            We would be happy to
            <span className="block mt-1">guide you.</span>
          </p>
        </div>

        {/* Right content */}
        <div
          className="
            flex
            w-full
            flex-col
            items-center
            justify-center
            text-center
            lg:justify-self-end
          "
        >
          <a
            href="#contact-us"
            className="
              flex
              min-h-[76px]
              w-full
              max-w-[415px]
              items-center
              justify-center
              rounded-[28px]
              bg-[#FFF6E8]
              px-8
              py-5
              font-['Book_Antiqua','Palatino_Linotype',Palatino,serif]
              text-[1.55rem]
              font-normal
              leading-none
              text-[#704214]
              shadow-[0_8px_24px_rgba(28,28,28,0.08)]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-white
              hover:shadow-[0_14px_30px_rgba(28,28,28,0.16)]
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#FFF6E8]
              focus-visible:ring-offset-4
              focus-visible:ring-offset-[#566735]
              sm:min-h-[88px]
              sm:text-[1.8rem]
              lg:min-h-[80px]
              lg:max-w-[380px]
              lg:rounded-[30px]
              lg:text-[1.7rem]
            "
          >
            Start a conversation
          </a>

          <p
            className="
              mt-7
              max-w-[520px]
              font-['Book_Antiqua','Palatino_Linotype',Palatino,serif]
              text-[1.25rem]
              font-normal
              leading-[1.25]
              text-[#FFF6E8]
              sm:mt-8
              sm:text-[1.5rem]
              lg:mt-9
              lg:text-[1.5rem]
            "
          >
            No pressure. Just share what you know,
            <span className="block">
              and we’ll guide you from there.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}