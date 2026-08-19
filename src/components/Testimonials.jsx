import ScrollReveal from "./ScrollReveal";


/* =========================================================
   TESTIMONIAL DATA
========================================================= */

const testimonials = [
  {
    id: "mary-anne",

    quote:
      "The team at Ancestors and Anecdotes took the time to understand our family history and transformed it into a beautiful keepsake. We now have something our children and grandchildren will treasure forever.",

    name: "Mary-Anne",

    location:
      "Cape Town, South Africa",

    image:
      "/Images/testimonial-1.jpg",

    imageAlt:
      "Mary-Anne",

    rating: 5,
  },

  {
    id: "john-doe",

    quote:
      "Professional, patient and incredibly passionate about what they do. They helped us uncover stories we never knew and preserved them in such a meaningful way. Highly recommend their services.",

    name: "John Doe",

    location:
      "Durban, South Africa",

    image:
      "/Images/testimonial-2.jpg",

    imageAlt:
      "John Doe",

    rating: 5,
  },

  {
    id: "jane-smith",

    quote:
      "From our first consultation to receiving our final family history book, the experience was exceptional. The attention to detail and care they put into every page is truly unmatched.",

    name: "Jane Smith",

    location:
      "Johannesburg, South Africa",

    image:
      "/Images/testimonial-3.jpg",

    imageAlt:
      "Jane Smith",

    rating: 5,
  },
];


/* =========================================================
   TESTIMONIAL CARD
========================================================= */

function TestimonialCard({
  testimonial,
}) {
  return (
    <article
      className="
        h-full
        overflow-hidden

        rounded-[26px]

        bg-[#FFF6E8]

        drop-shadow-md

        sm:rounded-[28px]

        md:rounded-[24px]

        lg:rounded-[28px]

        xl:rounded-[1.8rem]
      "
    >
      <div
        className="
          flex
          h-full

          min-h-[350px]

          flex-col

          p-6

          text-left

          sm:min-h-[380px]
          sm:p-7

          md:min-h-[420px]
          md:p-5

          lg:min-h-[430px]
          lg:p-6

          xl:min-h-[440px]
          xl:p-9

          [@media(max-width:767px)_and_(orientation:landscape)_and_(max-height:600px)]:min-h-[320px]

          [@media(max-width:767px)_and_(orientation:landscape)_and_(max-height:600px)]:p-6
        "
      >
        {/* =================================================
            QUOTATION MARK
        ================================================= */}

        <div
          aria-hidden="true"
          className="
            font-[Georgia]

            text-[2.8rem]
            font-bold

            leading-[0.7]

            text-[#704214]

            sm:text-[3rem]

            md:text-[2.6rem]

            lg:text-[2.9rem]

            xl:text-[3.4rem]

            [@media(max-width:767px)_and_(orientation:landscape)_and_(max-height:600px)]:text-[2.6rem]
          "
        >
          “
        </div>


        {/* =================================================
            RATING
        ================================================= */}

        <div
          role="img"
          aria-label={`${testimonial.rating} out of 5 stars`}
          className="
            mt-2

            flex
            items-center

            gap-1

            text-[1.55rem]

            leading-none

            text-[#566735]

            sm:gap-1.5
            sm:text-[1.7rem]

            md:gap-[3px]
            md:text-[1.35rem]

            lg:gap-1
            lg:text-[1.55rem]

            xl:gap-2
            xl:text-[2rem]

            [@media(max-width:767px)_and_(orientation:landscape)_and_(max-height:600px)]:text-[1.45rem]
          "
        >
          {Array.from({
            length:
              testimonial.rating,
          }).map(
            (_, index) => (
              <span
                key={index}
                aria-hidden="true"
              >
                ★
              </span>
            ),
          )}
        </div>


        {/* =================================================
            TESTIMONIAL TEXT
        ================================================= */}

        <blockquote
          className="
            mt-6

            sm:mt-7

            md:mt-6

            lg:mt-7

            xl:mt-9

            [@media(max-width:767px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-5
          "
        >
          <p
            className="
              section-body

              text-[1.05rem]

              leading-[1.45]

              text-[#1C1C1C]

              sm:text-[1.1rem]

              md:text-[0.98rem]
              md:leading-[1.42]

              lg:text-[1.05rem]
              lg:leading-[1.45]

              xl:text-[1.2rem]

              2xl:text-[1.22rem]

              [@media(max-width:767px)_and_(orientation:landscape)_and_(max-height:600px)]:text-[1rem]

              [@media(max-width:767px)_and_(orientation:landscape)_and_(max-height:600px)]:leading-[1.4]
            "
          >
            {testimonial.quote}
          </p>
        </blockquote>


        {/* =================================================
            CLIENT DETAILS

            mt-auto keeps all three client rows
            aligned toward the bottom.
        ================================================= */}

        <footer
          className="
            mt-auto

            flex
            items-center

            gap-4

            pt-7

            sm:gap-5
            sm:pt-8

            md:gap-3
            md:pt-6

            lg:gap-4
            lg:pt-7

            xl:gap-5
            xl:pt-8

            [@media(max-width:767px)_and_(orientation:landscape)_and_(max-height:600px)]:gap-3

            [@media(max-width:767px)_and_(orientation:landscape)_and_(max-height:600px)]:pt-6
          "
        >
          {/* CLIENT IMAGE */}

          <img
            src={
              testimonial.image
            }
            alt={
              testimonial.imageAlt
            }
            loading="lazy"
            decoding="async"
            className="
              h-11
              w-11

              shrink-0

              rounded-full

              object-cover
              object-center

              sm:h-12
              sm:w-12

              md:h-9
              md:w-9

              lg:h-10
              lg:w-10

              xl:h-11
              xl:w-11

              [@media(max-width:767px)_and_(orientation:landscape)_and_(max-height:600px)]:h-10

              [@media(max-width:767px)_and_(orientation:landscape)_and_(max-height:600px)]:w-10
            "
          />


          {/* CLIENT INFORMATION */}

          <div
            className="
              min-w-0
            "
          >
            <p
              className="
                font-['Book_Antiqua','Palatino_Linotype',Palatino,serif]

                text-[1.08rem]

                leading-tight

                text-[#9C645E]

                sm:text-[1.15rem]

                md:text-[0.95rem]

                lg:text-[1.05rem]

                xl:text-[1.2rem]

                [@media(max-width:767px)_and_(orientation:landscape)_and_(max-height:600px)]:text-[1rem]
              "
            >
              {testimonial.name}
            </p>


            <p
              className="
                mt-1

                section-body

                text-[0.9rem]

                leading-[1.2]

                text-[#1C1C1C]

                sm:text-[0.93rem]

                md:text-[0.78rem]

                lg:text-[0.85rem]

                xl:text-[0.95rem]

                [@media(max-width:767px)_and_(orientation:landscape)_and_(max-height:600px)]:text-[0.85rem]
              "
            >
              {testimonial.location}
            </p>
          </div>
        </footer>
      </div>
    </article>
  );
}


/* =========================================================
   TESTIMONIALS SECTION
========================================================= */

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      data-cursor-theme="dark"
      className="
        min-h-screen

        bg-[#F5E6CC]

        px-6
        py-16

        text-[#1C1C1C]

        sm:px-8
        sm:py-20

        md:px-8
        md:py-20

        lg:px-12
        lg:py-20

        xl:px-20

        [@media(max-width:767px)_and_(orientation:landscape)_and_(max-height:600px)]:px-8

        [@media(max-width:767px)_and_(orientation:landscape)_and_(max-height:600px)]:py-14
      "
    >
      <div
        className="
          mx-auto
          max-w-7xl
        "
      >
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
          Testimonials
        </ScrollReveal>


        {/* =================================================
            HEADING
        ================================================= */}

        <ScrollReveal
          as="h2"
          className="
            mt-8

            max-w-5xl

            section-heading

            [@media(max-width:767px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-6
          "
        >
          Stories We Have Helped Bring to Light
        </ScrollReveal>


        {/* =================================================
            INTRODUCTION
        ================================================= */}

        <ScrollReveal
          as="p"
          className="
            mt-7

            max-w-4xl

            section-body

            [@media(max-width:767px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-5
          "
        >
          Every research journey is personal. Here are a few words from clients
          who trusted us with their family history.
        </ScrollReveal>


        {/* =================================================
            TESTIMONIAL GRID

            MOBILE:
            1 card

            TABLET / IPAD 768px+:
            3 cards

            LAPTOP:
            3 cards

            DESKTOP:
            3 cards
        ================================================= */}

        <ScrollReveal
          as="div"
          className="
            mt-12

            grid
            grid-cols-1

            items-stretch

            gap-8

            md:grid-cols-3
            md:gap-4

            lg:gap-5

            xl:gap-8

            [@media(max-width:767px)_and_(orientation:landscape)_and_(max-height:600px)]:mt-9

            [@media(max-width:767px)_and_(orientation:landscape)_and_(max-height:600px)]:grid-cols-1

            [@media(max-width:767px)_and_(orientation:landscape)_and_(max-height:600px)]:gap-6
          "
        >
          {testimonials.map(
            (
              testimonial,
            ) => (
              <TestimonialCard
                key={
                  testimonial.id
                }
                testimonial={
                  testimonial
                }
              />
            ),
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}