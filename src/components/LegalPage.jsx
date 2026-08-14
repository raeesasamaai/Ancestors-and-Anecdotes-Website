import CustomCursor from "./CustomCursor";
import Footer from "./Footer";
import LegalNavbar from "./LegalNavbar";

export default function LegalPage({ page }) {
  return (
    <>
      <CustomCursor />
      <LegalNavbar />
      <main
        data-cursor-theme="dark"
        className="min-h-screen bg-[#F5E6CC] pt-[7.25rem] text-[#1C1C1C] md:pt-[8.25rem]"
      >
        <section className="px-6 pb-20 pt-14 md:px-10 md:pt-20">
          <div className="mx-auto max-w-4xl">
            <p className="section-name">{page.eyebrow}</p>
            <h1 className="section-heading mt-8 text-[clamp(2.3rem,4vw,3.4rem)]">
              {page.title}
            </h1>
            <p className="section-body mt-7 max-w-3xl text-[1.22rem] leading-[1.6]">
              {page.intro}
            </p>

            <div className="mt-12 space-y-10">
              {page.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="section-heading text-[1.7rem] md:text-[2rem]">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4">
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="section-body text-[1.14rem] leading-[1.7]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer mainSitePrefix="/" />
    </>
  );
}
