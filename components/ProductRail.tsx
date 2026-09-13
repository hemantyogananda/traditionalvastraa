import { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

export default function ProductRail({ products }: { products: Product[] }) {
  return (
    <div className="scrollbar-thin -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:gap-6">
      {products.map((p) => (
        <div key={p.id} className="w-[46%] shrink-0 sm:w-[30%] lg:w-[23%]">
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}
