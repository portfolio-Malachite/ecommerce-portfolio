"use client";

import { BarChart3, Boxes, DollarSign, LayoutDashboard, ShoppingCart, Users } from "lucide-react";
import { products } from "@/data/products";
import { formatCurrency } from "@/lib/utils";

const analytics = [
  { Icon: DollarSign, value: "$128K", label: "Revenue" },
  { Icon: ShoppingCart, value: "1,284", label: "Orders" },
  { Icon: Users, value: "42K", label: "Customers" },
  { Icon: Boxes, value: "318", label: "Products" }
];

export default function AdminPage() {
  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">
      <aside className="rounded-3xl bg-ink p-4 text-white dark:bg-white dark:text-ink">
        <h1 className="px-3 py-4 text-2xl font-black">Velora Admin</h1>
        {[LayoutDashboard, Boxes, ShoppingCart, Users, BarChart3].map((Icon, index) => (
          <button key={index} className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left font-bold hover:bg-white/10 dark:hover:bg-black/5">
            <Icon size={18} /> {["Overview", "Products", "Orders", "Customers", "Reports"][index]}
          </button>
        ))}
      </aside>
      <div>
        <h2 className="text-5xl font-black">Dashboard</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {analytics.map(({ Icon, value, label }) => (
            <div key={label} className="rounded-3xl bg-white p-5 dark:bg-white/5">
              <Icon className="text-accent" />
              <p className="mt-4 text-3xl font-black">{value}</p>
              <p className="text-sm text-neutral-500">{label}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_0.8fr]">
          <div className="rounded-3xl bg-white p-6 dark:bg-white/5">
            <h3 className="text-2xl font-black">Revenue chart</h3>
            <div className="mt-6 flex h-56 items-end gap-3">
              {[44, 76, 58, 90, 68, 100, 82].map((height, index) => (
                <div key={index} className="flex-1 rounded-t-2xl bg-accent/80" style={{ height: `${height}%` }} />
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-white p-6 dark:bg-white/5">
            <h3 className="text-2xl font-black">Customer list</h3>
            <div className="mt-5 grid gap-3">
              {["Aditi Sharma", "Noah Lee", "Mia Chen", "Owen Carter"].map((name) => (
                <div key={name} className="flex justify-between rounded-2xl bg-neutral-100 p-3 dark:bg-white/10"><b>{name}</b><span className="text-sm text-neutral-500">VIP</span></div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 overflow-hidden rounded-3xl bg-white dark:bg-white/5">
          <div className="grid grid-cols-4 bg-neutral-100 p-4 text-sm font-black dark:bg-white/10">
            <span>Product</span><span>Category</span><span>Price</span><span>Status</span>
          </div>
          {products.slice(0, 6).map((product) => (
            <div key={product.id} className="grid grid-cols-4 border-t border-black/5 p-4 text-sm dark:border-white/10">
              <b>{product.name}</b><span>{product.category}</span><span>{formatCurrency(product.price)}</span><span className="text-green-600">Active</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
