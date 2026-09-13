import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

const IMAGES = [
  "/brand/photos/hero-saree.jpg",
  "/brand/photos/pink-kurti.jpg",
  "/brand/photos/bangles.jpg",
  "/brand/photos/green-saree.jpg",
  "/brand/photos/wedding-couple.jpg",
  "/brand/photos/diwali-lights.jpg",
];

export default function InstagramGallery() {
  return (
    <section className="container-px py-14">
      <div className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">Follow Along</p>
        <h2 className="section-title mt-1">{siteConfig.social.instagram.handle}</h2>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:grid-cols-6">
        {IMAGES.map((src, i) => (
          <a
            key={src}
            href={siteConfig.social.instagram.url}
            target="_blank"
            rel="noreferrer"
            className="group relative aspect-square overflow-hidden rounded-lg"
          >
            <Image src={src} alt={`Instagram post ${i + 1}`} fill className="object-cover transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 flex items-center justify-center bg-maroon-dark/0 text-cream opacity-0 transition-all group-hover:bg-maroon-dark/40 group-hover:opacity-100">
              <HeartIcon />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21s-7.5-4.6-10-9.3C.5 8 2 4.5 5.6 4c2-.3 3.8.7 6.4 3.2C14.6 4.7 16.4 3.7 18.4 4c3.6.5 5.1 4 3.6 7.7C19.5 16.4 12 21 12 21Z" />
    </svg>
  );
}
