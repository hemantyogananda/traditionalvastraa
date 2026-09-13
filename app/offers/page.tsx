import SectionHeader from "@/components/SectionHeader";

export const metadata = { title: "Offers & Discounts" };

const OFFERS = [
  { title: "First Order Discount", desc: "New here? Get 10% off your first order — use code FIRST10 at checkout.", tag: "New Customers" },
  { title: "Combo Offers", desc: "Kurti + matching bangle set combos, priced together to save you money.", tag: "Bundles" },
  { title: "Buy More, Save More", desc: "Buy 2 bangle sets, get 10% off. Buy 3, get 15% off!", tag: "Thread Bangles" },
  { title: "Festival Special", desc: "Flat 15% off festive wear during festival week — check our Instagram for dates.", tag: "Seasonal" },
  { title: "Refer a Friend", desc: "Refer a friend — you both get ₹100 off your next order.", tag: "Referral" },
  { title: "Free Shipping", desc: "Free shipping on all orders above ₹999, pan-India.", tag: "Always On" },
  { title: "Repeat Customer Reward", desc: "Every delivered order includes a discount code for your next purchase.", tag: "Loyalty" },
  { title: "WhatsApp-Exclusive Deals", desc: "Message us on WhatsApp for offers we don't post publicly.", tag: "WhatsApp Only" },
];

export default function OffersPage() {
  return (
    <div className="container-px py-14">
      <SectionHeader title="Offers & Discounts" subtitle="A little something extra, always." />
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {OFFERS.map((o) => (
          <div key={o.title} className="card p-6">
            <span className="inline-block rounded-full bg-blush-light px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-maroon">
              {o.tag}
            </span>
            <h3 className="mt-3 font-serif text-lg font-semibold text-maroon-dark">{o.title}</h3>
            <p className="mt-2 text-sm text-maroon-dark/70">{o.desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 rounded-xl2 bg-maroon p-8 text-center text-cream">
        <h3 className="font-serif text-xl font-semibold">Return & Exchange Policy</h3>
        <p className="mx-auto mt-2 max-w-lg text-sm text-cream/80">
          Not the right fit or color? We accept exchanges within 5 days of delivery for clothing (unused, with tags).
          Thread bangles, being handmade, are non-returnable unless damaged in transit — message us on WhatsApp and we&apos;ll make it right.
        </p>
      </div>
    </div>
  );
}
