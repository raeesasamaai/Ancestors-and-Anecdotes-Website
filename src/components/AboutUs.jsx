import ScrollReveal from "./ScrollReveal";


export default function AboutUs() {
  const biographyTextClass = `
    section-body

    text-[1.08rem]
    leading-[1.6]

    sm:text-[1.16rem]

    md:text-[1.2rem]
    md:leading-[1.65]

    xl:text-[1.22rem]

    2xl:text-[1.3rem]

    [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:text-[1rem]
    [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:leading-[1.5]
  `;


  return (
    <section
      id="about-us"
      data-cursor-theme="dark"
      className="
        scroll-mt-28

        bg-[#F5E6CC]

        px-6
        py-16

        text-[#1C1C1C]

        sm:px-8
        sm:py-20

        md:px-12

        lg:px-16
        lg:py-24

        xl:px-20

        [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:px-8
        [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:py-14
      "
    >
      <div className="mx-auto max-w-7xl">
        {/* =================================================
            SECTION NAME
        ================================================= */}

        <ScrollReveal
          as="p"
          className="
            mb-2
            section-name
          "
          style={{
            WebkitTextStroke:
              "0.45px currentColor",
          }}
        >
          About us
        </ScrollReveal>


        {/* =================================================
            MAIN HEADING
        ================================================= */}

        <ScrollReveal
          as="h2"
          className="
            mt-8
            max-w-6xl

            section-heading

            text-[#704214]

            [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-6
          "
        >
          The People Behind Ancestors &amp; Anecdotes
        </ScrollReveal>


        {/* =================================================
            INTRODUCTION
        ================================================= */}

        <ScrollReveal
          as="p"
          className="
            mt-9
            max-w-5xl

            section-body

            [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-5
          "
        >
          Sarah and Matthew are budding genealogists who started Ancestors and
          Anecdotes with the vision to help people capture their family histories
          and make them come alive through illustrated narratives and short
          narrated videos.
        </ScrollReveal>


        {/* =================================================
            FOUNDERS

            Phone / Tablet / iPad / Small laptop:
            stacked

            1280px+:
            Sarah and Matthew side-by-side
        ================================================= */}

        <div
          className="
            mt-11

            grid
            grid-cols-1

            gap-16

            sm:mt-11
            sm:gap-20

            md:gap-20

            xl:mt-11
            xl:grid-cols-2
            xl:items-start
            xl:gap-12

            2xl:gap-16

            [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-10
            [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:gap-14
          "
        >
          {/* =================================================
              SARAH
          ================================================= */}

          <ScrollReveal
            as="article"
            className="
              min-w-0
            "
          >
            {/* SARAH IMAGE */}

            <div
              data-cursor-theme="light"
              className="
                aspect-[4/3]
                w-full

                overflow-hidden

                rounded-[30px]

                bg-[#C3CDD5]

                shadow-[0_3px_4px_rgba(112,66,20,0.28)]

                sm:rounded-[34px]

                md:aspect-[16/10]
                md:rounded-[38px]

                xl:aspect-[4/3]

                [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:aspect-[16/8]
              "
            >
              <img
                src="/Images/Childhood-photo-of-Sarah.jpg"
                alt="Sarah, co-founder of Ancestors and Anecdotes"
                loading="lazy"
                decoding="async"
                className="
                  h-full
                  w-full

                  object-cover
                  object-center
                "
              />
            </div>


            {/* SARAH DETAILS */}

            <div
              className="
                mt-7

                sm:mt-8

                xl:mt-9

                [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-6
              "
            >
              <h3
                className="
                  font-['Book_Antiqua','Palatino_Linotype',Palatino,serif]

                  text-[1.55rem]
                  font-normal
                  leading-[1.2]

                  text-[#704214]

                  sm:text-[1.7rem]

                  md:text-[1.8rem]

                  xl:text-[1.85rem]

                  2xl:text-[1.95rem]

                  [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:text-[1.5rem]
                "
              >
                Sarah Dowling-Nissen
              </h3>


              <span
                aria-hidden="true"
                className="
                  mt-3
                  block

                  h-[2px]
                  w-12

                  rounded-full

                  bg-[#9C645E]
                "
              />


              <p
                className={`
                  mt-6

                  ${biographyTextClass}

                  [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-5
                `}
              >
                Sarah Dowling-Nissen grew up in a large family where storytelling
                was central to any family gathering. Her mother and father used
                to tell her and her brothers lots of funny and adventurous
                stories about growing up (which were often embellished by her
                father for dramatic effect). She has always had a passion for
                creative projects that combine different media - a hobby that
                was encouraged by her late grandmother during the many
                afternoons they spent together sketching the view out the
                window, making collages, decoupaging, or acting out plays with
                her cousin. Currently Sarah divides her professional time
                between doing family research and working part-time as a
                Registered counsellor for an NPO.
              </p>
            </div>
          </ScrollReveal>


          {/* =================================================
              MATTHEW
          ================================================= */}

          <ScrollReveal
            as="article"
            className="
              min-w-0
            "
          >
            {/* MATTHEW IMAGE */}

            <div
              data-cursor-theme="light"
              className="
                aspect-[4/3]
                w-full

                overflow-hidden

                rounded-[30px]

                bg-[#C3CDD5]

                shadow-[0_3px_4px_rgba(112,66,20,0.28)]

                sm:rounded-[34px]

                md:aspect-[16/10]
                md:rounded-[38px]

                xl:aspect-[4/3]

                [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:aspect-[16/8]
              "
            >
              <img
                src="/Images/about-image-2.jpg"
                alt="Matthew, co-founder of Ancestors and Anecdotes"
                loading="lazy"
                decoding="async"
                className="
                  h-full
                  w-full

                  object-cover
                  object-center
                "
              />
            </div>


            {/* MATTHEW DETAILS */}

            <div
              className="
                mt-7

                sm:mt-8

                xl:mt-9

                [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-6
              "
            >
              <h3
                className="
                  font-['Book_Antiqua','Palatino_Linotype',Palatino,serif]

                  text-[1.55rem]
                  font-normal
                  leading-[1.2]

                  text-[#704214]

                  sm:text-[1.7rem]

                  md:text-[1.8rem]

                  xl:text-[1.85rem]

                  2xl:text-[1.95rem]

                  [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:text-[1.5rem]
                "
              >
                Matthew Nissen
              </h3>


              <span
                aria-hidden="true"
                className="
                  mt-3
                  block

                  h-[2px]
                  w-12

                  rounded-full

                  bg-[#9C645E]
                "
              />


              <p
                className={`
                  mt-6

                  ${biographyTextClass}

                  [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-5
                `}
              >
                Matthew Nissen grew up listening to his father - an apartheid
                activist and minister - talking about the history of South
                Africa and the church, as well as his maternal grandfather - a
                teacher and later a Moravian priest - who was a community
                historian and helped start the Genadendal museum. For Matthew
                this love of history grew into a talent for researching. Before
                coming to this work Matthew managed an oral history project at
                the District Six Museum, and is currently completing his Masters
                in Digital Curation.
              </p>
            </div>
          </ScrollReveal>
        </div>


        {/* =================================================
            SHARED STORY

            Always below the individual founder profiles.

            Mobile / tablet:
            stacked

            1280px+:
            image and text side-by-side
        ================================================= */}

        <ScrollReveal
          as="article"
          className="
            mt-2

            grid
            grid-cols-1

            items-center

            gap-8

            pt-12

            sm:mt-2
            sm:gap-10
            sm:pt-14

            md:gap-12

            xl:mt-2
            xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]
            xl:gap-16
            xl:pt-14

            2xl:gap-20

            [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-14
            [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:gap-7
            [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:pt-14
          "
        >
          {/* SHARED IMAGE */}

          <div
            data-cursor-theme="light"
            className="
              aspect-[4/3]
              w-full

              overflow-hidden

              rounded-[30px]

              bg-[#C3CDD5]

              shadow-[0_3px_4px_rgba(112,66,20,0.28)]

              sm:aspect-[16/10]
              sm:rounded-[34px]

              md:rounded-[38px]

              xl:aspect-[4/3]
              xl:max-w-[650px]

              [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:aspect-[16/8]
            "
          >
            <img
              src="/Images/Sarah-and-Matthew.jpeg"
              alt="Sarah and Matthew from Ancestors and Anecdotes"
              loading="lazy"
              decoding="async"
              className="
                h-full
                w-full

                object-cover
                object-center
              "
            />
          </div>


          {/* SHARED STORY TEXT */}

          <div
            className="
              min-w-0
            "
          >
            <p
              className="
                font-['Tangerine',cursive]

                text-[2.7rem]
                font-bold
                leading-none

                text-[#9C645E]

                [-webkit-text-stroke:0.35px_currentColor]

                sm:text-[3rem]

                md:text-[3.25rem]

                xl:text-[3.4rem]

                [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:text-[2.5rem]
              "
            >
              Our Shared Story
            </p>


            <span
              aria-hidden="true"
              className="
                mt-3
                block

                h-[3px]
                w-14

                rounded-full

                bg-[#9C645E]
              "
            />


            <h3
              className="
                mt-7

                font-['Book_Antiqua','Palatino_Linotype',Palatino,serif]

                text-[1.65rem]
                font-normal

                leading-[1.25]

                text-[#704214]

                sm:text-[1.8rem]

                md:text-[1.95rem]

                xl:text-[2rem]

                2xl:text-[2.1rem]

                [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-5
                [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:text-[1.55rem]
              "
            >
              Bringing Research and Storytelling Together
            </h3>


            <p
              className={`
                mt-6

                ${biographyTextClass}

                [@media(max-width:1023px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-5
              `}
            >
              With these combined interests and backgrounds, Sarah and Matthew
              blend historical research with personal storytelling and family
              anecdotes to help families understand where they come from and
              preserve these meaningful stories for future generations. When
              they’re not working, Sarah and Matthew enjoy marveling at the
              world through their toddler’s eyes who keeps them on their toes.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}