import ScrollReveal from "./ScrollReveal";

export default function WhatWeDo() {
  return (
    <section
      id="what-we-do"
      className="min-h-screen bg-[#F5E6CC] px-6 py-20 text-[#1C1C1C] md:px-20 "
    >
      <div className="mx-auto max-w-7xl">

        <ScrollReveal 
          as="p"
          className="mb-2 section-name "
        style={{
      WebkitTextStroke: "0.45px currentColor",
    }}>
          What we do
        </ScrollReveal>
        

        <ScrollReveal as="h2" className="max-w-5xl mt-8 section-heading">
          Helping You Uncover the People, Places, and Stories That Came Before You
        </ScrollReveal>

        <ScrollReveal as="p" className="mt-7 max-w-5xl section-body">
          Ancestors and Anecdotes transforms names and dates on a page into a vivid, multi-generational story. 
          We design beautiful, custom family trees and reconstruct your ancestors' lives through narrative histories, 
          historical context, and archival imagery, so that complex historical records are turned into a captivating, 
          easy-to-read story anyone in your family can enjoy.
        </ScrollReveal>

        <ScrollReveal as="div" className="mt-12 grid gap-8 md:grid-cols-3 md:text-center">
          <div className="bg-[#FFF6E8] drop-shadow-md rounded-3xl overflow-hidden">
            <img src="Images/hero-bg-2.jpg" data-cursor-theme="light" alt="Family Roots" className="mx-auto h-56 w-full sepia-[6%]" />
              <div className="text-center p-8">
                <h3 className="section-heading text-2xl text-[#704214] pt-1">
                  We Trace Your Family Roots
                </h3>
                <p className="mt-5 section-body text-[1.19rem] leading-7 pb-1">
                  We conduct in-person research at the Western Cape Archives and online research of digital databases 
                  such as MyHeritage and FamilySearch to uncover names, dates, places, relationships, and historical 
                  connections that form part of your family history.
                </p>
              </div>
          </div>

          <div className="bg-[#FFF6E8] drop-shadow-md rounded-3xl overflow-hidden">
            <img src="Images/card-2.jpg" data-cursor-theme="light" alt="Family Roots" className="mx-auto h-56 w-full sepia-[40%]" />
              <div className="text-center p-8">
                <h3 className="section-heading text-2xl text-[#704214] pt-1">
                  We Create Family Tree Charts
                </h3>
                <p className="mt-5 section-body text-[1.19rem] leading-7 pb-1">
                  We use professional genealogical software to create a visual representation of your family history, 
                  making it easier to understand how your ancestors connect to one another and how they relate to you, 
                  where they lived and died and other interesting details about them that perhaps you did not know or 
                  can now be confirmed.  
                </p>
              </div>
          </div>

          <div className="bg-[#FFF6E8] drop-shadow-md rounded-3xl overflow-hidden">
            <img src="Images/hero-bg-3.jpg" data-cursor-theme="light" alt="Family Roots" className="mx-auto h-56 w-full sepia-[40%]" />
              <div className="text-center p-8">
                <h3 className="section-heading text-2xl text-[#704214] pt-1">
                  We Preserve Family Stories
                </h3>
                <p className="mt-5 section-body text-[1.19rem] leading-7 pb-1">
                  We believe genealogy is more than a family tree. It is about preserving the anecdotes, memories, 
                  and details that make your family history meaningful. We use a combination of a family tree chart, 
                  personalised family history book, digital stories and oral history to give a full perspective from 
                  the past to the present. 
                </p>
              </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}