"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { getAllProducts } from "@/lib/products";
import { formatPrice, generateOrderId } from "@/lib/utils";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const products = getAllProducts();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<"UPI" | "COD" | "Card">("UPI");
  const [submitting, setSubmitting] = useState(false);

  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 60;
  const total = subtotal + shipping;

  function updateField(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const orderId = generateOrderId();
    setTimeout(() => {
      clearCart();
      router.push(`/order-success?orderId=${orderId}&total=${total}`);
    }, 700);
  }

  if (items.length === 0) {
    return (
      <div className="container-px flex flex-col items-center py-24 text-center">
        <h1 className="section-title">Nothing to checkout</h1>
        <p className="section-subtitle">Your cart is empty right now.</p>
        <Link href="/shop" className="btn-primary mt-6">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="container-px py-10">
      <h1 className="section-title mb-8">Checkout</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="card p-6">
            <h2 className="font-serif text-lg font-semibold text-maroon-dark">Shipping Details</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input required placeholder="Full Name" value={form.fullName} onChange={(e) => updateField("fullName", e.target.value)} className="input-field sm:col-span-2" />
              <input required placeholder="Phone Number" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} className="input-field" />
              <input required placeholder="Pincode" value={form.pincode} onChange={(e) => updateField("pincode", e.target.value)} className="input-field" />
              <input required placeholder="Address" value={form.address} onChange={(e) => updateField("address", e.target.value)} className="input-field sm:col-span-2" />
              <input required placeholder="City" value={form.city} onChange={(e) => updateField("city", e.target.value)} className="input-field" />
              <input required placeholder="State" value={form.state} onChange={(e) => updateField("state", e.target.value)} className="input-field" />
            </div>
          </div>

          <div className="card p-6">
            <h2 className="font-serif text-lg font-semibold text-maroon-dark">Payment Method</h2>
            <div className="mt-4 space-y-3">
              {(["UPI", "COD", "Card"] as const).map((method) => (
                <label
                  key={method}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm ${
                    paymentMethod === method ? "border-maroon bg-blush-light/40" : "border-maroon/15"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === method}
                    onChange={() => setPaymentMethod(method)}
                  />
                  <span className="font-medium text-maroon-dark">
                    {method === "UPI" ? "UPI (Google Pay / PhonePe / Paytm)" : method === "COD" ? "Cash on Delivery" : "Credit / Debit Card"}
                  </span>
                </label>
              ))}
            </div>
            <p className="mt-3 text-xs text-maroon-dark/50">
              This is a UI demo — no real payment is processed. Connect a gateway like Razorpay or Cashfree for live payments.
            </p>
          </div>
        </div>

        <div className="card h-fit p-6">
          <h2 className="font-serif text-lg font-semibold text-maroon-dark">Order Summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-maroon-dark/70">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-maroon-dark/70">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between border-t border-maroon/10 pt-3 font-semibold text-maroon-dark">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
          <button type="submit" disabled={submitting} className="btn-primary mt-6 w-full">
            {submitting ? "Placing Order…" : "Place Order"}
          </button>
        </div>
      </form>
    </div>
  );
}
