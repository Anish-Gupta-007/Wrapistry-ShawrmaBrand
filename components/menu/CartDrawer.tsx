"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Flame, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";
import { MagneticButton } from "../ui/MagneticButton";

export const CartDrawer: React.FC = () => {
  const { cart, isOpen, closeCart, updateQuantity, removeFromCart, clearCart, totalAmount, totalItems } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const deliveryFee = totalAmount > 35 ? 0 : 3.99;
  const finalTotal = Math.max(0, totalAmount * (1 - discount) + (totalAmount > 0 ? deliveryFee : 0));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "WRAPISTRY10" || promoCode.trim().toUpperCase() === "CRAFT10") {
      setDiscount(0.1);
      setPromoError("");
    } else {
      setPromoError("Invalid code. Try 'WRAPISTRY10'");
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setIsCheckingOut(true);
    
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#E8A33D", "#D9481C", "#F2E8D5"],
      });

      setTimeout(() => {
        clearCart();
        setOrderComplete(false);
        closeCart();
      }, 3500);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          {/* Slide-out Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-background border-l border-white/10 flex flex-col shadow-2xl font-inter"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-bg-card">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gold-gradient p-0.5 shadow-glow shrink-0 overflow-hidden">
                  <img src="/WRAPISTRY_v2_appicon_badge.png" alt="Wrapistry" className="w-full h-full object-cover rounded-[14px]" />
                </div>
                <div className="flex flex-col">
                  <img src="/WRAPISTRY_v2_horizontal_darkBG.png" alt="Wrapistry" className="h-8 w-auto object-contain" />
                  <p className="text-[11px] text-muted font-mono">{totalItems} {totalItems === 1 ? "ITEM IN CART" : "ITEMS IN CART"}</p>
                </div>
              </div>

              <button
                onClick={closeCart}
                className="p-2 rounded-full text-muted hover:text-cream hover:bg-white/5 transition-colors"
                aria-label="Close Cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {orderComplete ? (
                <div className="flex flex-col items-center justify-center text-center py-16 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 text-primary border border-primary flex items-center justify-center shadow-glow">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="font-bebas text-3xl text-cream tracking-wide">ORDER CONFIRMED!</h4>
                  <p className="text-sm text-muted max-w-xs">
                    Your kitchen ticket #WP-{Math.floor(1000 + Math.random() * 9000)} has been sent to our master grill chef. Estimated prep time: 12-15 mins.
                  </p>
                </div>
              ) : cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-20 space-y-4 text-muted">
                  <Flame className="w-12 h-12 text-primary/40 animate-pulse" />
                  <p className="font-bebas text-xl text-cream">YOUR CART IS EMPTY</p>
                  <p className="text-xs">Explore our artisanal wraps and combos to begin your culinary journey.</p>
                </div>
              ) : (
                cart.map((cartItem) => (
                  <motion.div
                    key={`${cartItem.item.id}-${cartItem.selectedSpice}`}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 rounded-2xl bg-bg-card border border-white/5 flex gap-4 items-center group"
                  >
                    <img
                      src={cartItem.item.image}
                      alt={cartItem.item.name}
                      className="w-16 h-16 rounded-xl object-cover border border-white/10"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h4 className="font-bebas text-lg text-cream tracking-wide truncate">
                          {cartItem.item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(cartItem.item.id)}
                          className="text-muted hover:text-secondary p-1 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-muted mt-0.5">
                        <span className="px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 font-mono">
                          {cartItem.selectedSpice || "Medium"}
                        </span>
                        <span>{formatCurrency(cartItem.item.price)}</span>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2 bg-background border border-white/10 rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(cartItem.item.id, -1)}
                            className="p-1 hover:text-primary transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-bold font-mono px-2 text-cream">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(cartItem.item.id, 1)}
                            className="p-1 hover:text-primary transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="font-bebas text-lg text-primary">
                          {formatCurrency(cartItem.item.price * cartItem.quantity)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cart.length > 0 && !orderComplete && (
              <div className="p-6 border-t border-white/10 bg-bg-card space-y-4">
                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code (e.g. WRAPISTRY10)"
                    className="flex-1 bg-background border border-white/10 rounded-xl px-3 py-2 text-xs text-cream uppercase placeholder:normal-case placeholder:text-muted focus:outline-none focus:border-primary"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary/20 text-primary border border-primary/40 rounded-xl text-xs font-bold hover:bg-primary hover:text-background transition-colors"
                  >
                    Apply
                  </button>
                </form>
                {promoError && <p className="text-[11px] text-secondary">{promoError}</p>}
                {discount > 0 && <p className="text-[11px] text-primary">10% Inner Circle Discount Applied!</p>}

                {/* Costs Breakdown */}
                <div className="space-y-1.5 text-xs text-muted pt-2 border-t border-white/5">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-cream">{formatCurrency(totalAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Delivery ({totalAmount > 35 ? "FREE" : "$3.99"})</span>
                    <span className="text-cream">{deliveryFee === 0 ? "FREE" : formatCurrency(deliveryFee)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-primary">
                      <span>Discount</span>
                      <span>-{formatCurrency(totalAmount * discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-bebas tracking-wide text-cream pt-2 border-t border-white/10">
                    <span>TOTAL AMOUNT</span>
                    <span className="text-primary text-xl">{formatCurrency(finalTotal)}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <MagneticButton
                  onClick={handleCheckout}
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? (
                    <span className="flex items-center gap-2">
                      <Flame className="w-5 h-5 animate-spin text-background" />
                      PROCESSING ORDER...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      PROCEED TO CHECKOUT ({formatCurrency(finalTotal)})
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  )}
                </MagneticButton>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
