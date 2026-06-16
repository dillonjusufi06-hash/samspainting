'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import {
  ChevronDown,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PaintCTA } from "@/components/paint-cta";
import { PageHero } from "@/components/page-hero";
import { TestimonialsSection } from "@/components/testimonials-section";
import { ServiceCard } from "@/components/service-card";
import { ContactFormSection } from "@/components/contact-form-section";
import { services } from "@/lib/services";
import { testimonials } from "@/lib/testimonials";

interface PastProject {
  id: string;
  image: string;
  title: string;
  location: string;
}

const paintBrands = [
  { name: "Benjamin Moore", url: "/brands/benjamin-moore.svg" },
  { name: "Sherwin-Williams", url: "/brands/sherwin-williams.svg" },
  { name: "PPG Paints", url: "/brands/ppg.svg" },
  { name: "Valspar Paints", url: "/brands/valspar.svg" },
];

export function HomePage() {
  const handleMarqueeMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const animElements = container.querySelectorAll('[class*="animate-marquee"]');
    animElements.forEach((el) => {
      el.getAnimations().forEach((anim) => {
        if (anim.playbackRate !== 0.5) {
          anim.playbackRate = 0.5;
        }
      });
    });
  };

  const handleMarqueeMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const animElements = container.querySelectorAll('[class*="animate-marquee"]');
    animElements.forEach((el) => {
      el.getAnimations().forEach((anim) => {
        if (anim.playbackRate !== 1.0) {
          anim.playbackRate = 1.0;
        }
      });
    });
  };

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const faqItems = [
    {
      question: "How much does house painting cost in North Jersey?",
      answer: "The price depends on the size of the job, the amount of prep work, and what areas need painting. We can give you a clear estimate after looking at the project."
    },
    {
      question: "Do you offer free painting estimates?",
      answer: "Yes. Sam's Painting offers free estimates for interior painting, exterior painting, cabinet painting, deck staining, fence staining, epoxy floors, and commercial painting."
    },
    {
      question: "Do you do both interior and exterior painting?",
      answer: "Yes. We paint inside and outside homes. This includes walls, ceilings, trim, doors, siding, shutters, decks, fences, and more."
    },
    {
      question: "How long does a painting job usually take?",
      answer: "Small jobs may take one day. Larger interior or exterior painting jobs can take a few days or more. We will tell you the expected timeline before we start."
    },
    {
      question: "Do I need to move furniture before you come?",
      answer: "We ask that small items, pictures, and fragile things are moved before we arrive. For bigger furniture, we can help move and cover it to keep it protected."
    },
    {
      question: "What paint brands do you use?",
      answer: "We use quality paint brands like Benjamin Moore, Sherwin-Williams, PPG, and Valspar. We choose the right paint for the surface and project."
    },
    {
      question: "Do you protect floors, furniture, and landscaping?",
      answer: "Yes. We cover floors, furniture, windows, walkways, plants, and other areas before painting. We keep the work area clean and protected."
    },
    {
      question: "Are you licensed and insured in New Jersey?",
      answer: "Yes. Sam's Painting LLC is licensed, bonded, and fully insured in New Jersey (HIC #13VH03695800)."
    },
    {
      question: "Do you paint kitchen cabinets?",
      answer: "Yes. We offer cabinet painting for kitchens, bathrooms, built-ins, and other cabinets. Cabinet painting is a great way to update your home without replacing the cabinets."
    },
    {
      question: "Do you offer commercial painting?",
      answer: "Yes. We paint offices, stores, rental properties, small businesses, and other light commercial spaces across North Jersey."
    },
    {
      question: "Do you clean up after the job?",
      answer: "Yes. We clean the work area, remove materials, and leave your home or business neat when the job is done."
    },
    {
      question: "Do you guarantee your work?",
      answer: "Yes. We check the finished job with you and fix anything that needs attention before we leave."
    }
  ];

  const pastProjects: PastProject[] = [
    { id: "project-1", image: "https://i.imgur.com/V4Zenes.jpeg", title: "Interior Living Room", location: "Short Hills, NJ" },
    { id: "project-2", image: "https://i.imgur.com/HjbsRn1.jpeg", title: "Dining Room & Trim", location: "Rumson, NJ" },
    { id: "project-3", image: "https://i.imgur.com/gEcyqlo.jpeg", title: "Pool House Exterior", location: "Franklin Lakes, NJ" },
    { id: "project-4", image: "https://i.imgur.com/CXopZpU.jpeg", title: "Deck Staining", location: "Saddle River, NJ" },
    { id: "project-6", image: "https://i.imgur.com/q3l77CF.png", title: "Interior Library", location: "Montclair, NJ" },
    { id: "project-7", image: "https://i.imgur.com/JsGQKnE.png", title: "Interior Trim Work", location: "Alpine, NJ" },
    { id: "project-8", image: "https://i.imgur.com/xqU3aOp.jpeg", title: "Interior Woodwork", location: "Chatham, NJ" },
    { id: "project-10", image: "https://i.imgur.com/voeCG8X.png", title: "Kitchen & Dining", location: "Mendham, NJ" },
    { id: "project-11", image: "https://i.imgur.com/X0SN4kK.png", title: "Home Office", location: "Summit, NJ" },
    { id: "project-12", image: "https://i.imgur.com/o0oq3Ma.jpeg", title: "Exterior Trim Prep", location: "Englewood Cliffs, NJ" },
    { id: "project-13", image: "https://i.imgur.com/Bkh6jte.jpeg", title: "Sam's Painting Crew", location: "Franklin Lakes, NJ" },
    { id: "project-14", image: "https://i.imgur.com/sHCligV.jpeg", title: "Foyer Painting", location: "Tenafly, NJ" },
    { id: "project-15", image: "https://i.imgur.com/XDFLr3O.jpeg", title: "Media Room", location: "Ridgewood, NJ" },
    { id: "project-16", image: "https://i.imgur.com/Vyuh1We.jpeg", title: "Cabinet Painting", location: "Franklin Lakes, NJ" },
    { id: "project-9", image: "https://i.imgur.com/4c1vAQI.jpeg", title: "Hallway Painting", location: "Millburn, NJ" },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 relative flex flex-col font-sans">
      <SiteHeader />

      <main className="flex-1 z-10 relative">
        <PageHero
          id="hero"
          imageSrc="/banner.jpg"
          imageAlt="Sam's Painting"
          headline="Professional House Painters"
          tagline="Licensed, bonded, and insured painters based in Franklin Lakes. Careful prep, premium paints, and immaculate job sites across Bergen, Morris, and Essex County's finest neighborhoods."
          showRating
          ratingNote="Based on local customer reviews"
        />

        <section className="py-6 overflow-hidden relative z-20 bg-white">
          <div className="relative w-full flex overflow-hidden"
               onMouseEnter={handleMarqueeMouseEnter}
               onMouseLeave={handleMarqueeMouseLeave}>
            <div className="absolute top-0 bottom-0 left-0 w-20 sm:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-20 sm:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="flex animate-marquee py-2">
              {[...paintBrands, ...paintBrands, ...paintBrands, ...paintBrands].map((brand, i) => (
                <div key={i} className="flex items-center justify-center shrink-0 w-36 h-8 relative mx-3 sm:mx-8">
                  <Image
                    src={brand.url}
                    alt={brand.name}
                    fill
                    unoptimized
                    className="object-contain opacity-85 hover:opacity-100 saturate-50 hover:saturate-100 transition-all duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="py-24 bg-neutral-100/30 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="space-y-3 mb-16 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
                Our Painting Services
              </h2>
              <p className="text-sm max-w-2xl text-neutral-600 font-normal leading-relaxed">
                We make painting simple for homes and small businesses. We prep the area, protect your space, use quality paint, and leave everything clean when the job is done.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
              {services.map((srv) => (
                <ServiceCard
                  key={srv.slug}
                  href={`/service/${srv.slug}`}
                  title={srv.title}
                  description={srv.description}
                  image={srv.image}
                  imageAlt={srv.title}
                />
              ))}
            </div>
          </div>
        </section>

        <PaintCTA />

        <section id="past-work" className="py-24 bg-neutral-100/30 transition-colors duration-300 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-12">
            <div className="space-y-3 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
                Our Past Painting Work
              </h2>
              <p className="text-sm max-w-2xl text-neutral-600 font-normal leading-relaxed">
                Take a look at real painting projects completed in North Jersey&apos;s most distinguished neighborhoods — Franklin Lakes, Saddle River, Ridgewood, Short Hills, and beyond.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div
              className="relative w-full flex overflow-hidden py-1"
              onMouseEnter={handleMarqueeMouseEnter}
              onMouseLeave={handleMarqueeMouseLeave}
            >
              <div className="flex animate-marquee-slow">
                {pastProjects.concat(pastProjects).map((proj, index) => (
                  <div
                    key={`${proj.id}-row1-${index}`}
                    className="relative h-[270px] w-[260px] sm:h-[320px] sm:w-[300px] shrink-0 rounded-2xl overflow-hidden group border border-neutral-200/95 shadow-md mx-3"
                  >
                    <Image
                      src={proj.image}
                      alt={proj.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 260px, 300px"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                      <h3 className="text-sm font-bold tracking-tight text-white leading-tight">
                        {proj.title}
                      </h3>
                      <p className="text-[11px] text-neutral-300 mt-1 font-medium">
                        {proj.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="relative w-full flex overflow-hidden py-1"
              onMouseEnter={handleMarqueeMouseEnter}
              onMouseLeave={handleMarqueeMouseLeave}
            >
              <div className="flex animate-marquee-reverse-slow">
                {[...pastProjects].reverse().concat([...pastProjects].reverse()).map((proj, index) => (
                  <div
                    key={`${proj.id}-row2-${index}`}
                    className="relative h-[270px] w-[260px] sm:h-[320px] sm:w-[300px] shrink-0 rounded-2xl overflow-hidden group border border-neutral-200/95 shadow-md mx-3"
                  >
                    <Image
                      src={proj.image}
                      alt={proj.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 260px, 300px"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                      <h3 className="text-sm font-bold tracking-tight text-white leading-tight">
                        {proj.title}
                      </h3>
                      <p className="text-[11px] text-neutral-300 mt-1 font-medium">
                        {proj.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <PaintCTA />

        <TestimonialsSection items={testimonials} />

        <PaintCTA />

        <section id="faq" className="py-24 bg-neutral-50 border-t border-neutral-100 transition-colors duration-300 relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-500/[0.015] rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-10">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 font-sans">
                Frequently Asked Questions
              </h2>
              <p className="text-sm max-w-2xl mx-auto text-neutral-600 font-normal font-sans leading-relaxed">
                Have questions before starting your painting project? Here are some common questions homeowners ask Sam&apos;s Painting.
              </p>
            </div>

            <div className="space-y-4">
              {faqItems.map((item, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-neutral-200/80 rounded-2xl bg-neutral-50/40 hover:bg-neutral-50/80 transition-colors duration-200 overflow-hidden"
                    id={`faq-item-${idx}`}
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full text-left py-5 px-6 sm:px-8 flex items-center justify-between gap-4 font-sans cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
                      aria-expanded={isOpen}
                    >
                      <span className="text-base font-extrabold text-neutral-900 tracking-tight leading-snug">
                        {item.question}
                      </span>
                      <span className={`p-1 rounded-lg bg-neutral-100 border border-neutral-200/60 text-neutral-600 transition-all duration-300 ${isOpen ? "rotate-180 bg-accent-50 border-accent-200 text-accent-600" : ""}`}>
                        <ChevronDown size={16} className="stroke-[2.5]" />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                          <div className="px-6 sm:px-8 pb-5 text-sm text-neutral-600 font-sans leading-relaxed border-t border-neutral-100 pt-3">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <ContactFormSection />
      </main>

      <SiteFooter />
    </div>
  );
}
