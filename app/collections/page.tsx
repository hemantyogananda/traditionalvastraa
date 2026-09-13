import Link from "next/link";
import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";

export const metadata = { title: "Featured Collections" };

const COLLECTIONS = [
  {
    title: "Festive Edit",
    desc: "Rich silks, zari borders, and coordinated sets for weddings and festivals.",
    image: "/products/festival-banner.jpg",
    href: "/shop/clothing?type=festive-combos",
  },
  {
    title: "Everyday Ethnic",
    desc: "Breathable cottons and easy kurtis for daily wear.",
    image: "/products/kurti-sage-1.jpg",
    href: "/shop/clothing?type=kurtis",
  },
  {
    title: "Thread Bangle Edit",
    desc: "Hand-knotted bangle sets in every shade, for every outfit.",
    image: "/products/bangle-maroon-gold-1.jpg",
    href: "/shop/thread-bangles",
  },
  {
    title: "Gifting Combos",
    desc: "Kurti + bangle pairings, ready to gift.",
    image: "/products/combo-kurti-bangle-1.jpg",
    href: "/shop?type=festive-combos",
  },
];

export default function CollectionsPage() {
  return (
    <div className="container-px py-14">
      <SectionHeader title="Featured Collections" subtitle="Curated edits to make choosing easier." />
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
        {COLLECTIONS.map((c) => (
          <Link key={c.title} href={c.href} className="card group overflow-hidden">
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <Image src={c.image} alt={c.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="p-6">
              <h3 className="font-serif text-xl font-semibold text-maroon-dark">{c.title}</h3>
              <p className="mt-2 text-sm text-maroon-dark/70">{c.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
