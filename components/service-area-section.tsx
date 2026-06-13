import { serviceArea } from "@/lib/seo";

export function ServiceAreaSection() {
  return (
    <section className="py-16 sm:py-20 bg-white border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
            Service Area
          </h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Based in {serviceArea.hub}, Sam&apos;s Painting serves discerning homeowners across
            Bergen, Morris, and Essex counties — communities like Franklin Lakes, Saddle River,
            Ridgewood, and Short Hills.
          </p>
          <p className="text-sm text-neutral-600 leading-relaxed">
            <span className="font-bold text-neutral-800">Counties: </span>
            {serviceArea.counties.join(" · ")}
          </p>
          <p className="text-sm text-neutral-600 leading-relaxed">
            <span className="font-bold text-neutral-800">Towns include: </span>
            {serviceArea.towns.join(" · ")} and nearby communities.
          </p>
        </div>
      </div>
    </section>
  );
}
