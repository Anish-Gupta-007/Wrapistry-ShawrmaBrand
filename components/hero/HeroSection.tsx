"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Flame, ArrowRight, Star, Sparkles, ShoppingBag, ChefHat, Plus, Check, Award } from "lucide-react";
import { MagneticButton } from "../ui/MagneticButton";
import { useCart } from "@/context/CartContext";
import { MENU_ITEMS } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

const TOTAL_FRAMES = 386;

const STAGES = [
  {
    id: 0,
    stageBadge: "01 / 05 • BRAND MANIFESTO",
    headlineLine1: "CRAFTED OVER",
    accentWord: "Fire.",
    headlineLine2: "PERFECTED IN THREADS.",
    subtitle: "24-Hour Spiced Marinade • Open Charcoal Spitfire • Hand-Whipped Toum",
    statNumber: "4.9★",
    statLabel: "10,000+ Daily Craft Wraps",
    accentColor: "text-primary",
  },
  {
    id: 1,
    stageBadge: "02 / 05 • 700°F CHARCOAL SPIT",
    headlineLine1: "SEARED OVER",
    accentWord: "Charcoal.",
    headlineLine2: "LOCKING IN SMOKY JUICES.",
    subtitle: "Natural oak coals sear prime ribeye beef & marinated chicken at intense 700°F heat.",
    statNumber: "700°F",
    statLabel: "Open Fire Spit Temperature",
    accentColor: "text-secondary",
  },
  {
    id: 2,
    stageBadge: "03 / 05 • HAND-WHIPPED TOUM",
    headlineLine1: "VELVET GARLIC",
    accentWord: "Silk.",
    headlineLine2: "WHIPPED FRESH EVERY 30 MINS.",
    subtitle: "Zero mayonnaise or artificial emulsifiers. Pure garlic cloves, cold-pressed olive oil, & sea salt.",
    statNumber: "100%",
    statLabel: "Pure EVOO & Raw Garlic",
    accentColor: "text-primary",
  },
  {
    id: 3,
    stageBadge: "04 / 05 • ARTISANAL SAJ BREAD",
    headlineLine1: "DOUBLE-BAKED",
    accentWord: "Craft.",
    headlineLine2: "PAPER-THIN DOMED SAJ.",
    subtitle: "18-hour fermented yeast dough stretched by hand over domed iron Saj fire ovens.",
    statNumber: "18-HR",
    statLabel: "Artisanal Dough Fermentation",
    accentColor: "text-cream",
  },
  {
    id: 4,
    stageBadge: "05 / 05 • THE EMPIRE AWAITS",
    headlineLine1: "EXPERIENCE THE",
    accentWord: "Legend.",
    headlineLine2: "DELIVERED DIRECT TO YOU.",
    subtitle: "Taste the gold standard of Mediterranean craft shawarma. Order online for express fulfillment.",
    statNumber: "15 MINS",
    statLabel: "Average Kitchen Fulfillment",
    accentColor: "text-primary",
  },
];

export const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const sec2Ref = useRef<HTMLDivElement | null>(null);
  const sec3Ref = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);

  const [activeStage, setActiveStage] = useState(0);
  const [heroProgress, setHeroProgress] = useState(0);
  const [transformStyle, setTransformStyle] = useState({
    x: "22vw",
    y: "0px",
    scale: 0.92,
    rotate: "0deg",
    opacity: 1,
  });

  const { openCart, addToCart } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);
  const featuredItems = MENU_ITEMS.filter((item) => item.isChefSpecial).slice(0, 3);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Preload transparent WEBP frames
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(3, "0");
      img.src = `/temp_frames/frame_${paddedIndex}.webp`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === 1) {
          renderFrame(0);
        }
      };
      loadedImages.push(img);
    }
    imagesRef.current = loadedImages;

    function renderFrame(index: number) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = imagesRef.current[index];
      if (!img || !img.complete) return;

      const width = canvas.width;
      const height = canvas.height;
      const imgWidth = img.naturalWidth || img.width;
      const imgHeight = img.naturalHeight || img.height;

      if (!imgWidth || !imgHeight) return;

      ctx.clearRect(0, 0, width, height);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      const scale = Math.min(width / imgWidth, height / imgHeight) * 1.08;
      const drawWidth = imgWidth * scale;
      const drawHeight = imgHeight * scale;
      const offsetX = (width - drawWidth) * 0.5;
      const offsetY = (height - drawHeight) * 0.5;

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }

    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas || !canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * (window.devicePixelRatio || 1);
      canvas.height = rect.height * (window.devicePixelRatio || 1);
      renderFrame(currentFrameRef.current);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // =========================================================================
    // 1. PINNED HERO 3D FRAME SCRUB TRIGGER (SCRUBS ALL 386 FRAMES)
    // =========================================================================
    const HERO_PIN_DISTANCE = 2200;

    const heroST = ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: `+=${HERO_PIN_DISTANCE}`,
      pin: true,
      pinSpacing: true,
      scrub: 0.4,
      onUpdate: (self) => {
        const p = self.progress;
        setHeroProgress(p);

        const targetFrame = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.floor(p * (TOTAL_FRAMES - 1)))
        );
        currentFrameRef.current = targetFrame;
        renderFrame(targetFrame);

        const stageIdx = Math.min(4, Math.floor(p * 5));
        setActiveStage(stageIdx);
      },
    });

    // =========================================================================
    // 2. PINNED SECTION 2 TRIGGER (HOLDS MANIFESTO CARD FOR 1 SCROLL)
    // =========================================================================
    const SEC2_PIN_DISTANCE = 1000;

    const sec2ST = ScrollTrigger.create({
      trigger: sec2Ref.current,
      start: "top top",
      end: `+=${SEC2_PIN_DISTANCE}`,
      pin: true,
      pinSpacing: true,
      scrub: 0.4,
    });

    // =========================================================================
    // 3. PINNED SECTION 3 TRIGGER (REDUCED PIN DISTANCE FOR SMALL DEVICES)
    // =========================================================================
    const isMobileViewport = typeof window !== "undefined" && window.innerWidth < 1024;
    const SEC3_PIN_DISTANCE = isMobileViewport ? 300 : 1000;

    const sec3ST = ScrollTrigger.create({
      trigger: sec3Ref.current,
      start: "top top",
      end: `+=${SEC3_PIN_DISTANCE}`,
      pin: true,
      pinSpacing: true,
      scrub: 0.4,
    });

    // =========================================================================
    // 4. MASTER MOTION CONTROLLER TRIGGER (HERO PIN -> SEC 2 CARD -> SEC 3 CARD MATCHING SCALE)
    // =========================================================================
    const updatePosition = () => {
      const width = window.innerWidth;
      const isDesktop = width >= 1024;
      const isTablet = width >= 640 && width < 1024;
      const scrollY = window.scrollY;

      const heroUnpinY = HERO_PIN_DISTANCE;
      const sec2Top = sec2Ref.current?.offsetTop || (heroUnpinY + window.innerHeight);
      const sec2UnpinY = sec2Top + SEC2_PIN_DISTANCE;
      const sec3Top = sec3Ref.current?.offsetTop || (sec2UnpinY + window.innerHeight);
      const sec3UnpinY = sec3Top + SEC3_PIN_DISTANCE;

      if (scrollY <= heroUnpinY) {
        // STAGE 1: Pinned Hero (Clear margin below buttons & stat box on mobile)
        setTransformStyle({
          x: isDesktop ? "22vw" : "0vw",
          y: isDesktop ? "0px" : isTablet ? "8vh" : "14vh",
          scale: isDesktop ? 0.92 : isTablet ? 0.62 : 0.54,
          rotate: "0deg",
          opacity: 1,
        });
      } else if (scrollY < sec2Top) {
        // TRANSITION 1 -> 2: Pop out of Hero -> Glide to Section 2 Left Card
        const dist = Math.max(1, sec2Top - heroUnpinY);
        const rawP = Math.min(1, Math.max(0, (scrollY - heroUnpinY) / dist));
        const ease = rawP < 0.5 ? 2 * rawP * rawP : 1 - Math.pow(-2 * rawP + 2, 2) / 2;

        const xVal = isDesktop ? 22 - ease * 46.5 : 0;
        const startY = isDesktop ? 0 : isTablet ? 8 : 14;
        const endY = isDesktop ? 0 : isTablet ? -22 : -32;
        const yVal = startY - ease * (startY - endY);

        const startScale = isDesktop ? 0.92 : isTablet ? 0.62 : 0.54;
        const endScale = isDesktop ? 0.70 : isTablet ? 0.44 : 0.36;
        const scaleVal = startScale - ease * (startScale - endScale);

        setTransformStyle({
          x: `${xVal}vw`,
          y: isDesktop ? "0px" : `${yVal}vh`,
          scale: scaleVal,
          rotate: "0deg",
          opacity: 1,
        });
      } else if (scrollY <= sec2UnpinY) {
        // STAGE 2: Pinned Section 2 (Exact same - High orbit ring position)
        setTransformStyle({
          x: isDesktop ? "-24.5vw" : "0vw",
          y: isDesktop ? "0px" : isTablet ? "-22vh" : "-32vh",
          scale: isDesktop ? 0.70 : isTablet ? 0.44 : 0.36,
          rotate: "0deg",
          opacity: 1,
        });
      } else if (scrollY < sec3Top) {
        // TRANSITION 2 -> 3: Pop out of Section 2 -> Glide down into Card 2 Stage
        const dist = Math.max(1, sec3Top - sec2UnpinY);
        const rawP = Math.min(1, Math.max(0, (scrollY - sec2UnpinY) / dist));
        const ease = rawP < 0.5 ? 2 * rawP * rawP : 1 - Math.pow(-2 * rawP + 2, 2) / 2;

        const xVal = isDesktop ? -24.5 + ease * 24.5 : 0;
        const startY = isDesktop ? 0 : isTablet ? -22 : -32;
        const endY = isDesktop ? 0 : isTablet ? 18 : 32;
        const yVal = startY - ease * (startY - endY);

        const startScale = isDesktop ? 0.70 : isTablet ? 0.44 : 0.36;
        const endScale = isDesktop ? 0.30 : isTablet ? 0.20 : 0.16;
        const scaleVal = startScale - ease * (startScale - endScale);
        const rotVal = ease * 3;

        setTransformStyle({
          x: `${xVal}vw`,
          y: isDesktop ? "-55px" : `${yVal}vh`,
          scale: scaleVal,
          rotate: `${rotVal}deg`,
          opacity: 1,
        });
      } else if (scrollY <= sec3UnpinY) {
        // STAGE 3: PINNED SECTION 3 (Fast unpin on mobile, docked cleanly in Card 2)
        setTransformStyle({
          x: "0vw",
          y: isDesktop ? "-55px" : isTablet ? "18vh" : "32vh",
          scale: isDesktop ? 0.30 : isTablet ? 0.20 : 0.16,
          rotate: "3deg",
          opacity: 1,
        });
      } else {
        // STAGE 4: Section 3 Unpinned
        setTransformStyle({
          x: "0vw",
          y: isDesktop ? "-55px" : isTablet ? "18vh" : "32vh",
          scale: isDesktop ? 0.30 : isTablet ? 0.20 : 0.16,
          rotate: "3deg",
          opacity: 0,
        });
      }
    };

    window.addEventListener("scroll", updatePosition);
    updatePosition();

    return () => {
      heroST.kill();
      sec2ST.kill();
      sec3ST.kill();
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", updatePosition);
    };
  }, []);

  const currentStage = STAGES[activeStage];

  const handleQuickAdd = (item: any, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(item, 1, "Medium");
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <div className="relative w-full bg-[#0B0907] select-none z-20">
      {/* Top Scroll Progress Line */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/5 z-50 overflow-hidden pointer-events-none">
        <div
          className="h-full bg-gold-gradient shadow-glow transition-all duration-150"
          style={{ width: `${heroProgress * 100}%` }}
        />
      </div>

      {/* Floating 3D Scrub Badge */}
      <div className="fixed top-6 right-6 z-50 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bg-card/90 backdrop-blur-md border border-white/10 text-[11px] font-mono text-muted shadow-lg pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
        <span>3D SCRUB FRAME:</span>
        <span className="text-primary font-bold">{currentFrameRef.current + 1} / 386</span>
      </div>

      {/* ========================================================================= */}
      {/* SINGLE FLOATING TRAVELLING SHAWARMA CANVAS */}
      {/* ========================================================================= */}
      <div className="fixed inset-0 z-20 pointer-events-none flex items-center justify-center">
        <div
          className="relative w-full max-w-7xl h-full flex items-center justify-center p-4 transition-all duration-75 ease-out"
          style={{
            transform: `translate(${transformStyle.x}, ${transformStyle.y}) scale(${transformStyle.scale}) rotate(${transformStyle.rotate})`,
            opacity: transformStyle.opacity,
          }}
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.92)]"
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: HERO (PINNED FOR 386 FRAMES SCRUBBING) */}
      {/* ========================================================================= */}
      <section
        ref={heroRef}
        className="relative w-full h-screen flex items-center justify-center p-4 sm:p-6 lg:p-12 overflow-hidden"
      >
        {/* Ambient Warm Radial Glow */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-radial from-primary/20 via-secondary/10 to-transparent rounded-full blur-[130px] pointer-events-none z-0" />

        {/* Stage Navigation Dots */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3">
          {STAGES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                window.scrollTo({
                  top: (idx / 4) * 2200,
                  behavior: "smooth",
                });
              }}
              className={`w-2.5 transition-all duration-300 rounded-full ${
                activeStage === idx
                  ? "h-8 bg-primary shadow-glow"
                  : "h-2.5 bg-white/20 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        <div className="relative z-30 w-full max-w-7xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8 pt-28 sm:pt-32 lg:pt-0 h-full">
          {/* Hero Left Content (z-50 guarantees text & buttons sit ABOVE canvas z-20!) */}
          <div className="w-full lg:w-1/2 flex flex-col justify-start lg:justify-center z-50 pointer-events-auto space-y-3 sm:space-y-5">
            <div className="relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bg-card/90 border border-primary/40 text-primary text-[10px] sm:text-xs font-mono tracking-widest uppercase shadow-glow overflow-hidden w-max">
              <Sparkles className="w-3.5 h-3.5 text-primary animate-spin-slow" />
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={currentStage.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentStage.stageBadge}
                </motion.span>
              </AnimatePresence>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            </div>

            <div className="min-h-[85px] sm:min-h-[135px] flex flex-col justify-center overflow-hidden">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={currentStage.id}
                  initial={{ opacity: 0, y: 20, rotateX: 12, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, rotateX: -12, filter: "blur(8px)" }}
                  transition={{ duration: 0.4 }}
                  className="space-y-0.5"
                >
                  <h1 className="font-bebas text-3xl sm:text-5xl lg:text-[56px] xl:text-[62px] text-cream leading-[0.96] tracking-tight drop-shadow-md">
                    {currentStage.headlineLine1}{" "}
                    <span className={`font-playfair italic ${currentStage.accentColor} font-normal px-1 drop-shadow-[0_0_18px_rgba(232,163,61,0.4)]`}>
                      {currentStage.accentWord}
                    </span>
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#F5D061] to-secondary">
                      {currentStage.headlineLine2}
                    </span>
                  </h1>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="min-h-[36px]">
              <AnimatePresence mode="popLayout">
                <motion.p
                  key={currentStage.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-body/90 text-xs sm:text-sm leading-relaxed font-inter font-light max-w-md"
                >
                  {currentStage.subtitle}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="flex flex-row items-center gap-2.5 sm:gap-3 pt-1 sm:pt-2">
              {activeStage === 4 ? (
                <MagneticButton onClick={openCart} variant="primary" size="sm" className="px-4 py-2 text-xs">
                  <ShoppingBag className="w-4 h-4" />
                  ORDER NOW
                </MagneticButton>
              ) : (
                <Link href="/menu">
                  <MagneticButton variant="primary" size="sm" className="px-4 py-2 text-xs">
                    EXPLORE MENU
                    <ArrowRight className="w-4 h-4" />
                  </MagneticButton>
                </Link>
              )}

              <Link href="/about">
                <MagneticButton variant="outline" size="sm" className="px-4 py-2 text-xs">
                  OUR STORY
                </MagneticButton>
              </Link>
            </div>

            <div className="pt-2 sm:pt-4 border-t border-white/10 min-h-[42px]">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={currentStage.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3 text-xs text-muted"
                >
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <Star className="w-3.5 h-3.5 text-primary fill-current animate-pulse" />
                    <span className="font-bebas text-sm sm:text-base text-cream tracking-wide">
                      {currentStage.statNumber}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] sm:text-[11px] text-body/80">{currentStage.statLabel}</span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Hero Right Slot */}
          <div className="w-full lg:w-1/2 h-[35vh] sm:h-[50vh] lg:h-[80vh] flex items-center justify-center relative pointer-events-none" />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: CULINARY MANIFESTO (PINNED FOR 1 SCROLL - SHAWARMA LOCKED IN LEFT CARD) */}
      {/* ========================================================================= */}
      <section
        ref={sec2Ref}
        className="relative w-full min-h-screen lg:h-screen flex items-center justify-center p-4 sm:p-6 lg:p-12 border-t border-white/10 overflow-hidden bg-[#0D0B08] py-16 lg:py-0"
      >
        {/* Radial Background Glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/15 via-secondary/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-20 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center pt-16 sm:pt-20 lg:pt-0">
          {/* Section 2 Left 3D Pedestal Stage Showcase Container */}
          <div className="relative flex flex-col items-center justify-center min-h-[220px] sm:min-h-[320px] lg:min-h-[540px] pointer-events-none mb-2 lg:mb-0">
            {/* 1. Animated Concentric Glowing Orbit Rings & Stage Floor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] sm:w-[340px] sm:h-[340px] lg:w-[420px] lg:h-[420px]">
              {/* Radial Warm Golden Backdrop Glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-radial from-primary/30 via-secondary/10 to-transparent blur-[60px] animate-pulse" />
              
              {/* Outer Rotating Orbit Ring */}
              <div className="absolute inset-0 rounded-full border border-dashed border-primary/35 animate-spin-slow opacity-75" />
              
              {/* Inner Concentric Glass Ring */}
              <div className="absolute inset-6 sm:inset-8 rounded-full border border-white/10 shadow-[0_0_35px_rgba(232,163,61,0.25)]" />
              
              {/* Bottom Pedestal Stage Oval Glow (where 3D roll floats!) */}
              <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 w-[220px] sm:w-[280px] h-[35px] sm:h-[45px] bg-gradient-radial from-primary/50 via-primary/20 to-transparent rounded-full blur-xl opacity-90" />
            </div>

            {/* 2. Floating Luxury Spec Badges (Positioned cleanly around the 3D roll!) */}
            {/* Top Left Floating Spec Badge */}
            <div className="absolute -top-2 left-0 sm:left-4 z-30 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl bg-[#16110C]/90 border border-primary/35 backdrop-blur-md shadow-[0_12px_30px_rgba(0,0,0,0.7)] flex items-center gap-2 animate-bounce-slow">
              <div className="p-1 sm:p-1.5 rounded-xl bg-primary/20 text-primary border border-primary/30">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div>
                <span className="block text-[8px] sm:text-[9px] font-mono text-muted uppercase tracking-wider">HERB MARINADE</span>
                <span className="font-bebas text-xs sm:text-sm text-cream tracking-wide">14 SPICE BLEND</span>
              </div>
            </div>

            {/* Bottom Right Floating Spec Badge */}
            <div className="absolute top-8 right-0 sm:right-4 z-30 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl bg-[#16110C]/90 border border-secondary/35 backdrop-blur-md shadow-[0_12px_30px_rgba(0,0,0,0.7)] flex items-center gap-2 animate-bounce-slow" style={{ animationDelay: "1.2s" }}>
              <div className="p-1 sm:p-1.5 rounded-xl bg-secondary/20 text-secondary border border-secondary/30">
                <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div>
                <span className="block text-[8px] sm:text-[9px] font-mono text-muted uppercase tracking-wider">CHARCOAL SPIT</span>
                <span className="font-bebas text-xs sm:text-sm text-cream tracking-wide">700°F OPEN FIRE</span>
              </div>
            </div>

            {/* Bottom Pedestal Architectural Banner (Positioned cleanly below the pedestal floor) */}
            <div className="relative lg:absolute bottom-0 left-0 lg:left-1/2 lg:-translate-x-1/2 z-30 w-full max-w-sm p-3 sm:p-3.5 rounded-2xl bg-[#16110C]/95 border border-white/15 backdrop-blur-md flex items-center gap-3 shadow-2xl mt-28 sm:mt-36 lg:mt-0">
              <div className="p-2 sm:p-2.5 rounded-xl bg-gold-gradient shrink-0 shadow-glow">
                <ChefHat className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-background" />
              </div>
              <div>
                <h4 className="font-bebas text-sm sm:text-base text-cream tracking-wide leading-tight">
                  MASTER GRILL ARCHITECTURE
                </h4>
                <p className="text-[10px] sm:text-[11px] text-muted font-inter leading-tight">
                  24-hour slow marination in 14 aromatic Mediterranean spices.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2 Right Copy (z-50 guarantees manifesto text sits ABOVE canvas z-20!) */}
          <div className="space-y-3 sm:space-y-5 relative z-50 pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 border border-secondary/40 text-secondary text-[10px] sm:text-xs font-mono tracking-widest uppercase shadow-glow">
              <Flame className="w-3.5 h-3.5 text-secondary animate-pulse" />
              <span>Our Culinary Manifesto</span>
            </div>

            <h2 className="font-bebas text-3xl sm:text-5xl lg:text-6xl xl:text-7xl text-cream tracking-wide leading-none">
              NOT JUST A SHAWARMA<span className="text-primary">.</span>
              <br />
              <span className="font-playfair italic text-primary font-normal text-2.5xl sm:text-4xl lg:text-5xl block mt-1 sm:mt-2 drop-shadow-[0_0_20px_rgba(232,163,61,0.4)]">
                AN OBSESSION WITH FLAVOR.
              </span>
            </h2>

            <p className="text-body/80 text-xs sm:text-base leading-relaxed font-inter font-light">
              At Wrapistry, we threw away shortcut pressers and artificial sauces. We built custom vertical charcoal spits that sear prime ribeye cuts and chicken thighs at 700°F. Combined with double-baked Saj flatbread and garlic toum whipped fresh every 30 minutes, every bite is a symphony of crunch, smoke, and velvet garlic.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/10">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <h4 className="font-bebas text-lg sm:text-2xl text-primary tracking-wide">ZERO SHORTCUTS</h4>
                </div>
                <p className="text-[10px] sm:text-xs text-muted font-inter">100% natural olive oil & fresh herbs.</p>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-secondary" />
                  <h4 className="font-bebas text-lg sm:text-2xl text-secondary tracking-wide">CHARCOAL SEARED</h4>
                </div>
                <p className="text-[10px] sm:text-xs text-muted font-inter">Open fire spit roast caramelization.</p>
              </div>
            </div>

            <div className="pt-2 sm:pt-4">
              <Link href="/about">
                <MagneticButton variant="primary" size="sm" className="px-5 py-2.5 text-xs sm:text-sm">
                  READ OUR FULL STORY
                  <ArrowRight className="w-4 h-4" />
                </MagneticButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: CHEF'S SIGNATURE ROLLS (FITS PERFECTLY IN 100VH WITH EQUALIZED ROLL SIZES) */}
      {/* ========================================================================= */}
      <section
        ref={sec3Ref}
        className="relative w-full min-h-screen lg:h-screen lg:min-h-[680px] lg:max-h-[920px] flex flex-col justify-center p-4 sm:p-6 lg:px-12 border-t border-white/10 overflow-hidden bg-[#0A0806]"
      >
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] bg-primary/10 rounded-full blur-[180px] pointer-events-none" />

        <div className="relative w-full max-w-7xl mx-auto flex flex-col justify-center h-full pt-16 sm:pt-20 lg:pt-10 pb-6">
          {/* Header (z-50 guarantees text sits ABOVE floating canvas z-40!) */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 pt-4 relative z-50">
            <div className="space-y-1.5 relative z-50">
              <span className="text-xs font-mono text-primary uppercase tracking-widest flex items-center gap-2 font-bold">
                <Award className="w-4 h-4 text-primary animate-pulse" />
                Masterpiece Selection
              </span>
              <h2 className="font-bebas text-3xl sm:text-5xl lg:text-6xl text-cream tracking-wide leading-none relative z-50">
                THE CHEF'S SIGNATURE ROLLS
                <span className="font-playfair italic text-primary font-normal text-2.5xl sm:text-4xl lg:text-5xl ml-3 drop-shadow-[0_0_25px_rgba(232,163,61,0.6)] relative z-50 inline-block">
                  Showcase.
                </span>
              </h2>
            </div>

            <Link href="/menu" className="relative z-50">
              <MagneticButton variant="outline" size="sm">
                VIEW FULL MENU ({MENU_ITEMS.length} ITEMS)
                <ArrowRight className="w-3.5 h-3.5" />
              </MagneticButton>
            </Link>
          </div>

          {/* 3 Showcase Cards Grid (z-20 sits BELOW floating canvas z-40!) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-6 pt-12 md:pt-6 relative z-20">
            {featuredItems.map((item, idx) => {
              const isMiddle = idx === 1;

              return (
                <div
                  key={item.id}
                  className="relative bg-gradient-to-b from-[#18130E] to-[#0D0A07] rounded-2xl p-5 sm:p-6 border border-white/10 hover:border-primary/60 shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:shadow-[0_25px_60px_rgba(232,163,61,0.22)] flex flex-col justify-between group interactive transition-all duration-500 z-10"
                >
                  {/* Inner Warm Glow Halo */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-36 bg-primary/10 rounded-full blur-2xl pointer-events-none group-hover:bg-primary/20 transition-all duration-500" />

                  {/* Top Levitating 3D Stage (Identical Roll Sizes & Tilted Presentation across all 3 cards!) */}
                  <div className="relative h-36 -mt-20 mb-3 flex items-center justify-center">
                    {/* Pedestal Stage Glow Oval */}
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-28 h-5 bg-gradient-radial from-primary/40 via-primary/10 to-transparent rounded-full blur-md opacity-80 group-hover:opacity-100 group-hover:w-32 transition-all duration-500" />

                    {!isMiddle ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className={`w-36 h-36 object-contain filter drop-shadow-[0_18px_30px_rgba(0,0,0,0.92)] group-hover:scale-110 group-hover:-translate-y-2 group-hover:rotate-0 transition-all duration-500 ease-out z-10 ${
                          idx === 0 ? "-rotate-6" : "rotate-6"
                        }`}
                      />
                    ) : (
                      // Middle Card Product Image (locks in place permanently once Section 3 unpins or docks!)
                      <img
                        src="/temp_frames/frame_386.webp"
                        alt={item.name}
                        className={`w-36 h-36 object-contain filter drop-shadow-[0_18px_30px_rgba(0,0,0,0.92)] rotate-3 group-hover:scale-110 group-hover:-translate-y-2 group-hover:rotate-0 transition-all duration-500 ease-out z-10 ${
                          transformStyle.opacity === 0 ? "opacity-100 scale-100" : "opacity-0 scale-90"
                        }`}
                      />
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="space-y-2.5 text-center relative z-10">
                    <div className="flex justify-center">
                      <span className="px-3 py-0.5 rounded-full bg-primary/15 border border-primary/40 text-primary text-[9px] font-mono font-bold uppercase tracking-widest shadow-glow">
                        {item.isVeg ? "100% VEG ROLL" : item.isChefSpecial ? "CHEF'S SIGNATURE" : "CRAFT MEAT ROLL"}
                      </span>
                    </div>

                    <h3 className="font-bebas text-2xl sm:text-3xl text-cream tracking-wide group-hover:text-primary transition-colors duration-300 drop-shadow-md">
                      {item.name}
                    </h3>

                    <p className="text-muted text-xs leading-relaxed font-inter font-light line-clamp-2 max-w-xs mx-auto">
                      {item.description}
                    </p>
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between relative z-10">
                    <div>
                      <span className="block text-[9px] font-mono text-muted uppercase tracking-wider">Price</span>
                      <span className="font-bebas text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#F5D061] to-cream font-bold">
                        {formatCurrency(item.price)}
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleQuickAdd(item, e)}
                      className={`px-4 py-2 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 transition-all duration-300 ${
                        addedId === item.id
                          ? "bg-emerald-500 text-background shadow-glow scale-105"
                          : "bg-primary/20 text-primary border border-primary/40 hover:bg-primary hover:text-background hover:shadow-glow hover:scale-105"
                      }`}
                    >
                      {addedId === item.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> ADDED
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" /> ORDER NOW
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
