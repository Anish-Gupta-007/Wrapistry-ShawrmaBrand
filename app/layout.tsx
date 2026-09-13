import type { Metadata } from "next";
import { Bebas_Neue, Syne, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { LenisProvider } from "@/components/ui/LenisProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Preloader } from "@/components/ui/Preloader";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { CartDrawer } from "@/components/menu/CartDrawer";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic", "normal"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wrapistrycraft.com"),
  title: "Wrapistry | Mediterranean Craft Shawarma",
  description: "Experience the art of Mediterranean Craft Shawarma. 24-hour slow marination, charcoal-seared prime meats, double-baked Saj flatbread, and hand-whipped garlic toum.",
  keywords: ["Shawarma", "Wrapistry", "Mediterranean Food", "Craft Shawarma", "Garlic Toum", "Fine Fast Casual", "Food Franchise"],
  icons: {
    icon: [
      { url: "/WRAPISTRY_v2_appicon_badge.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/WRAPISTRY_v2_appicon_badge.png",
    apple: "/WRAPISTRY_v2_appicon_badge.png",
  },
  openGraph: {
    title: "Wrapistry | Mediterranean Craft Shawarma",
    description: "The gold standard of Mediterranean craft street food. Charcoal roasted perfection.",
    images: ["/WRAPISTRY_v2_horizontal_darkBG.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebas.variable} ${syne.variable} ${inter.variable} ${playfair.variable} scroll-smooth`}
    >
      <body className="bg-background text-body font-inter antialiased min-h-screen selection:bg-primary selection:text-background">
        <CartProvider>
          <LenisProvider>
            <Preloader />
            <CustomCursor />
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <CartDrawer />
            <Footer />
          </LenisProvider>
        </CartProvider>
      </body>
    </html>
  );
}
