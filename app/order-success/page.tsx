"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "TV000000";
  const total = Number(searchParams.get("total") || 0);
  const txnId = searchParams.get("txnId");

  return (
    <div className="container-px flex flex-col items-center py-24 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sage/10 text-sage">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="section-title mt-6">Thank you for your order!</h1>
      <p className="section-subtitle">
        Order <span className="font-semibold text-maroon">#{orderId}</span> has been placed successfully.
      </p>
      {total > 0 && <p className="mt-2 text-sm text-maroon-dark/70">Order total: {formatPrice(total)}</p>}
      {txnId && (
        <p className="mt-1 text-xs text-maroon-dark/50">Transaction ID: {txnId}</p>
      )}
      <p className="mt-4 max-w-md text-sm text-maroon-dark/60">
        A confirmation email is on its way to your inbox. We&apos;ll also confirm your order shortly on WhatsApp/SMS
        with delivery details. Thank you for supporting a small, handmade business. 🪷
      </p>
      <div className="mt-8 flex gap-4">
        <Link href="/shop" className="btn-primary">
          Continue Shopping
        </Link>
        <Link href="/account" className="btn-secondary">
          View My Orders
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={null}>
      <OrderSuccessContent />
    </Suspense>
  );
}
