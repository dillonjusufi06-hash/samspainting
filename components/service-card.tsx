import Image from "next/image";
import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href?: string;
}

export function ServiceCard({ title, description, image, imageAlt, href }: ServiceCardProps) {
  const className =
    "relative rounded-2xl overflow-hidden aspect-[6/5] sm:aspect-[5/4] group border border-neutral-200/95 shadow-md transition-all duration-300 hover:shadow-lg block";

  const content = (
    <>
      <Image
        src={image}
        alt={imageAlt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/35 to-neutral-950/5 transition-opacity duration-300 group-hover:from-neutral-950/95" />

      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-10 text-white space-y-1.5">
        <h3 className="text-base sm:text-lg font-bold tracking-tight leading-tight text-white">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-neutral-200/95 font-normal line-clamp-2 sm:line-clamp-3">
          {description}
        </p>
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${className} hover:scale-[1.02]`}>
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}
