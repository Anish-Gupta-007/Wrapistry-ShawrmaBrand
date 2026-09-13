"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, ArrowRight, Star, Sparkles } from "lucide-react";
import { MagneticButton } from "../ui/MagneticButton";

interface HeroTextRevealProps {
  scrollProgress: number;
}

const NARRATIVES = [
  {
    title: "CRAFTED OVER FIRE.",
    subtitle: "24-Hour Spiced Marinade • Spit Roasted • Hand-Whipped Toum",
    highlight: "PERFECTED IN THREADS."
  },
  {
    title: "AUTHENTIC CHARCOAL HEAT.",
    subtitle: "Searing prime cut meats wrapped in double-baked Saj bread.",
    highlight: "MODERN CULINARY PRECISION."
  },
  {
    title: "TASTE THE EMPIRE.",
    subtitle: "The gold standard of Mediterranean craft street food.",
    highlight: "EVERY ROLL IS AN ARTWORK."
  }
];

export const HeroTextReveal: React.FC<HeroTextRevealProps> = ({ scrollProgress }) => {
  // Determine active narrative phase based on scrub progress (0.0 to 1.0)
  const activeIndex = Math.min(
    NARRATIVES.length - 1,
    Math.floor(scrollProgress * NARRATIVES.length)
  );

  const currentNarrative = NARRATIVES[activeIndex];

  return (
    <div className="absolute top-0 left-0 w-full lg:w-[48%] h-full z-20 flex flex-col justify-center px-6 sm:px-12 lg:px-16 pointer-events-none">
      <div className="pointer-events-auto space-y-6 max-w-xl">
        {/* Brand Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-mono tracking-widest uppercase shadow-glow"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Award-Winning Mediterranean Craft</span>
        </motion.div>

        {/* Main Display Headline with Word Stagger Entrance */}
        <div className="overflow-hidden min-h-[140px] sm:min-h-[180px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h1 className="font-bebas text-5xl sm:text-7xl lg:text-8xl tracking-tight text-cream leading-[0.9]">
                {currentNarrative.title}
                <br />
                <span className="text-transparent bg-clip-text bg-gold-gradient">
                  {currentNarrative.highlight}
                </span>
              </h1>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Crossfading Subtitle Narrative */}
        <div className="min-h-[48px]">
          <AnimatePresence mode="wait">
            <motion.p
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-body/90 text-sm sm:text-base leading-relaxed font-inter font-light"
            >
              {currentNarrative.subtitle}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Interactive Magnetic CTA Cluster */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-wrap items-center gap-4 pt-4"
        >
          <Link href="/menu">
            <MagneticButton variant="primary" size="lg">
              EXPLORE CRAFT MENU
              <ArrowRight className="w-5 h-5" />
            </MagneticButton>
          </Link>

          <Link href="/about">
            <MagneticButton variant="outline" size="lg">
              OUR STORY
            </MagneticButton>
          </Link>
        </motion.div>

        {/* Social Proof Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="pt-6 border-t border-white/10 flex items-center gap-6 text-xs text-muted"
        >
          <div className="flex items-center gap-1 text-primary">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <div>
            <span className="text-cream font-bold">4.9/5 RATING</span>
            <span className="mx-2">•</span>
            <span>10,000+ Happy Customers Daily</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
