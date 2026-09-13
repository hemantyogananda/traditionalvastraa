import SectionHeader from "@/components/SectionHeader";
import { siteConfig } from "@/lib/site-config";

export const metadata = { title: "Returns & Exchanges" };

export default function ReturnsPolicyPage() {
  return (
    <div className="container-px py-14">
      <SectionHeader title="Returns & Exchanges" subtitle="Not quite right? Here's how we make it easy." />
      <div className="mx-auto mt-10 max-w-3xl space-y-8 text-sm leading-relaxed text-maroon-dark/75">
        <section>
          <h2 className="font-serif text-lg font-semibold text-maroon-dark">Clothing (Sarees, Kurtis, Dress Materials, Combos)</h2>
          <p className="mt-2">
            We accept exchanges within 7 days of delivery for size or color, and returns within 7 days for a full
            refund — as long as the item is unused, unwashed, and has its original tags attached.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-lg font-semibold text-maroon-dark">Thread Bangles</h2>
          <p className="mt-2">
            Because every set is hand-knotted to order in small batches, thread bangles are non-returnable and
            non-exchangeable unless the item arrives damaged or defective.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-lg font-semibold text-maroon-dark">Damaged or Incorrect Items</h2>
          <p className="mt-2">
            If something arrives damaged, defective, or different from what you ordered, message us within 48 hours
            of delivery with photos and we&apos;ll arrange a free replacement or refund.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-lg font-semibold text-maroon-dark">How to Start a Return</h2>
          <p className="mt-2">
            Message us on WhatsApp at {siteConfig.whatsapp} or email {siteConfig.email} with your order ID. We&apos;ll
            arrange a pickup where available, or share a return address.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-lg font-semibold text-maroon-dark">Refunds</h2>
          <p className="mt-2">
            Once we receive and inspect a returned item, refunds are processed to the original payment method within
            5–7 business days. Cash on Delivery refunds are issued via UPI or bank transfer.
          </p>
        </section>
      </div>
    </div>
  );
}
