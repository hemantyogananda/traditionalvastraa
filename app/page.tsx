import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import CategoryRail from "@/components/CategoryRail";
import SectionHeader from "@/components/SectionHeader";
import ProductRail from "@/components/ProductRail";
import BangleStylingSection from "@/components/BangleStylingSection";
import FestivalBanner from "@/components/FestivalBanner";
import ReviewsSection from "@/components/ReviewsSection";
import InstagramGallery from "@/components/InstagramGallery";
import NewsletterSection from "@/components/NewsletterSection";
import { getBestSellers, getNewArrivals } from "@/lib/products";

export default function HomePage() {
  const bestSellers = getBestSellers();
  const newArrivals = getNewArrivals();

  return (
    <div>
      <Hero />

      <TrustBadges />

      <section className="container-px py-14">
        <SectionHeader title="Shop by Category" subtitle="From everyday cottons to festive silks and handmade bangles." />
        <div className="mt-8">
          <CategoryRail />
        </div>
      </section>

      <section className="container-px py-6">
        <SectionHeader title="Best Sellers" center={false} />
        <div className="mt-8">
          <ProductRail products={bestSellers} />
        </div>
      </section>

      <section className="container-px py-14">
        <SectionHeader title="New Arrivals" center={false} />
        <div className="mt-8">
          <ProductRail products={newArrivals} />
        </div>
      </section>

      <FestivalBanner
        image="/brand/photos/hero-wedding.jpg"
        title="Wedding Season Edit"
        subtitle="Coordinated festive sets and handmade bangles for every ceremony, from haldi to reception."
        ctaLabel="Shop Wedding Edit"
        ctaHref="/shop?occasion=wedding"
      />

      <div className="bg-blush-light/40">
        <div className="container-px py-4">
          <SectionHeader title="Styling Your Thread Bangles" subtitle="A few easy ways to wear your Traditional Vastraa bangle sets." />
        </div>
        <BangleStylingSection />
      </div>

      <FestivalBanner />

      <ReviewsSection />

      <InstagramGallery />

      <NewsletterSection />
    </div>
  );
}
