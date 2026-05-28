import { CategorySection, FlashSale, Hero, InstagramGallery, Newsletter, ProductRail, Testimonials, TrustAndSocial } from "@/components/Sections";
import { products } from "@/data/products";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductRail title="Featured products" items={products.slice(0, 4)} />
      <CategorySection />
      <ProductRail title="Best sellers" items={products.slice(2, 6)} />
      <FlashSale />
      <ProductRail title="AI recommendations" items={[products[4], products[0], products[7], products[2]]} />
      <Testimonials />
      <ProductRail title="Trending now" items={[products[1], products[3], products[5], products[6]]} />
      <TrustAndSocial />
      <InstagramGallery />
      <Newsletter />
    </>
  );
}
