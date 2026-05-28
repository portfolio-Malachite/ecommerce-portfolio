"use client";

import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { useCart } from "@/hooks/useCart";

export default function WishlistPage() {
  const { wishlist } = useCart();
  const saved = products.filter((product) => wishlist.includes(product.id));
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-black">Wishlist</h1>
      <p className="mt-3 text-neutral-500 dark:text-neutral-400">Saved products with one-tap move-to-cart actions.</p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {(saved.length ? saved : products.slice(0, 4)).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
