import { Suspense } from "react";
import ShopPageContent from "@/components/ShopPageContent";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: "Clothing Collection",
  description: `Shop ${siteConfig.name}'s sarees, kurtis, dress materials, and festive combos.`,
};

export default function ClothingPage() {
  return (
    <Suspense fallback={null}>
      <ShopPageContent
        title="Clothing Collection"
        description="Sarees, kurtis, dress materials, and festive combos — tradition woven with style."
        restrictCategories={["sarees", "kurtis", "dress-materials", "festive-combos"]}
      />
    </Suspense>
  );
}
