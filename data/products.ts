export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  badge?: string;
  colors: string[];
  sizes: string[];
  image: string;
  gallery: string[];
  description: string;
};

export const products: Product[] = [
  {
    id: "p1",
    slug: "aura-knit-jacket",
    name: "Aura Knit Jacket",
    category: "Outerwear",
    price: 188,
    oldPrice: 240,
    rating: 4.9,
    reviews: 128,
    badge: "Best Seller",
    colors: ["Black", "Ivory", "Plum"],
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1543076447-215ad9ba6923?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop"
    ],
    description: "A sculpted premium knit layer with a soft hand feel, elevated collar, and everyday structure."
  },
  {
    id: "p2",
    slug: "nova-runner",
    name: "Nova Runner",
    category: "Footwear",
    price: 164,
    rating: 4.8,
    reviews: 94,
    badge: "New",
    colors: ["White", "Black", "Silver"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1200&auto=format&fit=crop"
    ],
    description: "Lightweight performance sneaker with a couture-inspired profile and cloud-like cushioning."
  },
  {
    id: "p3",
    slug: "monolith-watch",
    name: "Monolith Watch",
    category: "Accessories",
    price: 296,
    rating: 4.9,
    reviews: 211,
    colors: ["Graphite", "Steel", "Midnight"],
    sizes: ["One Size"],
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1200&auto=format&fit=crop"
    ],
    description: "Minimal chronograph with sapphire glass, precise movement, and a quietly confident silhouette."
  },
  {
    id: "p4",
    slug: "atelier-tote",
    name: "Atelier Tote",
    category: "Bags",
    price: 220,
    oldPrice: 270,
    rating: 4.7,
    reviews: 77,
    badge: "Sale",
    colors: ["Black", "Taupe", "Clay"],
    sizes: ["One Size"],
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop"
    ],
    description: "Soft structured carryall with refined hardware, laptop-ready space, and day-to-night utility."
  },
  {
    id: "p5",
    slug: "studio-headphones",
    name: "Studio Headphones",
    category: "Tech",
    price: 340,
    rating: 4.8,
    reviews: 156,
    badge: "AI Pick",
    colors: ["Black", "Sand", "Violet"],
    sizes: ["One Size"],
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1200&auto=format&fit=crop"
    ],
    description: "Immersive wireless audio with adaptive noise control and a premium anodized finish."
  },
  {
    id: "p6",
    slug: "zara-silk-shirt",
    name: "Zara Silk Shirt",
    category: "Apparel",
    price: 132,
    rating: 4.6,
    reviews: 63,
    colors: ["Pearl", "Black", "Sage"],
    sizes: ["XS", "S", "M", "L"],
    image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1200&auto=format&fit=crop"
    ],
    description: "Fluid silk-blend shirting cut with a relaxed drape and finished with tonal buttons."
  },
  {
    id: "p7",
    slug: "luxe-sunglasses",
    name: "Luxe Sunglasses",
    category: "Accessories",
    price: 118,
    rating: 4.7,
    reviews: 89,
    colors: ["Smoke", "Black", "Champagne"],
    sizes: ["One Size"],
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1200&auto=format&fit=crop"
    ],
    description: "Sharp acetate frames with gradient lenses, metal detailing, and UV400 protection."
  },
  {
    id: "p8",
    slug: "motion-duffle",
    name: "Motion Duffle",
    category: "Bags",
    price: 154,
    rating: 4.8,
    reviews: 102,
    colors: ["Black", "Olive", "Stone"],
    sizes: ["One Size"],
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1200&auto=format&fit=crop"
    ],
    description: "Weekender capacity with water-resistant nylon, shoe storage, and polished hardware."
  }
];

export const categories = ["All", "Apparel", "Outerwear", "Footwear", "Accessories", "Bags", "Tech"];

export const blogs = [
  {
    slug: "quiet-luxury-essentials",
    title: "The New Quiet Luxury Essentials",
    category: "Style",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop",
    excerpt: "How minimal silhouettes, better materials, and fewer decisions shape a premium wardrobe."
  },
  {
    slug: "designing-a-smarter-cart",
    title: "Designing a Smarter Cart",
    category: "Commerce",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop",
    excerpt: "Small interaction details that make premium checkout flows feel calmer and faster."
  },
  {
    slug: "future-of-personal-shopping",
    title: "The Future of Personal Shopping",
    category: "AI",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
    excerpt: "AI recommendations are becoming less noisy, more contextual, and more beautifully timed."
  }
];
