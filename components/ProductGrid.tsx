import { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products, columns = 4 }: { products: Product[]; columns?: 3 | 4 }) {
  if (products.length === 0) {
    return (
      <div className="rounded-xl2 border border-dashed border-maroon/20 py-16 text-center text-maroon-dark/60">
        No products found. Try a different filter or search term.
      </div>
    );
  }
  return (
    <div
      className={`grid grid-cols-2 gap-4 sm:gap-6 ${
        columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
      }`}
    >
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
