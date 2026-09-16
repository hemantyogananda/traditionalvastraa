"use client";

import React, { useState } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { getAllProducts } from "@/lib/products";
import { formatPrice, generateOrderId } from "@/lib/utils";
import { OrderEmailDetails } from "@/lib/types";
import { addStoredOrder } from "@/lib/order-history";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const products = getAllProducts();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<"UPI" | "COD" | "Card">("UPI");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 60;
  const total = subtotal + shipping;

  function updateField(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function buildOrderDetails(orderId: string, transactionId?: string): OrderEmailDetails {
    return {
      orderId,
      transactionId,
      paymentMethod,
      customerName: form.fullName,
      email: form.email,
      phone: form.phone,
      address: form.address,
      city: form.city,
      state: form.state,
      pincode: form.pincode,
      items: items.map((item) => {
        const product = products.find((p) => p.id === item.productId);
        return {
          name: product?.name || "Product",
          quantity: item.quantity,
          price: product?.discountedPrice || 0,
          size: item.size,
          color: item.color,
        };
      }),
      subtotal,
      shipping,
      total,
      date: new Date().toISOString(),
    };
  }

  async function finalizeOrder(orderId: string, transactionId?: string) {
    const orderDetails = buildOrderDetails(orderId, transactionId);
    addStoredOrder(orderDetails);

    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderDetails),
      });
    } catch (e) {
      // Order still succeeded even if the confirmation email fails to send.
      console.error("Failed to send order confirmation email", e);
    }

    clearCart();
    const params = new URLSearchParams({ orderId, total: String(total) });
    if (transactionId) params.set("txnId", transactionId);
    router.push(`/order-success?${params.toString()}`);
  }

  async function handleOnlinePayment(orderId: string) {
    if (typeof window.Razorpay === "undefined") {
      throw new Error("Payment gateway is still loading. Please wait a moment and try again.");
    }

    const createRes = await fetch("/api/razorpay/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: total, receipt: orderId }),
    });
    const createData = await createRes.json();

    if (!createRes.ok) {
      throw new Error(createData?.error || "Could not start payment. Please try again.");
    }

    return new Promise<void>((resolve, reject) => {
      const rzp = new window.Razorpay({
        key: createData.keyId,
        amount: createData.amount,
        currency: createData.currency,
        order_id: createData.orderId,
        name: "Traditional Vastraa",
        description: `Order #${orderId}`,
        prefill: {
          name: form.fullName,
          email: form.email,
          contact: form.phone,
        },
        method: {
          upi: paymentMethod === "UPI",
          card: paymentMethod === "Card",
          netbanking: false,
          wallet: false,
          emi: false,
          paylater: false,
        },
        theme: { color: "#6B0F1A" },
        handler: async (response: any) => {
          try {
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const verifyData = await verifyRes.json();
            if (!verifyData.verified) {
              reject(new Error("Payment verification failed. Please contact support."));
              return;
            }
            await finalizeOrder(orderId, response.razorpay_payment_id);
            resolve();
          } catch (e: any) {
            reject(e);
          }
        },
        modal: {
          ondismiss: () => {
            reject(new Error("Payment was cancelled."));
          },
        },
      });

      rzp.on("payment.failed", (response: any) => {
        reject(new Error(response?.error?.description || "Payment failed. Please try again."));
      });

      rzp.open();
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const orderId = generateOrderId();

    try {
      if (paymentMethod === "COD") {
        await finalizeOrder(orderId);
      } else {
        await handleOnlinePayment(orderId);
      }
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
      setSubmitting(false);
    }
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
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      <h1 className="section-title mb-8">Checkout</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="card p-6">
            <h2 className="font-serif text-lg font-semibold text-maroon-dark">Shipping Details</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input required placeholder="Full Name" value={form.fullName} onChange={(e) => updateField("fullName", e.target.value)} className="input-field sm:col-span-2" />
              <input required type="email" placeholder="Email Address" value={form.email} onChange={(e) => updateField("email", e.target.value)} className="input-field sm:col-span-2" />
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
              {paymentMethod === "COD"
                ? "Pay with cash when your order is delivered."
                : "Secured by Razorpay (test mode) — no real money is charged."}
            </p>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
          )}
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
            {submitting ? "Processing…" : paymentMethod === "COD" ? "Place Order" : `Pay ${formatPrice(total)}`}
          </button>
        </div>
      </form>
    </div>
  );
}
