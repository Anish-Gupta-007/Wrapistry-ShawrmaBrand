"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Plus, Star, Clock, Info, Check, X } from "lucide-react";
import { MenuItem } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { MagneticButton } from "../ui/MagneticButton";

interface FoodCardProps {
  item: MenuItem;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item }) => {
  const { addToCart } = useCart();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSpice, setSelectedSpice] = useState<"Mild" | "Medium" | "Fire">("Medium");
  const [notes, setNotes] = useState("");
  const [added, setAdded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Body scroll remains unlocked so background can be scrolled when cursor is outside the card
    return () => {};
  }, [modalOpen]);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(item, 1, "Medium");
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleModalAdd = () => {
    addToCart(item, 1, selectedSpice, notes);
    setModalOpen(false);
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        whileHover={{ y: -8, scale: 1.04 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => setModalOpen(true)}
        className="group relative bg-bg-card rounded-3xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-500 shadow-xl hover:shadow-[0_20px_45px_rgba(232,163,61,0.22)] flex flex-col justify-between cursor-pointer interactive"
      >
        {/* Image & Badges Container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-black/40" />

          {/* Shimmer Sweep Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
            {item.isChefSpecial && (
              <span className="relative overflow-hidden px-3 py-1 rounded-full bg-secondary text-cream text-[10px] font-bold uppercase tracking-wider shadow-glow-red flex items-center gap-1 font-mono">
                <Flame className="w-3 h-3 fill-current text-cream" /> Chef's Choice
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
              </span>
            )}
            {item.isVeg ? (
              <span className="relative overflow-hidden px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 text-[10px] font-bold uppercase tracking-wider font-mono">
                100% Veg
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </span>
            ) : (
              <span className="relative overflow-hidden px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-400 text-[10px] font-bold uppercase tracking-wider font-mono">
                Craft Meat
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </span>
            )}
          </div>

          {/* Quick Info Hover Button */}
          <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setModalOpen(true);
              }}
              className="p-2 rounded-full bg-background/80 backdrop-blur-md text-cream hover:text-primary transition-colors border border-white/10"
              aria-label="Item Info"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex-1 flex flex-col justify-between space-y-4 min-w-0">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2 min-w-0">
              <h3 className="font-bebas text-2xl text-cream tracking-wide group-hover:text-primary transition-colors min-w-0 flex-1 line-clamp-1">
                {item.name}
              </h3>
              <span className="font-bebas text-2xl text-primary font-bold shrink-0 ml-1">
                {formatCurrency(item.price)}
              </span>
            </div>

            <p className="text-muted text-xs line-clamp-2 leading-relaxed font-inter">
              {item.description}
            </p>
          </div>

          {/* Bottom Actions */}
          <div className="pt-4 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-muted font-mono">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-primary" /> {item.prepTime}
              </span>
              <span>•</span>
              <span>{item.calories} kcal</span>
            </div>

            <button
              onClick={handleQuickAdd}
              className={`p-2.5 rounded-full border transition-all duration-300 transform group-hover:scale-110 ${
                added
                  ? "bg-emerald-500 border-emerald-500 text-background scale-110 shadow-glow"
                  : "bg-primary/10 border-primary/40 text-primary hover:bg-primary hover:text-background"
              }`}
              aria-label="Add to cart"
            >
              {added ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Item Detail Customization Modal (Portal Mounted to Document Body) */}
      {mounted && modalOpen && createPortal(
        <AnimatePresence mode="wait">
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-hidden max-w-[100vw]"
            onWheel={(e) => {
              window.scrollBy({ top: e.deltaY, behavior: "auto" });
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 z-0"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
              className="relative z-10 w-[calc(100vw-1.5rem)] sm:w-full max-w-lg max-h-[82vh] sm:max-h-[88vh] flex flex-col rounded-2xl sm:rounded-3xl bg-[#140F0B] border border-white/15 shadow-2xl font-inter mx-auto my-auto text-cream overflow-hidden"
            >
              {/* Modal Image Header (Fixed at top of card) */}
              <div className="shrink-0 relative h-36 sm:h-52 w-full overflow-hidden border-b border-white/10 shadow-lg">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#140F0B] via-transparent to-black/40" />
                <button
                  onClick={() => setModalOpen(false)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/70 text-cream hover:text-primary transition-colors border border-white/10 z-20"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Modal Scrollable Body (Scrolls card content cleanly when cursor is over card!) */}
              <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-3.5 sm:space-y-4 overscroll-contain custom-scrollbar">
                <div className="flex justify-between items-start gap-2 min-w-0">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bebas text-xl sm:text-3xl text-cream tracking-wide leading-tight break-words">{item.name}</h3>
                    <p className="text-xs text-primary font-mono">{item.calories} kcal • Prep: {item.prepTime}</p>
                  </div>
                  <span className="font-bebas text-xl sm:text-3xl text-primary font-bold shrink-0 ml-1">{formatCurrency(item.price)}</span>
                </div>

                <p className="text-xs sm:text-sm text-muted leading-relaxed font-light break-words">{item.description}</p>

                {/* Key Ingredients Tags */}
                <div>
                  <h4 className="text-[10px] sm:text-xs uppercase tracking-wider text-muted font-mono mb-1.5 font-bold">Key Ingredients</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {item.ingredients.map((ing, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-lg bg-white/5 text-[11px] sm:text-xs text-cream border border-white/10 break-words">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Spice Level Selector */}
                <div>
                  <h4 className="text-[10px] sm:text-xs uppercase tracking-wider text-muted font-mono mb-1.5 font-bold">Select Spice Level</h4>
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
                    {(["Mild", "Medium", "Fire"] as const).map((spice) => (
                      <button
                        key={spice}
                        type="button"
                        onClick={() => setSelectedSpice(spice)}
                        className={`py-2 sm:py-2.5 rounded-xl text-[10px] sm:text-xs font-bold font-mono transition-all border truncate ${
                          selectedSpice === spice
                            ? "bg-secondary text-cream border-secondary shadow-glow-red scale-102"
                            : "bg-white/5 border-white/10 text-muted hover:border-white/30"
                        }`}
                      >
                        {spice === "Fire" ? "🔥 FIRE" : spice === "Medium" ? "🌶️ MEDIUM" : "🌿 MILD"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Special Instructions */}
                <div>
                  <h4 className="text-[10px] sm:text-xs uppercase tracking-wider text-muted font-mono mb-1.5 font-bold">Special Instructions</h4>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Extra garlic toum, no pickles"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-xs text-cream placeholder:text-muted focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <MagneticButton onClick={handleModalAdd} variant="primary" size="md" className="w-full mt-3 py-2.5 sm:py-3 text-xs sm:text-sm">
                  ADD TO ORDER ({formatCurrency(item.price)})
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};
