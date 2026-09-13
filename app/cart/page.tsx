"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { getAllProducts } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, subtotal } = useCart();
  const products = getAllProducts();

  const cartDetails = items
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return product ? { item, product } : null;
    })
    .filter(Boolean) as { item: typeof items[0]; product: ReturnType<typeof getAllProducts>[0] }[];

  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 60;
  const total = subtotal + shipping;

  if (cartDetails.length === 0) {
    return (
      <div className="container-px flex flex-col items-center py-24 text-center">
        <h1 className="section-title">Your cart is empty</h1>
        <p className="section-subtitle">Looks like you haven&apos;t added anything yet.</p>
        <Link href="/shop" className="btn-primary mt-6">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container-px py-10">
      <h1 className="section-title mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {cartDetails.map(({ item, product }) => (
            <div key={`${item.productId}-${item.size}-${item.color}`} className="card flex gap-4 p-4">
              <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-lg">
                <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <Link href={`/product/${product.slug}`} className="text-sm font-semibold text-maroon-dark hover:underline">
                    {product.name}
                  </Link>
                  <p className="mt-1 text-xs text-maroon-dark/60">
                    {item.color && <>Color: {item.color} </>}
                    {item.size && <>· Size: {item.size}</>}
                  </p>
                  <p className="mt-1 font-serif text-sm font-semibold text-maroon">{formatPrice(product.discountedPrice)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center rounded-full border border-maroon/25">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1, item.size, item.color)}
                      className="px-3 py-1.5 text-maroon-dark"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1, item.size, item.color)}
                      className="px-3 py-1.5 text-maroon-dark"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.productId, item.size, item.color)}
                    className="text-xs font-medium text-maroon-dark/60 underline hover:text-maroon"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="card h-fit p-6">
          <h2 className="font-serif text-lg font-semibold text-maroon-dark">Order Summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-maroon-dark/70">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-maroon-dark/70">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
            </div>
            {shipping > 0 && (
              <p className="text-xs text-sage">Add {formatPrice(999 - subtotal)} more for free shipping!</p>
            )}
            <div className="flex justify-between border-t border-maroon/10 pt-3 font-semibold text-maroon-dark">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
          <Link href="/checkout" className="btn-primary mt-6 w-full">
            Proceed to Checkout
          </Link>
          <Link href="/shop" className="mt-3 block text-center text-xs font-medium text-maroon-dark/60 hover:text-maroon">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
