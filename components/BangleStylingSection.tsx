import Image from "next/image";
import Link from "next/link";

const STYLING_TIPS = [
  { title: "Casual Cottons", desc: "Pair sage or blush bangle sets with everyday cotton kurtis for an easy daytime look.", img: "/products/bangle-sage-1.jpg" },
  { title: "Festive Silks", desc: "Maroon & gold sets bring out the richness of silk sarees for weddings and pujas.", img: "/products/bangle-maroon-gold-1.jpg" },
  { title: "Gifting Ready", desc: "Blush & gold sets come beautifully packaged — perfect as a thoughtful gift.", img: "/products/bangle-blush-1.jpg" },
];

export default function BangleStylingSection() {
  return (
    <section className="container-px py-14">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {STYLING_TIPS.map((tip) => (
          <div key={tip.title} className="card overflow-hidden">
            <div className="relative aspect-[4/3] w-full">
              <Image src={tip.img} alt={tip.title} fill className="object-cover" />
            </div>
            <div className="p-5">
              <h3 className="font-serif text-lg font-semibold text-maroon-dark">{tip.title}</h3>
              <p className="mt-1.5 text-sm text-maroon-dark/70">{tip.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link href="/shop/thread-bangles" className="btn-gold">
          Shop All Thread Bangles
        </Link>
      </div>
    </section>
  );
}
