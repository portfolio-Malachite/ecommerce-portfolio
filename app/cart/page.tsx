"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { LinkButton } from "@/components/Button";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCart();
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  if (!items.length) {
    return (
      <section className="mx-auto flex min-h-[65vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
        <h1 className="text-5xl font-black">Your cart is empty</h1>
        <p className="mt-4 text-neutral-500 dark:text-neutral-400">Premium pieces are waiting when you are.</p>
        <LinkButton href="/shop" className="mt-7">Continue shopping</LinkButton>
      </section>
    );
  }
  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
      <div>
        <h1 className="text-5xl font-black">Cart</h1>
        <div className="mt-8 grid gap-4">
          {items.map((item) => (
            <div key={item.product.id} className="grid gap-4 rounded-3xl bg-white p-4 dark:bg-white/5 sm:grid-cols-[120px_1fr_auto]">
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image src={item.product.image} alt={item.product.name} fill sizes="120px" className="object-cover" />
              </div>
              <div>
                <Link href={`/product/${item.product.slug}`} className="text-xl font-black hover:text-accent">{item.product.name}</Link>
                <p className="mt-2 text-sm text-neutral-500">{item.size} · {item.color}</p>
                <div className="mt-4 flex w-fit items-center rounded-full bg-neutral-100 dark:bg-white/10">
                  <button className="px-4 py-2" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>-</button>
                  <span className="min-w-8 text-center font-bold">{item.quantity}</span>
                  <button className="px-4 py-2" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>+</button>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                <span className="font-black">{formatCurrency(item.product.price * item.quantity)}</span>
                <button onClick={() => removeItem(item.product.id)} className="focus-ring rounded-full p-2 text-neutral-400 hover:bg-red-50 hover:text-red-600" aria-label="Remove item">
                  <Trash2 size={19} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <aside className="h-fit rounded-3xl bg-white p-6 shadow-luxury dark:bg-white/5">
        <h2 className="text-2xl font-black">Summary</h2>
        <input placeholder="Coupon code" className="focus-ring mt-5 min-h-12 w-full rounded-full border border-black/10 bg-transparent px-4 dark:border-white/10" />
        <div className="mt-6 grid gap-3 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><b>{formatCurrency(subtotal)}</b></div>
          <div className="flex justify-between"><span>Shipping</span><b>{subtotal > 150 ? "Free" : "$12"}</b></div>
          <div className="flex justify-between border-t border-black/10 pt-3 text-lg dark:border-white/10"><span>Total</span><b>{formatCurrency(subtotal + (subtotal > 150 ? 0 : 12))}</b></div>
        </div>
        <LinkButton href="/checkout" className="mt-6 w-full">Checkout</LinkButton>
        <LinkButton href="/shop" variant="ghost" className="mt-3 w-full">Continue shopping</LinkButton>
      </aside>
    </section>
  );
}
