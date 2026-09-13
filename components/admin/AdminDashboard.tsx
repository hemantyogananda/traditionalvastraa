"use client";

import React, { useState } from "react";
import { getAllProducts } from "@/lib/products";
import { mockOrders, mockEnquiries } from "@/lib/admin-data";
import { Product, Order, Enquiry } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

type Tab = "overview" | "products" | "orders" | "enquiries";

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("overview");
  const [products, setProducts] = useState<Product[]>(getAllProducts());
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [enquiries, setEnquiries] = useState<Enquiry[]>(mockEnquiries);

  const totalSales = orders.reduce((s, o) => s + o.total, 0);
  const totalOrders = orders.length;
  const lowStockCount = products.filter((p) => p.stockStatus === "low-stock").length;
  const outOfStockCount = products.filter((p) => p.stockStatus === "out-of-stock").length;

  return (
    <div className="container-px py-10">
      <h1 className="section-title mb-2 text-left">Admin Dashboard</h1>
      <p className="mb-8 text-sm text-maroon-dark/60">
        This dashboard uses in-memory mock data for the demo — see the README for how to connect a real database and authentication.
      </p>

      <div className="mb-8 flex gap-2 overflow-x-auto rounded-full bg-white p-1.5 shadow-card">
        {(["overview", "products", "orders", "enquiries"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium capitalize transition-colors ${
              tab === t ? "bg-maroon text-cream" : "text-maroon-dark/70 hover:bg-blush-light/50"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total Sales" value={formatPrice(totalSales)} />
          <StatCard label="Total Orders" value={totalOrders.toString()} />
          <StatCard label="Products Listed" value={products.length.toString()} />
          <StatCard label="Low / Out of Stock" value={`${lowStockCount} / ${outOfStockCount}`} accent />
        </div>
      )}

      {tab === "products" && <ProductsTab products={products} setProducts={setProducts} />}
      {tab === "orders" && <OrdersTab orders={orders} setOrders={setOrders} />}
      {tab === "enquiries" && <EnquiriesTab enquiries={enquiries} setEnquiries={setEnquiries} />}
    </div>
  );
}

function StatCard({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="card p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-maroon-dark/50">{label}</p>
      <p className={`mt-2 font-serif text-2xl font-semibold ${accent ? "text-gold-dark" : "text-maroon-dark"}`}>{value}</p>
    </div>
  );
}

function emptyProductDraft(): Omit<Product, "id" | "slug" | "reviews" | "rating" | "reviewCount"> {
  return {
    name: "",
    category: "kurtis",
    images: ["/products/kurti-blush-floral-1.jpg"],
    price: 0,
    discountedPrice: 0,
    description: "",
    colors: [],
    sizes: [],
    stock: 0,
    stockStatus: "in-stock",
    sku: "",
    tags: [],
  };
}

function ProductsTab({
  products,
  setProducts,
}: {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState(emptyProductDraft());

  function startAdd() {
    setDraft(emptyProductDraft());
    setEditingId(null);
    setShowForm(true);
  }

  function startEdit(p: Product) {
    setDraft(p);
    setEditingId(p.id);
    setShowForm(true);
  }

  function handleDelete(id: string) {
    if (confirm("Remove this product from the catalog?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (editingId) {
      setProducts((prev) => prev.map((p) => (p.id === editingId ? { ...p, ...draft } : p)));
    } else {
      const id = `p${Date.now()}`;
      const slug = draft.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      setProducts((prev) => [
        ...prev,
        { ...draft, id, slug, reviews: [], rating: 0, reviewCount: 0 } as Product,
      ]);
    }
    setShowForm(false);
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-serif text-lg font-semibold text-maroon-dark">Manage Products</h2>
        <button onClick={startAdd} className="btn-primary">
          + Add Product
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSave} className="card mb-6 grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
          <input
            required
            placeholder="Product Name"
            value={draft.name}
            onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            className="input-field sm:col-span-2"
          />
          <select
            value={draft.category}
            onChange={(e) => setDraft({ ...draft, category: e.target.value as Product["category"] })}
            className="input-field"
          >
            <option value="sarees">Sarees</option>
            <option value="kurtis">Kurtis</option>
            <option value="dress-materials">Dress Materials</option>
            <option value="thread-bangles">Thread Bangles</option>
            <option value="festive-combos">Combo Offers</option>
          </select>
          <input
            required
            placeholder="SKU"
            value={draft.sku}
            onChange={(e) => setDraft({ ...draft, sku: e.target.value })}
            className="input-field"
          />
          <input
            required
            type="number"
            placeholder="MRP (₹)"
            value={draft.price || ""}
            onChange={(e) => setDraft({ ...draft, price: Number(e.target.value) })}
            className="input-field"
          />
          <input
            required
            type="number"
            placeholder="Selling Price (₹)"
            value={draft.discountedPrice || ""}
            onChange={(e) => setDraft({ ...draft, discountedPrice: Number(e.target.value) })}
            className="input-field"
          />
          <input
            required
            type="number"
            placeholder="Stock Quantity"
            value={draft.stock || ""}
            onChange={(e) => {
              const stock = Number(e.target.value);
              setDraft({
                ...draft,
                stock,
                stockStatus: stock === 0 ? "out-of-stock" : stock <= 5 ? "low-stock" : "in-stock",
              });
            }}
            className="input-field"
          />
          <select
            value={draft.stockStatus}
            onChange={(e) => setDraft({ ...draft, stockStatus: e.target.value as Product["stockStatus"] })}
            className="input-field"
          >
            <option value="in-stock">In Stock</option>
            <option value="low-stock">Low Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
          <textarea
            placeholder="Description"
            value={draft.description}
            onChange={(e) => setDraft({ ...draft, description: e.target.value })}
            className="input-field sm:col-span-2"
            rows={3}
          />
          <div className="flex gap-3 sm:col-span-2">
            <button type="submit" className="btn-primary">
              {editingId ? "Save Changes" : "Add Product"}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto rounded-xl2 bg-white shadow-card">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-maroon/10 text-xs uppercase tracking-wide text-maroon-dark/50">
              <th className="px-5 py-3">Product</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Price</th>
              <th className="px-5 py-3">Stock</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-maroon/5 last:border-0">
                <td className="px-5 py-3 font-medium text-maroon-dark">{p.name}</td>
                <td className="px-5 py-3 capitalize text-maroon-dark/70">{p.category.replace("-", " ")}</td>
                <td className="px-5 py-3 text-maroon-dark/70">{formatPrice(p.discountedPrice)}</td>
                <td className="px-5 py-3 text-maroon-dark/70">{p.stock}</td>
                <td className="px-5 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      p.stockStatus === "in-stock"
                        ? "bg-sage/10 text-sage"
                        : p.stockStatus === "low-stock"
                        ? "bg-gold/10 text-gold-dark"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {p.stockStatus.replace("-", " ")}
                  </span>
                </td>
                <td className="px-5 py-3 text-right">
                  <button onClick={() => startEdit(p)} className="mr-3 text-xs font-medium text-maroon underline">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="text-xs font-medium text-red-500 underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function OrdersTab({
  orders,
  setOrders,
}: {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}) {
  function updateStatus(id: string, status: Order["status"]) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  }

  return (
    <div>
      <h2 className="mb-5 font-serif text-lg font-semibold text-maroon-dark">Orders</h2>
      <div className="overflow-x-auto rounded-xl2 bg-white shadow-card">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b border-maroon/10 text-xs uppercase tracking-wide text-maroon-dark/50">
              <th className="px-5 py-3">Order ID</th>
              <th className="px-5 py-3">Customer</th>
              <th className="px-5 py-3">Items</th>
              <th className="px-5 py-3">Total</th>
              <th className="px-5 py-3">Payment</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b border-maroon/5 last:border-0">
                <td className="px-5 py-3 font-medium text-maroon-dark">#{o.id}</td>
                <td className="px-5 py-3 text-maroon-dark/70">{o.customerName}</td>
                <td className="px-5 py-3 text-maroon-dark/70">
                  {o.items.map((i) => `${i.name} × ${i.quantity}`).join(", ")}
                </td>
                <td className="px-5 py-3 text-maroon-dark/70">{formatPrice(o.total)}</td>
                <td className="px-5 py-3 text-maroon-dark/70">{o.paymentMethod}</td>
                <td className="px-5 py-3">
                  <select
                    value={o.status}
                    onChange={(e) => updateStatus(o.id, e.target.value as Order["status"])}
                    className="rounded-lg border border-maroon/20 px-2 py-1 text-xs"
                  >
                    {["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"].map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EnquiriesTab({
  enquiries,
  setEnquiries,
}: {
  enquiries: Enquiry[];
  setEnquiries: React.Dispatch<React.SetStateAction<Enquiry[]>>;
}) {
  function updateStatus(id: string, status: Enquiry["status"]) {
    setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
  }

  return (
    <div>
      <h2 className="mb-5 font-serif text-lg font-semibold text-maroon-dark">Customer Enquiries</h2>
      <div className="space-y-4">
        {enquiries.map((e) => (
          <div key={e.id} className="card flex flex-col justify-between gap-3 p-5 sm:flex-row sm:items-center">
            <div>
              <p className="font-semibold text-maroon-dark">{e.customerName}</p>
              <p className="text-sm text-maroon-dark/70">{e.message}</p>
              <p className="text-xs text-maroon-dark/40">{e.date}</p>
            </div>
            <select
              value={e.status}
              onChange={(ev) => updateStatus(e.id, ev.target.value as Enquiry["status"])}
              className="w-fit rounded-lg border border-maroon/20 px-3 py-1.5 text-xs"
            >
              {["New", "Replied", "Closed"].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
