"use client";

import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import { getAllProducts } from "@/lib/products";
import ProductGrid from "@/components/ProductGrid";

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const products = getAllProducts().filter((p) => wishlist.includes(p.id));

  return (
    <div className="container-px py-10">
      <h1 className="section-title mb-8">My Wishlist</h1>
      {products.length === 0 ? (
        <div className="flex flex-col items-center py-16 text-center">
          <p className="section-subtitle">You haven&apos;t saved anything yet.</p>
          <Link href="/shop" className="btn-primary mt-6">
            Browse Products
          </Link>
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}
