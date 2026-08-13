import ScrollReveal from "./ScrollReveal";

function AboutIllustration({ className = "" }) {
  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-[2.15rem]
        bg-[#bec7d0]
        shadow-[0_6px_10px_rgba(93,80,59,0.22)]
        ${className}
      `.trim()}
    >
      <div className="absolute left-[22%] top-[39%] h-[9%] w-[9%] rounded-full bg-[#f4f5f6]" />
      <div className="absolute -bottom-[22%] -left-[14%] h-[66%] w-[58%] rounded-[50%] bg-[#f4f5f6]" />
      <div className="absolute -bottom-[18%] left-[28%] h-[72%] w-[76%] rounded-[50%] bg-[#f4f5f6]" />
    </div>
  );
}

export default function AboutUs() {
  return (
    <section
      id="about-us"
      data-cursor-theme="dark"
      className="relative overflow-hidden bg-[#f6e5c0] px-6 py-16 text-[#1c1c1c] sm:px-8 sm:py-20 md:px-12 lg:px-16 lg:py-24 xl:px-20"
    >
      <div className="mx-auto max-w-[111rem]">
        <ScrollReveal
          as="p"
          className="section-name mb-5 text-[#a96f68] sm:mb-6"
          style={{ WebkitTextStroke: "0.45px currentColor" }}
        >
          About us
        </ScrollReveal>

        <ScrollReveal
          as="h2"
          className="max-w-[12ch] font-['Book_Antiqua','Palatino_Linotype',Palatino,serif] text-[2.35rem] font-normal leading-[1.08] text-[#8a5424] sm:max-w-none sm:text-[3.05rem] md:text-[3.5rem] lg:text-[3.95rem] xl:text-[4.35rem]"
        >
          The People Behind Ancestors &amp; Anecdotes
        </ScrollReveal>

        <div className="mt-14 space-y-12 sm:mt-16 sm:space-y-16 lg:mt-20 lg:space-y-20 xl:space-y-24">
          <div className="grid items-center gap-x-10 gap-y-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.85fr)] lg:gap-x-[3.2rem] xl:gap-x-[4.2rem]">
            <ScrollReveal as="div">
              <AboutIllustration className="h-[16rem] w-full sm:h-[20rem] md:h-[24rem] lg:h-[25.5rem] xl:h-[28rem]" />
            </ScrollReveal>

            <ScrollReveal
              as="p"
              className="section-body max-w-[34rem] text-[1.28rem] leading-[1.42] text-[#3e342f] sm:text-[1.45rem] lg:text-[1.05rem] xl:text-[1.2rem]"
            >
              For years Sarah has had a yearning to capture people's family stories
              and turn them into illustrated written narratives and short narrated
              videos so that families are able to get to know and understand their
              ancestors, and in turn gain self understanding. As a professional
              counsellor, Sarah loves listening to clients speaking about their
              colourful families.
            </ScrollReveal>
          </div>

          <div className="grid items-center gap-x-10 gap-y-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,0.88fr)] lg:gap-x-[3.2rem] xl:gap-x-[4.2rem]">
            <ScrollReveal
              as="p"
              className="section-body max-w-[36rem] text-[1.28rem] leading-[1.42] text-[#3e342f] sm:text-[1.45rem] lg:text-[1.05rem] xl:text-[1.2rem]"
            >
              Matthew loves uncovering the past and seeing connections, and through
              that seeing how human we all are. His background in research and oral
              history at the District Six Museum has made him highly skilled at
              researching seemingly obscure pieces of history, bringing them together
              to build a full picture of a particular time, person or place. His
              genuine care and respect for people and passion for history allows an
              easy rapport to be built for conducting oral history interviews and
              doing family research.
            </ScrollReveal>

            <ScrollReveal as="div">
              <AboutIllustration className="h-[16rem] w-full sm:h-[20rem] md:h-[24rem] lg:h-[22.75rem] xl:h-[25.5rem]" />
            </ScrollReveal>
          </div>

          <div className="grid items-center gap-x-10 gap-y-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.85fr)] lg:gap-x-[3.2rem] xl:gap-x-[4.2rem]">
            <ScrollReveal as="div">
              <AboutIllustration className="h-[18rem] w-full sm:h-[23rem] md:h-[27rem] lg:h-[31rem] xl:h-[34rem]" />
            </ScrollReveal>

            <ScrollReveal
              as="div"
              className="section-body max-w-[35rem] space-y-9 text-[1.28rem] leading-[1.42] text-[#3e342f] sm:text-[1.45rem] lg:text-[1.05rem] xl:text-[1.2rem]"
            >
              <p>
                Putting their passions together, Sarah and Matthew are budding
                genealogists who find meaning in tracing the names and dates given
                by clients in order to gain insight into the historical context of a
                client's ancestors, combining this with family anecdotes to build a
                fuller picture of the lives lived by previous generations.
              </p>

              <p>
                Our mission is to help individuals and families understand where
                they come from by uncovering records, organising family information,
                and preserving meaningful stories for future generations.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
