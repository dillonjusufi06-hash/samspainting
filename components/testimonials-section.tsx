"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import type { Testimonial } from "@/lib/testimonials";

interface TestimonialsSectionProps {
  items: Testimonial[];
  serviceTitle?: string;
}

const testimonialQuote = (text: string, emphasis: string) => {
  const index = text.indexOf(emphasis);
  if (index === -1) return <span>{text}</span>;

  return (
    <span>
      {text.slice(0, index)}
      <span className="underline decoration-accent-500 decoration-2 font-black text-neutral-900">
        {emphasis}
      </span>
      {text.slice(index + emphasis.length)}
    </span>
  );
};

export function TestimonialsSection({ items, serviceTitle }: TestimonialsSectionProps) {
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isTestimonialHovering, setIsTestimonialHovering] = useState(false);
  const isTestimonialHoveringRef = useRef(false);
  const activeTestimonialIndexRef = useRef(0);
  const isTestimonialScrollingRef = useRef(false);
  const isProgrammaticTestimonialScrollRef = useRef(false);
  const testimonialScrollLockTimerRef = useRef<number | null>(null);
  const testimonialAutoplayTimerRef = useRef<number | null>(null);
  const [testimonialAutoplayKey, setTestimonialAutoplayKey] = useState(0);

  const testimonialCount = items.length;
  const maxTestimonialIndex = Math.max(0, testimonialCount - itemsPerView);

  const resetTestimonialAutoplay = () => {
    setTestimonialAutoplayKey((key) => key + 1);
  };

  const setTestimonialIndex = (idx: number) => {
    const clamped = Math.min(Math.max(0, idx), maxTestimonialIndex);
    activeTestimonialIndexRef.current = clamped;
    setActiveTestimonialIndex((current) => (current === clamped ? current : clamped));
  };

  const getTestimonialScrollLeft = (idx: number) => {
    const container = scrollContainerRef.current;
    if (!container) return 0;
    const child = container.children[idx] as HTMLElement | undefined;
    return child?.offsetLeft ?? 0;
  };

  const scrollToTestimonialIndex = (
    idx: number,
    options?: { onComplete?: () => void }
  ) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const clamped = Math.min(Math.max(0, idx), maxTestimonialIndex);
    const targetLeft = getTestimonialScrollLeft(clamped);

    isTestimonialScrollingRef.current = true;
    isProgrammaticTestimonialScrollRef.current = true;
    container.scrollTo({
      left: targetLeft,
      behavior: "smooth",
    });
    setTestimonialIndex(clamped);

    if (testimonialScrollLockTimerRef.current !== null) {
      window.clearTimeout(testimonialScrollLockTimerRef.current);
    }

    let completed = false;
    const finish = () => {
      if (completed) return;
      completed = true;
      isTestimonialScrollingRef.current = false;
      testimonialScrollLockTimerRef.current = null;
      requestAnimationFrame(() => {
        isProgrammaticTestimonialScrollRef.current = false;
        options?.onComplete?.();
      });
    };

    container.addEventListener("scrollend", finish, { once: true });
    testimonialScrollLockTimerRef.current = window.setTimeout(finish, 700);
  };

  const goToTestimonial = (idx: number) => {
    scrollToTestimonialIndex(idx);
    resetTestimonialAutoplay();
  };

  const snapTestimonialToNearest = (resetAutoplay = false) => {
    const container = scrollContainerRef.current;
    if (!container || isTestimonialScrollingRef.current) return;

    const scrollLeft = container.scrollLeft;
    const children = Array.from(container.children) as HTMLElement[];
    if (children.length === 0) return;

    let closestIndex = 0;
    let minDiff = Infinity;

    children.forEach((child, index) => {
      if (index > maxTestimonialIndex) return;
      const diff = Math.abs(child.offsetLeft - scrollLeft);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = index;
      }
    });

    if (minDiff > 4) {
      scrollToTestimonialIndex(closestIndex);
    } else if (activeTestimonialIndexRef.current !== closestIndex) {
      setTestimonialIndex(closestIndex);
    }

    if (resetAutoplay) {
      resetTestimonialAutoplay();
    }
  };

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) setItemsPerView(3);
      else if (window.innerWidth >= 640) setItemsPerView(2);
      else setItemsPerView(1);
    };
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const onScrollEnd = () => {
      if (isProgrammaticTestimonialScrollRef.current) return;
      snapTestimonialToNearest(true);
    };

    container.addEventListener("scrollend", onScrollEnd);

    return () => {
      container.removeEventListener("scrollend", onScrollEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxTestimonialIndex]);

  useEffect(() => {
    if (activeTestimonialIndex > maxTestimonialIndex) {
      scrollToTestimonialIndex(maxTestimonialIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxTestimonialIndex]);

  useEffect(() => {
    if (isTestimonialHovering) return;

    const runAutoplayStep = () => {
      const max = Math.max(0, testimonialCount - itemsPerView);
      const current = activeTestimonialIndexRef.current;
      const next = current >= max ? 0 : current + 1;

      scrollToTestimonialIndex(next, {
        onComplete: () => {
          if (isTestimonialHoveringRef.current) return;
          testimonialAutoplayTimerRef.current = window.setTimeout(runAutoplayStep, 2500);
        },
      });
    };

    testimonialAutoplayTimerRef.current = window.setTimeout(runAutoplayStep, 2500);

    return () => {
      if (testimonialAutoplayTimerRef.current !== null) {
        window.clearTimeout(testimonialAutoplayTimerRef.current);
        testimonialAutoplayTimerRef.current = null;
      }
      if (testimonialScrollLockTimerRef.current !== null) {
        window.clearTimeout(testimonialScrollLockTimerRef.current);
        testimonialScrollLockTimerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTestimonialHovering, itemsPerView, testimonialCount, maxTestimonialIndex, testimonialAutoplayKey]);

  if (items.length === 0) return null;

  return (
    <section id="testimonials" className="py-24 bg-neutral-50 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 text-left space-y-3 mb-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          What Our Clients Say
        </h2>
        <p className="text-sm max-w-xl text-neutral-600 font-normal">
          {serviceTitle
            ? `Our physical spot inspections ensure absolute, pristine surface finishes. Here are recent reviews from local homeowners who chose Sam's Painting for ${serviceTitle.toLowerCase()}.`
            : "Our physical spot inspections ensure absolute, pristine surface finishes. Here are reviews left recently by local homeowners."}
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 group">
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => {
            isTestimonialHoveringRef.current = true;
            setIsTestimonialHovering(true);
          }}
          onMouseLeave={() => {
            isTestimonialHoveringRef.current = false;
            setIsTestimonialHovering(false);
          }}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-8 w-full no-scrollbar relative z-10"
        >
          {items.map((test, index) => (
            <div
              key={test.id}
              className="p-6 rounded-2xl border flex flex-col justify-between shrink-0 snap-start snap-always bg-white border-neutral-200 text-neutral-900 flex-[0_0_100%] sm:flex-[0_0_calc((100%-1.5rem)/2)] lg:flex-[0_0_calc((100%-3rem)/3)]"
              id={`testimonial-card-${index}`}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1.5">
                  <Image
                    src="/brands/google-g.svg"
                    alt="Google"
                    width={18}
                    height={18}
                    unoptimized
                    className="shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex items-center space-x-0.5">
                    {[...Array(test.stars)].map((_, idx) => (
                      <Star key={idx} size={18} className="fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                </div>

                <p className="text-sm sm:text-base leading-relaxed font-bold text-neutral-800 font-sans min-h-[110px] flex items-center">
                  {testimonialQuote(test.quote, test.emphasis)}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-neutral-200 flex justify-between items-center">
                <div>
                  <div className="text-sm sm:text-base font-extrabold text-neutral-950 font-sans tracking-tight">
                    {test.name}
                  </div>
                  <div className="text-xs text-accent-600 font-bold font-sans mt-0.5">{test.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center space-x-4 mt-6">
          <button
            onClick={() => {
              const prevIndex =
                activeTestimonialIndex <= 0 ? maxTestimonialIndex : activeTestimonialIndex - 1;
              goToTestimonial(prevIndex);
            }}
            className="p-1.5 rounded-full border border-accent-200 text-accent-500 bg-white hover:bg-accent-50 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
            aria-label="Previous reviews"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="flex items-center space-x-2">
            {Array.from({ length: maxTestimonialIndex + 1 }, (_, idx) => {
              const isSelected = activeTestimonialIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => goToTestimonial(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    isSelected ? "w-8 bg-accent-500" : "w-2.5 bg-accent-200 hover:bg-accent-300"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              );
            })}
          </div>

          <button
            onClick={() => {
              const nextIndex =
                activeTestimonialIndex >= maxTestimonialIndex ? 0 : activeTestimonialIndex + 1;
              goToTestimonial(nextIndex);
            }}
            className="p-1.5 rounded-full border border-accent-200 text-accent-500 bg-white hover:bg-accent-50 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
            aria-label="Next reviews"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
