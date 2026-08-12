import ScrollReveal from "./ScrollReveal";

export default function Packages() {
  return (
    <section
      id="packages"
      className="min-h-screen bg-[#F5E6CC] px-6 py-20 text-[#1C1C1C] md:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <ScrollReveal
          as="p"
          className="mb-2 section-name "
          style={{
            WebkitTextStroke: "0.45px currentColor",
          }}
        >
          Our Packages
        </ScrollReveal>

        <ScrollReveal
          as="h2"
          className="max-w-7xl mt-8 section-heading"
        >
          Genealogy Packages Designed Around Your Family Story
        </ScrollReveal>

        <ScrollReveal
          as="p"
          className="mt-7 max-w-5xl section-body"
        >
          Whether you are just beginning your ancestry journey or ready to preserve a more complete family history, 
          our packages are designed to help you uncover, preserve, and honour the lives lived by your ancestors .
        </ScrollReveal>

        <ScrollReveal
          as="p"
          className="mt-6 max-w-5xl section-body cursive italic"
        >
          *Genealogical tracing in South Africa depends heavily on historical record availability. 
          We cannot guarantee a specific ancestral depth for every surname. Document destruction, 
          systemic historical gaps, and changing naming traditions can limit research. We use all 
          available archives but cannot guarantee connections prior to official documentation. 
        </ScrollReveal>

        <ScrollReveal
          as="div"
          className="mt-12 grid gap-8 md:grid-cols-4 md:text-left"
        >
          {/* Package Card 1 */}
          <div className="flex flex-col bg-[#FFF6E8] p-7 drop-shadow-md rounded-3xl overflow-hidden pb-8 pt-8">
            <img
              src="Images/ink.png"
              data-cursor-theme="light"
              alt="Family Roots"
              className="mx-left mb-7 mt-2 h-[4.8rem] self-start sepia-[6%] "
            />

            <div className="text-left ">
              <h3 className="section-heading text-[1.5rem] text-[#704214] pt-1">
                Two Branch <br />Trace
              </h3>
              <h3 className="section-heading font-bold tracking-wider text-[1.7rem] text-[#704214] pt-6">
               R6300
              </h3>

              <p className="mt-5 section-body leading-7 pb-7">
                <ul className="mt-5 space-y-4">
                    <li className="flex items-start items-center gap-4 section-body text-[1.09rem]">
                      <span aria-hidden="true" className="flex shrink-0 items-center justify-center text-[1.3rem] text-[#704214] font-extrabold">
                        ✓
                      </span>
                      <span className="font-semibold">2 surnames traced to the late 1700s/early 1800s* </span>
                    </li>
                    <li className="flex items-start items-center gap-4 section-body text-[1.09rem]">
                      <span aria-hidden="true" className="flex shrink-0 items-center justify-center text-[1.3rem] text-[#704214] font-extrabold">
                        ✓
                      </span>
                      <span className="font-semibold">Traces ancestors in South Africa </span>
                    </li>
                    <li className="flex items-start items-center gap-4 section-body text-[1.09rem]">
                      <span aria-hidden="true" className="flex shrink-0 items-center justify-center text-[1.3rem] text-[#704214] font-extrabold">
                        ✓
                      </span>
                      <span className="font-semibold">2 Family Tree Charts (1 for each surname) </span>
                    </li>
                    {/* <li className="flex items-start items-center gap-4 section-body text-[1.09rem]">
                      <span aria-hidden="true" className="flex shrink-0 items-center justify-center text-[1.3rem] text-[#704214] font-extrabold">
                        ✓
                      </span>
                      <span className="font-semibold">18 hours work </span>
                    </li> */}
                    <li className="flex items-start items-center gap-4 section-body text-[1.09rem]">
                      <span aria-hidden="true" className="flex shrink-0 items-center justify-center text-[1.3rem] text-[#704214] font-extrabold">
                        ✓
                      </span>
                      <span className="font-semibold">Personalised family tree book (digital) </span>
                    </li>
                    <li className="flex items-start items-center gap-4 section-body text-[1.09rem]">
                      <span aria-hidden="true" className="flex shrink-0 items-center justify-center text-[1.3rem] text-[#704214] font-extrabold">
                        ✓
                      </span>
                      <span className="font-semibold">Digital copies of documents (census records, death notices etc.) </span>
                    </li>
                    <li className="flex items-start items-center gap-4 section-body text-[1.09rem]">
                      <span aria-hidden="true" className="flex shrink-0 items-center justify-center text-[1.3rem] text-[#704214] font-extrabold">
                        ✓
                      </span>
                      <span className="font-semibold">Ready in 8 weeks </span>
                    </li>
                    {/* <li className="flex items-start items-center gap-4 section-body text-[1.2rem] pt-2 font-semibold">
                      <span>Total cost: R6300 </span>
                    </li> */}
                </ul>
              </p>
            </div>
            <a
              href="#contact-us"
              className="
                h-[2.9rem]
                flex
                w-full
                items-center justify-center
                rounded-[2rem]
                bg-[#566735]
                mt-auto
                pt-0
                text-center
                section-body
                text-[1.25rem]
                font-semibold
                text-[#ffffff]
                transition duration-300
                hover:bg-[#704214]
                focus:outline-none
                focus:ring-2
                focus:ring-[#ffffff]
                focus:ring-offset-2
                sm:text-[1.33rem]
              "
            >
              Get Started
            </a>
          </div>

          {/* Package Card 4 */}
          <div className="flex flex-col bg-[#FFF6E8] p-7 drop-shadow-md rounded-3xl overflow-hidden pb-8 pt-8">
            <img
              src="Images/book-stack.png"
              data-cursor-theme="light"
              alt="Family Roots"
              className="mx-left mb-7 mt-2 h-[4.8rem] self-start sepia-[6%] "
            />

            <div className="text-left ">
              <h3 className="section-heading text-[1.5rem] text-[#704214]">
                Life Story and Oral History
              </h3>
              <h3 className="section-heading font-bold tracking-wider text-[1.7rem] text-[#704214] pt-6">
               R9000
              </h3>

              <p className="mt-5 section-body leading-7 pb-7">
                <ul className="mt-5 space-y-4">
                    <li className="flex items-start items-center gap-4 section-body text-[1.04rem]">
                      <span aria-hidden="true" className="flex shrink-0 items-center justify-center text-[1.3rem] text-[#704214] font-extrabold">
                        ✓
                      </span>
                      <span className="font-semibold">Interview and recording of your relative’s life story or your own story </span>
                    </li>
                    <li className="flex items-start items-center gap-4 section-body text-[1.04rem]">
                      <span aria-hidden="true" className="flex shrink-0 items-center justify-center text-[1.3rem] text-[#704214] font-extrabold">
                        ✓
                      </span>
                      <span className="font-semibold">4 - 6 in-person interviews (30-60 minutes each) (Cape Town only) </span>
                    </li>
                    <li className="flex items-start items-center gap-4 section-body text-[1.09rem]">
                      <span aria-hidden="true" className="flex shrink-0 items-center justify-center text-[1.3rem] text-[#704214] font-extrabold">
                        ✓
                      </span>
                      <span className="font-semibold">Audio recordings of each interview </span>
                    </li>
                    <li className="flex items-start items-center gap-4 section-body text-[1.09rem]">
                      <span aria-hidden="true" className="flex shrink-0 items-center justify-center text-[1.3rem] text-[#704214] font-extrabold">
                        ✓
                      </span>
                      <span className="font-semibold">Transcripts of each interview </span>
                    </li>
                    <li className="flex items-start items-center gap-4 section-body text-[1.04rem]">
                      <span aria-hidden="true" className="flex shrink-0 items-center justify-center text-[1.3rem] text-[#704214] font-extrabold">
                        ✓
                      </span>
                      <span className="font-semibold">10 minute digital story (a slideshow of scanned photographs narrated with extracts from the interviews) </span>
                    </li>
                    <li className="flex items-start items-center gap-4 section-body text-[1.09rem]">
                      <span aria-hidden="true" className="flex shrink-0 items-center justify-center text-[1.3rem] text-[#704214] font-extrabold">
                        ✓
                      </span>
                      <span className="font-semibold">Ready in 6 - 8 weeks </span>
                    </li>
                    {/* <li className="flex items-start items-center gap-4 section-body text-[1.2rem] pt-2 font-semibold">
                      <span>Total cost: R6300 </span>
                    </li> */}
                </ul>
              </p>
            </div>
            <a
              href="#contact-us"
              className="
                h-[2.9rem]
                flex
                w-full
                items-center justify-center
                rounded-[2rem]
                bg-[#566735]
                mt-auto
                pt-0
                text-center
                section-body
                text-[1.25rem]
                font-semibold
                text-[#ffffff]
                transition duration-300
                hover:bg-[#704214]
                focus:outline-none
                focus:ring-2
                focus:ring-[#ffffff]
                focus:ring-offset-2
                sm:text-[1.33rem]
              "
            >
              Get Started
            </a>
          </div>

          {/* Package Card 2 */}
          <div className="flex flex-col bg-[#FFF6E8] p-7 drop-shadow-md rounded-3xl overflow-hidden pb-8 pt-8">
            <img
              src="Images/tree.png"
              data-cursor-theme="light"
              alt="Family Roots"
              className="mx-left mb-7 mt-2 h-[4.8rem] self-start sepia-[6%] "
            />

            <div className="text-left ">
              <h3 className="section-heading text-[1.5rem] text-[#704214] pt-1">
                Grandparent <br />Trace
              </h3>
              <h3 className="section-heading font-bold tracking-wider text-[1.7rem] text-[#704214] pt-6">
               R10 500
              </h3>

              <p className="mt-5 section-body leading-7 pb-7">
                <ul className="mt-5 space-y-4">
                    <li className="flex items-start items-center gap-4 section-body text-[1.09rem]">
                      <span aria-hidden="true" className="flex shrink-0 items-center justify-center text-[1.3rem] text-[#704214] font-extrabold">
                        ✓
                      </span>
                      <span className="font-semibold">4 surnames to late 1700s/early 1800s* </span>
                    </li>
                    <li className="flex items-start items-center gap-4 section-body text-[1.09rem]">
                      <span aria-hidden="true" className="flex shrink-0 items-center justify-center text-[1.3rem] text-[#704214] font-extrabold">
                        ✓
                      </span>
                      <span className="font-semibold">Traces ancestors in South Africa </span>
                    </li>
                    <li className="flex items-start items-center gap-4 section-body text-[1.09rem]">
                      <span aria-hidden="true" className="flex shrink-0 items-center justify-center text-[1.3rem] text-[#704214] font-extrabold">
                        ✓
                      </span>
                      <span className="font-semibold">4 Family Tree Charts (1 for each surname) </span>
                    </li>
                    {/* <li className="flex items-start items-center gap-4 section-body text-[1.09rem]">
                      <span aria-hidden="true" className="flex shrink-0 items-center justify-center text-[1.3rem] text-[#704214] font-extrabold">
                        ✓
                      </span>
                      <span className="font-semibold"> 30 hours work </span>
                    </li> */}
                    <li className="flex items-start items-center gap-4 section-body text-[1.09rem]">
                      <span aria-hidden="true" className="flex shrink-0 items-center justify-center text-[1.3rem] text-[#704214] font-extrabold">
                        ✓
                      </span>
                      <span className="font-semibold">Personalised family tree book (digital) </span>
                    </li>
                    <li className="flex items-start items-center gap-4 section-body text-[1.09rem]">
                      <span aria-hidden="true" className="flex shrink-0 items-center justify-center text-[1.3rem] text-[#704214] font-extrabold">
                        ✓
                      </span>
                      <span className="font-semibold">Digital copies of documents (census records, death notices etc.) </span>
                    </li>
                    <li className="flex items-start items-center gap-4 section-body text-[1.09rem]">
                      <span aria-hidden="true" className="flex shrink-0 items-center justify-center text-[1.3rem] text-[#704214] font-extrabold">
                        ✓
                      </span>
                      <span className="font-semibold">Ready in 12 weeks </span>
                    </li>
                    {/* <li className="flex items-start items-center gap-4 section-body text-[1.2rem] pt-2 font-semibold">
                      <span>Total cost: R6300 </span>
                    </li> */}
                </ul>
              </p>
            </div>
            <a
              href="#contact-us"
              className="
                h-[2.9rem]
                flex
                w-full
                items-center justify-center
                rounded-[2rem]
                bg-[#566735]
                mt-auto
                pt-0
                text-center
                section-body
                text-[1.25rem]
                font-semibold
                text-[#ffffff]
                transition duration-300
                hover:bg-[#704214]
                focus:outline-none
                focus:ring-2
                focus:ring-[#ffffff]
                focus:ring-offset-2
                sm:text-[1.33rem]
              "
            >
              Get Started
            </a>
          </div>

          {/* Package Card 3 */}
          <div className="flex flex-col bg-[#FFF6E8] p-7 drop-shadow-md rounded-3xl overflow-hidden pb-8 pt-8">
            <img
              src="Images/book.png"
              data-cursor-theme="light"
              alt="Family Roots"
              className="mx-left mb-7 mt-2 h-[4.8rem] self-start sepia-[6%] "
            />

            <div className="text-left ">
              <h3 className="section-heading text-[1.5rem] text-[#704214] ">
                Comprehensive Ancestry Trace
              </h3>
              <h3 className="section-heading font-bold tracking-wider text-[1.7rem] text-[#704214] pt-6">
               R14 000
              </h3>

              <p className="mt-5 section-body leading-7 pb-7">
                <ul className="mt-5 space-y-4">
                    <li className="flex items-start items-center gap-4 section-body text-[1.09rem]">
                      <span aria-hidden="true" className="flex shrink-0 items-center justify-center text-[1.3rem] text-[#704214] font-extrabold">
                        ✓
                      </span>
                      <span className="font-semibold">16 great, great grandparents </span>
                    </li>
                    <li className="flex items-start items-center gap-4 section-body text-[1.09rem]">
                      <span aria-hidden="true" className="flex shrink-0 items-center justify-center text-[1.3rem] text-[#704214] font-extrabold">
                        ✓
                      </span>
                      <span className="font-semibold">Traces ancestors in South Africa </span>
                    </li>
                    <li className="flex items-start items-center gap-4 section-body text-[1.09rem]">
                      <span aria-hidden="true" className="flex shrink-0 items-center justify-center text-[1.3rem] text-[#704214] font-extrabold">
                        ✓
                      </span>
                      <span className="font-semibold">5+ Family Tree Charts (4 surnames + pedigree) </span>
                    </li>
                    {/* <li className="flex items-start items-center gap-4 section-body text-[1.09rem]">
                      <span aria-hidden="true" className="flex shrink-0 items-center justify-center text-[1.3rem] text-[#704214] font-extrabold">
                        ✓
                      </span>
                      <span className="font-semibold">40 hours work </span>
                    </li> */}
                    <li className="flex items-start items-center gap-4 section-body text-[1.09rem]">
                      <span aria-hidden="true" className="flex shrink-0 items-center justify-center text-[1.3rem] text-[#704214] font-extrabold">
                        ✓
                      </span>
                      <span className="font-semibold">Personalised family tree book </span>
                    </li>
                    <li className="flex items-start items-center gap-4 section-body text-[1.09rem]">
                      <span aria-hidden="true" className="flex shrink-0 items-center justify-center text-[1.3rem] text-[#704214] font-extrabold">
                        ✓
                      </span>
                      <span className="font-semibold">Digital copies of documents (census records, death notices etc.) </span>
                    </li>
                    <li className="flex items-start items-center gap-4 section-body text-[1.09rem]">
                      <span aria-hidden="true" className="flex shrink-0 items-center justify-center text-[1.3rem] text-[#704214] font-extrabold">
                        ✓
                      </span>
                      <span className="font-semibold">Ready in 16 weeks </span>
                    </li>
                    {/* <li className="flex items-start items-center gap-4 section-body text-[1.2rem] pt-2 font-semibold">
                      <span>Total cost: R6300 </span>
                    </li> */}
                </ul>
              </p>
            </div>
            <a
              href="#contact-us"
              className="
                h-[2.9rem]
                flex
                w-full
                items-center justify-center
                rounded-[2rem]
                bg-[#566735]
                mt-auto
                pt-0
                text-center
                section-body
                text-[1.25rem]
                font-semibold
                text-[#ffffff]
                transition duration-300
                hover:bg-[#704214]
                focus:outline-none
                focus:ring-2
                focus:ring-[#ffffff]
                focus:ring-offset-2
                sm:text-[1.33rem]
              "
            >
              Get Started
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}