'use client';

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import {
  Paintbrush,
  Phone,
  Star,
  ChevronLeft,
  ChevronRight,
  Check,
  CheckCircle,
  X,
  ChevronDown,
} from "lucide-react";

// Interfaces
interface PastProject {
  id: string;
  image: string;
  title: string;
  location: string;
}

interface Testimonial {
  id: string;
  name: string;
  quote: string;
  emphasis: string;
  role: string;
  stars: number;
}

const testimonialQuote = (text: string, emphasis: string) => {
  const index = text.indexOf(emphasis);
  if (index === -1) return <span>{text}</span>;

  return (
    <span>
      {text.slice(0, index)}
      <span className="underline decoration-accent-500 decoration-2 font-black text-neutral-900">{emphasis}</span>
      {text.slice(index + emphasis.length)}
    </span>
  );
};

const GuaranteedCraftsmanshipCTA = ({ onBookEstimate }: { onBookEstimate?: () => void }) => {
  return (
    <section className="py-16 bg-neutral-950 text-white relative overflow-hidden border-y border-neutral-800">
      {/* Accent glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent-500/[0.07] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-neutral-900 rounded-full blur-2xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="space-y-3 text-center lg:text-left">
          <div className="flex justify-center lg:justify-start">
            <span className="text-[10px] font-black tracking-wider bg-accent-500 text-white px-2.5 py-1 rounded uppercase">
              Free Estimate
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight text-white max-w-2xl font-sans">
            Ready to Get Your Home Painted?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl font-medium leading-relaxed font-sans">
            Call Sam&apos;s Painting now. We will answer your questions, schedule a free estimate, and tell you the price before we start. No pressure.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto shrink-0">
          <a
            href="tel:2012325978"
            className="bg-accent-500 hover:bg-accent-600 active:bg-accent-700 text-white font-black text-xs tracking-wider py-4 px-8 rounded-full shadow-lg hover:shadow-accent-500/20 active:scale-95 transition-all text-center inline-flex items-center justify-center space-x-2 cursor-pointer select-none"
          >
            <Phone size={13} className="stroke-[2.5]" />
            <span>(201) 232-5978</span>
          </a>
          {onBookEstimate ? (
            <button
              type="button"
              onClick={onBookEstimate}
              className="border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-extrabold text-xs tracking-wider py-4 px-8 rounded-full transition-all hover:scale-105 active:scale-95 inline-flex items-center justify-center space-x-2 cursor-pointer select-none"
            >
              <span>Get Free Estimate</span>
            </button>
          ) : (
            <a
              href="mailto:sam@samthepainter.com"
              className="border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-extrabold text-xs tracking-wider py-4 px-8 rounded-full transition-all hover:scale-105 active:scale-95 inline-flex items-center justify-center space-x-2 cursor-pointer select-none"
            >
              <span>Get Free Estimate</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  
  // Helper for marquee half-speed on hover (Web Animations API playbackRate control)
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

  // Booking Modal States
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [bookingSubmitted, setBookingSubmitted] = useState<boolean>(false);
  const [clientName, setClientName] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [clientSchedule, setClientSchedule] = useState<string>("Immediate");

  // Testimonial carousel — itemsPerView changes by breakpoint
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isTestimonialHovering, setIsTestimonialHovering] = useState(false);
  const isTestimonialHoveringRef = useRef(false);
  const activeTestimonialIndexRef = useRef(0);
  const isTestimonialScrollingRef = useRef(false);
  const testimonialScrollLockTimerRef = useRef<number | null>(null);
  const testimonialAutoplayTimerRef = useRef<number | null>(null);
  const [testimonialAutoplayKey, setTestimonialAutoplayKey] = useState(0);

  const resetTestimonialAutoplay = () => {
    setTestimonialAutoplayKey((key) => key + 1);
  };

  // FAQ state & configuration
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const faqItems = [
    {
      question: "How much does house painting cost in New Jersey?",
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
      answer: "Yes. Sam's Painting LLC is licensed, bonded, and fully insured in New Jersey."
    },
    {
      question: "Do you paint kitchen cabinets?",
      answer: "Yes. We offer cabinet painting for kitchens, bathrooms, built-ins, and other cabinets. Cabinet painting is a great way to update your home without replacing the cabinets."
    },
    {
      question: "Do you offer commercial painting?",
      answer: "Yes. We paint offices, stores, rental properties, small businesses, and other light commercial spaces in New Jersey."
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

  const testimonials: Testimonial[] = [
    {
      id: "test-1",
      name: "Sarah Jenkins",
      stars: 5,
      role: "Verified Homeowner",
      quote: "We hired Sam's Painting for our living room and hallway, and everything came out great. The walls look smooth, the lines are sharp, and the crew kept the house clean. I would definitely recommend them to anyone looking for a painter in New Jersey.",
      emphasis: "lines are sharp",
    },
    {
      id: "test-2",
      name: "Marcus Vance",
      stars: 5,
      role: "Verified Homeowner",
      quote: "Sam painted our kitchen cabinets and made them look brand new. He explained the process, showed up on time, and the final finish came out very clean. It was a much cheaper option than replacing the cabinets.",
      emphasis: "brand new",
    },
    {
      id: "test-3",
      name: "Elena Rostova",
      stars: 5,
      role: "Verified Homeowner",
      quote: "The team painted the outside of our house and did a great job. They power washed, prepped everything, and the paint looks fresh and even. Our home has way better curb appeal now.",
      emphasis: "curb appeal",
    },
    {
      id: "test-4",
      name: "Dillon Henderson",
      stars: 5,
      role: "Verified Homeowner",
      quote: "Sam's Painting did our full interior painting job, including walls, ceilings, and trim. The crew was respectful, fast, and very neat. The whole house feels brighter and newer.",
      emphasis: "brighter and newer",
    },
    {
      id: "test-5",
      name: "Amanda Russo",
      stars: 5,
      role: "Verified Homeowner",
      quote: "We used Sam's Painting for our deck staining, and it came out perfect. The wood looks rich again, and the color is exactly what we wanted. They also cleaned up everything before leaving.",
      emphasis: "rich again",
    },
    {
      id: "test-6",
      name: "Brian Mitchell",
      stars: 5,
      role: "Verified Business Owner",
      quote: "Sam painted our office space, and it was a very smooth process. They worked around our schedule, kept the area clean, and finished on time. Great commercial painting company.",
      emphasis: "finished on time",
    },
    {
      id: "test-7",
      name: "Kevin Walsh",
      stars: 5,
      role: "Verified Homeowner",
      quote: "Our garage epoxy floor came out amazing. It looks clean, shiny, and much easier to maintain. Sam's Painting made the whole garage look finished.",
      emphasis: "garage look finished",
    },
    {
      id: "test-8",
      name: "Nicole Parker",
      stars: 5,
      role: "Verified Homeowner",
      quote: "We needed a painter for a few bedrooms and a bathroom. Sam gave us a fair price, helped pick the right paint, and did a very clean job. I would use them again.",
      emphasis: "fair price",
    },
    {
      id: "test-9",
      name: "Anthony Caruso",
      stars: 5,
      role: "Verified Homeowner",
      quote: "Sam's Painting was easy to work with from the first call to the final walkthrough. They answered every question, protected our floors, and made sure we were happy with the work.",
      emphasis: "easy to work with",
    },
  ];

  const testimonialCount = testimonials.length;

  // Shuffled Brands state for Trust Signals
  const [shuffledBrands, setShuffledBrands] = useState<{ name: string; url: string; isGoogle?: boolean }[]>([]);

  useEffect(() => {
    const baseBrands = [
      { name: "Sherwin-Williams", url: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Sherwin-Williams_wordmark.svg" },
      { name: "Yelp", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Yelp_Logo.svg/960px-Yelp_Logo.svg.png?_=20210803213252" },
      { name: "Benjamin Moore", url: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Benjamin_Moore_logo.svg" },
      { name: "PPG Architectural", url: "https://commons.wikimedia.org/wiki/Special:Redirect/file/PPG_Logo.svg" },
      { name: "Valspar Paints", url: "https://commons.wikimedia.org/wiki/Special:Redirect/file/The_Valspar_Corporation_logo.svg" },
      { name: "Angi", url: "https://upload.wikimedia.org/wikipedia/commons/0/02/Angi_Wordmark_1C_Heart_RGB.svg" }
    ];
    const delayTimer = setTimeout(() => {
      setShuffledBrands([...baseBrands].sort(() => Math.random() - 0.5));
    }, 0);
    return () => clearTimeout(delayTimer);
  }, []);

  const maxTestimonialIndex = Math.max(0, testimonialCount - itemsPerView);

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
      options?.onComplete?.();
    };

    container.addEventListener("scrollend", finish, { once: true });
    testimonialScrollLockTimerRef.current = window.setTimeout(finish, 700);
  };

  const goToTestimonial = (idx: number) => {
    scrollToTestimonialIndex(idx);
    resetTestimonialAutoplay();
  };

  const syncTestimonialIndexFromScroll = () => {
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

    if (activeTestimonialIndexRef.current !== closestIndex) {
      setTestimonialIndex(closestIndex);
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

    let scrollDebounce: ReturnType<typeof setTimeout> | null = null;

    const onScroll = () => {
      if (isTestimonialScrollingRef.current) return;
      if (scrollDebounce) clearTimeout(scrollDebounce);
      scrollDebounce = setTimeout(syncTestimonialIndexFromScroll, 120);
    };

    const onScrollEnd = () => {
      if (scrollDebounce) clearTimeout(scrollDebounce);
      syncTestimonialIndexFromScroll();
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    container.addEventListener("scrollend", onScrollEnd);

    return () => {
      container.removeEventListener("scroll", onScroll);
      container.removeEventListener("scrollend", onScrollEnd);
      if (scrollDebounce) clearTimeout(scrollDebounce);
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

  // 5 Premium Painting/Coating Services
  const services = [
    {
      id: "srv-interior",
      title: "Interior Painting",
      description: "Fresh paint for walls, ceilings, trim, doors, bedrooms, kitchens, living rooms, and more.",
      image: "https://lakeshore-painting.org/wp-content/uploads/2024/03/Default_Realistic_interior_house_with_dark_blue_walls_0-1024x683.jpg"
    },
    {
      id: "srv-exterior",
      title: "Exterior Painting",
      description: "Exterior house painting, siding painting, trim painting, power washing, and outdoor touch-ups.",
      image: "https://www.solispainting.com/img/new-providence-painters.jpg"
    },
    {
      id: "srv-commercial",
      title: "Commercial Painting",
      description: "Clean, durable painting for offices, stores, rentals, and small business spaces.",
      image: "https://pizzazzpainting.com/wp-content/uploads/2022/01/shutterstock_58077985-scaled.jpg"
    },
    {
      id: "srv-deck",
      title: "Deck and Fence Staining",
      description: "Wood staining that helps protect decks, fences, railings, and outdoor wood from weather.",
      image: "https://www.elkhartlandscape.com/uploads/4/3/7/6/43764133/8788322_orig.jpg"
    },
    {
      id: "srv-epoxy",
      title: "Epoxy Floor Coatings",
      description: "Strong epoxy floors for garages, basements, shops, work areas, and clean finished spaces.",
      image: "https://certapro.com/wp-content/uploads/cache/remote/pub-9fc1f065f07e441b8f35365c774f09ae-r2-dev/279536609.jpg"
    }
  ];

  const pastProjects: PastProject[] = [
    { id: "project-1", image: "https://i.imgur.com/V4Zenes.jpeg", title: "Short Hills Living Room Wainscoting", location: "Short Hills • Essex County, NJ" },
    { id: "project-2", image: "https://i.imgur.com/HjbsRn1.jpeg", title: "Rumson Formal Dining Coffered Ceiling", location: "Rumson • Monmouth County, NJ" },
    { id: "project-3", image: "https://i.imgur.com/gEcyqlo.jpeg", title: "Franklin Lakes Pool House Sky Mural", location: "Franklin Lakes • Bergen County, NJ" },
    { id: "project-4", image: "https://i.imgur.com/CXopZpU.jpeg", title: "Saddle River Porch Wood Staining", location: "Saddle River • Bergen County, NJ" },
    { id: "project-5", image: "https://i.imgur.com/n14I2D4.jpeg", title: "Wayne Commercial Exterior Restoration", location: "Wayne • Passaic County, NJ" },
    { id: "project-6", image: "https://i.imgur.com/q3l77CF.png", title: "Montclair Luxury Library Millwork", location: "Montclair • Essex County, NJ" },
    { id: "project-7", image: "https://i.imgur.com/JsGQKnE.png", title: "Alpine Royal Cobalt Box Moldings", location: "Alpine • Bergen County, NJ" },
    { id: "project-8", image: "https://i.imgur.com/xqU3aOp.jpeg", title: "Chatham Obsidian Library Woodwork", location: "Chatham • Morris County, NJ" },
    { id: "project-9", image: "https://i.imgur.com/4c1vAQI.jpeg", title: "Colts Neck Plaster Wainscoting Hall", location: "Colts Neck • Monmouth County, NJ" },
    { id: "project-10", image: "https://i.imgur.com/voeCG8X.png", title: "Mendham Classic Obsidian Eating Space", location: "Mendham • Morris County, NJ" },
    { id: "project-11", image: "https://i.imgur.com/X0SN4kK.png", title: "Summit Velvet Teal Office Library", location: "Summit • Union County, NJ" },
    { id: "project-12", image: "https://i.imgur.com/o0oq3Ma.jpeg", title: "Englewood Cliffs Trim Wood Prep", location: "Englewood Cliffs • Bergen County, NJ" },
    { id: "project-13", image: "https://i.imgur.com/Bkh6jte.jpeg", title: "Sam's Painting Wayne NJ Fleet Van", location: "Wayne • Passaic County, NJ" },
    { id: "project-14", image: "https://i.imgur.com/sHCligV.jpeg", title: "Tenafly Grand Entrance Foyer Millview", location: "Tenafly • Bergen County, NJ" },
    { id: "project-15", image: "https://i.imgur.com/XDFLr3O.jpeg", title: "Ridgewood Dark Media Theater Coat", location: "Ridgewood • Bergen County, NJ" },
    { id: "project-16", image: "https://i.imgur.com/Vyuh1We.jpeg", title: "Hardyston Charcoal Cabinet Bookcases", location: "Hardyston • Sussex County, NJ" },
    { id: "project-17", image: "https://i.imgur.com/Eo4XMUh.jpeg", title: "Hardwick Spiral White Staircase Foyer", location: "Hardwick • Warren County, NJ" },
  ];

  // Preload all gallery and critical assets on initial page load
  useEffect(() => {
    const imagesToPreload = [
      "https://i.imgur.com/0Rd44mM.png",
      "https://mythreesonspainting.com/wp-content/uploads/2025/03/6738474_m-2000x1000.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Yelp_Logo.svg/960px-Yelp_Logo.svg.png?_=20210803213252",
      "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
      "https://upload.wikimedia.org/wikipedia/commons/e/eb/Better_Business_Bureau.svg",
      "https://upload.wikimedia.org/wikipedia/commons/0/02/Angi_Wordmark_1C_Heart_RGB.svg",
      ...services.map((s) => s.image).filter(Boolean),
      ...pastProjects.map((p) => p.image).filter(Boolean),
    ];
    imagesToPreload.forEach((url) => {
      if (url) {
        const img = new window.Image();
        img.src = url;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const triggerEstimateModal = () => {
    setBookingSubmitted(false);
    setBookingModalOpen(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return;
    setBookingSubmitted(true);
    setTimeout(() => {
      setBookingModalOpen(false);
      setClientName("");
      setClientEmail("");
      setClientPhone("");
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 relative flex flex-col font-sans">
      
      {/* HEADER SECTION (Left Logo, Right Phone & Navigation menu) */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between relative">
          
          {/* Logo on far-left */}
          <a href="#hero" className="flex items-center group header-logo">
            <div className="relative h-10 w-44 sm:h-12 sm:w-52">
              <Image
                src="https://i.imgur.com/0Rd44mM.png"
                alt="Sam's Painting Logo"
                fill
                priority
                className="object-contain object-left transition-transform group-hover:scale-[1.02]"
                referrerPolicy="no-referrer"
              />
            </div>
          </a>

          {/* Quick Nav links + Phone number on the far-right */}
          <div className="flex items-center space-x-6 sm:space-x-8">
            <nav className="hidden lg:flex items-center space-x-6 text-xs font-bold tracking-wider">
              <a href="#services" className="hover:text-accent-500 transition-colors text-neutral-700">
                Services
              </a>
              <a href="#past-work" className="hover:text-accent-500 transition-colors text-neutral-700">
                Gallery
              </a>
              <a href="#testimonials" className="hover:text-accent-500 transition-colors text-neutral-700">
                Testimonials
              </a>
            </nav>

            <a 
              href="tel:2012325978" 
              className="flex items-center gap-2 bg-accent-500 hover:bg-accent-600 active:bg-accent-700 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs font-extrabold tracking-wider transition-all shadow-xs hover:shadow-sm active:scale-95 whitespace-nowrap"
            >
              <Phone size={13} className="stroke-[2.5]" />
              <span>(201) 232-5978</span>
            </a>
          </div>
        </div>
      </header>

      {/* HERO HERO CONTAINER */}
      <main className="flex-1 z-10 relative">
        <section id="hero" className="relative overflow-hidden border-b border-neutral-200 min-h-[70vh] flex items-center py-20 bg-neutral-900 text-neutral-900">
          {/* Edge-to-edge ambient backdrop image with a professional light overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://mythreesonspainting.com/wp-content/uploads/2025/03/6738474_m-2000x1000.jpg"
              alt="Artistic painting scene"
              fill
              priority
              className="object-cover opacity-75 select-none pointer-events-none"
              referrerPolicy="no-referrer"
            />
            {/* Elegant light transparent overlay (30%) to make background detail vibrant and visible */}
            <div className="absolute inset-0 bg-neutral-950/30" />
          </div>
 
          <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-10 w-full text-center space-y-8">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-black/60 border border-white/20 rounded-full w-fit mx-auto backdrop-blur-sm shadow-lg">
              <span className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
              <span className="text-xs tracking-wider text-white font-bold">
                #1 Top-Rated Painting Company
              </span>
            </div>
 
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.08] text-white">
              #1 Top-Rated Painting Company <br />
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent font-black">in New Jersey</span>
            </h1>
 
            <p className="text-lg sm:text-xl leading-relaxed text-white max-w-2xl mx-auto font-bold">
              With years of experience in the painting industry, our team is ready to answer your questions and address your concerns. We know you will be thrilled with the finished product.
            </p>
 
            {/* Quick rating summaries */}
            <div className="flex justify-center pt-8 border-t border-white/20 w-fit mx-auto">
              <div className="flex flex-col items-center">
                <span className="text-white text-xs tracking-wider block mb-1 font-bold">
                  Average customer rating
                </span>
                <div className="flex items-center space-x-1 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-sm font-black ml-2 text-white">5.0 Star Premium Rated</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST SIGNALS BANNER (AUTOSCROLL CAROUSEL OF PREMIUM BRANDS) */}
        <section className="py-6 overflow-hidden relative z-20 bg-white">

          <div className="relative w-full flex overflow-hidden hover-pause"
               onMouseEnter={handleMarqueeMouseEnter}
               onMouseMove={handleMarqueeMouseEnter}
               onMouseLeave={handleMarqueeMouseLeave}>
            {/* Fade Gradients left and right */}
            <div className="absolute top-0 bottom-0 left-0 w-20 sm:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-20 sm:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="flex animate-marquee py-2">
              {(() => {
                // If on-load state is still empty, fall back to default order for perfect initial paint
                const displayBrands = shuffledBrands.length > 0 ? shuffledBrands : [
                  { name: "Sherwin-Williams", url: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Sherwin-Williams_wordmark.svg" },
                  { name: "Yelp", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Yelp_Logo.svg/960px-Yelp_Logo.svg.png?_=20210803213252" },
                  { name: "Benjamin Moore", url: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Benjamin_Moore_logo.svg" },
                  { name: "PPG Architectural", url: "https://commons.wikimedia.org/wiki/Special:Redirect/file/PPG_Logo.svg" },
                  { name: "Valspar Paints", url: "https://commons.wikimedia.org/wiki/Special:Redirect/file/The_Valspar_Corporation_logo.svg" },
                  { name: "Angi", url: "https://upload.wikimedia.org/wikipedia/commons/0/02/Angi_Wordmark_1C_Heart_RGB.svg" }
                ];
                const repeated = [...displayBrands, ...displayBrands, ...displayBrands, ...displayBrands];
                return repeated.concat(repeated).map((brand, i) => (
                  <div key={i} className="flex items-center justify-center shrink-0 w-36 h-8 relative mx-3 sm:mx-8">
                    <Image
                      src={brand.url}
                      alt={brand.name}
                      fill
                      unoptimized
                      priority
                      className="object-contain transition-all duration-300 opacity-85 hover:opacity-100 saturate-50 hover:saturate-100"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ));
              })()}
            </div>
          </div>
        </section>







        {/* SERVICES SECTION */}
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((srv) => (
                <div
                  key={srv.id}
                  className="relative rounded-2xl overflow-hidden h-[360px] group border border-neutral-200/95 shadow-md transition-all duration-300 hover:scale-[1.015] hover:shadow-xl"
                  id={srv.id}
                >
                  {/* Background Image of the Service */}
                  <Image
                    src={srv.image || "https://d1afoc0smheahm.cloudfront.net/images/project_library/paint+house.jpg"}
                    alt={srv.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    referrerPolicy="no-referrer"
                  />
                  {/* Soft Gradient Scrim Overlay - top is clear, text is visible */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/40 to-transparent transition-opacity duration-300" />

                  {/* Bottom Text Content without paint icon or label badges */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10 text-white space-y-2">
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight leading-tight text-white">
                      {srv.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-neutral-100 font-normal opacity-95">
                      {srv.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* INTERMEDIATE COATINGS CTA BAND */}
        <GuaranteedCraftsmanshipCTA onBookEstimate={triggerEstimateModal} />

        {/* PAST PAINTING WORK SECTION (CAROUSELS MOVING IN OPPOSITE DIRECTIONS) */}
        <section id="past-work" className="py-24 bg-white transition-colors duration-300 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-12">
            <div className="space-y-3 text-center sm:text-left">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
                Our Past Painting Work
              </h2>
              <p className="text-sm max-w-xl text-neutral-600 font-normal">
                Explore real-world painting and cabinetry transformations completed across New Jersey. Hover cards to pause continuous auto-sliding work reels.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {/* FIRST CAROUSEL: MOVING LEFT */}
            <div className="relative w-full flex overflow-hidden hover-pause py-1"
                 onMouseEnter={handleMarqueeMouseEnter}
                 onMouseMove={handleMarqueeMouseEnter}
                 onMouseLeave={handleMarqueeMouseLeave}>
              <div className="flex animate-marquee-slow">
                {pastProjects.concat(pastProjects).map((proj, index) => {
                  const city = proj.location.split('•')[0].trim();
                  return (
                    <div
                      key={`${proj.id}-row1-${index}`}
                      className="relative h-[225px] w-[225px] sm:h-[285px] sm:w-[285px] shrink-0 rounded-2xl overflow-hidden select-none group border-2 border-accent-500 mx-3 shadow-md"
                    >
                      <Image
                        src={proj.image}
                        alt={proj.title}
                        fill
                        priority
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 225px, 285px"
                        referrerPolicy="no-referrer"
                      />

                      {/* Sleek Redesigned Location Badge (Bottom-Left) */}
                      <div className="absolute bottom-4 left-4 z-10 bg-white/95 backdrop-blur-md shadow-md border border-neutral-200/50 py-1.5 px-3 rounded-lg flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0" />
                        <span className="text-[10px] font-black tracking-wider text-neutral-900 font-sans">
                          {city}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SECOND CAROUSEL: MOVING RIGHT (OPPOSITE DIRECTION) */}
            <div className="relative w-full flex overflow-hidden hover-pause py-1"
                 onMouseEnter={handleMarqueeMouseEnter}
                 onMouseMove={handleMarqueeMouseEnter}
                 onMouseLeave={handleMarqueeMouseLeave}>
              <div className="flex animate-marquee-reverse-slow">
                {[...pastProjects].reverse().concat([...pastProjects].reverse()).map((proj, index) => {
                  const city = proj.location.split('•')[0].trim();
                  return (
                    <div
                      key={`${proj.id}-row2-${index}`}
                      className="relative h-[225px] w-[225px] sm:h-[285px] sm:w-[285px] shrink-0 rounded-2xl overflow-hidden select-none group border-2 border-accent-500 mx-3 shadow-md"
                    >
                      <Image
                        src={proj.image}
                        alt={proj.title}
                        fill
                        priority
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 225px, 285px"
                        referrerPolicy="no-referrer"
                      />

                      {/* Sleek Redesigned Location Badge (Bottom-Left) */}
                      <div className="absolute bottom-4 left-4 z-10 bg-white/95 backdrop-blur-md shadow-md border border-neutral-200/50 py-1.5 px-3 rounded-lg flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0" />
                        <span className="text-[10px] font-black tracking-wider text-neutral-900 font-sans">
                          {city}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION (ENDLESS CAROUSEL) */}
        <section id="testimonials" className="py-24 bg-neutral-50 transition-colors duration-300 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 text-left space-y-3 mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
              What Our Clients Say
            </h2>
            <p className="text-sm max-w-xl text-neutral-600 font-normal">
              Our physical spot inspections ensure absolute, pristine surface finishes. Here are reviews left recently by local homeowners.
            </p>
          </div>

          {/* Snap-based Testimonial Slider with manual controls & autoplay and dots */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-8 group">
            
            {/* Scroll Container with scroll snapping */}
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
              className="flex gap-6 overflow-x-auto scroll-smooth pb-8 w-full no-scrollbar relative z-10"
              id="testimonial-scroll-container"
            >
              {testimonials.map((test, index) => (
                <div
                  key={test.id}
                  className="p-6 rounded-2xl border flex flex-col justify-between shrink-0 bg-white border-neutral-200 text-neutral-900 flex-[0_0_100%] sm:flex-[0_0_calc((100%-1.5rem)/2)] lg:flex-[0_0_calc((100%-3rem)/3)]"
                  id={`testimonial-card-${index}`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-1.5">
                      <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
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
                      <div className="text-sm sm:text-base font-extrabold text-neutral-950 font-sans tracking-tight">{test.name}</div>
                      <div className="text-xs text-accent-600 font-bold font-sans mt-0.5">{test.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dot Indicator and clickers adjacent at bottom */}
            <div className="flex justify-center items-center space-x-4 mt-6" id="testimonial-pagination-container">
              {/* Left Arrow Clicker */}
              <button 
                onClick={() => {
                  const prevIndex =
                    activeTestimonialIndex <= 0 ? maxTestimonialIndex : activeTestimonialIndex - 1;
                  goToTestimonial(prevIndex);
                }}
                className="p-1.5 rounded-full border border-accent-200 text-accent-500 bg-white hover:bg-accent-50 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
                aria-label="Previous reviews"
                id="review-prev-btn"
              >
                <ChevronLeft size={16} />
              </button>

              {/* Accent colored indicator dots */}
              <div className="flex items-center space-x-2" id="testimonial-dots">
                {Array.from({ length: maxTestimonialIndex + 1 }, (_, idx) => {
                  const isSelected = activeTestimonialIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => goToTestimonial(idx)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        isSelected 
                          ? "w-8 bg-accent-500" 
                          : "w-2.5 bg-accent-200 hover:bg-accent-300"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                      id={`testimonial-dot-${idx}`}
                    />
                  );
                })}
              </div>

              {/* Right Arrow Clicker */}
              <button 
                onClick={() => {
                  const nextIndex =
                    activeTestimonialIndex >= maxTestimonialIndex ? 0 : activeTestimonialIndex + 1;
                  goToTestimonial(nextIndex);
                }}
                className="p-1.5 rounded-full border border-accent-200 text-accent-500 bg-white hover:bg-accent-50 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
                aria-label="Next reviews"
                id="review-next-btn"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS CTA */}
        <GuaranteedCraftsmanshipCTA onBookEstimate={triggerEstimateModal} />

        {/* FREQUENTLY ASKED QUESTIONS SECTION */}
        <section id="faq" className="py-24 bg-white border-t border-neutral-100 transition-colors duration-300 relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-500/[0.015] rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-10">
            {/* Header / Intro */}
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 font-sans">
                Frequently Asked Questions
              </h2>
              <p className="text-sm max-w-2xl mx-auto text-neutral-600 font-normal font-sans leading-relaxed">
                Have questions before starting your painting project? Here are some common questions homeowners ask Sam&apos;s Painting.
              </p>
            </div>

            {/* Accordion List */}
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
      </main>

      {/* FOOTER AREA */}
      <footer className="bg-white py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="p-1.5 rounded bg-accent-500 text-white">
              <Paintbrush size={16} />
            </div>
            <span className="text-sm font-extrabold tracking-wide">
              Sam&apos;s Painting
            </span>
          </div>

          <div className="text-center md:text-right text-[11px] text-neutral-500 space-y-1">
            <p className="text-neutral-700 font-bold tracking-wide">Wayne Metro Area • New Jersey Division</p>
            <p>
              <a href="tel:2012325978" className="hover:text-accent-600 transition-colors">201-232-5978</a>
              {" • "}
              <a href="mailto:sam@samthepainter.com" className="hover:text-accent-600 transition-colors">sam@samthepainter.com</a>
            </p>
            <p>© 2026 Sam&apos;s Painting LLC. Licensed, Bonded &amp; Fully Insured. NJ HIC #13VH09284100</p>
          </div>
        </div>
      </footer>

      {/* GLOBAL BOOKING / ESTIMATE REQUEST MODAL */}
      <AnimatePresence>
        {bookingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Shading overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setBookingModalOpen(false)}
              className="absolute inset-0 bg-neutral-900/40 backdrop-blur-xs"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="w-full max-w-lg p-8 rounded-2xl border bg-white border-neutral-200 text-neutral-900 shadow-2xl relative z-10"
            >
              <button
                onClick={() => setBookingModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-neutral-100 transition-colors text-neutral-500"
                id="modal_close_btn"
              >
                <X size={20} />
              </button>

              {bookingSubmitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-accent-500/10 border border-accent-500 text-accent-600 rounded-full flex items-center justify-center mx-auto">
                    <Check size={32} className="stroke-[3]" />
                  </div>
                  <span className="text-xs text-accent-600 font-bold block tracking-wider">
                    Request Transmitted Successfully
                  </span>
                  <p className="text-base font-extrabold max-w-xs mx-auto text-neutral-900">
                    We have successfully logged your walk-through booking!
                  </p>
                  <p className="text-xs max-w-sm mx-auto text-neutral-500">
                    Sam or our schedule coordinator will connect directly via <span className="text-neutral-900 underline font-bold">{clientEmail}</span> within 24 hours to coordinate on-site measurement variables.
                  </p>
                  <div className="p-3 bg-neutral-50 rounded border border-neutral-200 text-xs text-neutral-500 font-bold">
                    Pending Confirmation • New Jersey License #13VH09284100
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs tracking-widest text-accent-600 font-bold block mb-1">
                      Sam&apos;s Painting Portal
                    </span>
                    <h3 className="text-2xl font-black tracking-tight text-neutral-900">
                      Walk-Through Consultation
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1 font-semibold">
                      Provide your home project criteria, and the master painter Sam will connect directly to measure surface sizes and evaluate material scopes.
                    </p>
                  </div>

                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-neutral-700 tracking-tight">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Sarah Jenkins"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-200 focus:border-accent-500 rounded-xl py-3 px-4 text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-accent-500/20 transition-all font-sans placeholder-neutral-400 font-medium"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-neutral-700 tracking-tight">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="sarah@jerseyhomes.com"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-200 focus:border-accent-500 rounded-xl py-3 px-4 text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-accent-500/20 transition-all font-sans placeholder-neutral-400 font-medium"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-neutral-700 tracking-tight">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="(201) 555-0129"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-200 focus:border-accent-500 rounded-xl py-3 px-4 text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-accent-500/20 transition-all font-sans placeholder-neutral-400 font-medium"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-neutral-700 tracking-tight">
                        Target Timeframe
                      </label>
                      <select
                        value={clientSchedule}
                        onChange={(e) => setClientSchedule(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-200 focus:border-accent-500 rounded-xl py-3 px-4 text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-accent-500/20 transition-all font-sans cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis font-bold"
                      >
                        <option value="Immediate" className="text-neutral-900 bg-white">Immediate (Within 2 Weeks)</option>
                        <option value="Summer 2026" className="text-neutral-900 bg-white">Summer 2026 (Recommended)</option>
                        <option value="Fall 2026" className="text-neutral-900 bg-white">Fall / Winter 2026 Planning</option>
                        <option value="Consult" className="text-neutral-900 bg-white">Flexible / Consult Only</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-4 py-4 bg-accent-500 hover:bg-accent-600 active:scale-[0.985] text-white font-extrabold rounded-xl text-xs sm:text-sm tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-lg hover:shadow-accent-500/10 font-sans"
                      id="modal_submit_btn"
                    >
                      <CheckCircle size={14} className="stroke-[2.5]" />
                      <span>Request Free Walk-Through</span>
                    </button>
                  </form>
                </div>
              )}

            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
