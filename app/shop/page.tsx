import { Suspense } from "react";
import ShopPageContent from "@/components/ShopPageContent";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: "Shop All Products",
  description: `Browse ${siteConfig.name}'s full range of sarees, kurtis, dress materials, thread bangles, and combo offers.`,
};

export default function ShopPage() {
  return (
    <Suspense fallback={null}>
      <ShopPageContent title="Shop All" description={`Everything ${siteConfig.name} — clothing and handmade thread bangles, in one place.`} />
    </Suspense>
  );
}
