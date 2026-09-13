"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const SLIDES = [
  {
    image: "/brand/photos/hero-saree.jpg",
    eyebrow: "Festive Silk Edit",
    title: "Sarees That Move Like Poetry",
    subtitle: "Rich silks, gold zari borders, and colors made for celebration.",
    ctaLabel: "Shop Sarees",
    ctaHref: "/shop/clothing?type=sarees",
  },
  {
    image: "/brand/photos/hero-suit.jpg",
    eyebrow: "New Season",
    title: "Suit Sets & Kurtis, Redefined",
    subtitle: "Comfort-first silhouettes with festive detailing, for every day and every celebration.",
    ctaLabel: "Shop Kurtis",
    ctaHref: "/shop/clothing?type=kurtis",
    focus: "center 32%",
  },
  {
    image: "/brand/photos/wedding-couple.jpg",
    eyebrow: "Wedding Edit 2026",
    title: "Dressed for Every Celebration",
    subtitle: "Coordinated festive sets and handmade bangles for the whole family.",
    ctaLabel: "Shop Festive Combos",
    ctaHref: "/shop?type=festive-combos",
  },
];

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % SLIDES.length), 5500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative h-[560px] w-full overflow-hidden bg-maroon-dark sm:h-[620px] lg:h-[700px]">
      {SLIDES.map((slide, idx) => (
        <div
          key={slide.image}
          aria-hidden={idx !== active}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            idx === active ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={idx === 0}
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: slide.focus || "center top" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/90 via-maroon-dark/30 to-maroon-dark/10" />
          <div className="container-px relative flex h-full flex-col items-start justify-end pb-16 text-cream sm:justify-center sm:pb-0">
            <p className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide backdrop-blur-sm">
              {slide.eyebrow}
            </p>
            <h1 className="mt-5 max-w-xl font-serif text-3xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              {slide.title}
            </h1>
            <p className="mt-5 max-w-md text-sm text-cream/90 sm:text-base">{slide.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={slide.ctaHref} className="btn-gold">
                {slide.ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {SLIDES.map((slide, idx) => (
          <button
            key={slide.image}
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => setActive(idx)}
            className={`h-2 rounded-full transition-all ${idx === active ? "w-6 bg-gold" : "w-2 bg-cream/50"}`}
          />
        ))}
      </div>
    </section>
  );
}
