import SectionHeader from "@/components/SectionHeader";
import { siteConfig } from "@/lib/site-config";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <div className="container-px py-14">
      <SectionHeader title="Privacy Policy" subtitle="What we collect, and how we use it." />
      <div className="mx-auto mt-10 max-w-3xl space-y-8 text-sm leading-relaxed text-maroon-dark/75">
        <section>
          <h2 className="font-serif text-lg font-semibold text-maroon-dark">Information We Collect</h2>
          <p className="mt-2">
            When you place an order, contact us, or sign up for updates, we collect details like your name, address,
            phone number, and email — only what&apos;s needed to fulfill and support your order.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-lg font-semibold text-maroon-dark">Cart & Wishlist Data</h2>
          <p className="mt-2">
            Items you add to your cart or wishlist are stored locally in your browser so they&apos;re there when you
            come back — this information isn&apos;t sent to any third party.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-lg font-semibold text-maroon-dark">How We Use Your Information</h2>
          <p className="mt-2">
            We use your details to process orders, share delivery updates, respond to enquiries, and — only if you
            opt in — send occasional offers and new arrival updates.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-lg font-semibold text-maroon-dark">Sharing</h2>
          <p className="mt-2">
            We share order details with courier and payment partners only as needed to deliver your order. We never
            sell your personal information.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-lg font-semibold text-maroon-dark">Your Choices</h2>
          <p className="mt-2">
            You can unsubscribe from marketing messages at any time, and can request a copy or deletion of your data
            by writing to {siteConfig.email}.
          </p>
        </section>
      </div>
    </div>
  );
}
