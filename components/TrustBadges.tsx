const ITEMS = [
  { Icon: TruckIcon, title: "Free Shipping", desc: "On prepaid orders above ₹999" },
  { Icon: ReturnIcon, title: "7-Day Easy Returns", desc: "Simple exchanges, no hassle" },
  { Icon: HandmadeIcon, title: "100% Handmade", desc: "Small-batch craftsmanship" },
  { Icon: ShieldIcon, title: "Secure Payments", desc: "UPI, cards & COD supported" },
  { Icon: MapPinIcon, title: "Made in India", desc: "Supporting local artisans" },
];

export default function TrustBadges() {
  return (
    <section className="border-y border-maroon/10 bg-white">
      <div className="container-px grid grid-cols-2 gap-6 py-8 sm:grid-cols-3 lg:grid-cols-5">
        {ITEMS.map(({ Icon, title, desc }) => (
          <div key={title} className="flex flex-col items-center gap-2 text-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blush-light text-maroon">
              <Icon />
            </span>
            <p className="text-xs font-semibold text-maroon-dark sm:text-sm">{title}</p>
            <p className="text-[11px] text-maroon-dark/60">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function TruckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M2 7h11v9H2z" />
      <path d="M13 10h4l4 3.5V16h-8z" />
      <circle cx="6.5" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </svg>
  );
}
function ReturnIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 9V4M4 9h5" />
      <path d="M4 9a8 8 0 1 1-1.5 6.5" />
    </svg>
  );
}
function HandmadeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 21s-7.5-4.6-10-9.3C.5 8 2 4.5 5.6 4c2-.3 3.8.7 6.4 3.2C14.6 4.7 16.4 3.7 18.4 4c3.6.5 5.1 4 3.6 7.7C19.5 16.4 12 21 12 21Z" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
function MapPinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" />
      <circle cx="12" cy="9" r="2.4" />
    </svg>
  );
}
