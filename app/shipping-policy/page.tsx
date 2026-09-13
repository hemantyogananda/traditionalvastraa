import SectionHeader from "@/components/SectionHeader";
import { siteConfig } from "@/lib/site-config";

export const metadata = { title: "Shipping Policy" };

export default function ShippingPolicyPage() {
  return (
    <div className="container-px py-14">
      <SectionHeader title="Shipping Policy" subtitle="Where we ship, how long it takes, and what it costs." />
      <div className="mx-auto mt-10 max-w-3xl space-y-8 text-sm leading-relaxed text-maroon-dark/75">
        <section>
          <h2 className="font-serif text-lg font-semibold text-maroon-dark">Delivery Areas</h2>
          <p className="mt-2">
            We currently ship across India, including most PIN codes serviceable by our courier partners.
            International shipping is not yet available.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-lg font-semibold text-maroon-dark">Processing Time</h2>
          <p className="mt-2">
            Orders are packed and handed over to our courier partner within 1–2 business days. Made-to-order or
            custom-tailored pieces (like unstitched dress materials) may take a little longer — we&apos;ll message
            you if that&apos;s the case.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-lg font-semibold text-maroon-dark">Delivery Time</h2>
          <p className="mt-2">
            Metro cities typically receive orders within 3–5 business days, and other locations within 5–8 business
            days, depending on courier serviceability.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-lg font-semibold text-maroon-dark">Shipping Charges</h2>
          <p className="mt-2">
            Free shipping on all prepaid orders above ₹999. Orders below that, and Cash on Delivery orders, may
            carry a small shipping fee shown at checkout.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-lg font-semibold text-maroon-dark">Tracking</h2>
          <p className="mt-2">
            Once your order ships, you&apos;ll receive a tracking link by email/WhatsApp. You can also check order
            status any time from <span className="font-medium text-maroon-dark">My Account</span>.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-lg font-semibold text-maroon-dark">Questions?</h2>
          <p className="mt-2">
            Write to us at {siteConfig.email} or message us on WhatsApp at {siteConfig.whatsapp} and we&apos;ll help
            right away.
          </p>
        </section>
      </div>
    </div>
  );
}
