import ScrollReveal from "./ScrollReveal";

export default function AboutUs() {
  return (
    <section
      id="about-us"
      data-cursor-theme="dark"
      className="
        scroll-mt-28
        bg-[#F5E6CC]
        px-6
        py-20
        text-[#1C1C1C]
        md:px-20
        lg:py-24
      "
    >
      <div className="mx-auto max-w-7xl">
        {/* Section name */}
        <ScrollReveal
          as="p"
          className="mb-2 section-name"
          style={{
            WebkitTextStroke: "0.45px currentColor",
          }}
        >
          About us
        </ScrollReveal>

        {/* Main heading */}
        <ScrollReveal
          as="h2"
          className="
            mt-8
            max-w-6xl
            section-heading
            text-[#704214]
          "
        >
          The People Behind Ancestors &amp; Anecdotes
        </ScrollReveal>

        {/* About content */}
        <div
          className="
            mt-14
            flex
            flex-col
            gap-16
            md:mt-16
            lg:gap-20
            xl:gap-24
          "
        >
          {/* =========================================================
              SARAH
          ========================================================= */}
          <ScrollReveal
            as="div"
            className="
              grid
              grid-cols-1
              items-center
              gap-9
              md:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]
              md:gap-12
              lg:gap-16
            "
          >
            {/* Sarah image */}
            <div
              data-cursor-theme="light"
              className="
                w-full

                /* =====================================================
                   EDIT SARAH IMAGE HEIGHT HERE

                   Mobile:
                   h-[300px]

                   Tablet:
                   md:h-[360px]

                   Desktop:
                   lg:h-[380px]

                   Large desktop:
                   xl:h-[400px]
                ===================================================== */
                h-[300px]
                sm:h-[340px]
                md:h-[360px]
                lg:h-[380px]
                xl:h-[400px]

                /* =====================================================
                   EDIT SARAH IMAGE WIDTH HERE

                   Change these max-width values.

                   Example:
                   lg:max-w-[520px]
                   xl:max-w-[600px]

                   Bigger image:
                   xl:max-w-[650px]

                   Smaller image:
                   xl:max-w-[520px]
                ===================================================== */
                lg:max-w-[560px]
                xl:max-w-[600px]

                overflow-hidden
                rounded-[34px]
                bg-[#C3CDD5]
                shadow-[0_3px_4px_rgba(112,66,20,0.28)]
                md:rounded-[38px]
              "
            >
              <img
                src="/Images/Childhood-photo-of-Sarah.jpg"
                alt="Sarah, co-founder of Ancestors and Anecdotes"
                className="
                  h-full
                  w-full
                  object-cover
                  object-center
                "
              />
            </div>

            {/* Sarah information */}
            <div className="md:pl-2 lg:pl-4">
              <p
                className="
                  section-body
                  text-[1.15rem]
                  leading-[1.7]
                  sm:text-[1.25rem]
                  lg:text-[1.3rem]
                "
              >
                For years Sarah has had a yearning to capture people&apos;s
                family stories and turn them into illustrated written
                narratives and short narrated videos so that families are able
                to get to know and understand their ancestors, and in turn gain
                self understanding. As a professional counsellor, Sarah loves
                listening to clients speaking about their colourful families.
              </p>
            </div>
          </ScrollReveal>

          {/* =========================================================
              MATTHEW
          ========================================================= */}
          <ScrollReveal
            as="div"
            className="
              grid
              grid-cols-1
              items-center
              gap-9
              md:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)]
              md:gap-12
              lg:gap-16
            "
          >
            {/* Matthew information */}
            <div className="order-2 md:order-1 md:pr-2 lg:pr-4">
              <p
                className="
                  section-body
                  text-[1.15rem]
                  leading-[1.6]
                  sm:text-[1.25rem]
                  lg:text-[1.3rem]
                "
              >
                Matthew loves uncovering the past and seeing connections, and
                through that seeing how human we all are. His background in
                research and oral history at the District Six Museum has made
                him highly skilled at researching seemingly obscure pieces of
                history, bringing them together to build a full picture of a
                particular time, person or place. His genuine care and respect
                for people and passion for history allows an easy rapport to be
                built for conducting oral history interviews and doing family
                research.
              </p>
            </div>

            {/* Matthew image */}
            <div
              data-cursor-theme="light"
              className="
                order-1
                w-full

                /* =====================================================
                   EDIT MATTHEW IMAGE HEIGHT HERE
                ===================================================== */
                h-[300px]
                sm:h-[340px]
                md:h-[360px]
                lg:h-[380px]
                xl:h-[400px]

                /* =====================================================
                   EDIT MATTHEW IMAGE WIDTH HERE
                ===================================================== */
                lg:max-w-[560px]
                xl:max-w-[600px]

                overflow-hidden
                rounded-[34px]
                bg-[#C3CDD5]
                shadow-[0_3px_4px_rgba(112,66,20,0.28)]
                md:order-2
                md:rounded-[38px]
              "
            >
              <img
                src="/Images/about-image-2.jpg"
                alt="Matthew, co-founder of Ancestors and Anecdotes"
                className="
                  h-full
                  w-full
                  object-cover
                  object-center
                "
              />
            </div>
          </ScrollReveal>

          {/* =========================================================
              SARAH + MATTHEW TOGETHER
          ========================================================= */}
          <ScrollReveal
            as="div"
            className="
              grid
              grid-cols-1
              items-center
              gap-9
              md:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]
              md:gap-12
              lg:gap-16
            "
          >
            {/* Together image */}
            <div
              data-cursor-theme="light"
              className="
                w-full

                /* =====================================================
                   EDIT TOGETHER IMAGE HEIGHT HERE
                ===================================================== */
                h-[320px]
                sm:h-[370px]
                md:h-[400px]
                lg:h-[430px]
                xl:h-[460px]

                /* =====================================================
                   EDIT TOGETHER IMAGE WIDTH HERE
                ===================================================== */
                lg:max-w-[560px]
                xl:max-w-[600px]

                overflow-hidden
                rounded-[34px]
                bg-[#C3CDD5]
                shadow-[0_3px_4px_rgba(112,66,20,0.28)]
                md:rounded-[38px]
              "
            >
              <img
                src="/Images/Sarah-and-Matthew.jpeg"
                alt="Sarah and Matthew from Ancestors and Anecdotes"
                className="
                  h-full
                  w-full
                  object-cover
                  object-center
                "
              />
            </div>

            {/* Combined story and mission */}
            <div className="md:pl-2 lg:pl-4">
              <p
                className="
                  section-body
                  text-[1.15rem]
                  leading-[1.7]
                  sm:text-[1.25rem]
                  lg:text-[1.3rem]
                "
              >
                Putting their passions together, Sarah and Matthew are budding
                genealogists who find meaning in tracing the names and dates
                given by clients in order to gain insight into the historical
                context of a client&apos;s ancestors, combining this with
                family anecdotes to build a fuller picture of the lives lived
                by previous generations.
              </p>

              <p
                className="
                  mt-7
                  section-body
                  text-[1.15rem]
                  leading-[1.42]
                  sm:text-[1.25rem]
                  lg:text-[1.3rem]
                "
              >
                Our mission is to help individuals and families understand
                where they come from by uncovering records, organising family
                information, and preserving meaningful stories for future
                generations.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}