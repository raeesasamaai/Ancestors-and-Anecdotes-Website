import SharedNavbar from "./SharedNavbar";

const legalNavItems = [
  { label: "Home", href: "/#home" },
  { label: "What We Do", href: "/#what-we-do" },
  { label: "Examples", href: "/#examples" },
  { label: "Packages", href: "/#packages" },
  { label: "Process", href: "/#process" },
  { label: "About Us", href: "/#about-us" },
  { label: "FAQ", href: "/#faq" },
];

export default function LegalNavbar() {
  return (
    <header
      data-cursor-theme="dark"
      className="fixed left-0 top-0 z-[1000] w-full"
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
            border
            border-black/5
            bg-[#FFF6E8]
            shadow-[0_18px_36px_rgba(0,0,0,0.12)]
            sm:rounded-[2.4rem]
            lg:rounded-[2.8rem]
          "
        >
          <SharedNavbar
            className="pb-3 !px-3 !pt-3 sm:!px-6 md:!px-8 lg:!px-10 lg:!pt-3"
            textClassName="text-[#704214]"
            desktopItems={legalNavItems}
            showHomeUnderline={false}
            activeHref={null}
            enableScrollSpy={false}
            logoHref="/#home"
            logoClassName="text-[18px] font-semibold sm:text-[19px] md:text-[22px]"
            itemClassName="text-[18px] xl:text-[1.17rem] font-semibold"
            mobileButtonClassName="bg-transparent text-[#704214] shadow-none"
            mobilePanelClassName="bg-transparent text-[#171717]"
            mobileItemClassName="text-[#171717]"
            mobileCtaClassName="bg-[#704214] text-white shadow-none"
            cta={{ label: "Contact Us", href: "/#contact-us" }}
          />
        </div>
      </div>
    </header>
  );
}
