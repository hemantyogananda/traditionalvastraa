import Link from "next/link";
import Image from "next/image";
import { categoryMeta } from "@/lib/products";

export default function CategoryRail() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {Object.entries(categoryMeta).map(([key, cat]) => (
        <Link
          key={key}
          href={cat.href}
          className="group relative aspect-[3/4] overflow-hidden rounded-xl2 shadow-card transition-shadow hover:shadow-cardHover"
        >
          <Image
            src={cat.image}
            alt={cat.label}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/85 via-maroon-dark/10 to-transparent" />
          <span className="absolute inset-x-0 bottom-0 p-4 font-serif text-base font-semibold text-cream sm:text-lg">
            {cat.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
