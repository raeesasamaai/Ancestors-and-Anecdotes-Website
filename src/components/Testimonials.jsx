import ScrollReveal from "./ScrollReveal";

export default function Testimonials() {
  return (
    <section
      id="Testimonials"
      className="min-h-screen bg-[#F5E6CC] px-6 py-20 text-[#1C1C1C] md:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <ScrollReveal
          as="p"
          className="mb-2 section-name"
          style={{
            WebkitTextStroke: "0.45px currentColor",
          }}
        >
          Testimonials
        </ScrollReveal>

        <ScrollReveal as="h2" className="mt-8 max-w-5xl section-heading">
          Stories We Have Helped Bring to Light
        </ScrollReveal>

        <ScrollReveal as="p" className="mt-7 max-w-4xl section-body">
          Every research journey is personal. Here are a few words from clients
          who trusted us with their family history.
        </ScrollReveal>

        <ScrollReveal as="div" className="mt-12 grid gap-8 md:grid-cols-3 md:text-center">
          {/* Testimonial Card 1 */}
          <div className="h-fulloverflow-hidden rounded-[1.8rem] bg-[#FFF6E8] drop-shadow-md">
            <div className="flex h-full min-h-[440px] flex-col p-9 text-left">
              {/* Quotation mark */}
              <div
                aria-hidden="true"
                className="
                  font-[Georgia]
                  text-[3.4rem]
                  font-bold
                  leading-[0.7]
                  text-[#704214]
                "
              >
                “
              </div>

              {/* Rating */}
              <div
                aria-label="5 out of 5 stars"
                className="
                  mt-2
                  flex
                  items-center
                  gap-3
                  text-[2rem]
                  leading-none
                  text-[#566735]
                "
              >
                <span aria-hidden="true">★</span>
                <span aria-hidden="true">★</span>
                <span aria-hidden="true">★</span>
                <span aria-hidden="true">★</span>
                <span aria-hidden="true">★</span>
              </div>

              {/* Testimonial */}
              <p
                className="
                  mt-9
                  section-body
                  text-[1.2rem]
                  leading-[1.35]
                  text-[#1C1C1C]
                "
              >
                The team at Ancestors and Anecdotes took the time to understand
                our family history and transformed it into a beautiful keepsake.
                We now have something our children and grandchildren will
                treasure forever.
              </p>

              {/* Client details */}
              <div className="mt-auto flex items-center gap-5 pt-5 mb-3">
                <img
                  src="/Images/testimonial-1.jpg"
                  alt="Mary-Anne"
                  className="
                    h-11
                    w-11
                    shrink-0
                    rounded-full
                    object-cover
                    object-center
                  "
                />

                <div>
                  <p
                    className="
                      font-['Book_Antiqua','Palatino_Linotype',Palatino,serif]
                      text-[1.2rem]
                      leading-tight
                      text-[#9C645E]
                    "
                  >
                    Mary-Anne
                  </p>

                  <p
                    className="
                      mt-1
                      section-body
                      text-[0.95rem]
                      leading-tight
                      text-[#1C1C1C]
                    "
                  >
                    Cape Town, South Africa
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Card 2 */}
          <div className="h-fulloverflow-hidden rounded-[1.8rem] bg-[#FFF6E8] drop-shadow-md">
            <div className="flex h-full min-h-[440px] flex-col p-9 text-left">
              {/* Quotation mark */}
              <div
                aria-hidden="true"
                className="
                  font-[Georgia]
                  text-[3.4rem]
                  font-bold
                  leading-[0.7]
                  text-[#704214]
                "
              >
                “
              </div>

              {/* Rating */}
              <div
                aria-label="5 out of 5 stars"
                className="
                  mt-2
                  flex
                  items-center
                  gap-3
                  text-[2rem]
                  leading-none
                  text-[#566735]
                "
              >
                <span aria-hidden="true">★</span>
                <span aria-hidden="true">★</span>
                <span aria-hidden="true">★</span>
                <span aria-hidden="true">★</span>
                <span aria-hidden="true">★</span>
              </div>

              {/* Testimonial */}
              <p
                className="
                  mt-9
                  section-body
                  text-[1.2rem]
                  leading-[1.35]
                  text-[#1C1C1C]
                "
              >
                Professional, patient and incredibly passionate about what they do. 
                They helped us uncover stories we never knew and preserved them in 
                such a meaningful way. Highly recommend their services.
              </p>

              {/* Client details */}
              <div className="mt-auto flex items-center gap-5 pt-5 mb-3">
                <img
                  src="/Images/testimonial-2.jpg"
                  alt="Mary-Anne"
                  className="
                    h-11
                    w-11
                    shrink-0
                    rounded-full
                    object-cover
                    object-center
                  "
                />

                <div>
                  <p
                    className="
                      font-['Book_Antiqua','Palatino_Linotype',Palatino,serif]
                      text-[1.2rem]
                      leading-tight
                      text-[#9C645E]
                    "
                  >
                    John Doe
                  </p>

                  <p
                    className="
                      mt-1
                      section-body
                      text-[0.95rem]
                      leading-tight
                      text-[#1C1C1C]
                    "
                  >
                    Durban, South Africa
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Card 3 */}
          <div className="h-full overflow-hidden rounded-[1.8rem] bg-[#FFF6E8] drop-shadow-md">
            <div className="flex h-full min-h-[440px] flex-col p-9 text-left">
              {/* Quotation mark */}
              <div
                aria-hidden="true"
                className="
                  font-[Georgia]
                  text-[3.4rem]
                  font-bold
                  leading-[0.7]
                  text-[#704214]
                "
              >
                “
              </div>

              {/* Rating */}
              <div
                aria-label="5 out of 5 stars"
                className="
                  mt-2
                  flex
                  items-center
                  gap-3
                  text-[2rem]
                  leading-none
                  text-[#566735]
                "
              >
                <span aria-hidden="true">★</span>
                <span aria-hidden="true">★</span>
                <span aria-hidden="true">★</span>
                <span aria-hidden="true">★</span>
                <span aria-hidden="true">★</span>
              </div>

              {/* Testimonial */}
              <p
                className="
                  mt-9
                  section-body
                  text-[1.2rem]
                  leading-[1.35]
                  text-[#1C1C1C]
                "
              >
                From our first consultation to receiving our final family history book, 
                the experience was exceptional. The attention to detail and care they put 
                into every page is truly unmatched.
              </p>

              {/* Client details */}
              <div className="mt-auto flex items-center gap-5 pt-5 mb-3">
                <img
                  src="/Images/testimonial-3.jpg"
                  alt="Mary-Anne"
                  className="
                    h-11
                    w-11
                    shrink-0
                    rounded-full
                    object-cover
                    object-center
                  "
                />

                <div>
                  <p
                    className="
                      font-['Book_Antiqua','Palatino_Linotype',Palatino,serif]
                      text-[1.2rem]
                      leading-tight
                      text-[#9C645E]
                    "
                  >
                    Jane Smith
                  </p>

                  <p
                    className="
                      mt-1
                      section-body
                      text-[0.95rem]
                      leading-tight
                      text-[#1C1C1C]
                    "
                  >
                    Johannesburg, South Africa
                  </p>
                </div>
              </div>
            </div>
          </div>

          
        </ScrollReveal>
      </div>
    </section>
  );
}