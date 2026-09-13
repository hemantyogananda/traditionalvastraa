import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    `${siteConfig.name} — curated women's ethnic wear and handmade thread bangles, crafted in small batches across India. More than just fashion… it's a feeling!`,
  keywords: [siteConfig.name, "thread bangles", "ethnic wear", "sarees", "kurtis", "Indian fashion", "handmade bangles"],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <WishlistProvider>
            <AnnouncementBar />
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
