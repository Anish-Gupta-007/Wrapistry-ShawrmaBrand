"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Flame, CheckCircle2, TrendingUp, DollarSign, Building2, Users, ArrowRight, Sparkles, Send } from "lucide-react";
import { FRANCHISE_TIERS } from "@/lib/data";
import { MagneticButton } from "@/components/ui/MagneticButton";

export default function FranchisePage() {
  const [dailyOrders, setDailyOrders] = useState(400);
  const avgCheck = 300;
  const estimatedMonthlyGross = dailyOrders * avgCheck * 30;
  const estimatedAnnualProfit = estimatedMonthlyGross * 12 * 0.28; // ~28% EBITDA margin

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    capital: "₹25 Lakhs - ₹50 Lakhs",
    experience: "1-3 Years",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="relative pt-32 pb-28 px-4 sm:px-6 lg:px-8 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-mono tracking-widest uppercase">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Franchise Opportunity</span>
          </div>

          <h1 className="font-bebas text-5xl sm:text-7xl lg:text-8xl text-cream tracking-tight leading-[0.9]">
            BUILD A SHAWARMA EMPIRE<span className="text-primary">.</span>
          </h1>

          <p className="text-muted text-sm sm:text-base font-inter font-light">
            Partner with the fastest-growing Mediterranean craft brand. High EBITDA margins, proprietary central sauce production, and industry-leading square footage return.
          </p>
        </div>

        {/* 1. FRANCHISE TIERS */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-secondary uppercase tracking-widest">Scalable Store Formats</span>
            <h2 className="font-bebas text-4xl sm:text-5xl text-cream tracking-wide">CHOOSE YOUR MODEL</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FRANCHISE_TIERS.map((tier) => (
              <motion.div
                key={tier.id}
                whileHover={{ y: -8 }}
                className={`relative p-8 rounded-3xl border flex flex-col justify-between space-y-6 ${
                  tier.popular
                    ? "bg-bg-card border-primary shadow-glow"
                    : "bg-background border-white/10"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gold-gradient text-background text-[10px] font-bebas font-bold tracking-widest shadow-glow">
                    MOST POPULAR FORMAT
                  </div>
                )}

                <div className="space-y-4">
                  <h3 className="font-bebas text-3xl text-cream tracking-wide">{tier.name}</h3>
                  <p className="text-xs text-muted leading-relaxed font-mono">{tier.subtitle}</p>

                  <div className="p-4 rounded-2xl bg-white/5 space-y-2 border border-white/5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-muted">Investment Range:</span>
                      <span className="text-primary font-bold">{tier.investment}</span>
                    </div>
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-muted">Target Area:</span>
                      <span className="text-cream">{tier.sqft}</span>
                    </div>
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-muted">Est. Payback:</span>
                      <span className="text-secondary font-bold">{tier.roi}</span>
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    {tier.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-body/90">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a href="#inquiry-form">
                  <MagneticButton
                    variant={tier.popular ? "primary" : "outline"}
                    size="md"
                    className="w-full mt-4"
                  >
                    APPLY FOR THIS TIER
                  </MagneticButton>
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 2. ROI & REVENUE CALCULATOR */}
        <div className="p-8 sm:p-12 rounded-3xl bg-bg-card border border-white/10 shadow-2xl space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-mono text-primary uppercase tracking-widest">Financial Projection</span>
            <h2 className="font-bebas text-4xl sm:text-5xl text-cream tracking-wide">ESTIMATED EARNINGS CALCULATOR</h2>
            <p className="text-xs text-muted">Adjust daily order volumes to project estimated gross sales and net operating profit.</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            {/* Slider */}
            <div className="space-y-4 bg-background p-6 rounded-2xl border border-white/5">
              <div className="flex justify-between items-center text-sm font-mono">
                <span className="text-muted">Estimated Daily Orders:</span>
                <span className="text-primary font-bold text-xl">{dailyOrders} Wraps / Day</span>
              </div>
              <input
                type="range"
                min="200"
                max="1200"
                step="50"
                value={dailyOrders}
                onChange={(e) => setDailyOrders(Number(e.target.value))}
                className="w-full accent-primary bg-dark-border rounded-lg h-2 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-muted font-mono">
                <span>200 (Kiosk)</span>
                <span>600 (Flagship)</span>
                <span>1200 (Multi-Hub)</span>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-center space-y-2">
                <span className="text-xs uppercase font-mono text-muted">Est. Monthly Gross Revenue</span>
                <div className="font-bebas text-4xl sm:text-5xl text-cream">
                  ₹{estimatedMonthlyGross.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                </div>
                <span className="text-[10px] text-muted">Based on ₹300 avg check</span>
              </div>

              <div className="p-6 rounded-2xl bg-primary/10 border border-primary/30 text-center space-y-2">
                <span className="text-xs uppercase font-mono text-primary">Est. Annual Net Profit (28% Margin)</span>
                <div className="font-bebas text-4xl sm:text-5xl text-primary">
                  ₹{estimatedAnnualProfit.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                </div>
                <span className="text-[10px] text-primary/80">EBITDA Projection</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. FRANCHISE INQUIRY FORM */}
        <div id="inquiry-form" className="p-8 sm:p-12 rounded-3xl bg-bg-card border border-white/10 shadow-2xl max-w-3xl mx-auto space-y-8 font-inter">
          <div className="text-center space-y-2">
            <h2 className="font-bebas text-4xl sm:text-5xl text-cream tracking-wide">FRANCHISE INQUIRY FORM</h2>
            <p className="text-xs text-muted">Submit your application to speak directly with our Global Expansion Director.</p>
          </div>

          {formSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-primary/20 text-primary border border-primary mx-auto flex items-center justify-center shadow-glow">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-bebas text-3xl text-cream">APPLICATION RECEIVED!</h3>
              <p className="text-xs text-muted max-w-md mx-auto">
                Thank you, {formData.name}. Our franchise development executive will review your profile and contact you at {formData.email} within 24 business hours.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase text-muted mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Marcus Vance"
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-xs text-cream focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-muted mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="marcus@example.com"
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-xs text-cream focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-muted mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-xs text-cream focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-muted mb-2">Target City / Territory *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Mumbai, MH"
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-xs text-cream focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase text-muted mb-2">Liquid Investment Capital</label>
                  <select
                    value={formData.capital}
                    onChange={(e) => setFormData({ ...formData, capital: e.target.value })}
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-xs text-cream focus:outline-none focus:border-primary"
                  >
                    <option>₹25 Lakhs - ₹50 Lakhs</option>
                    <option>₹50 Lakhs - ₹1 Crore</option>
                    <option>₹1 Crore - ₹2 Crores</option>
                    <option>₹2 Crores+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-muted mb-2">Restaurant / F&B Experience</label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-xs text-cream focus:outline-none focus:border-primary"
                  >
                    <option>No Prior Experience</option>
                    <option>1-3 Years</option>
                    <option>3-5 Years</option>
                    <option>5+ Years / Multi-Unit Owner</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-muted mb-2">Additional Notes / Questions</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Tell us about your background and franchise ambitions..."
                  className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-xs text-cream focus:outline-none focus:border-primary"
                />
              </div>

              <MagneticButton type="submit" variant="primary" size="lg" className="w-full">
                SUBMIT FRANCHISE APPLICATION
                <Send className="w-4 h-4" />
              </MagneticButton>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
