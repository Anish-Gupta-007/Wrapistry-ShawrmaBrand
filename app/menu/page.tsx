"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Flame, Filter, Sparkles } from "lucide-react";
import { MENU_ITEMS, MenuItem } from "@/lib/data";
import { FoodCard } from "@/components/menu/FoodCard";
import { MagneticButton } from "@/components/ui/MagneticButton";

const CATEGORIES = [
  { id: "all", label: "ALL CRAFT ITEMS" },
  { id: "wraps", label: "ARTISANAL WRAPS" },
  { id: "combos", label: "LEGEND COMBOS" },
  { id: "sides", label: "CRAFT SIDES" },
  { id: "beverages", label: "BEVERAGES" },
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSpicyOnly, setFilterSpicyOnly] = useState(false);
  const [filterVegOnly, setFilterVegOnly] = useState(false);

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpicy = filterSpicyOnly ? item.isSpicy : true;
    const matchesVeg = filterVegOnly ? item.isVeg : true;

    return matchesCategory && matchesSearch && matchesSpicy && matchesVeg;
  });

  return (
    <div className="relative pt-32 pb-28 px-4 sm:px-6 lg:px-8 bg-background min-h-screen overflow-x-hidden max-w-full">
      {/* Glow backdrop */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-full max-w-[700px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10 w-full">
        {/* Header Title */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-mono tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Master Kitchen Selection</span>
          </div>

          <h1 className="font-bebas text-5xl sm:text-7xl text-cream tracking-tight leading-none">
            OUR CRAFT MENU<span className="text-secondary">.</span>
          </h1>

          <p className="text-muted text-sm sm:text-base font-inter font-light">
            Every wrap is rolled to order in double-baked Saj flatbread with 24-hour slow roasted marinated meats and hand-whipped garlic toum.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-6">
          {/* Search & Quick Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search wraps, combos, ingredients..."
                className="w-full bg-bg-card border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-sm text-cream placeholder:text-muted focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Filter Toggles */}
            <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
              <button
                onClick={() => setFilterSpicyOnly(!filterSpicyOnly)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all border flex items-center gap-1.5 whitespace-nowrap ${
                  filterSpicyOnly
                    ? "bg-secondary text-cream border-secondary shadow-glow-red"
                    : "bg-bg-card border-white/10 text-muted hover:border-white/20"
                }`}
              >
                <Flame className="w-3.5 h-3.5" /> Spicy Items Only
              </button>

              <button
                onClick={() => setFilterVegOnly(!filterVegOnly)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all border flex items-center gap-1.5 whitespace-nowrap ${
                  filterVegOnly
                    ? "bg-emerald-500 text-background border-emerald-500 shadow-glow"
                    : "bg-bg-card border-white/10 text-muted hover:border-white/20"
                }`}
              >
                🌱 100% Veg Only
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-2 border-b border-white/10">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-6 py-3 rounded-full text-xs font-mono font-bold tracking-wider transition-colors whitespace-nowrap ${
                    isActive ? "text-background" : "text-muted hover:text-cream"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="menu-category-active"
                      className="absolute inset-0 bg-gold-gradient rounded-full shadow-glow"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <Flame className="w-12 h-12 text-primary/40 mx-auto animate-pulse" />
            <h3 className="font-bebas text-2xl text-cream">NO MATCHING ITEMS FOUND</h3>
            <p className="text-xs text-muted">Try resetting your search or filter tags.</p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
                setFilterSpicyOnly(false);
                setFilterVegOnly(false);
              }}
              className="px-4 py-2 bg-primary/20 text-primary border border-primary/40 rounded-xl text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
