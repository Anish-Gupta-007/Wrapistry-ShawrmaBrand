"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Instagram, Heart, MessageCircle, Share2, ChevronLeft, ChevronRight, Sparkles, ExternalLink, X, Flame } from "lucide-react";
import { GALLERY_IMAGES } from "@/lib/data";

const EXTENDED_GALLERY = [
  ...GALLERY_IMAGES,
  {
    id: "g-7",
    url: "/chicken_shawarma_final.png",
    title: "Emperor Toum Craft Wrap",
    tag: "#ChefSignature",
    likes: "4.8k",
    comments: "342",
  },
  {
    id: "g-8",
    url: "/tofu_shawarma_final.png",
    title: "Truffle Halloumi & Mushroom",
    tag: "#CraftVeggie",
    likes: "3.9k",
    comments: "219",
  },
].map((item, index) => ({
  ...item,
  likes: (item as any).likes || `${(2.1 + (index * 0.7) % 3.4).toFixed(1)}k`,
  comments: (item as any).comments || `${140 + index * 38}`,
}));

export const Instagram3DGallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const arcDeckRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(2); // Start centered
  const [selectedImage, setSelectedImage] = useState<typeof EXTENDED_GALLERY[0] | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [dragStartX, setDragStartX] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const deckElement = arcDeckRef.current;
    if (!deckElement) return;

    // Initial 3D State for Scroll Reveal
    gsap.set(deckElement, {
      rotateX: 45,
      translateZ: -250,
      scale: 0.82,
      opacity: 0.1,
      transformOrigin: "center center",
      perspective: 1400,
    });

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 85%",
      end: "top 25%",
      scrub: 0.6,
      onUpdate: (self) => {
        const p = self.progress;
        gsap.to(deckElement, {
          rotateX: 45 * (1 - p),
          translateZ: -250 * (1 - p),
          scale: 0.82 + 0.18 * p,
          opacity: 0.1 + 0.9 * p,
          duration: 0.1,
          overwrite: "auto",
          ease: "power2.out",
        });
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  // Auto Rotation Timer
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % EXTENDED_GALLERY.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? EXTENDED_GALLERY.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % EXTENDED_GALLERY.length);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStartX(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (dragStartX === null) return;
    const diff = e.clientX - dragStartX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handlePrev();
      else handleNext();
    }
    setDragStartX(null);
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[720px] max-h-[960px] flex flex-col justify-center p-6 lg:px-12 border-t border-white/10 overflow-hidden bg-[#0A0806] select-none z-20"
      style={{ perspective: "1500px" }}
    >
      {/* Ambient Warm Radial Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-gradient-radial from-secondary/15 via-primary/5 to-transparent rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col justify-center h-full pt-6 pb-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 pt-2">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 border border-secondary/40 text-secondary text-[10px] sm:text-xs font-mono tracking-widest uppercase shadow-glow">
              <Instagram className="w-3.5 h-3.5 text-secondary animate-pulse" />
              <span>#WrapistryCraft • 3D Gallery Arc</span>
            </div>

            <h2 className="font-bebas text-4xl sm:text-6xl lg:text-7xl text-cream tracking-wide leading-none">
              FOLLOW THE FLAME ON INSTAGRAM
              <span className="font-playfair italic text-secondary font-normal text-3xl sm:text-5xl lg:text-6xl ml-3 drop-shadow-[0_0_25px_rgba(242,100,25,0.5)]">
                Obsession.
              </span>
            </h2>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-cream hover:bg-secondary hover:text-background hover:shadow-glow transition-all duration-300"
              aria-label="Previous 3D Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-cream hover:bg-secondary hover:text-background hover:shadow-glow transition-all duration-300"
              aria-label="Next 3D Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3D CURVED CYLINDER ARC GALLERY STAGE WITH FLOOR PEDESTAL */}
        <div
          ref={arcDeckRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          className="relative h-[340px] sm:h-[400px] w-full flex items-center justify-center cursor-grab active:cursor-grabbing"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Animated 3D Stage Floor Pedestal (under active center card!) */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[320px] sm:w-[400px] h-[60px] pointer-events-none z-0">
            {/* Radial Warm Glow Floor Oval */}
            <div className="absolute inset-0 bg-gradient-radial from-secondary/45 via-primary/20 to-transparent rounded-full blur-xl opacity-90 animate-pulse" />
            {/* Rotating Orbit Floor Ring */}
            <div className="absolute inset-2 rounded-full border border-dashed border-secondary/40 animate-spin-slow opacity-65" />
          </div>

          {EXTENDED_GALLERY.map((item, idx) => {
            const diff = idx - activeIndex;
            const absDiff = Math.abs(diff);

            // Spacious 3D Curved Arc Transforms (Center pops forward, sides curve deep into XYZ space with responsive spacing!)
            const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
            const cardSpacing = isMobile ? 160 : 270;
            const xVal = diff * cardSpacing; // Responsive spacing eliminates all mobile overflow!
            const zVal = -absDiff * (isMobile ? 130 : 190) + (diff === 0 ? 80 : 0); // Deep Z-axis separation
            const rotY = diff * -25; // 25-degree cylinder curvature angle
            const scaleVal = Math.max(0.60, 1 - absDiff * 0.16);
            const opacityVal = Math.max(0, 1 - absDiff * 0.32);
            const zIndexVal = 100 - absDiff * 10;
            const isCenter = diff === 0;

            if (absDiff > 2) return null; // Render 5 perfectly spaced items on screen

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (isCenter) setSelectedImage(item);
                  else setActiveIndex(idx);
                }}
                className="absolute w-[220px] sm:w-[260px] h-[290px] sm:h-[340px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#1E1711] via-[#120E0A] to-[#0A0807] border border-white/15 shadow-[0_25px_65px_rgba(0,0,0,0.92)] transition-all duration-300 ease-out group flex flex-col justify-between"
                style={{
                  transform: `translate3d(${xVal}px, 0px, ${zVal}px) rotateY(${rotY}deg) scale(${scaleVal})`,
                  opacity: opacityVal,
                  zIndex: zIndexVal,
                  transformStyle: "preserve-3d",
                  borderColor: isCenter ? "rgba(242, 100, 25, 0.85)" : "rgba(255, 255, 255, 0.12)",
                }}
              >
                {/* Image */}
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

                  {/* Active Neon Glow Ring */}
                  {isCenter && (
                    <div className="absolute inset-0 border-2 border-secondary rounded-3xl shadow-[0_0_35px_rgba(242,100,25,0.6)] pointer-events-none" />
                  )}

                  {/* Instagram Tag Overlay */}
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-background/85 backdrop-blur-md border border-white/15 text-[10px] font-mono text-cream font-bold tracking-wider shadow-md">
                    {item.tag}
                  </div>

                  {/* Hover Quick Action */}
                  <div className="absolute inset-0 z-20 bg-background/75 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center space-y-3">
                    <div className="p-3 rounded-full bg-secondary text-background shadow-glow scale-90 group-hover:scale-100 transition-transform duration-300">
                      <ExternalLink className="w-5 h-5" />
                    </div>
                    <span className="font-bebas text-lg text-cream tracking-wide">{item.title}</span>
                    <span className="text-[10px] font-mono text-secondary font-bold">CLICK FOR 3D LIGHTBOX</span>
                  </div>

                  {/* Bottom Stats Footer */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-cream font-inter">
                    <div>
                      <h4 className="font-bebas text-base sm:text-lg leading-tight tracking-wide drop-shadow-md">{item.title}</h4>
                      <p className="text-[10px] font-mono text-muted">{item.tag}</p>
                    </div>

                    <div className="flex items-center gap-2.5 text-xs text-cream/90 font-mono">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5 text-secondary fill-secondary" />
                        {item.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3.5 h-3.5 text-primary" />
                        {item.comments}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Arc Indicator Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {EXTENDED_GALLERY.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-2 transition-all duration-300 rounded-full ${
                activeIndex === i
                  ? "w-8 bg-secondary shadow-glow"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* FULL-SCREEN 3D LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.85, rotateX: 20, opacity: 0 }}
              animate={{ scale: 1, rotateX: 0, opacity: 1 }}
              exit={{ scale: 0.85, rotateX: -20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-gradient-to-b from-[#1C1611] to-[#0E0A07] rounded-3xl border border-secondary/40 shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden grid grid-cols-1 md:grid-cols-2"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-30 p-2 rounded-full bg-background/80 border border-white/20 text-cream hover:bg-secondary hover:text-background transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Lightbox Image */}
              <div className="relative aspect-square md:aspect-auto h-full min-h-[320px] overflow-hidden">
                <img src={selectedImage.url} alt={selectedImage.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>

              {/* Lightbox Info */}
              <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-secondary/20 text-secondary border border-secondary/30">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-xs font-mono text-secondary font-bold">@wrapistrycraft</span>
                      <span className="text-[10px] text-muted font-mono">OFFICIAL INSTAGRAM FEATURE</span>
                    </div>
                  </div>

                  <h3 className="font-bebas text-3xl sm:text-4xl text-cream tracking-wide">{selectedImage.title}</h3>
                  <p className="text-xs sm:text-sm text-body/80 leading-relaxed font-inter font-light">
                    Hand-crafted every single day at 700°F using 14-spice marinated meats, fresh double-baked Saj flatbread, and hand-whipped garlic toum.
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between text-sm font-mono text-cream">
                    <span className="flex items-center gap-2 text-secondary">
                      <Heart className="w-4 h-4 fill-secondary" />
                      {selectedImage.likes} Likes
                    </span>
                    <span className="flex items-center gap-2 text-primary">
                      <MessageCircle className="w-4 h-4" />
                      {selectedImage.comments} Comments
                    </span>
                  </div>

                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-2xl bg-secondary text-background font-mono font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-glow hover:bg-secondary/90 transition-all"
                  >
                    <span>VIEW ON INSTAGRAM</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
