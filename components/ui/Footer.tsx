"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Flame, ArrowUp, Send, Instagram, Facebook, Twitter, MapPin, Phone, Mail, Clock, Sparkles, CheckCircle2 } from "lucide-react";

// Mini 3D Floating Icons & Emojis Atmosphere (14 cute mini food & drink icons floating in background!)
const FLOATING_MINI_ICONS = [
  {
    id: "mini-shawarma-1",
    symbol: "🌯",
    label: "Mini Shawarma",
    className: "absolute top-8 left-6 text-3xl sm:text-4xl opacity-35 filter drop-shadow-[0_8px_20px_rgba(232,163,61,0.5)] pointer-events-none z-0",
    animate: { y: [0, -14, 0], rotate: [-10, 10, -10] },
    transition: { duration: 5.2, repeat: Infinity, ease: "easeInOut" },
  },
  {
    id: "mini-shawarma-2",
    symbol: "🌯",
    label: "Mini Craft Shawarma",
    className: "absolute bottom-12 right-8 text-3xl sm:text-4xl opacity-35 filter drop-shadow-[0_8px_20px_rgba(242,100,25,0.5)] pointer-events-none z-0",
    animate: { y: [0, 14, 0], rotate: [10, -10, 10] },
    transition: { duration: 5.8, repeat: Infinity, ease: "easeInOut" },
  },
  {
    id: "mini-taco-1",
    symbol: "🌮",
    label: "Mini Saj Wrap",
    className: "absolute top-16 left-[28%] text-3xl sm:text-4xl opacity-30 filter drop-shadow-[0_8px_18px_rgba(232,163,61,0.4)] pointer-events-none z-0",
    animate: { y: [0, -16, 0], rotate: [5, -12, 5] },
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
  {
    id: "mini-cocktail-1",
    symbol: "🍹",
    label: "Mini Limonada Cocktail",
    className: "absolute top-8 right-16 text-3xl sm:text-4xl opacity-35 filter drop-shadow-[0_8px_20px_rgba(232,163,61,0.4)] pointer-events-none z-0",
    animate: { y: [0, -16, 0], rotate: [0, 12, 0] },
    transition: { duration: 4.8, repeat: Infinity, ease: "easeInOut" },
  },
  {
    id: "mini-[#Wrapistry-drink-2]",
    symbol: "🍸",
    label: "Mini Hibiscus Drink",
    className: "absolute top-1/2 right-[15%] text-3xl sm:text-4xl opacity-30 filter drop-shadow-[0_8px_18px_rgba(242,100,25,0.4)] pointer-events-none z-0",
    animate: { y: [0, 15, 0], rotate: [-10, 10, -10] },
    transition: { duration: 5.4, repeat: Infinity, ease: "easeInOut" },
  },
  {
    id: "mini-burger-1",
    symbol: "🍔",
    label: "Mini Craft Burger",
    className: "absolute bottom-10 left-12 text-3xl sm:text-4xl opacity-30 filter drop-shadow-[0_8px_20px_rgba(232,163,61,0.4)] pointer-events-none z-0",
    animate: { y: [0, 16, 0], rotate: [0, -12, 0] },
    transition: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
  },
  {
    id: "mini-fries-1",
    symbol: "🍟",
    label: "Mini Sumac Fries",
    className: "absolute bottom-1/3 left-[20%] text-3xl sm:text-4xl opacity-35 filter drop-shadow-[0_8px_18px_rgba(232,163,61,0.5)] pointer-events-none z-0",
    animate: { y: [0, -15, 0], rotate: [8, -8, 8] },
    transition: { duration: 5.6, repeat: Infinity, ease: "easeInOut" },
  },
  {
    id: "mini-skewer-1",
    symbol: "🍢",
    label: "Mini Charcoal Skewer",
    className: "absolute top-1/3 left-[15%] text-3xl sm:text-4xl opacity-35 filter drop-shadow-[0_8px_18px_rgba(242,100,25,0.5)] pointer-events-none z-0",
    animate: { y: [0, -12, 0], x: [0, 10, 0] },
    transition: { duration: 5.8, repeat: Infinity, ease: "easeInOut" },
  },
  {
    id: "mini-falafel-1",
    symbol: "🧆",
    label: "Mini Golden Falafel",
    className: "absolute top-12 left-[42%] text-3xl sm:text-4xl opacity-35 filter drop-shadow-[0_8px_18px_rgba(232,163,61,0.5)] pointer-events-none z-0",
    animate: { y: [0, -10, 0], scale: [1, 1.12, 1] },
    transition: { duration: 4.9, repeat: Infinity, ease: "easeInOut" },
  },
  {
    id: "mini-toum-1",
    symbol: "🧄",
    label: "Mini Garlic Toum Pod",
    className: "absolute top-6 left-1/2 -translate-x-1/2 text-3xl sm:text-4xl opacity-35 filter drop-shadow-[0_6px_15px_rgba(232,163,61,0.5)] pointer-events-none z-0",
    animate: { y: [0, -10, 0], rotate: [-8, 8, -8] },
    transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
  },
  {
    id: "mini-flame-1",
    symbol: "🔥",
    label: "Mini Fire Ember",
    className: "absolute top-1/3 right-[32%] text-3xl sm:text-4xl opacity-40 filter drop-shadow-[0_6px_15px_rgba(242,100,25,0.6)] pointer-events-none z-0",
    animate: { y: [0, -14, 0], scale: [1, 1.18, 1] },
    transition: { duration: 4.2, repeat: Infinity, ease: "easeInOut" },
  },
  {
    id: "mini-lemon-1",
    symbol: "🍋",
    label: "Mini Lemon Twist",
    className: "absolute bottom-1/3 right-[38%] text-3xl sm:text-4xl opacity-35 filter drop-shadow-[0_6px_15px_rgba(232,163,61,0.5)] pointer-events-none z-0",
    animate: { y: [0, 12, 0], rotate: [5, -5, 5] },
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
  },
  {
    id: "mini-pizza-1",
    symbol: "🍕",
    label: "Mini Saj Flatbread",
    className: "absolute bottom-12 right-[28%] text-3xl sm:text-4xl opacity-30 filter drop-shadow-[0_8px_18px_rgba(232,163,61,0.4)] pointer-events-none z-0",
    animate: { y: [0, -15, 0], rotate: [-10, 10, -10] },
    transition: { duration: 6.2, repeat: Infinity, ease: "easeInOut" },
  },
  {
    id: "mini-drink-3",
    symbol: "🥤",
    label: "Mini Craft Beverage",
    className: "absolute bottom-20 left-[45%] text-3xl sm:text-4xl opacity-30 filter drop-shadow-[0_8px_18px_rgba(242,100,25,0.4)] pointer-events-none z-0",
    animate: { y: [0, 14, 0], rotate: [8, -8, 8] },
    transition: { duration: 5.7, repeat: Infinity, ease: "easeInOut" },
  },
];

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="relative bg-[#090705] border-t border-white/10 pt-16 pb-12 overflow-hidden text-body font-inter select-none z-20">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[160px] pointer-events-none" />

      {/* CUTE MINI FLOATING 3D ICONS & EMOJIS (Layer z-0 behind content!) */}
      {FLOATING_MINI_ICONS.map((item) => (
        <motion.div
          key={item.id}
          className={item.className}
          animate={item.animate}
          transition={item.transition}
        >
          <span role="img" aria-label={item.label}>
            {item.symbol}
          </span>
        </motion.div>
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Glassmorphic 4-Column Card Grid (PERFECTLY EQUAL HEIGHT & ALIGNED 12-COLUMN LAYOUT) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch pb-12 border-b border-white/10">
          {/* Brand Info Card (col-span-4) */}
          <div className="lg:col-span-4 h-full p-6 sm:p-7 rounded-3xl bg-[#140F0B]/85 border border-white/10 hover:border-primary/50 backdrop-blur-md shadow-2xl flex flex-col justify-between space-y-5 group transition-all duration-500">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-3.5 sm:gap-4 group">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gold-gradient p-0.5 shadow-glow shrink-0">
                  <div className="w-full h-full bg-[#0E0B08] rounded-[14px] flex items-center justify-center overflow-hidden">
                    <img
                      src="/WRAPISTRY_v2_appicon_badge.png"
                      alt="Wrapistry Badge"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <img
                  src="/WRAPISTRY_v2_horizontal_darkBG.png"
                  alt="Wrapistry Logo"
                  className="h-13 sm:h-16 md:h-18 w-auto object-contain group-hover:scale-105 transition-transform duration-300 filter drop-shadow-[0_4px_20px_rgba(232,163,61,0.3)]"
                />
              </Link>

              <p className="text-muted text-xs sm:text-sm leading-relaxed font-light">
                Mediterranean Craft Shawarma perfected over fire. 24-hour spiced marination, double-baked Saj flatbread, and hand-whipped garlic toum.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {/* Hours Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-cream shadow-inner">
                <Clock className="w-3.5 h-3.5 text-primary animate-pulse" />
                <span className="font-mono text-[11px] font-bold">Open Daily: 10:30 AM – 3:00 AM</span>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {[
                  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
                ].map((s, idx) => (
                  <a
                    key={idx}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-cream hover:border-primary hover:text-primary hover:bg-primary/10 hover:scale-110 transition-all duration-300 interactive shadow-md"
                  >
                    <s.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Links Card (col-span-2) */}
          <div className="lg:col-span-2 h-full p-6 sm:p-7 rounded-3xl bg-[#140F0B]/85 border border-white/10 hover:border-primary/50 backdrop-blur-md shadow-2xl flex flex-col justify-between space-y-4 group transition-all duration-500">
            <h4 className="font-bebas text-xl text-cream tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-muted">
              {[
                { label: "Home", href: "/" },
                { label: "Craft Menu", href: "/menu" },
                { label: "Our Story", href: "/about" },
                { label: "Find Locations", href: "/locations" },
                { label: "Order Online", href: "/order" },
                { label: "Franchise Inquiry", href: "/franchise" },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link href={item.href} className="hover:text-primary transition-colors flex items-center gap-2 group/item">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover/item:bg-primary group-hover/item:scale-125 transition-all" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Contact Card (col-span-3) */}
          <div className="lg:col-span-3 h-full p-6 sm:p-7 rounded-3xl bg-[#140F0B]/85 border border-white/10 hover:border-primary/50 backdrop-blur-md shadow-2xl flex flex-col justify-between space-y-4 group transition-all duration-500">
            <div>
              <h4 className="font-bebas text-xl text-cream tracking-wider flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-primary" />
                CONTACT US
              </h4>
              <ul className="space-y-3.5 text-xs sm:text-sm text-muted font-inter">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>742 Grand Ave, Financial District, NY 10001</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  <span className="font-mono">+1 (212) 555-0198</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <span>hello@wrapistrycraft.com</span>
                </li>
              </ul>
            </div>

            <div className="pt-2 text-[11px] font-mono text-primary/80 uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>CRAFT KITCHEN ACTIVE</span>
            </div>
          </div>

          {/* Inner Circle Newsletter Card (col-span-3) */}
          <div className="lg:col-span-3 h-full p-6 sm:p-7 rounded-3xl bg-[#140F0B]/85 border border-white/10 hover:border-secondary/50 backdrop-blur-md shadow-2xl flex flex-col justify-between space-y-4 group transition-all duration-500">
            <div className="space-y-3">
              <h4 className="font-bebas text-xl text-cream tracking-wider flex items-center gap-2">
                <Flame className="w-4 h-4 text-secondary" />
                THE INNER CIRCLE
              </h4>
              <p className="text-xs text-muted leading-relaxed font-light">
                Join 45,000+ shawarma connoisseurs for secret menu drops & launch invitations.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="space-y-2 pt-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-cream placeholder:text-muted focus:outline-none focus:border-secondary transition-colors pr-10 shadow-inner"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-secondary text-background hover:bg-secondary/90 hover:shadow-glow transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-1.5 text-[11px] text-secondary font-mono font-bold"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-secondary" />
                  <span>Welcome to the Inner Circle! 🎉</span>
                </motion.div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted font-mono">
          <p>© {new Date().getFullYear()} Wrapistry Craft Shawarma. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-cream transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-cream transition-colors">
              Terms of Service
            </Link>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-primary hover:text-primary-hover font-bold transition-all hover:-translate-y-0.5"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 animate-bounce-slow" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
