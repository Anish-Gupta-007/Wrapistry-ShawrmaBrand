"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Star, Quote, Award, Sparkles, Flame, CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";
import { REVIEWS } from "@/lib/data";

const CRITIC_METADATA = [
  {
    id: "r-1",
    tag: "MICHELIN GUIDE 2026",
    tagColor: "bg-amber-500/20 text-amber-400 border-amber-500/40",
    favorite: "Emperor Toum Chicken Roll",
    stars: 5,
    quoteHighlight: "silky perfection & unprecedented charred smoke",
  },
  {
    id: "r-2",
    tag: "FOOD & WINE EDITORS' PICK",
    tagColor: "bg-rose-500/20 text-rose-400 border-rose-500/40",
    favorite: "Charcoal Lamb Kafta & Saj Bread",
    stars: 5,
    quoteHighlight: "pure ecstasy & the standard for modern craft",
  },
  {
    id: "r-3",
    tag: "EATER LA TOP CHOICE",
    tagColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
    favorite: "Fireburst Beef Ribeye Wrap",
    stars: 5,
    quoteHighlight: "stands shoulder-to-shoulder with the world's best",
  },
];

export const TestimonialSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const calendarFoldRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tiltStyle, setTiltStyle] = useState<{ [key: number]: { rotateX: number; rotateY: number; mouseX: number; mouseY: number } }>({});

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const calendarElement = calendarFoldRef.current;
    if (!calendarElement) return;

    // 3D CALENDAR FOLD / PAGE SHIFT REVEAL SCRUB
    // Initial 3D State: folded backward from the top (-65deg rotateX, translateZ -180px)
    gsap.set(calendarElement, {
      rotateX: -65,
      rotateY: 0,
      translateZ: -180,
      scale: 0.88,
      opacity: 0.1,
      transformOrigin: "top center",
      perspective: 1200,
    });

    const PIN_DISTANCE = 1000;

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: `+=${PIN_DISTANCE}`,
      pin: true,
      pinSpacing: true,
      scrub: 0.4,
      onUpdate: (self) => {
        const p = self.progress;
        // Unfold 3D Calendar over first 40% of scroll, then hold steady for 1 scroll
        const unfoldProgress = Math.min(1, p / 0.4);
        const ease = unfoldProgress < 0.5 ? 2 * unfoldProgress * unfoldProgress : 1 - Math.pow(-2 * unfoldProgress + 2, 2) / 2;

        gsap.to(calendarElement, {
          rotateX: -65 * (1 - ease),
          translateZ: -180 * (1 - ease),
          scale: 0.88 + 0.12 * ease,
          opacity: 0.1 + 0.9 * ease,
          duration: 0.1,
          overwrite: "auto",
          ease: "power1.out",
        });
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * 12; // max 12 deg tilt
    const rotateY = ((x - centerX) / centerX) * 12;

    setTiltStyle((prev) => ({
      ...prev,
      [idx]: {
        rotateX,
        rotateY,
        mouseX: (x / rect.width) * 100,
        mouseY: (y / rect.height) * 100,
      },
    }));
  };

  const handleMouseLeave = (idx: number) => {
    setTiltStyle((prev) => ({
      ...prev,
      [idx]: { rotateX: 0, rotateY: 0, mouseX: 50, mouseY: 50 },
    }));
  };

  const reviewsWithMeta = REVIEWS.map((review, idx) => ({
    ...review,
    meta: CRITIC_METADATA[idx] || CRITIC_METADATA[0],
  }));

  const filteredReviews = reviewsWithMeta.filter((r) => {
    if (activeFilter === "ALL") return true;
    return r.meta.tag.includes(activeFilter);
  });

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen py-12 sm:py-20 lg:py-0 flex flex-col justify-center p-4 sm:p-6 lg:px-12 border-t border-white/10 overflow-hidden bg-[#0A0806] select-none z-20"
      style={{ perspective: "1400px" }}
    >
      {/* Ambient Warm Glow & Floating Particle Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-gradient-radial from-primary/15 via-secondary/5 to-transparent rounded-full blur-[190px] pointer-events-none" />

      {/* 3D CALENDAR FOLD DECK CONTAINER */}
      <div
        ref={calendarFoldRef}
        className="relative z-20 w-full max-w-7xl mx-auto flex flex-col justify-center h-full pt-8 pb-6 transition-all duration-300 ease-out"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 pt-2">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/35 text-primary text-[10px] sm:text-xs font-mono tracking-widest uppercase shadow-glow">
              <Award className="w-3.5 h-3.5 text-primary animate-pulse" />
              <span>Acclaimed By World Food Critics</span>
            </div>

            <h2 className="font-bebas text-4xl sm:text-6xl lg:text-7xl text-cream tracking-wide leading-none">
              WHAT THE WORLD IS SAYING
              <span className="font-playfair italic text-primary font-normal text-3xl sm:text-5xl lg:text-6xl ml-3 drop-shadow-[0_0_25px_rgba(232,163,61,0.5)]">
                Ecstasy.
              </span>
            </h2>
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {["ALL", "MICHELIN", "FOOD & WINE", "EATER LA"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-primary text-background shadow-glow scale-105"
                    : "bg-white/5 text-muted hover:text-cream border border-white/10 hover:bg-white/10"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <AnimatePresence mode="popLayout">
            {filteredReviews.map((r, idx) => {
              const cardTilt = tiltStyle[idx] || { rotateX: 0, rotateY: 0, mouseX: 50, mouseY: 50 };

              return (
                <motion.div
                  key={r.id}
                  layout
                  initial={{ opacity: 0, y: 30, rotateX: 20 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  onMouseMove={(e) => handleMouseMove(e, idx)}
                  onMouseLeave={() => handleMouseLeave(idx)}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  className="relative rounded-3xl bg-gradient-to-b from-[#1A140F] via-[#120E0A] to-[#0A0805] p-6 sm:p-7 border border-white/10 hover:border-primary/60 shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:shadow-[0_30px_70px_rgba(232,163,61,0.25)] flex flex-col justify-between group interactive transition-all duration-300 cursor-pointer overflow-hidden"
                  style={{
                    transform: `rotateX(${cardTilt.rotateX}deg) rotateY(${cardTilt.rotateY}deg)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Dynamic Light Sheen Following Cursor */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(400px circle at ${cardTilt.mouseX}% ${cardTilt.mouseY}%, rgba(232, 163, 61, 0.18), transparent 80%)`,
                    }}
                  />

                  {/* Warm Glowing Halo */}
                  <div className="absolute top-0 right-0 w-36 h-36 bg-primary/10 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/25 transition-all duration-500" />

                  {/* Background 3D Quote Watermark */}
                  <Quote className="absolute top-4 right-4 w-20 h-20 text-white/[0.03] group-hover:text-primary/10 transition-colors duration-500 pointer-events-none" />

                  {/* Top Card Badge & Rating */}
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-mono font-bold tracking-widest border uppercase shadow-sm ${r.meta.tagColor}`}>
                        {r.meta.tag}
                      </span>

                      {/* 5-Star Rating */}
                      <div className="flex items-center gap-1">
                        {[...Array(r.meta.stars)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary drop-shadow-[0_0_8px_rgba(232,163,61,0.6)] animate-pulse" style={{ animationDelay: `${i * 0.15}s` }} />
                        ))}
                      </div>
                    </div>

                    {/* Review Content */}
                    <p className="text-sm sm:text-base text-cream/90 leading-relaxed font-playfair italic relative z-10">
                      "{r.content}"
                    </p>
                  </div>

                  {/* Favorite Dish Spec & Author Footer */}
                  <div className="relative z-10 pt-5 mt-6 border-t border-white/10 space-y-4">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-primary uppercase tracking-wider">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span className="truncate">CRITIC RECOMMENDATION: {r.meta.favorite}</span>
                    </div>

                    <div className="flex items-center gap-3.5">
                      <div className="relative shrink-0">
                        <img
                          src={r.avatar}
                          alt={r.author}
                          className="w-11 h-11 rounded-full object-cover border-2 border-primary/50 group-hover:border-primary group-hover:scale-105 transition-all duration-300 shadow-md"
                        />
                        <div className="absolute -bottom-0.5 -right-0.5 p-0.5 rounded-full bg-primary text-background shadow-glow">
                          <Sparkles className="w-2.5 h-2.5" />
                        </div>
                      </div>

                      <div className="overflow-hidden">
                        <h4 className="font-bebas text-xl text-cream tracking-wide group-hover:text-primary transition-colors leading-tight">
                          {r.author}
                        </h4>
                        <p className="text-xs text-muted font-mono truncate">{r.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom Micro Footnote Bar */}
        <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-muted font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>VERIFIED INDEPENDENT CRITIC REVIEWS</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-cream/70">
            <span>MICHELIN 2026</span>
            <span>•</span>
            <span>FOOD & WINE</span>
            <span>•</span>
            <span>EATER LA</span>
          </div>
        </div>
      </div>
    </section>
  );
};
