"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Flame, ShoppingBag, Truck, Store, ExternalLink, Check, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/MagneticButton";

const DELIVERY_PARTNERS = [
  { name: "Zomato", logo: "🚀", time: "25-35 mins", rating: "4.8★", color: "bg-red-500/10 border-red-500/30 text-red-400" },
  { name: "Swiggy", logo: "📦", time: "20-30 mins", rating: "4.9★", color: "bg-orange-500/10 border-orange-500/30 text-orange-400" },
  { name: "Uber Eats", logo: "🚲", time: "25-40 mins", rating: "4.7★", color: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" },
  { name: "Deliveroo", logo: "🦘", time: "20-35 mins", rating: "4.8★", color: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400" },
];

export default function OrderPage() {
  const { addToCart } = useCart();
  const [orderType, setOrderType] = useState<"delivery" | "pickup">("delivery");

  // Custom Roll Builder State
  const [bread, setBread] = useState("Double Saj Flatbread");
  const [protein, setProtein] = useState("Emperor Roasted Chicken");
  const [sauce, setSauce] = useState("Signature Garlic Toum");
  const [pickles, setPickles] = useState<string[]>(["Fermented Turnip", "Wild Cucumber"]);
  const [customPrice, setCustomPrice] = useState(249);

  const togglePickle = (item: string) => {
    if (pickles.includes(item)) {
      setPickles(pickles.filter((p) => p !== item));
    } else {
      setPickles([...pickles, item]);
    }
  };

  const handleAddCustomRoll = () => {
    const customItem = {
      id: `custom-${Date.now()}`,
      name: `Custom Roll (${protein.split(" ")[0]})`,
      category: "wraps" as const,
      price: customPrice,
      description: `${bread} with ${protein}, ${sauce}, and ${pickles.join(", ")}.`,
      image: "https://images.unsplash.com/photo-1561651823-34feb02250e4?q=80&w=800&auto=format&fit=crop",
      calories: 650,
      prepTime: "8 mins",
      ingredients: [bread, protein, sauce, ...pickles],
    };

    addToCart(customItem, 1, "Medium", `Custom Roll: ${bread}, ${sauce}`);
  };

  return (
    <div className="relative pt-32 pb-28 px-4 sm:px-6 lg:px-8 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-mono tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant Ordering Engine</span>
          </div>

          <h1 className="font-bebas text-5xl sm:text-7xl text-cream tracking-tight leading-none">
            ORDER ONLINE<span className="text-secondary">.</span>
          </h1>

          <p className="text-muted text-sm sm:text-base font-inter font-light">
            Choose direct delivery via our official partners or craft a custom wrap roll made to your exact taste specifications.
          </p>

          {/* Delivery / Pickup Switcher */}
          <div className="inline-flex p-1.5 rounded-full bg-bg-card border border-white/10 mt-4">
            <button
              onClick={() => setOrderType("delivery")}
              className={`px-6 py-2.5 rounded-full text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                orderType === "delivery"
                  ? "bg-gold-gradient text-background shadow-glow"
                  : "text-muted hover:text-cream"
              }`}
            >
              <Truck className="w-4 h-4" /> DELIVERY
            </button>
            <button
              onClick={() => setOrderType("pickup")}
              className={`px-6 py-2.5 rounded-full text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                orderType === "pickup"
                  ? "bg-gold-gradient text-background shadow-glow"
                  : "text-muted hover:text-cream"
              }`}
            >
              <Store className="w-4 h-4" /> DIRECT PICKUP
            </button>
          </div>
        </div>

        {/* Delivery Partner Badges */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="font-bebas text-2xl text-cream tracking-wider">OFFICIAL DELIVERY PARTNERS</h3>
            <p className="text-xs text-muted">Tap any partner below for express fulfillment in your city</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DELIVERY_PARTNERS.map((p, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className={`p-6 rounded-3xl border ${p.color} flex flex-col justify-between space-y-4 cursor-pointer`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{p.logo}</span>
                  <span className="text-xs font-mono font-bold">{p.rating}</span>
                </div>

                <div>
                  <h4 className="font-bebas text-2xl text-cream tracking-wide">{p.name}</h4>
                  <p className="text-xs text-muted font-mono">Avg Time: {p.time}</p>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <span>ORDER DIRECT</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Custom Wrap Configurator */}
        <div className="p-8 sm:p-12 rounded-3xl bg-bg-card border border-white/10 shadow-2xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="text-xs font-mono text-primary uppercase tracking-widest">Interactive Kitchen Bar</span>
              <h2 className="font-bebas text-4xl text-cream tracking-wide">CRAFT YOUR CUSTOM ROLL</h2>
            </div>
            <span className="font-bebas text-3xl text-primary">{formatCurrency(customPrice)}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Step 1: Select Bread */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-wider text-muted font-mono">1. Select Artisanal Bread</h4>
              <div className="space-y-2">
                {["Double Saj Flatbread", "Traditional Yeast Pita", "Craft Bowl (No Bread)"].map((b) => (
                  <button
                    key={b}
                    onClick={() => setBread(b)}
                    className={`w-full p-4 rounded-2xl text-left border text-sm font-medium transition-all flex items-center justify-between ${
                      bread === b
                        ? "bg-primary/10 border-primary text-primary"
                        : "bg-background border-white/5 text-muted hover:border-white/20"
                    }`}
                  >
                    <span>{b}</span>
                    {bread === b && <Check className="w-4 h-4 text-primary" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Protein */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-wider text-muted font-mono">2. Select Charcoal Protein</h4>
              <div className="space-y-2">
                {[
                  "Emperor Roasted Chicken",
                  "Fireburst Ribeye Beef (+₹30)",
                  "Smoked Lamb Kafta (+₹20)",
                  "Golden Falafel Fritters",
                ].map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setProtein(p);
                      if (p.includes("Beef")) setCustomPrice(279);
                      else if (p.includes("Lamb")) setCustomPrice(269);
                      else setCustomPrice(249);
                    }}
                    className={`w-full p-4 rounded-2xl text-left border text-sm font-medium transition-all flex items-center justify-between ${
                      protein === p
                        ? "bg-secondary/10 border-secondary text-secondary"
                        : "bg-background border-white/5 text-muted hover:border-white/20"
                    }`}
                  >
                    <span>{p}</span>
                    {protein === p && <Check className="w-4 h-4 text-secondary" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Select Garlic Toum & Sauce */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-wider text-muted font-mono">3. Select Signature Sauce</h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Original Garlic Toum",
                  "Smoked Harissa Toum",
                  "Black Truffle Toum",
                  "Sesame Tarator Sauce",
                ].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSauce(s)}
                    className={`p-3 rounded-xl border text-xs font-mono font-bold text-center transition-all ${
                      sauce === s
                        ? "bg-primary/20 border-primary text-primary"
                        : "bg-background border-white/5 text-muted hover:border-white/20"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Select Pickles & Fillings */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-wider text-muted font-mono">4. Select Pickles & Crunch</h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Fermented Turnip",
                  "Wild Cucumber",
                  "Sumac Onions",
                  "Crispy Spiced Fries",
                ].map((p) => {
                  const isChecked = pickles.includes(p);
                  return (
                    <button
                      key={p}
                      onClick={() => togglePickle(p)}
                      className={`p-3 rounded-xl border text-xs font-mono text-center transition-all flex items-center justify-between ${
                        isChecked
                          ? "bg-cream/10 border-cream text-cream font-bold"
                          : "bg-background border-white/5 text-muted hover:border-white/20"
                      }`}
                    >
                      <span>{p}</span>
                      {isChecked && <Check className="w-3.5 h-3.5 text-cream" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex justify-end">
            <MagneticButton onClick={handleAddCustomRoll} variant="primary" size="lg">
              ADD CUSTOM ROLL TO CART ({formatCurrency(customPrice)})
            </MagneticButton>
          </div>
        </div>
      </div>
    </div>
  );
}
