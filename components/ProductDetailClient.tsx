"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/types";
import { formatPrice, discountPercent } from "@/lib/utils";
import StarRating from "./StarRating";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function ProductDetailClient({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || undefined);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || undefined);
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState(false);

  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const router = useRouter();

  const discount = discountPercent(product.price, product.discountedPrice);
  const isBangle = product.category === "thread-bangles";

  function handleAddToCart() {
    addToCart({ productId: product.id, quantity, size: selectedSize, color: selectedColor });
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2500);
  }

  function handleBuyNow() {
    addToCart({ productId: product.id, quantity, size: selectedSize, color: selectedColor });
    router.push("/checkout");
  }

  function handleShare() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      navigator.share({ title: product.name, url }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      alert("Product link copied to clipboard!");
    }
  }

  return (
    <div className="container-px py-10">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Images */}
        <div>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl2 bg-cream-dark shadow-card">
            <Image src={product.images[activeImage]} alt={product.name} fill className="object-cover object-top" priority />
          </div>
          <div className="mt-4 flex gap-3">
            {product.images.map((img, idx) => (
              <button
                key={img}
                onClick={() => setActiveImage(idx)}
                className={`relative h-20 w-16 overflow-hidden rounded-lg border-2 ${
                  activeImage === idx ? "border-gold" : "border-transparent"
                }`}
              >
                <Image src={img} alt={`${product.name} thumbnail ${idx + 1}`} fill className="object-cover object-top" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gold-dark">{product.category.replace("-", " ")}</p>
          <h1 className="mt-1 font-serif text-2xl font-semibold text-maroon-dark sm:text-3xl">{product.name}</h1>

          <div className="mt-3 flex items-center gap-2">
            <StarRating rating={product.rating} />
            <span className="text-sm text-maroon-dark/60">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <span className="font-serif text-3xl font-semibold text-maroon">{formatPrice(product.discountedPrice)}</span>
            {discount > 0 && (
              <>
                <span className="text-lg text-maroon-dark/40 line-through">{formatPrice(product.price)}</span>
                <span className="rounded-full bg-sage/10 px-2.5 py-1 text-xs font-semibold text-sage">{discount}% off</span>
              </>
            )}
          </div>

          <p className="mt-5 text-sm leading-relaxed text-maroon-dark/75">{product.description}</p>

          {/* SKU + stock */}
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-maroon-dark/60">
            <span>SKU: {product.sku}</span>
            <span>
              {product.stockStatus === "out-of-stock"
                ? "Out of stock"
                : product.stockStatus === "low-stock"
                ? `Only ${product.stock} left in stock`
                : "In stock"}
            </span>
          </div>

          {/* Colors */}
          {product.colors.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-semibold text-maroon-dark">Color: <span className="font-normal text-maroon-dark/70">{selectedColor}</span></p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
                      selectedColor === color
                        ? "border-maroon bg-maroon text-cream"
                        : "border-maroon/25 text-maroon-dark/80 hover:border-maroon"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes.length > 0 && (
            <div className="mt-5">
              <p className="text-sm font-semibold text-maroon-dark">
                {isBangle ? "Bangle Size" : "Size"}: <span className="font-normal text-maroon-dark/70">{selectedSize}</span>
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-lg border px-4 py-1.5 text-xs font-medium transition-colors ${
                      selectedSize === size
                        ? "border-maroon bg-maroon text-cream"
                        : "border-maroon/25 text-maroon-dark/80 hover:border-maroon"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mt-5">
            <p className="text-sm font-semibold text-maroon-dark">Quantity</p>
            <div className="mt-2 inline-flex items-center rounded-full border border-maroon/25">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-4 py-2 text-maroon-dark">−</button>
              <span className="w-8 text-center text-sm font-medium">{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)} className="px-4 py-2 text-maroon-dark">+</button>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button onClick={handleAddToCart} className="btn-primary" disabled={product.stockStatus === "out-of-stock"}>
              Add to Cart
            </button>
            <button onClick={handleBuyNow} className="btn-gold" disabled={product.stockStatus === "out-of-stock"}>
              Buy Now
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label="Toggle wishlist"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-maroon/25 text-maroon transition-colors hover:bg-maroon hover:text-cream"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={isWishlisted(product.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
                <path d="M12 21s-7.5-4.6-10-9.3C.5 8 2 4.5 5.6 4c2-.3 3.8.7 6.4 3.2C14.6 4.7 16.4 3.7 18.4 4c3.6.5 5.1 4 3.6 7.7C19.5 16.4 12 21 12 21Z" />
              </svg>
            </button>
            <button
              onClick={handleShare}
              aria-label="Share product"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-maroon/25 text-maroon transition-colors hover:bg-maroon hover:text-cream"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                <line x1="8.6" y1="10.6" x2="15.4" y2="6.4" /><line x1="8.6" y1="13.4" x2="15.4" y2="17.6" />
              </svg>
            </button>
          </div>
          {addedMessage && <p className="mt-3 text-sm font-medium text-sage">Added to cart! 🪷</p>}

          {/* Category-specific details */}
          <div className="mt-8 divide-y divide-maroon/10 rounded-xl2 border border-maroon/10">
            {isBangle ? (
              <>
                <DetailRow label="Bangle Size" value={product.bangleSize} />
                <DetailRow label="Bangles per Set" value={product.bangleCount?.toString()} />
                <DetailRow label="Material" value={product.material} />
                <DetailRow label="Occasions" value={product.occasions?.join(", ")} />
              </>
            ) : (
              <>
                <DetailRow label="Fabric" value={product.fabric} />
                <DetailRow label="Fit" value={product.fit} />
                <DetailRow label="Care Instructions" value={product.careInstructions} />
                <DetailRow label="Occasions" value={product.occasions?.join(", ")} />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-16">
        <h2 className="section-title">Customer Reviews</h2>
        {product.reviews.length === 0 ? (
          <p className="mt-4 text-sm text-maroon-dark/60">No reviews yet — be the first to share your experience!</p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {product.reviews.map((r) => (
              <div key={r.id} className="card p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-maroon-dark">{r.customerName}</p>
                  <StarRating rating={r.rating} size={13} />
                </div>
                <p className="mt-2 text-sm text-maroon-dark/75">{r.comment}</p>
                <p className="mt-2 text-xs text-maroon-dark/40">{r.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-1 px-5 py-3 sm:flex-row sm:justify-between">
      <span className="text-sm font-semibold text-maroon-dark">{label}</span>
      <span className="text-sm text-maroon-dark/70">{value}</span>
    </div>
  );
}
