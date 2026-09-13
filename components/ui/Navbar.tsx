"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, ShoppingBag, Menu as MenuIcon, X, MapPin } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { MagneticButton } from "./MagneticButton";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "Our Story", href: "/about" },
  { name: "Locations", href: "/locations" },
  { name: "Order Online", href: "/order" },
  { name: "Franchise", href: "/franchise" },
  { name: "Contact", href: "/contact" },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems, openCart, lastAddedItem } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out",
        isScrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl"
          : "bg-gradient-to-b from-background/90 to-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center group interactive">
          <img
            src="/WRAPISTRY_v2_horizontal_darkBG.png"
            alt="Wrapistry Craft Shawarma"
            className="h-10 sm:h-14 md:h-18 max-h-12 sm:max-h-16 w-auto max-w-[155px] sm:max-w-[280px] md:max-w-[340px] object-contain group-hover:scale-105 transition-transform duration-300 filter drop-shadow-[0_4px_20px_rgba(232,163,61,0.3)]"
          />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-bg-card/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/5">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full font-inter",
                  isActive ? "text-primary" : "text-body/80 hover:text-cream"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 bg-primary/10 border border-primary/30 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls: Cart & CTA */}
        <div className="flex items-center gap-3">
          {/* Cart Icon Button */}
          <button
            onClick={openCart}
            aria-label="Open Cart"
            className="relative p-2.5 rounded-full bg-bg-card border border-white/10 text-cream hover:border-primary/50 hover:text-primary transition-all duration-300 interactive group"
          >
            <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-secondary text-background font-bold text-xs flex items-center justify-center shadow-glow-red"
              >
                {totalItems}
              </motion.span>
            )}
            {/* Added Toast Notification */}
            <AnimatePresence>
              {lastAddedItem && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute right-0 top-12 whitespace-nowrap bg-secondary text-cream text-xs px-3 py-1.5 rounded-lg shadow-xl font-medium border border-white/20 pointer-events-none"
                >
                  Added {lastAddedItem}!
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Quick Order CTA */}
          <div className="hidden sm:block">
            <Link href="/menu">
              <MagneticButton variant="primary" size="sm">
                ORDER NOW
              </MagneticButton>
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2.5 rounded-full bg-bg-card border border-white/10 text-cream hover:text-primary transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-background/95 backdrop-blur-2xl border-b border-white/10 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
              {NAV_LINKS.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "block text-2xl font-bebas tracking-wide py-2 border-b border-white/5",
                      pathname === link.href ? "text-primary" : "text-cream/80"
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <div className="pt-4 flex flex-col gap-3">
                <Link href="/menu" className="w-full">
                  <MagneticButton variant="primary" size="md" className="w-full">
                    ORDER NOW
                  </MagneticButton>
                </Link>

                <div className="flex items-center gap-2 text-xs text-muted justify-center pt-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Downtown Flagship Open until 1:00 AM</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
