"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/utils";

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, removeItem } = useCart();
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Cart drawer">
      <button className="absolute inset-0 h-full w-full cursor-default" onClick={onClose} aria-label="Close cart drawer" />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white p-5 shadow-luxury dark:bg-neutral-950">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black">Shopping bag</h2>
          <button onClick={onClose} className="focus-ring rounded-full p-2 hover:bg-neutral-100 dark:hover:bg-white/10" aria-label="Close cart drawer">
            <X size={20} />
          </button>
        </div>
        <div className="mt-6 flex-1 overflow-y-auto">
          {items.length ? (
            <div className="grid gap-4">
              {items.map((item) => (
                <div key={item.product.id} className="grid grid-cols-[78px_1fr_auto] gap-3">
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100">
                    <Image src={item.product.image} alt={item.product.name} fill sizes="78px" className="object-cover" />
                  </div>
                  <div>
                    <p className="font-black">{item.product.name}</p>
                    <p className="mt-1 text-sm text-neutral-500">{item.quantity} × {formatCurrency(item.product.price)}</p>
                  </div>
                  <button onClick={() => removeItem(item.product.id)} className="text-sm font-bold text-neutral-400 hover:text-red-600">Remove</button>
                </div>
              ))}
            </div>
          ) : (
            <p className="rounded-3xl bg-neutral-100 p-5 text-neutral-500 dark:bg-white/10">Your cart is empty.</p>
          )}
        </div>
        <div className="border-t border-black/10 pt-5 dark:border-white/10">
          <div className="flex justify-between text-lg font-black">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <Link href="/checkout" onClick={onClose} className="focus-ring mt-4 flex min-h-12 items-center justify-center rounded-full bg-accent font-bold text-white">
            Checkout
          </Link>
          <Link href="/cart" onClick={onClose} className="mt-3 block text-center text-sm font-bold text-neutral-500 hover:text-accent">
            View full cart
          </Link>
        </div>
      </aside>
    </div>
  );
}
