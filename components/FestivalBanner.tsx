import Image from "next/image";
import Link from "next/link";

export default function FestivalBanner({
  image = "/brand/photos/diwali-lights.jpg",
  title = "Festive Collection 2026",
  subtitle = "Flat 15% off festive wear, this week only.",
  ctaLabel = "Shop the Festive Edit",
  ctaHref = "/offers",
}: {
  image?: string;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <section className="container-px py-4">
      <div className="relative overflow-hidden rounded-xl2 shadow-card">
        <div className="relative aspect-[4/5] w-full sm:aspect-[21/9]">
          <Image src={image} alt={title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/85 via-maroon-dark/25 to-maroon-dark/10" />
          <div className="absolute inset-0 flex flex-col items-center justify-end gap-4 px-4 pb-10 text-center text-cream sm:justify-center sm:pb-0">
            <h2 className="font-serif text-2xl font-semibold sm:text-4xl">{title}</h2>
            <p className="max-w-md px-4 text-sm sm:text-base">{subtitle}</p>
            <Link href={ctaHref} className="btn-gold">
              {ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
