import SectionHeader from "@/components/SectionHeader";
import { siteConfig } from "@/lib/site-config";

export const metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <div className="container-px py-14">
      <SectionHeader title="Terms & Conditions" subtitle="The basics of shopping with us." />
      <div className="mx-auto mt-10 max-w-3xl space-y-8 text-sm leading-relaxed text-maroon-dark/75">
        <section>
          <h2 className="font-serif text-lg font-semibold text-maroon-dark">Using This Site</h2>
          <p className="mt-2">
            By browsing or ordering from {siteConfig.name} ({siteConfig.domain}), you agree to these terms. Product
            colors may vary slightly from photos due to screen settings and natural fabric/thread variation, since
            many pieces are handmade in small batches.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-lg font-semibold text-maroon-dark">Pricing & Availability</h2>
          <p className="mt-2">
            Prices are listed in INR and may change without notice. Stock is limited for handmade and small-batch
            items, so availability is not guaranteed until an order is confirmed.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-lg font-semibold text-maroon-dark">Orders & Payment</h2>
          <p className="mt-2">
            We accept UPI, cards, and Cash on Delivery, subject to serviceability. An order is confirmed once payment
            is received (or, for COD, once placed).
          </p>
        </section>
        <section>
          <h2 className="font-serif text-lg font-semibold text-maroon-dark">Returns & Shipping</h2>
          <p className="mt-2">
            See our <a href="/returns-policy" className="font-medium text-maroon hover:underline">Returns &amp; Exchanges</a> and{" "}
            <a href="/shipping-policy" className="font-medium text-maroon hover:underline">Shipping Policy</a> pages
            for full details.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-lg font-semibold text-maroon-dark">Contact</h2>
          <p className="mt-2">
            Questions about these terms? Reach us at {siteConfig.email}.
          </p>
        </section>
      </div>
    </div>
  );
}
