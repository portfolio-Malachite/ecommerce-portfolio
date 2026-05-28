"use client";

import Link from "next/link";
import { ChevronDown, Heart, Menu, Moon, Search, ShoppingBag, Sun, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { CartDrawer } from "@/components/CartDrawer";
import { useCart } from "@/hooks/useCart";

const nav = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/hot-items", label: "Hot Items" },
  { href: "/deals", label: "Deals" }
];

export function Navbar() {
  const { items, wishlist } = useCart();
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-black/5 bg-white/78 backdrop-blur-2xl dark:border-white/10 dark:bg-ink/78">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Primary navigation">
        <Link href="/" className="text-2xl font-black tracking-tight">
          Velora
        </Link>
        <div className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onMouseEnter={() => item.label === "Shop" && setMega(true)}
              className="text-sm font-semibold text-neutral-700 transition hover:text-accent dark:text-neutral-200"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Link href="/search-empty" className="focus-ring rounded-full p-2 hover:bg-black/5 dark:hover:bg-white/10" aria-label="Search">
            <Search size={20} />
          </Link>
          <Link href="/wishlist" className="focus-ring relative rounded-full p-2 hover:bg-black/5 dark:hover:bg-white/10" aria-label="Wishlist">
            <Heart size={20} />
            {wishlist.length ? <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-accent" /> : null}
          </Link>
          <button onClick={() => setCartOpen(true)} className="focus-ring relative rounded-full p-2 hover:bg-black/5 dark:hover:bg-white/10" aria-label="Open cart drawer">
            <ShoppingBag size={20} />
            {count ? <span className="absolute -right-1 -top-1 rounded-full bg-accent px-1.5 text-[10px] font-bold text-white">{count}</span> : null}
          </button>
          <div className="relative hidden sm:block">
            <button onClick={() => setProfileOpen((value) => !value)} className="focus-ring flex items-center gap-1 rounded-full p-2 hover:bg-black/5 dark:hover:bg-white/10" aria-label="Open profile menu">
              <User size={20} />
              <ChevronDown size={15} />
            </button>
            {profileOpen ? (
              <div className="absolute right-0 mt-3 w-52 rounded-2xl border border-black/10 bg-white p-2 shadow-luxury dark:border-white/10 dark:bg-neutral-950">
                {[
                  { href: "/profile", label: "My Profile" },
                  { href: "/saved-addresses", label: "Saved Addresses" },
                  { href: "/notifications", label: "Notifications" },
                  { href: "/order-tracking", label: "Track Order" },
                  { href: "/login", label: "Logout" }
                ].map((item) => (
                  <Link key={item.href} href={item.href} className="block rounded-xl px-3 py-2 text-sm font-bold hover:bg-neutral-100 dark:hover:bg-white/10">
                    {item.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
          <button className="focus-ring rounded-full p-2 hover:bg-black/5 dark:hover:bg-white/10" onClick={() => setDark((value) => !value)} aria-label="Toggle theme">
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="focus-ring rounded-full p-2 lg:hidden" onClick={() => setOpen((value) => !value)} aria-label="Open menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
      {mega ? (
        <div onMouseLeave={() => setMega(false)} className="hidden border-t border-black/5 bg-white/95 p-6 shadow-luxury backdrop-blur-xl dark:border-white/10 dark:bg-ink/95 lg:block">
          <div className="mx-auto grid max-w-7xl grid-cols-4 gap-4">
            {["New Arrivals", "Performance", "Accessories", "Sale Edit"].map((title) => (
              <Link key={title} href="/shop" className="rounded-2xl bg-neutral-100 p-5 transition hover:-translate-y-1 hover:bg-violet-50 dark:bg-white/5 dark:hover:bg-white/10">
                <span className="text-sm font-black">{title}</span>
                <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">Curated premium pieces for sharper everyday style.</p>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
      {open ? (
        <div className="border-t border-black/5 bg-white p-4 dark:border-white/10 dark:bg-ink lg:hidden">
          <div className="grid gap-2">
            {[...nav, { href: "/wishlist", label: "Wishlist" }, { href: "/profile", label: "Profile" }, { href: "/admin", label: "Admin" }].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 font-semibold hover:bg-neutral-100 dark:hover:bg-white/10">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}
