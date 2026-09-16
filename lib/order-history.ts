import { OrderEmailDetails } from "@/lib/types";

const STORAGE_KEY = "traditional_vastraa_orders";

export interface StoredOrder extends OrderEmailDetails {
  status: "Pending" | "Confirmed";
}

export function getStoredOrders(): StoredOrder[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredOrder[]) : [];
  } catch {
    return [];
  }
}

export function addStoredOrder(order: OrderEmailDetails) {
  if (typeof window === "undefined") return;
  const stored: StoredOrder = {
    ...order,
    status: order.paymentMethod === "COD" ? "Pending" : "Confirmed",
  };
  try {
    const existing = getStoredOrders();
    localStorage.setItem(STORAGE_KEY, JSON.stringify([stored, ...existing]));
  } catch {
    // ignore storage errors (e.g. private browsing)
  }
}
