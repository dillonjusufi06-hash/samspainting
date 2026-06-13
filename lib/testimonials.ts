export interface Testimonial {
  id: string;
  name: string;
  quote: string;
  emphasis: string;
  role: string;
  stars: number;
  serviceSlugs?: string[];
}

export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Sarah Jenkins",
    stars: 5,
    role: "Verified Homeowner",
    quote:
      "We hired Sam's Painting for our living room and hallway, and everything came out great. The walls look smooth, the lines are sharp, and the crew kept the house clean. I would definitely recommend them to anyone looking for a painter in New Jersey.",
    emphasis: "lines are sharp",
    serviceSlugs: ["interior-painting"],
  },
  {
    id: "test-2",
    name: "Marcus Vance",
    stars: 5,
    role: "Verified Homeowner",
    quote:
      "Sam painted our kitchen cabinets and made them look brand new. He explained the process, showed up on time, and the final finish came out very clean. It was a much cheaper option than replacing the cabinets.",
    emphasis: "brand new",
    serviceSlugs: ["cabinet-painting"],
  },
  {
    id: "test-3",
    name: "Elena Rostova",
    stars: 5,
    role: "Verified Homeowner",
    quote:
      "The team painted the outside of our house and did a great job. They power washed, prepped everything, and the paint looks fresh and even. Our home has way better curb appeal now.",
    emphasis: "curb appeal",
    serviceSlugs: ["exterior-painting"],
  },
  {
    id: "test-4",
    name: "Dillon Henderson",
    stars: 5,
    role: "Verified Homeowner",
    quote:
      "Sam's Painting did our full interior painting job, including walls, ceilings, and trim. The crew was respectful, fast, and very neat. The whole house feels brighter and newer.",
    emphasis: "brighter and newer",
    serviceSlugs: ["interior-painting"],
  },
  {
    id: "test-5",
    name: "Amanda Russo",
    stars: 5,
    role: "Verified Homeowner",
    quote:
      "We used Sam's Painting for our deck staining, and it came out perfect. The wood looks rich again, and the color is exactly what we wanted. They also cleaned up everything before leaving.",
    emphasis: "rich again",
    serviceSlugs: ["deck-and-fence-staining"],
  },
  {
    id: "test-6",
    name: "Brian Mitchell",
    stars: 5,
    role: "Verified Business Owner",
    quote:
      "Sam painted our office space, and it was a very smooth process. They worked around our schedule, kept the area clean, and finished on time. Great commercial painting company.",
    emphasis: "finished on time",
    serviceSlugs: ["commercial-painting"],
  },
  {
    id: "test-7",
    name: "Kevin Walsh",
    stars: 5,
    role: "Verified Homeowner",
    quote:
      "Our garage epoxy floor came out amazing. It looks clean, shiny, and much easier to maintain. Sam's Painting made the whole garage look finished.",
    emphasis: "garage look finished",
    serviceSlugs: ["epoxy-floor-coatings"],
  },
  {
    id: "test-8",
    name: "Nicole Parker",
    stars: 5,
    role: "Verified Homeowner",
    quote:
      "We needed a painter for a few bedrooms and a bathroom. Sam gave us a fair price, helped pick the right paint, and did a very clean job. I would use them again.",
    emphasis: "fair price",
    serviceSlugs: ["interior-painting"],
  },
  {
    id: "test-9",
    name: "Anthony Caruso",
    stars: 5,
    role: "Verified Homeowner",
    quote:
      "Sam's Painting was easy to work with from the first call to the final walkthrough. They answered every question, protected our floors, and made sure we were happy with the work.",
    emphasis: "easy to work with",
  },
];

export function getTestimonialsForService(slug?: string): Testimonial[] {
  if (!slug) return testimonials;

  const matched = testimonials.filter(
    (testimonial) =>
      !testimonial.serviceSlugs || testimonial.serviceSlugs.includes(slug)
  );

  return matched.length >= 3 ? matched : testimonials;
}
