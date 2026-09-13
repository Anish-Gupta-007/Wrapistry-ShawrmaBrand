"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Flame, ArrowRight, ChefHat, Sparkles } from "lucide-react";
import { MagneticButton } from "../ui/MagneticButton";

export const ManifestoSection: React.FC = () => {
  return (
    <section className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#0F0C09] border-t border-white/10 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/15 via-secondary/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Card with Craft Shawarma Render */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl overflow-hidden bg-[#18120D]/90 border border-primary/20 p-6 sm:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.8)] group"
          >
            {/* Ambient inner glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-primary/20 rounded-full blur-[90px] pointer-events-none" />

            <div className="relative aspect-[4/5] w-full flex items-center justify-center">
              <img
                src="/temp_frames/frame_386.webp"
                alt="Wrapistry Signature Craft Shawarma"
                className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>

            {/* Bottom Glass Badge Overlay */}
            <div className="relative mt-6 p-4 rounded-2xl bg-bg-card/90 backdrop-blur-md border border-white/10 flex items-center gap-4 shadow-xl">
              <div className="p-3 rounded-xl bg-gold-gradient shrink-0">
                <ChefHat className="w-5 h-5 text-background" />
              </div>
              <div>
                <h4 className="font-bebas text-lg sm:text-xl text-cream tracking-wide">
                  MASTER GRILL ARCHITECTURE
                </h4>
                <p className="text-xs text-muted font-inter leading-tight">
                  24-hour slow marination in 14 aromatic Mediterranean herbs.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Culinary Manifesto Typography & Copy */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            {/* Badge Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/15 border border-secondary/40 text-secondary text-xs font-mono tracking-widest uppercase shadow-glow">
              <Flame className="w-3.5 h-3.5 text-secondary animate-pulse" />
              <span>Our Culinary Manifesto</span>
            </div>

            {/* Display Headline */}
            <h2 className="font-bebas text-4xl sm:text-6xl lg:text-6xl xl:text-7xl text-cream tracking-wide leading-none">
              NOT JUST A SHAWARMA<span className="text-primary">.</span>
              <br />
              <span className="font-playfair italic text-primary font-normal text-3xl sm:text-5xl lg:text-5xl block mt-2 drop-shadow-[0_0_20px_rgba(232,163,61,0.4)]">
                AN OBSESSION WITH FLAVOR.
              </span>
            </h2>

            {/* Subtitle / Paragraph */}
            <p className="text-body/80 text-sm sm:text-base leading-relaxed font-inter font-light">
              At Wrapistry, we threw away shortcut pressers and artificial sauces. We built custom vertical charcoal spits that sear prime ribeye cuts and chicken thighs at 700°F. Combined with double-baked Saj flatbread and garlic toum whipped fresh every 30 minutes, every bite is a symphony of crunch, smoke, and velvet garlic.
            </p>

            {/* Stat Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <h4 className="font-bebas text-2xl text-primary tracking-wide">ZERO SHORTCUTS</h4>
                </div>
                <p className="text-xs text-muted font-inter">100% natural virgin olive oil & fresh herbs only.</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-secondary" />
                  <h4 className="font-bebas text-2xl text-secondary tracking-wide">CHARCOAL SEARED</h4>
                </div>
                <p className="text-xs text-muted font-inter">Open fire spit roast for authentic caramelization.</p>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-4">
              <Link href="/about">
                <MagneticButton variant="primary" size="lg">
                  READ OUR FULL STORY
                  <ArrowRight className="w-5 h-5" />
                </MagneticButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
