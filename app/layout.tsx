import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/AppProviders";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { FloatingChat } from "@/components/FloatingChat";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Velora | Premium Ecommerce",
    template: "%s | Velora"
  },
  description: "A premium modern ecommerce experience for fashion, tech, and lifestyle essentials.",
  metadataBase: new URL("https://velora.example"),
  openGraph: {
    title: "Velora",
    description: "Luxury ecommerce, sharpened for modern shoppers.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <AppProviders>
          <Navbar />
          <main className="min-h-screen pt-20">{children}</main>
          <Footer />
          <FloatingChat />
        </AppProviders>
      </body>
    </html>
  );
}
