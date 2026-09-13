"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { formatPrice, discountPercent } from "@/lib/utils";
import StarRating from "./StarRating";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const wishlisted = isWishlisted(product.id);
  const discount = discountPercent(product.price, product.discountedPrice);

  function quickAdd(e: React.MouseEvent) {
    e.preventDefault();
    addToCart({
      productId: product.id,
      quantity: 1,
      size: product.sizes[0],
      color: product.colors[0],
    });
  }

  return (
    <Link href={`/product/${product.slug}`} className="card group block overflow-hidden animate-fadeIn">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-cream-dark">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover object-top transition-opacity duration-300 group-hover:opacity-0"
        />
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="absolute inset-0 object-cover object-top opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.isBestSeller && (
            <span className="rounded-full bg-maroon px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-cream">
              Bestseller
            </span>
          )}
          {product.isNewArrival && (
            <span className="rounded-full bg-sage px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-cream">
              New
            </span>
          )}
          {product.stockStatus === "low-stock" && (
            <span className="rounded-full bg-gold px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-maroon-dark">
              Only {product.stock} left
            </span>
          )}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          aria-label="Toggle wishlist"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-maroon shadow-sm transition-transform hover:scale-110"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={wishlisted ? "#6B0F1A" : "none"} stroke="#6B0F1A" strokeWidth="1.8">
            <path d="M12 21s-7.5-4.6-10-9.3C.5 8 2 4.5 5.6 4c2-.3 3.8.7 6.4 3.2C14.6 4.7 16.4 3.7 18.4 4c3.6.5 5.1 4 3.6 7.7C19.5 16.4 12 21 12 21Z" />
          </svg>
        </button>

        <button
          onClick={quickAdd}
          className="absolute inset-x-3 bottom-3 translate-y-10 rounded-full bg-maroon-dark/95 py-2 text-xs font-semibold text-cream opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          Quick Add to Cart
        </button>
      </div>

      <div className="p-4">
        <p className="truncate text-sm font-medium text-maroon-dark">{product.name}</p>
        <div className="mt-1.5 flex items-center gap-1.5">
          <StarRating rating={product.rating} />
          <span className="text-xs text-maroon-dark/50">({product.reviewCount})</span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="font-serif text-base font-semibold text-maroon">{formatPrice(product.discountedPrice)}</span>
          {discount > 0 && (
            <>
              <span className="text-xs text-maroon-dark/40 line-through">{formatPrice(product.price)}</span>
              <span className="text-xs font-semibold text-sage">{discount}% off</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
