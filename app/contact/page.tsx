"use client";

import React, { useState } from "react";
import { siteConfig } from "@/lib/site-config";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="container-px py-14">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="section-title">Get in Touch</h1>
        <p className="section-subtitle">Questions about sizing, orders, or customization? We&apos;d love to help.</p>
      </div>

      <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="card p-6">
          {submitted ? (
            <div className="flex flex-col items-center py-10 text-center">
              <p className="font-serif text-lg font-semibold text-maroon-dark">Thank you!</p>
              <p className="mt-2 text-sm text-maroon-dark/70">We&apos;ll get back to you within a day.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input required placeholder="Your Name" className="input-field" />
              <input required type="email" placeholder="Email Address" className="input-field" />
              <input placeholder="Phone Number (optional)" className="input-field" />
              <textarea required placeholder="Your message" rows={4} className="input-field" />
              <button type="submit" className="btn-primary w-full">
                Send Message
              </button>
            </form>
          )}
        </div>

        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="font-serif text-base font-semibold text-maroon-dark">WhatsApp</h3>
            <p className="mt-1 text-sm text-maroon-dark/70">{siteConfig.whatsapp} — fastest way to reach us</p>
            <a href={siteConfig.whatsappLink} target="_blank" rel="noreferrer" className="btn-gold mt-3 inline-flex">
              Chat on WhatsApp
            </a>
          </div>
          <div className="card p-6">
            <h3 className="font-serif text-base font-semibold text-maroon-dark">Email</h3>
            <p className="mt-1 text-sm text-maroon-dark/70">{siteConfig.email}</p>
          </div>
          <div className="card p-6">
            <h3 className="font-serif text-base font-semibold text-maroon-dark">Reply Hours</h3>
            <p className="mt-1 text-sm text-maroon-dark/70">10am – 8pm IST, every day</p>
          </div>
        </div>
      </div>
    </div>
  );
}
