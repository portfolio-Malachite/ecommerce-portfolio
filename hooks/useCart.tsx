"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Product } from "@/data/products";

export type CartItem = {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
};

type Toast = { id: number; message: string };

type CartContextValue = {
  items: CartItem[];
  wishlist: string[];
  toast: Toast | null;
  isReady: boolean;
  addItem: (product: Product, options?: Partial<CartItem>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleWishlist: (id: string) => void;
  clearCart: () => void;
  notify: (message: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [toast, setToast] = useState<Toast | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("velora-cart");
    const savedWishlist = localStorage.getItem("velora-wishlist");
    if (savedCart) setItems(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    localStorage.setItem("velora-cart", JSON.stringify(items));
  }, [isReady, items]);

  useEffect(() => {
    if (!isReady) return;
    localStorage.setItem("velora-wishlist", JSON.stringify(wishlist));
  }, [isReady, wishlist]);

  const notify = useCallback((message: string) => {
    const next = { id: Date.now(), message };
    setToast(next);
    window.setTimeout(() => setToast((current) => (current?.id === next.id ? null : current)), 2400);
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      wishlist,
      toast,
      isReady,
      notify,
      addItem(product, options) {
        setItems((current) => {
          const existing = current.find((item) => item.product.id === product.id);
          if (existing) {
            return current.map((item) =>
              item.product.id === product.id ? { ...item, quantity: item.quantity + (options?.quantity ?? 1) } : item
            );
          }
          return [
            ...current,
            {
              product,
              quantity: options?.quantity ?? 1,
              size: options?.size ?? product.sizes[0],
              color: options?.color ?? product.colors[0]
            }
          ];
        });
        notify(`${product.name} added to cart`);
      },
      removeItem(id) {
        setItems((current) => current.filter((item) => item.product.id !== id));
        notify("Item removed");
      },
      updateQuantity(id, quantity) {
        setItems((current) =>
          current.map((item) => (item.product.id === id ? { ...item, quantity: Math.max(1, quantity) } : item))
        );
      },
      toggleWishlist(id) {
        setWishlist((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
        notify("Wishlist updated");
      },
      clearCart() {
        setItems([]);
      }
    }),
    [isReady, items, notify, wishlist, toast]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used within CartProvider");
  return value;
}
