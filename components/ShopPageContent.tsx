"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductGrid from "./ProductGrid";
import { getAllProducts } from "@/lib/products";
import { Product, ProductCategory } from "@/lib/types";

const ALL_CATEGORIES: { key: ProductCategory; label: string }[] = [
  { key: "sarees", label: "Sarees" },
  { key: "kurtis", label: "Kurtis" },
  { key: "dress-materials", label: "Dress Materials" },
  { key: "thread-bangles", label: "Thread Bangles" },
  { key: "festive-combos", label: "Combo Offers" },
];

type SortOption = "featured" | "price-asc" | "price-desc" | "rating";

export default function ShopPageContent({
  restrictCategories,
  title,
  description,
}: {
  restrictCategories?: ProductCategory[];
  title: string;
  description?: string;
}) {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const typeParam = searchParams.get("type") as ProductCategory | null;
  const occasionParam = searchParams.get("occasion") || "";
  const fabricParam = searchParams.get("fabric") || "";
  const arrivalsParam = searchParams.get("arrivals") || "";

  const [selectedCategories, setSelectedCategories] = useState<ProductCategory[]>(
    typeParam ? [typeParam] : []
  );
  const [sort, setSort] = useState<SortOption>("featured");

  const availableCategories = restrictCategories || ALL_CATEGORIES.map((c) => c.key);

  const products = useMemo(() => {
    let list: Product[] = getAllProducts().filter((p) => availableCategories.includes(p.category));

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (occasionParam) {
      const q = occasionParam.toLowerCase();
      list = list.filter((p) => p.occasions?.some((o) => o.toLowerCase().includes(q)));
    }

    if (fabricParam) {
      const q = fabricParam.toLowerCase();
      list = list.filter((p) => p.fabric?.toLowerCase().includes(q));
    }

    if (arrivalsParam === "new") {
      list = list.filter((p) => p.isNewArrival);
    }

    if (selectedCategories.length > 0) {
      list = list.filter((p) => selectedCategories.includes(p.category));
    }

    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.discountedPrice - b.discountedPrice);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.discountedPrice - a.discountedPrice);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        list = [...list].sort((a, b) => Number(b.isBestSeller) - Number(a.isBestSeller));
    }

    return list;
  }, [search, occasionParam, fabricParam, arrivalsParam, selectedCategories, sort, availableCategories]);

  function toggleCategory(cat: ProductCategory) {
    setSelectedCategories((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]));
  }

  const filterableCategories = ALL_CATEGORIES.filter((c) => availableCategories.includes(c.key));

  return (
    <div className="container-px py-10">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-semibold text-maroon-dark">{title}</h1>
        {description && <p className="mt-2 max-w-xl text-sm text-maroon-dark/70">{description}</p>}
        {search && <p className="mt-2 text-sm text-maroon-dark/60">Showing results for &ldquo;{search}&rdquo;</p>}
        {occasionParam && <p className="mt-2 text-sm text-maroon-dark/60">Occasion: {occasionParam}</p>}
        {fabricParam && <p className="mt-2 text-sm text-maroon-dark/60">Fabric: {fabricParam}</p>}
        {arrivalsParam === "new" && <p className="mt-2 text-sm text-maroon-dark/60">Showing new arrivals</p>}
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="w-full shrink-0 lg:w-56">
          {filterableCategories.length > 1 && (
            <div className="card p-5">
              <h3 className="text-sm font-semibold text-maroon-dark">Category</h3>
              <div className="mt-3 flex flex-col gap-2">
                {filterableCategories.map((cat) => (
                  <label key={cat.key} className="flex items-center gap-2 text-sm text-maroon-dark/80">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat.key)}
                      onChange={() => toggleCategory(cat.key)}
                      className="h-4 w-4 rounded border-maroon/30 text-maroon focus:ring-gold"
                    />
                    {cat.label}
                  </label>
                ))}
              </div>
            </div>
          )}
        </aside>

        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-maroon-dark/60">{products.length} products</p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="input-field w-auto"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}
