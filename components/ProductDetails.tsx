"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Minus, Plus, Star, Truck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/Button";
import { ProductRail } from "@/components/Sections";
import { Product, products } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/utils";

export function ProductDetails({ product }: { product: Product }) {
  const router = useRouter();
  const [image, setImage] = useState(product.gallery[0]);
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  function buyNow() {
    addItem(product, { quantity, size, color });
    router.push("/checkout");
  }

  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[88px_1fr]">
          <div className="order-2 flex gap-3 lg:order-1 lg:flex-col">
            {product.gallery.map((item) => (
              <button key={item} onClick={() => setImage(item)} className="relative h-20 w-20 overflow-hidden rounded-2xl ring-1 ring-black/10">
                <Image src={item} alt={product.name} fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
          <div className="group relative order-1 aspect-[4/5] overflow-hidden rounded-[2rem] bg-neutral-100 shadow-luxury lg:order-2">
            <Image src={image} alt={product.name} fill priority sizes="50vw" className="object-cover transition duration-700 group-hover:scale-110" />
          </div>
        </div>
        <div className="lg:py-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-accent">{product.category}</p>
          <h1 className="mt-3 text-5xl font-black tracking-tight sm:text-7xl">{product.name}</h1>
          <div className="mt-4 flex items-center gap-3">
            <span className="text-3xl font-black">{formatCurrency(product.price)}</span>
            {product.oldPrice ? <span className="text-neutral-400 line-through">{formatCurrency(product.oldPrice)}</span> : null}
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm font-bold">
            <Star size={18} className="fill-accent text-accent" /> {product.rating} rating · {product.reviews} reviews
          </div>
          <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600 dark:text-neutral-300">{product.description}</p>
          <div className="mt-8">
            <p className="mb-3 font-black">Size</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((item) => (
                <button key={item} onClick={() => setSize(item)} className={`focus-ring min-w-12 rounded-full px-4 py-2 font-bold ${size === item ? "bg-ink text-white dark:bg-white dark:text-ink" : "bg-white dark:bg-white/5"}`}>
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <p className="mb-3 font-black">Color</p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((item) => (
                <button key={item} onClick={() => setColor(item)} className={`focus-ring rounded-full px-4 py-2 font-bold ${color === item ? "bg-accent text-white" : "bg-white dark:bg-white/5"}`}>
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-[auto_1fr_1fr]">
            <div className="flex h-12 items-center rounded-full bg-white dark:bg-white/5">
              <button className="px-4" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity"><Minus size={17} /></button>
              <span className="min-w-8 text-center font-black">{quantity}</span>
              <button className="px-4" onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity"><Plus size={17} /></button>
            </div>
            <Button onClick={() => addItem(product, { quantity, size, color })}>Add to cart</Button>
            <Button
              onClick={buyNow}
              variant="secondary"
              className="shadow-lg shadow-black/15 hover:shadow-luxury dark:bg-ink dark:text-white dark:hover:bg-accent"
            >
              Buy now
            </Button>
          </div>
          <div className="mt-8 rounded-3xl border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-white/5">
            <p className="flex items-center gap-2 font-black"><Truck className="text-accent" /> Shipping info</p>
            <p className="mt-2 text-sm leading-6 text-neutral-500 dark:text-neutral-400">Free premium shipping over $150. Easy returns within 30 days. Duties calculated at checkout.</p>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black">Reviews</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {["Beautiful materials and fast delivery.", "The fit guide was spot on.", "Feels more expensive than it is."].map((review) => (
            <div key={review} className="rounded-3xl bg-white p-5 dark:bg-white/5">
              <div className="flex text-accent">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={15} className="fill-accent" />)}</div>
              <p className="mt-3 font-semibold">{review}</p>
            </div>
          ))}
        </div>
      </section>
      <ProductRail title="Related products" items={products.filter((item) => item.id !== product.id).slice(0, 4)} />
      <ProductRail title="Recently viewed" items={products.slice(4, 8)} />
    </>
  );
}
