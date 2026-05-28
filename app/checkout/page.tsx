"use client";

import Link from "next/link";
import { CreditCard, MapPinned, PackageCheck, Smartphone, Truck, WalletCards } from "lucide-react";
import { useMemo, useState } from "react";
import { LinkButton } from "@/components/Button";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/utils";

const paymentMethods = [
  { Icon: Smartphone, label: "UPI" },
  { Icon: CreditCard, label: "Card" },
  { Icon: PackageCheck, label: "Cash on Delivery" },
  { Icon: WalletCards, label: "PayPal" }
];

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("Card");
  const [cardNumber, setCardNumber] = useState("");
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 150 ? 0 : 12;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;
  const cardBrand = useMemo(() => {
    const digits = cardNumber.replace(/\D/g, "");
    if (/^4/.test(digits)) return "Visa";
    if (/^(5[1-5]|2[2-7])/.test(digits)) return "Mastercard";
    if (/^3[47]/.test(digits)) return "Amex";
    if (/^6/.test(digits)) return "Discover";
    return "Card";
  }, [cardNumber]);
  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-28 pt-12 sm:px-6 lg:grid-cols-[1fr_400px] lg:px-8 lg:pb-12">
      <div>
        <h1 className="text-5xl font-black">Checkout</h1>
        <div className="mt-6 grid gap-6">
          <div className="rounded-3xl bg-white p-6 dark:bg-white/5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl font-black">Shipping address</h2>
              <button className="focus-ring flex items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-sm font-bold text-accent dark:bg-white/10">
                <MapPinned size={17} /> Auto-fill saved address
              </button>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {["Full Name", "Phone Number", "Email", "Country", "State", "City", "PIN Code", "Landmark"].map((field) => (
                <input key={field} placeholder={field} className="focus-ring min-h-12 rounded-2xl border border-black/10 bg-transparent px-4 dark:border-white/10" />
              ))}
              <textarea placeholder="Full Address" className="focus-ring min-h-28 rounded-2xl border border-black/10 bg-transparent p-4 dark:border-white/10 sm:col-span-2" />
            </div>
          </div>
          <div className="rounded-3xl bg-white p-6 dark:bg-white/5">
            <h2 className="text-2xl font-black">Billing address</h2>
            <label className="mt-4 flex items-center gap-3 text-sm font-bold">
              <input type="checkbox" defaultChecked className="h-4 w-4 accent-violet-600" /> Same as shipping address
            </label>
          </div>
          <div className="rounded-3xl bg-white p-6 dark:bg-white/5">
            <h2 className="text-2xl font-black">Delivery method</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[["Standard Delivery", "3-5 business days", "Free over $150"], ["Express Delivery", "1-2 business days", "$18"]].map(([title, text, price]) => (
                <button key={title} className="focus-ring rounded-2xl border border-black/10 p-4 text-left transition hover:border-accent dark:border-white/10">
                  <Truck className="mb-3 text-accent" />
                  <p className="font-black">{title}</p>
                  <p className="text-sm text-neutral-500">{text}</p>
                  <p className="mt-2 text-sm font-bold">{price}</p>
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-white p-6 dark:bg-white/5">
            <h2 className="text-2xl font-black">Payment section</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {paymentMethods.map(({ Icon, label }) => (
                <button
                  key={label}
                  onClick={() => setPaymentMethod(label)}
                  className={`focus-ring rounded-2xl border p-4 text-left font-bold transition hover:border-accent dark:border-white/10 ${
                    paymentMethod === label ? "border-accent bg-violet-50 text-accent dark:bg-white/10" : "border-black/10"
                  }`}
                >
                  <Icon className="mb-3 text-accent" /> {label}
                </button>
              ))}
            </div>
            {paymentMethod === "Card" ? (
              <div className="mt-5 grid gap-3 rounded-2xl border border-black/10 p-4 dark:border-white/10 sm:grid-cols-[1fr_auto] sm:items-center">
                <input
                  value={cardNumber}
                  onChange={(event) => setCardNumber(event.target.value)}
                  inputMode="numeric"
                  placeholder="Card number"
                  className="focus-ring min-h-12 rounded-full border border-black/10 bg-transparent px-4 dark:border-white/10"
                />
                <span className="rounded-full bg-ink px-4 py-2 text-sm font-black text-white dark:bg-white dark:text-ink">{cardBrand}</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <aside className="h-fit rounded-3xl bg-white p-6 shadow-luxury dark:bg-white/5">
        <h2 className="text-2xl font-black">Order summary</h2>
        <div className="mt-5 grid gap-3">
          {items.map((item) => (
            <div key={item.product.id} className="flex justify-between gap-3 text-sm">
              <span>{item.product.name} × {item.quantity}</span>
              <b>{formatCurrency(item.product.price * item.quantity)}</b>
            </div>
          ))}
        </div>
        <input placeholder="Promo code" className="focus-ring mt-5 min-h-12 w-full rounded-full border border-black/10 bg-transparent px-4 dark:border-white/10" />
        <div className="mt-5 grid gap-3 border-t border-black/10 pt-4 text-sm dark:border-white/10">
          <div className="flex justify-between"><span>Product total</span><b>{formatCurrency(subtotal)}</b></div>
          <div className="flex justify-between"><span>Shipping fee</span><b>{shipping ? formatCurrency(shipping) : "Free"}</b></div>
          <div className="flex justify-between"><span>GST / tax</span><b>{formatCurrency(tax)}</b></div>
          <div className="flex justify-between text-lg font-black"><span>Final total</span><b>{formatCurrency(total)}</b></div>
        </div>
        <Link href="/order-success" onClick={clearCart} className="focus-ring mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-accent px-5 text-sm font-bold text-white">
          Place order
        </Link>
        <LinkButton href="/cart" variant="ghost" className="mt-3 w-full">Back to cart</LinkButton>
      </aside>
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-black/10 bg-white p-4 dark:border-white/10 dark:bg-ink lg:hidden">
        <Link href="/order-success" onClick={clearCart} className="focus-ring flex min-h-12 items-center justify-center rounded-full bg-accent font-bold text-white">
          Pay {formatCurrency(total)}
        </Link>
      </div>
    </section>
  );
}
