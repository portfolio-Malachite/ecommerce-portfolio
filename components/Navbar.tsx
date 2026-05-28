"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";

const nav = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/hot-items", label: "Hot Items" },
  { href: "/deals", label: "Deals" }
];

export function Navbar() {
  const { items } = useCart();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-black/5 bg-white/78 backdrop-blur-2xl dark:border-white/10 dark:bg-ink/78">
      <nav className="mx-auto flex min-h-20 max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-3 sm:px-6 lg:flex-nowrap lg:px-8" aria-label="Primary navigation">
        <div className="flex flex-1 items-center">
          <Link href="/" className="text-2xl font-black tracking-tight">
            Velora
          </Link>
        </div>
        <div className="order-3 flex w-full items-center gap-6 overflow-x-auto pb-1 lg:order-2 lg:w-auto lg:justify-center lg:overflow-visible lg:pb-0">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 text-sm font-semibold text-neutral-700 transition hover:text-accent dark:text-neutral-200"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="order-2 flex flex-1 items-center justify-end lg:order-3">
          <Link
            href="/cart"
            className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-ink px-5 text-sm font-bold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-accent hover:shadow-luxury dark:bg-white dark:text-ink dark:hover:bg-accent dark:hover:text-white"
            aria-label={count ? `Open cart page, ${count} items` : "Open cart page"}
          >
            <ShoppingCart size={18} strokeWidth={1.9} />
            <span>{count ? `Cart • ${count}` : "Cart"}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
