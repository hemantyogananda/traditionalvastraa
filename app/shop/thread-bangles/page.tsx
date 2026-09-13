import { Suspense } from "react";
import ShopPageContent from "@/components/ShopPageContent";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: "Thread Bangles Collection",
  description: `Handmade thread bangle sets from ${siteConfig.name}, in maroon & gold, blush & gold, and sage & cream.`,
};

export default function ThreadBanglesPage() {
  return (
    <Suspense fallback={null}>
      <ShopPageContent
        title="Thread Bangles"
        description="Hand-knotted, small-batch thread bangle sets — made to complete every outfit."
        restrictCategories={["thread-bangles"]}
      />
    </Suspense>
  );
}
