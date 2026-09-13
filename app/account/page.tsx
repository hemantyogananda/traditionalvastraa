import { formatPrice } from "@/lib/utils";

export const metadata = { title: "My Account" };

const MOCK_ORDERS = [
  { id: "TV483920", date: "2026-09-02", items: "Maroon & Gold Bangle Set × 1", total: 249, status: "Delivered" },
  { id: "TV271044", date: "2026-08-18", items: "Blush Pink Floral Kurti × 2", total: 1398, status: "Shipped" },
  { id: "TV109233", date: "2026-08-05", items: "Deep Maroon Silk Saree × 1", total: 1899, status: "Delivered" },
];

export default function AccountPage() {
  return (
    <div className="container-px py-14">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="card p-6">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blush-light font-serif text-2xl font-semibold text-maroon">
            H
          </div>
          <p className="mt-4 text-center font-serif text-lg font-semibold text-maroon-dark">Heman</p>
          <p className="text-center text-sm text-maroon-dark/60">hemant123yoga@gmail.com</p>
          <div className="mt-6 space-y-2 text-sm">
            <button className="w-full rounded-lg px-4 py-2.5 text-left font-medium text-maroon-dark hover:bg-blush-light/50">My Orders</button>
            <button className="w-full rounded-lg px-4 py-2.5 text-left font-medium text-maroon-dark hover:bg-blush-light/50">Saved Addresses</button>
            <button className="w-full rounded-lg px-4 py-2.5 text-left font-medium text-maroon-dark hover:bg-blush-light/50">Wishlist</button>
            <button className="w-full rounded-lg px-4 py-2.5 text-left font-medium text-maroon-dark/50 hover:bg-blush-light/50">Sign Out</button>
          </div>
          <p className="mt-6 text-xs text-maroon-dark/40">
            This account view uses placeholder data — connect authentication (e.g. NextAuth) and a database to make it real.
          </p>
        </div>

        <div className="lg:col-span-2">
          <h1 className="section-title text-left">My Orders</h1>
          <div className="mt-6 space-y-4">
            {MOCK_ORDERS.map((o) => (
              <div key={o.id} className="card flex flex-col justify-between gap-3 p-5 sm:flex-row sm:items-center">
                <div>
                  <p className="font-semibold text-maroon-dark">#{o.id}</p>
                  <p className="text-sm text-maroon-dark/60">{o.items}</p>
                  <p className="text-xs text-maroon-dark/40">{o.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-serif font-semibold text-maroon">{formatPrice(o.total)}</span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      o.status === "Delivered" ? "bg-sage/10 text-sage" : "bg-gold/10 text-gold-dark"
                    }`}
                  >
                    {o.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
