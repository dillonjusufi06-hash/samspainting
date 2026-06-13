export interface Subservice {
  title: string;
  description: string;
}

export interface Service {
  slug: string;
  title: string;
  description: string;
  image: string;
  tagline: string;
  subservices: Subservice[];
}

export const services: Service[] = [
  {
    slug: "interior-painting",
    title: "Interior Painting",
    description:
      "Fresh paint for walls, ceilings, trim, doors, bedrooms, kitchens, living rooms, and more.",
    image:
      "https://lakeshore-painting.org/wp-content/uploads/2024/03/Default_Realistic_interior_house_with_dark_blue_walls_0-1024x683.jpg",
    tagline: "Clean, sharp interior paint for every room — walls, trim, and ceilings done right with careful prep.",
    subservices: [
      { title: "Wall & Ceiling Painting", description: "Fresh coats for walls and ceilings in every room of your home." },
      { title: "Trim & Door Painting", description: "Sharp lines on baseboards, casings, doors, and molding." },
      { title: "Kitchen Painting", description: "Durable finishes for kitchens, backsplashes, and eating areas." },
      { title: "Bathroom Painting", description: "Moisture-ready paint for bathrooms and powder rooms." },
      { title: "Bedroom Painting", description: "Clean, even color for bedrooms and sleeping spaces." },
      { title: "Living Room Painting", description: "Living rooms, hallways, and shared spaces painted right." },
    ],
  },
  {
    slug: "exterior-painting",
    title: "Exterior Painting",
    description:
      "Exterior house painting, siding painting, trim painting, power washing, and outdoor touch-ups.",
    image: "https://www.solispainting.com/img/new-providence-painters.jpg",
    tagline: "Make your home look new again from the outside with expert prep and weather-ready paint.",
    subservices: [
      { title: "Siding Painting", description: "Even, long-lasting color on wood, vinyl, and fiber cement siding." },
      { title: "Trim & Shutter Painting", description: "Crisp trim, shutters, and fascia that frame your home." },
      { title: "Door & Garage Painting", description: "Front doors, garage doors, and entryways painted to last." },
      { title: "Power Washing & Prep", description: "Surface cleaning, scraping, sanding, and priming before paint." },
      { title: "Porch & Patio Painting", description: "Porches, patios, railings, and outdoor living areas." },
      { title: "Outdoor Touch-Ups", description: "Spot repairs and refresh work for weathered exterior surfaces." },
    ],
  },
  {
    slug: "commercial-painting",
    title: "Commercial Painting",
    description:
      "Clean, durable painting for offices, stores, rentals, and small business spaces.",
    image:
      "https://pizzazzpainting.com/wp-content/uploads/2022/01/shutterstock_58077985-scaled.jpg",
    tagline: "Professional painting for offices and stores — clean work, flexible scheduling, durable finishes.",
    subservices: [
      { title: "Office Painting", description: "Professional finishes for offices, conference rooms, and workspaces." },
      { title: "Retail & Store Painting", description: "Clean, durable paint for storefronts and customer-facing spaces." },
      { title: "Rental Property Painting", description: "Fast turnarounds for rentals, apartments, and multi-unit properties." },
      { title: "Warehouse Painting", description: "Large-scale painting for warehouses, shops, and work areas." },
      { title: "Common Area Painting", description: "Hallways, lobbies, stairwells, and shared building spaces." },
      { title: "After-Hours Painting", description: "Flexible scheduling to keep your business running during the day." },
    ],
  },
  {
    slug: "deck-and-fence-staining",
    title: "Deck and Fence Staining",
    description:
      "Wood staining that helps protect decks, fences, railings, and outdoor wood from weather.",
    image: "https://www.elkhartlandscape.com/uploads/4/3/7/6/43764133/8788322_orig.jpg",
    tagline: "Protect your decks and fences with rich, even stain that stands up to NJ weather.",
    subservices: [
      { title: "Deck Staining", description: "Rich, even stain that protects and refreshes your deck." },
      { title: "Fence Staining", description: "Fence staining for privacy fences, pickets, and perimeter wood." },
      { title: "Railing Staining", description: "Railings, balusters, and posts stained for a uniform look." },
      { title: "Wood Cleaning & Prep", description: "Washing, sanding, and prep so stain adheres properly." },
      { title: "Pergola & Outdoor Wood", description: "Pergolas, trellises, and outdoor wood structures." },
      { title: "Weatherproof Wood Finishes", description: "Stain systems built to handle sun, rain, and NJ weather." },
    ],
  },
  {
    slug: "epoxy-floor-coatings",
    title: "Epoxy Floor Coatings",
    description:
      "Strong epoxy floors for garages, basements, shops, work areas, and clean finished spaces.",
    image:
      "https://certapro.com/wp-content/uploads/cache/remote/pub-9fc1f065f07e441b8f35365c774f09ae-r2-dev/279536609.jpg",
    tagline: "Tough, easy-to-clean epoxy floors for garages and workspaces that look sharp for years.",
    subservices: [
      { title: "Garage Floor Epoxy", description: "Durable, easy-to-clean epoxy for residential garages." },
      { title: "Basement Floor Epoxy", description: "Smooth coated floors for basements and utility spaces." },
      { title: "Workshop Epoxy", description: "Tough finishes for workshops, shops, and work areas." },
      { title: "Chip & Flake Coatings", description: "Decorative chip and flake epoxy options in multiple colors." },
      { title: "Concrete Grinding & Prep", description: "Surface grinding and prep for strong epoxy adhesion." },
      { title: "Solid Color Epoxy", description: "Clean, uniform solid-color epoxy floor systems." },
    ],
  },
  {
    slug: "cabinet-painting",
    title: "Cabinet Painting",
    description:
      "Cabinet painting for kitchens, bathrooms, and built-ins — a fresh look without replacing cabinets.",
    image: "https://i.imgur.com/Vyuh1We.jpeg",
    tagline: "A fresh kitchen look without replacing cabinets — smooth, factory-quality finishes.",
    subservices: [
      { title: "Kitchen Cabinet Painting", description: "A full kitchen refresh without replacing your cabinets." },
      { title: "Bathroom Vanity Painting", description: "Smooth finishes for bathroom vanities and storage." },
      { title: "Built-In Cabinet Painting", description: "Built-ins, mudroom storage, and custom cabinetry." },
      { title: "Cabinet Door Refinishing", description: "Doors and drawer fronts prepped, primed, and painted." },
      { title: "Hardware Removal & Reinstall", description: "Handles and hinges removed, painted around, and put back." },
      { title: "Spray-Finish Cabinets", description: "Factory-smooth spray finishes for a clean, even look." },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
