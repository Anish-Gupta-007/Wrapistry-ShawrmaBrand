"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { HeroSection } from "@/components/hero/HeroSection";
import { TestimonialSection } from "@/components/testimonials/TestimonialSection";
import { Instagram3DGallery } from "@/components/gallery/Instagram3DGallery";
import { Counter } from "@/components/ui/Counter";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { REVIEWS, GALLERY_IMAGES } from "@/lib/data";

export default function HomePage() {
  return (
    <div className="relative bg-background text-body overflow-x-hidden">
      {/* 1, 2 & 3. UNIFIED FLOATING PRODUCT EXPERIENCE (HERO 3D SCRUB -> SECTION 2 MANIFESTO CARD -> SECTION 3 MIDDLE SIGNATURE ROLL CARD) */}
      <HeroSection />

      {/* 4. ANIMATED STATS COUNTER STRIP */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-background via-bg-surface to-background border-y border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="p-6 space-y-2 border-r border-white/5 last:border-0">
            <div className="text-4xl sm:text-6xl text-primary font-bebas">
              <Counter end={500} suffix="K+" />
            </div>
            <p className="text-xs uppercase tracking-widest text-muted font-mono">Wraps Hand-Rolled</p>
          </div>

          <div className="p-6 space-y-2 border-r border-white/5 last:border-0">
            <div className="text-4xl sm:text-6xl text-secondary font-bebas">
              <Counter end={14} suffix=" HERBS" />
            </div>
            <p className="text-xs uppercase tracking-widest text-muted font-mono">Secret Marinade Formula</p>
          </div>

          <div className="p-6 space-y-2 border-r border-white/5 last:border-0">
            <div className="text-4xl sm:text-6xl text-cream font-bebas">
              <Counter end={4.9} decimals={1} suffix="★" />
            </div>
            <p className="text-xs uppercase tracking-widest text-muted font-mono">Average Customer Rating</p>
          </div>

          <div className="p-6 space-y-2">
            <div className="text-4xl sm:text-6xl text-primary font-bebas">
              <Counter end={15} suffix=" MINS" />
            </div>
            <p className="text-xs uppercase tracking-widest text-muted font-mono">Average Kitchen Prep Time</p>
          </div>
        </div>
      </section>

      {/* 5. CRITIC REVIEWS / TESTIMONIALS (100VH 3D CALENDAR FOLD GSAP REVEAL) */}
      <TestimonialSection />

      {/* 6. INSTAGRAM MEDIA GALLERY (3D CURVED CYLINDER ARC STAGE) */}
      <Instagram3DGallery />

      {/* 7. HIGH-IMPACT BOTTOM CTA BANNER */}
      <section className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,163,61,0.12)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <h2 className="font-bebas text-5xl sm:text-8xl text-cream tracking-tight leading-none">
            READY TO EXPERIENCE<br />
            <span className="text-transparent bg-clip-text bg-gold-gradient">
              THE ART OF SHAWARMA?
            </span>
          </h2>

          <p className="text-muted text-base max-w-xl mx-auto font-inter font-light">
            Order online now for direct pickup or instant delivery, or visit our nearest craft kitchen location.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link href="/menu">
              <MagneticButton variant="primary" size="lg">
                ORDER ONLINE NOW
                <ArrowRight className="w-5 h-5" />
              </MagneticButton>
            </Link>

            <Link href="/locations">
              <MagneticButton variant="outline" size="lg">
                FIND NEAREST LOCATION
              </MagneticButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
