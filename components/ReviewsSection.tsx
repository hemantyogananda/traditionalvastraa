import StarRating from "./StarRating";
import { siteConfig } from "@/lib/site-config";

const TESTIMONIALS = [
  { name: "Priya R.", location: "Chennai", rating: 5, text: `The saree I ordered was even more beautiful in person. ${siteConfig.name} has become my go-to for festive wear!` },
  { name: "Ritu A.", location: "Bengaluru", rating: 5, text: "Absolutely love my thread bangle set — handmade quality really shows. Ordered a second one as a gift." },
  { name: "Divya M.", location: "Hyderabad", rating: 4.5, text: "Super comfortable kurti, true to size, and the packaging felt so personal and special." },
];

export default function ReviewsSection() {
  return (
    <section className="bg-white py-14">
      <div className="container-px">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">Loved by our customers</p>
          <h2 className="section-title mt-1">What They&apos;re Saying</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="card p-6">
              <StarRating rating={t.rating} />
              <p className="mt-3 text-sm italic text-maroon-dark/80">&ldquo;{t.text}&rdquo;</p>
              <p className="mt-4 text-sm font-semibold text-maroon-dark">{t.name}</p>
              <p className="text-xs text-maroon-dark/50">{t.location}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
