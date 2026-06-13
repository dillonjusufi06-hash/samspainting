export interface FaqItem {
  question: string;
  answer: string;
}

export const serviceFaqs: Record<string, FaqItem[]> = {
  "interior-painting": [
    {
      question: "How much does interior painting cost in New Jersey?",
      answer: "The price depends on how many rooms, the amount of prep work, and what surfaces need painting. We give you a clear estimate after looking at the project.",
    },
    {
      question: "Do you offer free interior painting estimates?",
      answer: "Yes. Sam's Painting offers free estimates for interior painting. We look at the rooms, talk through colors, and explain the price before any work starts.",
    },
    {
      question: "How long does interior painting usually take?",
      answer: "A single room may take a day. Larger interior jobs with multiple rooms can take a few days. We tell you the expected timeline before we start.",
    },
    {
      question: "Do I need to move furniture before you paint?",
      answer: "We ask that small items and fragile things are moved beforehand. For larger furniture, we can help move and cover it to keep everything protected.",
    },
    {
      question: "Do you protect floors and furniture during interior painting?",
      answer: "Yes. We cover floors, furniture, and fixtures before painting and keep the work area clean throughout the job.",
    },
  ],
  "exterior-painting": [
    {
      question: "How much does exterior house painting cost in New Jersey?",
      answer: "The price depends on the size of the home, siding type, prep work, and how much trim needs painting. We provide a clear estimate after inspecting the exterior.",
    },
    {
      question: "Do you power wash before exterior painting?",
      answer: "Yes. We clean, scrape, sand, and prime surfaces as needed so the paint adheres properly and lasts longer.",
    },
    {
      question: "What exterior surfaces do you paint?",
      answer: "We paint siding, trim, shutters, doors, garages, porches, and more. We also handle outdoor touch-ups and prep work.",
    },
    {
      question: "How long does exterior painting take?",
      answer: "Smaller exterior jobs may take a few days. Larger homes can take longer depending on prep and weather. We walk you through the timeline upfront.",
    },
    {
      question: "Do you protect landscaping during exterior painting?",
      answer: "Yes. We cover plants, walkways, and surrounding areas to keep your property protected while we work.",
    },
  ],
  "commercial-painting": [
    {
      question: "Do you paint offices and commercial spaces in New Jersey?",
      answer: "Yes. We paint offices, retail stores, rental properties, warehouses, and other light commercial spaces across North Jersey.",
    },
    {
      question: "Can you work around business hours?",
      answer: "Yes. We offer flexible scheduling, including after-hours painting, to minimize disruption to your business.",
    },
    {
      question: "How much does commercial painting cost?",
      answer: "Pricing depends on the size of the space, surfaces involved, and scheduling needs. We provide a free estimate after a site walkthrough.",
    },
    {
      question: "Do you protect equipment and work areas?",
      answer: "Yes. We cover floors, equipment, and work zones before painting and keep the site clean and professional throughout the job.",
    },
    {
      question: "How long does a commercial painting job take?",
      answer: "Timeline varies by project size. We plan the schedule with you upfront and work efficiently to finish on time.",
    },
  ],
  "deck-and-fence-staining": [
    {
      question: "How much does deck and fence staining cost?",
      answer: "The price depends on the size of the deck or fence, wood condition, and prep work needed. We give you a clear estimate after inspecting the wood.",
    },
    {
      question: "Do you clean and prep wood before staining?",
      answer: "Yes. We wash, sand, and prep the wood so the stain goes on evenly and holds up against weather.",
    },
    {
      question: "What outdoor wood do you stain?",
      answer: "We stain decks, fences, railings, pergolas, and other outdoor wood surfaces throughout North Jersey.",
    },
    {
      question: "How long does staining take to dry?",
      answer: "Dry time depends on the stain and weather. We walk you through cure time and care once the job is done.",
    },
    {
      question: "How often should decks and fences be restained?",
      answer: "Most decks and fences need restaining every few years depending on sun, rain, and wear. We can recommend the right schedule for your wood.",
    },
  ],
  "epoxy-floor-coatings": [
    {
      question: "How much does epoxy flooring cost in New Jersey?",
      answer: "Pricing depends on the size of the floor, concrete condition, and coating options. We inspect the space and provide a free estimate.",
    },
    {
      question: "Can you epoxy garage floors?",
      answer: "Yes. Garage floor epoxy is one of our most popular services. We grind, prep, and coat the concrete for a durable, easy-to-clean finish.",
    },
    {
      question: "How long does epoxy floor installation take?",
      answer: "Most garage and basement epoxy jobs take a few days including prep, coating, and cure time. We explain the full timeline before starting.",
    },
    {
      question: "Do you offer chip and flake epoxy options?",
      answer: "Yes. We offer solid color and decorative chip or flake epoxy systems depending on the look you want.",
    },
    {
      question: "How do I maintain an epoxy floor?",
      answer: "Epoxy floors are easy to clean with mild soap and water. We walk you through care instructions once the floor has cured.",
    },
  ],
  "cabinet-painting": [
    {
      question: "How much does cabinet painting cost?",
      answer: "The price depends on the number of cabinets, condition of the wood, and finish you want. It is typically much less than replacing cabinets.",
    },
    {
      question: "Is cabinet painting worth it compared to new cabinets?",
      answer: "For many homeowners, yes. Cabinet painting gives kitchens and bathrooms a fresh, updated look at a fraction of the cost of new cabinetry.",
    },
    {
      question: "Do you remove cabinet doors and hardware?",
      answer: "Yes. We remove doors and hardware, prep and paint everything carefully, then reinstall hardware when the job is complete.",
    },
    {
      question: "How long does cabinet painting take?",
      answer: "Most kitchen cabinet projects take several days depending on prep, drying time, and the number of coats needed.",
    },
    {
      question: "What finish do you use on cabinets?",
      answer: "We use durable cabinet-grade coatings applied by brush or spray for a smooth, factory-quality finish.",
    },
  ],
};

export function getServiceFaqs(slug: string): FaqItem[] {
  return serviceFaqs[slug] ?? [];
}
