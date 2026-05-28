"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Flame, Package, ShieldCheck, Sparkles, Star, Truck, Zap } from "lucide-react";
import { useState } from "react";
import { blogs, categories, products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { LinkButton } from "@/components/Button";

export function Hero() {
  const [glow, setGlow] = useState({ x: 58, y: 42 });
  const floatingCards = [
    { label: "40% OFF", detail: "Drop pricing", className: "-left-7 top-[7vh]" },
    { label: "Free shipping", detail: "Over $150", className: "-right-6 top-[18vh]" },
    { label: "4.9 rating", detail: "12K reviews", className: "-left-3 bottom-[26vh]" },
    { label: "Trending now", detail: "Sneaker edit", className: "-right-5 bottom-[15vh]" }
  ];

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at top left,#ede9fe,transparent 40%), radial-gradient(circle at bottom right,#ddd6fe,transparent 30%), #f8fafc"
      }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setGlow({
          x: ((event.clientX - rect.left) / rect.width) * 100,
          y: ((event.clientY - rect.top) / rect.height) * 100
        });
      }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute h-[34rem] w-[34rem] rounded-full bg-accent/20 blur-3xl"
        animate={{ left: `${glow.x}%`, top: `${glow.y}%` }}
        transition={{ type: "spring", stiffness: 55, damping: 22 }}
        style={{ transform: "translate(-50%, -50%)" }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-[8vh] text-center text-[22vw] font-black uppercase leading-none tracking-tight text-white/60">
        Velora
      </div>
      <div className="relative grid min-h-screen w-full items-center gap-12 px-7 py-24 sm:px-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-24 lg:px-[7vw] lg:py-[10vh]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-black uppercase tracking-[0.22em] text-accent shadow-sm backdrop-blur">
            <Flame size={16} /> New drop 2026
          </p>
          <h1 className="mt-5 max-w-6xl text-7xl font-black leading-[0.86] tracking-tight text-ink sm:text-8xl lg:text-[clamp(6.5rem,11vw,11rem)]">
            Own The Next Drop.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-700 lg:text-2xl lg:leading-10">
            Street luxury starts here: limited sneakers, sculpted outerwear, and accessories styled like a premium fashion campaign.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="focus-ring group inline-flex min-h-16 items-center gap-3 rounded-full bg-accent px-9 text-base font-black text-white shadow-[0_22px_60px_rgba(124,58,237,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(124,58,237,0.5)]"
            >
              Shop Drop <ArrowRight size={20} className="transition group-hover:translate-x-1" />
            </Link>
            <Link
              href="/hot-items"
              className="focus-ring group inline-flex min-h-16 items-center gap-3 rounded-full bg-white/80 px-9 text-base font-black text-ink shadow-lg shadow-black/5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white"
            >
              Explore Hot Items <Zap size={19} className="text-accent transition group-hover:rotate-12" />
            </Link>
          </div>
          <div className="mt-10 grid max-w-lg grid-cols-3 gap-3">
            {["Trending", "Best Seller", "New Drop"].map((badge) => (
              <motion.div
                key={badge}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: badge.length * 0.07 }}
                className="rounded-2xl border border-white/70 bg-white/65 px-4 py-3 text-center text-xs font-black uppercase tracking-[0.16em] shadow-lg shadow-violet-200/40 backdrop-blur"
              >
                {badge}
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} className="relative min-h-[620px] lg:min-h-[calc(100vh-9rem)]">
          <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="absolute left-[5vw] right-0 top-0 h-[580px] overflow-hidden rounded-[2.2rem] shadow-[0_35px_110px_rgba(15,15,20,0.28)] lg:h-[calc(100vh-9rem)]">
            <Image
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1400&auto=format&fit=crop"
              alt="High contrast Velora fashion campaign"
              fill={false}
              width={900}
              height={1125}
              priority
              className="h-full w-full scale-[1.18] object-cover object-[50%_42%] contrast-125 saturate-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-white/10 mix-blend-multiply" />
          </motion.div>
          {floatingCards.map((card, index) => (
            <motion.div
              key={card.label}
              animate={{ y: [0, index % 2 ? 12 : -12, 0], rotate: [0, index % 2 ? 1.5 : -1.5, 0] }}
              transition={{ duration: 4 + index * 0.5, repeat: Infinity, ease: "easeInOut" }}
              className={`glass absolute z-10 rounded-3xl px-5 py-4 shadow-luxury ${card.className}`}
            >
              <p className="text-xl font-black text-ink">{card.label}</p>
              <p className="text-sm font-semibold text-neutral-500">{card.detail}</p>
            </motion.div>
          ))}
          <motion.div animate={{ x: [0, 8, 0], y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute bottom-0 left-0 z-20 w-48 overflow-hidden rounded-3xl bg-white p-3 shadow-luxury">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image src={products[1].image} alt={products[1].name} fill sizes="192px" className="object-cover" />
            </div>
            <p className="mt-3 font-black text-ink">{products[1].name}</p>
            <p className="text-sm font-bold text-accent">$164 · New Drop</p>
          </motion.div>
          <motion.div animate={{ x: [0, -8, 0], y: [0, 8, 0] }} transition={{ duration: 5.5, repeat: Infinity }} className="absolute bottom-8 right-2 z-20 w-44 overflow-hidden rounded-3xl bg-ink p-3 text-white shadow-luxury">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image src={products[0].image} alt={products[0].name} fill sizes="176px" className="object-cover" />
            </div>
            <p className="mt-3 font-black">{products[0].name}</p>
            <p className="text-sm font-bold text-violet-300">Best Seller</p>
          </motion.div>
        </motion.div>
      </div>
      <div className="relative border-y border-white/60 bg-white/50 py-4 backdrop-blur">
        <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} className="flex w-max gap-10 whitespace-nowrap text-sm font-black uppercase tracking-[0.28em] text-neutral-500">
          {Array.from({ length: 2 }).map((_, group) => (
            <span key={group} className="flex gap-10">
              {["Velora", "New Drop", "Street Luxury", "40% OFF", "Free Shipping", "Trending Now", "4.9 Rated"].map((item) => (
                <span key={`${group}-${item}`}>{item}</span>
              ))}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function ProductRail({ title = "Featured products", items = products.slice(0, 4) }: { title?: string; items?: typeof products }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-accent">Curated</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">{title}</h2>
        </div>
        <Link href="/shop" className="hidden items-center gap-2 font-bold text-accent sm:flex">
          View all <ArrowRight size={18} />
        </Link>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export function CategorySection() {
  return (
    <section className="bg-white py-14 dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black sm:text-5xl">Shop by category</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.slice(1).map((category, index) => (
            <Link key={category} href={`/shop?category=${category}`} className="group rounded-3xl bg-neutral-100 p-7 transition hover:-translate-y-1 hover:shadow-luxury dark:bg-white/5">
              <span className="text-4xl font-black text-neutral-300">0{index + 1}</span>
              <h3 className="mt-8 text-2xl font-black">{category}</h3>
              <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">Premium edits for modern everyday rituals.</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FlashSale() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[2rem] bg-ink p-8 text-white shadow-luxury dark:bg-white dark:text-ink lg:p-12">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="font-black uppercase tracking-[0.22em] text-violet-300 dark:text-accent">48 hour flash sale</p>
            <h2 className="mt-3 text-4xl font-black sm:text-6xl">Up to 35% off elevated staples.</h2>
            <p className="mt-4 max-w-2xl text-white/70 dark:text-neutral-600">Limited seasonal pricing on best sellers, travel pieces, and tech accessories.</p>
          </div>
          <LinkButton href="/shop" variant="primary">Unlock sale</LinkButton>
        </div>
      </div>
    </section>
  );
}

export function TrustAndSocial() {
  const trustItems = [
    { Icon: Truck, title: "Fast delivery", text: "Two-day shipping on eligible orders." },
    { Icon: ShieldCheck, title: "Secure payment", text: "Encrypted checkout and trusted methods." },
    { Icon: Package, title: "Easy returns", text: "30-day returns with simple labels." },
    { Icon: Sparkles, title: "AI curation", text: "Recommendations tuned to your style." }
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid gap-4 md:grid-cols-4">
        {trustItems.map(({ Icon, title, text }) => (
          <div key={title} className="rounded-3xl border border-black/5 bg-white p-6 dark:border-white/10 dark:bg-white/5">
            <Icon className="text-accent" />
            <h3 className="mt-4 font-black">{title}</h3>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">{text}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        {["LUMA", "AETHER", "KIN", "NOVA", "MONO", "ATLAS"].map((brand) => (
          <div key={brand} className="rounded-2xl border border-black/5 py-5 text-center text-xl font-black tracking-[0.28em] text-neutral-300 dark:border-white/10">
            {brand}
          </div>
        ))}
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="bg-neutral-950 py-14 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black sm:text-5xl">Customers call it quietly addictive.</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {["Everything feels considered, from product discovery to checkout.", "The product pages feel genuinely premium and easy to use.", "Velora is what online shopping should feel like in 2026."].map((quote, index) => (
            <div key={quote} className="rounded-3xl bg-white/8 p-6 ring-1 ring-white/10">
              <div className="flex gap-1 text-accent">{Array.from({ length: 5 }).map((_, star) => <Star key={star} size={16} className="fill-accent" />)}</div>
              <p className="mt-5 text-lg font-semibold leading-7">“{quote}”</p>
              <p className="mt-6 text-sm text-white/50">Verified buyer 0{index + 1}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Newsletter() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-white p-6 shadow-luxury dark:bg-white/5 sm:p-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-black sm:text-5xl">Join the private drop list.</h2>
            <p className="mt-3 text-neutral-500 dark:text-neutral-400">Early access, private pricing, and a weekly edit that respects your inbox.</p>
          </div>
          <form className="flex flex-col gap-3 sm:flex-row">
            <input aria-label="Email address" type="email" placeholder="you@example.com" className="focus-ring min-h-12 flex-1 rounded-full border border-black/10 bg-transparent px-5 dark:border-white/10" />
            <button className="focus-ring rounded-full bg-accent px-6 py-3 font-bold text-white">Subscribe</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export function InstagramGallery() {
  const imgs = products.slice(0, 6).map((item) => item.image);
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-black sm:text-5xl">@velora.studio</h2>
        <CheckCircle2 className="text-accent" />
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
        {imgs.map((img, index) => (
          <div key={img} className="relative aspect-square overflow-hidden rounded-3xl bg-neutral-100">
            <Image src={img} alt={`Velora social gallery ${index + 1}`} fill sizes="20vw" className="object-cover transition duration-500 hover:scale-105" />
          </div>
        ))}
      </div>
    </section>
  );
}

export function BlogGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {blogs.map((blog) => (
        <Link key={blog.slug} href={`/blog/${blog.slug}`} className="group overflow-hidden rounded-3xl bg-white shadow-sm dark:bg-white/5">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image src={blog.image} alt={blog.title} fill sizes="33vw" className="object-cover transition duration-700 group-hover:scale-105" />
          </div>
          <div className="p-5">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">{blog.category}</p>
            <h2 className="mt-3 text-xl font-black">{blog.title}</h2>
            <p className="mt-2 text-sm leading-6 text-neutral-500 dark:text-neutral-400">{blog.excerpt}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
