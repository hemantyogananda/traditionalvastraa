"use client";

import React, { useState } from "react";
import { siteConfig } from "@/lib/site-config";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  }

  return (
    <section className="bg-maroon py-14 text-cream">
      <div className="container-px grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-2xl font-semibold sm:text-3xl">Stay in the loop</h2>
          <p className="mt-2 max-w-md text-sm text-cream/80">
            Get new arrivals, festive offers, and styling ideas straight to your inbox — or just message us on WhatsApp for personal recommendations.
          </p>
          {submitted ? (
            <p className="mt-5 rounded-lg bg-cream/10 px-4 py-3 text-sm">Thank you! You&apos;re on the list. 🪷</p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-5 flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-full border border-cream/30 bg-transparent px-4 py-2.5 text-sm text-cream placeholder:text-cream/50 focus:border-gold focus:outline-none"
              />
              <button type="submit" className="btn-gold shrink-0">
                Subscribe
              </button>
            </form>
          )}
        </div>

        <div className="flex flex-col items-start gap-3 rounded-xl2 bg-cream/10 p-6 lg:items-end lg:text-right">
          <p className="text-sm text-cream/80">Prefer to chat? We reply personally.</p>
          <a
            href={siteConfig.whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="btn-gold"
          >
            Message us on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
