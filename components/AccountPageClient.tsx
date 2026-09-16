"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import { getStoredOrders, StoredOrder } from "@/lib/order-history";
import { useAuth } from "@/context/AuthContext";

const MOCK_ORDERS = [
  { id: "TV483920", date: "2026-09-02", items: "Maroon & Gold Bangle Set × 1", total: 249, status: "Delivered" },
  { id: "TV271044", date: "2026-08-18", items: "Blush Pink Floral Kurti × 2", total: 1398, status: "Shipped" },
  { id: "TV109233", date: "2026-08-05", items: "Deep Maroon Silk Saree × 1", total: 1899, status: "Delivered" },
];

function formatItems(items: StoredOrder["items"]) {
  return items.map((i) => `${i.name} × ${i.quantity}`).join(", ");
}

function statusClass(status: string) {
  if (status === "Delivered" || status === "Confirmed") return "bg-sage/10 text-sage";
  return "bg-gold/10 text-gold-dark";
}

export default function AccountPageClient() {
  const [placedOrders, setPlacedOrders] = useState<StoredOrder[]>([]);
  const { user, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setPlacedOrders(getStoredOrders());
  }, []);

  const displayName =
    (user?.user_metadata?.full_name as string | undefined) || user?.email?.split("@")[0] || "Account";

  async function handleSignOut() {
    await signOut();
    router.push("/login");
    router.refresh();
  }

  const orders = [
    ...placedOrders.map((o) => ({
      id: o.orderId,
      date: o.date.slice(0, 10),
      items: formatItems(o.items),
      total: o.total,
      status: o.status,
    })),
    ...MOCK_ORDERS,
  ];

  return (
    <div className="container-px py-14">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="card p-6">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blush-light font-serif text-2xl font-semibold text-maroon">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <p className="mt-4 text-center font-serif text-lg font-semibold text-maroon-dark capitalize">{displayName}</p>
          <p className="text-center text-sm text-maroon-dark/60">{user?.email}</p>
          <div className="mt-6 space-y-2 text-sm">
            <button className="w-full rounded-lg px-4 py-2.5 text-left font-medium text-maroon-dark hover:bg-blush-light/50">My Orders</button>
            <button className="w-full rounded-lg px-4 py-2.5 text-left font-medium text-maroon-dark hover:bg-blush-light/50">Saved Addresses</button>
            <button className="w-full rounded-lg px-4 py-2.5 text-left font-medium text-maroon-dark hover:bg-blush-light/50">Wishlist</button>
            <button
              onClick={handleSignOut}
              className="w-full rounded-lg px-4 py-2.5 text-left font-medium text-maroon-dark/70 hover:bg-blush-light/50"
            >
              Sign Out
            </button>
          </div>
          <p className="mt-6 text-xs text-maroon-dark/40">
            Order history below is stored on this device only — full server-side order history is on the roadmap.
          </p>
        </div>

        <div className="lg:col-span-2">
          <h1 className="section-title text-left">My Orders</h1>
          <div className="mt-6 space-y-4">
            {orders.map((o) => (
              <div key={o.id} className="card flex flex-col justify-between gap-3 p-5 sm:flex-row sm:items-center">
                <div>
                  <p className="font-semibold text-maroon-dark">#{o.id}</p>
                  <p className="text-sm text-maroon-dark/60">{o.items}</p>
                  <p className="text-xs text-maroon-dark/40">{o.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-serif font-semibold text-maroon">{formatPrice(o.total)}</span>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(o.status)}`}>
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
