"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, LockKeyhole, Minus, Plus, ShieldCheck, ShoppingCart, Sparkles, Star, Trash2, Truck } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { products, type Product } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/utils";

function SuggestedProductCard({ product, inCart }: { product: Product; inCart: boolean }) {
  const { addItem, toggleWishlist, wishlist } = useCart();
  const [added, setAdded] = useState(false);
  const saved = wishlist.includes(product.id);

  function quickAdd() {
    addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      className="group min-w-[245px] overflow-hidden rounded-[1.75rem] border border-black/5 bg-white shadow-sm transition hover:shadow-luxury dark:border-white/10 dark:bg-white/5 sm:min-w-0"
    >
      <Link href={`/product/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden bg-neutral-100">
        <Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 72vw, 25vw" className="object-cover transition duration-700 group-hover:scale-105" />
        {product.badge ? <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-xs font-black backdrop-blur">{product.badge}</span> : null}
      </Link>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-400">{product.category}</p>
            <Link href={`/product/${product.slug}`} className="mt-1 block truncate font-black hover:text-accent">
              {product.name}
            </Link>
          </div>
          <button onClick={() => toggleWishlist(product.id)} className="focus-ring rounded-full p-2 transition hover:bg-neutral-100 dark:hover:bg-white/10" aria-label={`Save ${product.name}`}>
            <Heart size={18} className={saved ? "fill-accent text-accent" : ""} />
          </button>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-black">{formatCurrency(product.price)}</span>
          <span className="flex items-center gap-1 text-sm font-semibold text-neutral-500">
            <Star size={14} className="fill-accent text-accent" /> {product.rating}
          </span>
        </div>
        <button
          onClick={quickAdd}
          className="focus-ring mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-ink px-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-accent dark:bg-white dark:text-ink dark:hover:bg-accent dark:hover:text-white"
        >
          <ShoppingCart size={16} strokeWidth={1.9} />
          {added ? "Added" : inCart ? "Add another" : "Quick Add"}
        </button>
      </div>
    </motion.article>
  );
}

function RecommendationRow({ title, subtitle, items }: { title: string; subtitle: string; items: Product[] }) {
  const { items: cartItems } = useCart();
  const cartIds = new Set(cartItems.map((item) => item.product.id));

  return (
    <section className="mx-auto max-w-7xl px-4 py-9 sm:px-6 lg:px-8">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-accent">{subtitle}</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-4xl">{title}</h2>
        </div>
        <Link href="/shop" className="hidden items-center gap-2 text-sm font-bold text-accent transition hover:gap-3 sm:flex">
          View all <ArrowRight size={16} />
        </Link>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible md:grid-cols-4">
        {items.map((product) => (
          <SuggestedProductCard key={product.id} product={product} inCart={cartIds.has(product.id)} />
        ))}
      </div>
    </section>
  );
}

function CartRecommendations({ cartIds }: { cartIds: Set<string> }) {
  const available = products.filter((product) => !cartIds.has(product.id));
  const recommended = available.length >= 4 ? available : products;

  return (
    <div className="border-t border-black/5 bg-neutral-50/80 dark:border-white/10 dark:bg-black/20">
      <RecommendationRow title="Trending now" subtitle="Fresh picks" items={recommended.slice(0, 4)} />
      <RecommendationRow title="Related products" subtitle="Complete the edit" items={[...recommended].sort((a, b) => b.rating - a.rating).slice(0, 4)} />
      <RecommendationRow title="Recently viewed" subtitle="Still on your mind" items={products.slice(4, 8)} />
    </div>
  );
}

function EmptyCartState({ cartIds }: { cartIds: Set<string> }) {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pb-8 pt-10 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-sm dark:border-white/10 dark:bg-white/5"
        >
          <div className="grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="relative min-h-72 overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-violet-100 via-white to-neutral-100 dark:from-violet-950/50 dark:via-white/5 dark:to-white/10">
              <div className="absolute left-8 top-8 rounded-full bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-accent shadow-sm backdrop-blur">
                Cart
              </div>
              <div className="absolute inset-x-10 bottom-10 rounded-[1.5rem] bg-white/80 p-5 shadow-luxury backdrop-blur dark:bg-neutral-950/70">
                <div className="flex items-center gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-[1.35rem] bg-white text-5xl shadow-sm dark:bg-white/10">
                    <span aria-hidden="true">😔</span>
                  </div>
                  <div>
                    <p className="font-black">Nothing here yet</p>
                    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Your selected pieces will appear here.</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-accent">Velora cart</p>
              <h1 className="mt-4 max-w-3xl text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl">
                Your cart is empty.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-neutral-500 dark:text-neutral-400">
                Looks a little lonely here. Add something premium to get started.
              </p>
              <Link href="/shop" className="focus-ring mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-accent dark:bg-white dark:text-ink dark:hover:bg-accent dark:hover:text-white">
                Explore products <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
      <CartRecommendations cartIds={cartIds} />
    </>
  );
}

export default function CartPage() {
  const { items, notify, removeItem, updateQuantity, toggleWishlist, wishlist } = useCart();
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 12;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;
  const cartIds = useMemo(() => new Set(items.map((item) => item.product.id)), [items]);

  useEffect(() => {
    const message = sessionStorage.getItem("velora-cart-message");
    if (!message) return;
    sessionStorage.removeItem("velora-cart-message");
    notify(message);
  }, [notify]);

  if (!items.length) {
    return <EmptyCartState cartIds={cartIds} />;
  }

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-8 overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-sm dark:border-white/10 dark:bg-white/5"
        >
          <div className="grid items-center gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-accent">Velora cart</p>
              <h1 className="mt-3 text-5xl font-black leading-none tracking-tight sm:text-7xl">Your shopping bag</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-500 dark:text-neutral-400">
                Curated essentials selected for your lifestyle.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 lg:justify-end">
              <motion.div
                key={`${itemCount}-${subtotal}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-full bg-violet-50 px-5 py-3 text-sm font-black text-accent dark:bg-white/10"
              >
                {itemCount} {itemCount === 1 ? "Item" : "Items"} • {formatCurrency(subtotal)}
              </motion.div>
              <Link href="/shop" className="focus-ring inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-accent dark:bg-white dark:text-ink dark:hover:bg-accent dark:hover:text-white">
                Continue shopping
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
          <motion.div layout className="grid gap-5">
            <AnimatePresence initial={false}>
              {items.map((item) => {
                const saved = wishlist.includes(item.product.id);

                return (
                  <motion.article
                    layout
                    key={item.product.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -28 }}
                    transition={{ duration: 0.25 }}
                    className="group grid gap-5 rounded-[1.75rem] border border-black/5 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-luxury dark:border-white/10 dark:bg-white/5 sm:grid-cols-[190px_minmax(0,1fr)]"
                  >
                    <Link href={`/product/${item.product.slug}`} className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem] bg-neutral-100 sm:aspect-square">
                      <Image src={item.product.image} alt={item.product.name} fill sizes="(max-width: 768px) 100vw, 190px" className="object-cover transition duration-700 group-hover:scale-105" />
                    </Link>
                    <div className="grid min-w-0 gap-5 md:grid-cols-[minmax(0,1fr)_auto]">
                      <div className="min-w-0">
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">{item.product.category}</p>
                        <Link href={`/product/${item.product.slug}`} className="mt-2 block text-2xl font-black tracking-tight transition hover:text-accent">
                          {item.product.name}
                        </Link>
                        <p className="mt-2 text-sm font-semibold text-neutral-500 dark:text-neutral-400">
                          {item.size} / {item.color}
                        </p>
                        <p className="mt-4 max-w-xl text-sm leading-6 text-neutral-500 dark:text-neutral-400">
                          {item.product.description}
                        </p>
                        <div className="mt-5 flex flex-wrap items-center gap-3">
                          <div className="flex h-11 items-center rounded-full bg-neutral-100 p-1 dark:bg-white/10">
                            <button className="focus-ring flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-white dark:hover:bg-white/10" onClick={() => updateQuantity(item.product.id, item.quantity - 1)} aria-label={`Decrease ${item.product.name} quantity`}>
                              <Minus size={15} />
                            </button>
                            <motion.span key={item.quantity} initial={{ scale: 0.85, opacity: 0.5 }} animate={{ scale: 1, opacity: 1 }} className="min-w-10 text-center text-sm font-black">
                              {item.quantity}
                            </motion.span>
                            <button className="focus-ring flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-white dark:hover:bg-white/10" onClick={() => updateQuantity(item.product.id, item.quantity + 1)} aria-label={`Increase ${item.product.name} quantity`}>
                              <Plus size={15} />
                            </button>
                          </div>
                          <button onClick={() => toggleWishlist(item.product.id)} className="focus-ring inline-flex min-h-10 items-center gap-2 rounded-full border border-black/10 px-4 text-sm font-bold transition hover:border-accent hover:text-accent dark:border-white/10">
                            <Heart size={16} className={saved ? "fill-accent text-accent" : ""} />
                            Save for later
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-4 md:flex-col md:items-end">
                        <div className="text-right">
                          <motion.p key={item.product.price * item.quantity} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="text-xl font-black">
                            {formatCurrency(item.product.price * item.quantity)}
                          </motion.p>
                          <p className="mt-1 text-xs font-bold text-neutral-400">{formatCurrency(item.product.price)} each</p>
                        </div>
                        <button onClick={() => removeItem(item.product.id)} className="focus-ring inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-sm font-bold text-neutral-400 transition hover:bg-red-50 hover:text-red-600" aria-label="Remove item">
                          <Trash2 size={17} /> Remove
                        </button>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>

          <aside className="sticky top-28 h-fit rounded-[1.75rem] border border-black/5 bg-white p-6 shadow-luxury dark:border-white/10 dark:bg-white/5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">Summary</p>
                <h2 className="mt-2 text-3xl font-black">Order total</h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-50 text-accent dark:bg-white/10">
                <LockKeyhole size={21} />
              </div>
            </div>
            <div className="mt-6 rounded-2xl border border-black/10 p-2 dark:border-white/10">
              <input placeholder="Promo code" className="focus-ring min-h-12 w-full rounded-xl bg-transparent px-3 text-sm outline-none" />
            </div>
            <div className="mt-6 grid gap-3 text-sm">
              <div className="flex justify-between"><span className="text-neutral-500">Subtotal</span><motion.b key={subtotal} initial={{ opacity: 0.5 }} animate={{ opacity: 1 }}>{formatCurrency(subtotal)}</motion.b></div>
              <div className="flex justify-between"><span className="text-neutral-500">Shipping</span><b>{shipping ? formatCurrency(shipping) : "Free"}</b></div>
              <div className="flex justify-between"><span className="text-neutral-500">Estimated tax</span><motion.b key={tax} initial={{ opacity: 0.5 }} animate={{ opacity: 1 }}>{formatCurrency(tax)}</motion.b></div>
              <div className="mt-2 flex justify-between border-t border-black/10 pt-4 text-xl font-black dark:border-white/10">
                <span>Estimated total</span>
                <motion.span key={total} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>{formatCurrency(total)}</motion.span>
              </div>
            </div>
            <Link href="/checkout" className="focus-ring mt-6 flex min-h-13 items-center justify-center rounded-full bg-accent px-5 py-4 text-sm font-black text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 hover:bg-violet-700">
              Secure Checkout
            </Link>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {["Apple Pay", "Google Pay", "PayPal"].map((method) => (
                <button key={method} type="button" className="focus-ring min-h-10 rounded-full border border-black/10 px-2 text-xs font-black transition hover:border-accent hover:text-accent dark:border-white/10">
                  {method}
                </button>
              ))}
            </div>
            <div className="mt-6 grid gap-3 rounded-2xl bg-neutral-50 p-4 text-sm dark:bg-white/10">
              <p className="flex items-center gap-2 font-bold"><ShieldCheck size={17} className="text-accent" /> Secure encrypted payment</p>
              <p className="flex items-center gap-2 font-bold"><Truck size={17} className="text-accent" /> Free shipping over $150</p>
              <p className="flex items-center gap-2 font-bold"><Sparkles size={17} className="text-accent" /> Easy returns within 30 days</p>
            </div>
          </aside>
        </div>
      </section>

      <CartRecommendations cartIds={cartIds} />

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-black/10 bg-white/95 p-4 backdrop-blur dark:border-white/10 dark:bg-ink/95 lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-400">Estimated total</p>
            <motion.p key={total} initial={{ opacity: 0.5 }} animate={{ opacity: 1 }} className="font-black">{formatCurrency(total)}</motion.p>
          </div>
          <Link href="/checkout" className="focus-ring inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-5 text-sm font-black text-white">
            Secure Checkout
          </Link>
        </div>
      </div>
    </>
  );
}
