"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Sparkles } from "lucide-react";

interface EmberParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  vx: number;
  vy: number;
  color: string;
}

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState<EmberParticle[]>([]);
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>([]);

  const lastMousePos = useRef({ x: -100, y: -100, time: Date.now() });

  useEffect(() => {
    // Activate cursor immediately on desktop / laptop devices
    if (typeof window !== "undefined") {
      const isTouchOnly = window.matchMedia("(pointer: coarse)").matches && !window.matchMedia("(pointer: fine)").matches;
      if (!isTouchOnly) {
        setIsVisible(true);
        document.body.classList.add("custom-cursor-active");
      }
    }

    let particleId = 0;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;

      // Always activate custom cursor on any mouse movement
      setIsVisible(true);
      if (!document.body.classList.contains("custom-cursor-active")) {
        document.body.classList.add("custom-cursor-active");
      }

      const now = Date.now();
      const dt = Math.max(1, now - lastMousePos.current.time);

      const vx = (x - lastMousePos.current.x) / dt;
      const vy = (y - lastMousePos.current.y) / dt;

      setVelocity({ x: vx * 15, y: vy * 15 });
      setMousePosition({ x, y });

      lastMousePos.current = { x, y, time: now };

      // Drifting bright neon ember particles behind the Shawarma wrap
      if (Math.random() > 0.3) {
        const colors = ["#FFD700", "#FF6B00", "#FF0055", "#00FF87", "#FFFFFF"];
        setParticles((prev) => [
          ...prev.slice(-18),
          {
            id: ++particleId,
            x: x + (Math.random() - 0.5) * 8,
            y: y + (Math.random() - 0.5) * 8,
            size: Math.random() * 4.5 + 2,
            opacity: 0.95,
            vx: -vx * 0.2 + (Math.random() - 0.5) * 1.2,
            vy: -Math.random() * 2 - 0.6,
            color: colors[Math.floor(Math.random() * colors.length)],
          },
        ]);
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      setIsMouseDown(true);
      setClicks((prev) => [...prev.slice(-4), { id: Date.now(), x: e.clientX, y: e.clientY }]);
    };

    const onMouseUp = () => {
      setIsMouseDown(false);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const button = target.closest("button") || (target.tagName === "BUTTON" ? target : null);
      const link = target.closest("a") || (target.tagName === "A" ? target : null);
      const interactive = target.closest(".interactive") || target.closest(".group");

      if (button) {
        setIsHovered(true);
        setHoverText(button.getAttribute("data-cursor-text") || "CRAFT");
      } else if (link) {
        setIsHovered(true);
        setHoverText(link.getAttribute("data-cursor-text") || "EXPLORE");
      } else if (interactive) {
        setIsHovered(true);
        setHoverText("TASTE");
      } else {
        setIsHovered(false);
        setHoverText("");
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseover", onMouseOver);

    // Particle update animation loop
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            opacity: p.opacity - 0.04,
            size: Math.max(0, p.size - 0.08),
          }))
          .filter((p) => p.opacity > 0)
      );
    }, 30);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseover", onMouseOver);
      document.body.classList.remove("custom-cursor-active");
      clearInterval(interval);
    };
  }, []);

  if (!isVisible) return null;

  // Calculate tilt angle based on mouse velocity X (clamped between -25deg and 25deg)
  const tiltAngle = Math.max(-25, Math.min(25, velocity.x * 0.8));
  const squeezeY = Math.max(0.85, Math.min(1.15, 1 + velocity.y * 0.01));

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none">
      {/* Dynamic Style to hide default cursor when Shawarma cursor is active */}
      <style jsx global>{`
        .custom-cursor-active,
        .custom-cursor-active *,
        .custom-cursor-active a,
        .custom-cursor-active button,
        .custom-cursor-active input {
          cursor: none !important;
        }
      `}</style>

      {/* Drifting Fire & Garlic Drip Ember Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full shadow-[0_0_10px_currentColor]"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            backgroundColor: p.color,
            color: p.color,
          }}
        />
      ))}

      {/* Click Shockwave Sizzle Burst */}
      {clicks.map((c) => (
        <motion.div
          key={c.id}
          className="absolute rounded-full border-2 border-yellow-300 shadow-[0_0_35px_#FFD700]"
          initial={{ left: c.x, top: c.y, width: 0, height: 0, opacity: 1, x: "-50%", y: "-50%" }}
          animate={{ width: 90, height: 90, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onAnimationComplete={() => setClicks((prev) => prev.filter((item) => item.id !== c.id))}
        />
      ))}

      {/* Custom Shawarma Wrap Visual Icon Pointer (No Outer Back Circle) */}
      <motion.div
        className="absolute pointer-events-none z-10 filter drop-shadow-[0_4px_16px_rgba(255,107,0,0.85)] drop-shadow-[0_0_8px_rgba(255,215,0,0.7)]"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          translateX: "-30%",
          translateY: "-30%",
        }}
        animate={{
          rotate: tiltAngle,
          scale: isMouseDown ? 1.15 : isHovered ? 1.1 : 0.92,
          scaleY: squeezeY,
        }}
        transition={{ type: "spring", stiffness: 450, damping: 22 }}
      >
        {/* Detailed Highlighted Vector SVG Shawarma Roll Icon */}
        <svg
          width="32"
          height="40"
          viewBox="0 0 38 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transform -rotate-12 transition-transform duration-150"
        >
          <defs>
            {/* Highlighted Golden Toast Saj Bread Gradient */}
            <linearGradient id="sajHighlightGradient" x1="0" y1="0" x2="38" y2="48" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFF4B8" />
              <stop offset="35%" stopColor="#FFD700" />
              <stop offset="70%" stopColor="#FF6B00" />
              <stop offset="100%" stopColor="#C83200" />
            </linearGradient>

            {/* Futuristic Chrome Holographic Foil Wrap Bottom */}
            <linearGradient id="chromeFoilGradient" x1="0" y1="24" x2="38" y2="48" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="30%" stopColor="#60EFFF" />
              <stop offset="70%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>

            {/* Radiant Spiced Crimson/Magenta Filling */}
            <linearGradient id="spicedFillingGradient" x1="10" y1="2" x2="28" y2="18" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF0055" />
              <stop offset="50%" stopColor="#FF5E00" />
              <stop offset="100%" stopColor="#800020" />
            </linearGradient>

            {/* Highlighting Neon Aura Backlight */}
            <radialGradient id="highlightAura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#FF5E00" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FF0055" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background Highlighting Neon Backlight Glow */}
          <ellipse cx="19" cy="24" rx="20" ry="24" fill="url(#highlightAura)" />

          {/* Electric Neon Lime Lettuce Leaves Peeking Out Top Left */}
          <path
            d="M 10 12 C 5 5, 12 1, 16 7 C 18 3, 23 3, 21 9 C 26 5, 30 8, 27 14 Z"
            fill="#00FF87"
            stroke="#00B359"
            strokeWidth="1"
          />

          {/* Spiced Crimson & Flame Orange Fillings in Top Center */}
          <path
            d="M 12 10 Q 19 3 27 9 L 26 17 Q 19 19 11 16 Z"
            fill="url(#spicedFillingGradient)"
            stroke="#500010"
            strokeWidth="0.9"
          />

          {/* Ultra Creamy Pure White Garlic Toum Drizzle with Glow */}
          <path
            d="M 14 11 Q 18 16 23 11 Q 25 15 20 18"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="drop-shadow(0 0 3px #FFFFFF)"
          />

          {/* Main Saj Toast Wrap Body with Highlighted Gold & Coral Gradient */}
          <path
            d="M 8 16 C 8 16, 19 14, 30 16 C 32 24, 31 34, 27 44 C 18 47, 11 44, 8 36 C 6 28, 7 20, 8 16 Z"
            fill="url(#sajHighlightGradient)"
            stroke="#801500"
            strokeWidth="1.3"
          />

          {/* Saj Bread Grill Marks & Crispy Folds */}
          <path d="M 11 20 C 16 23, 22 22, 27 21" stroke="#FF5E00" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M 10 27 C 15 30, 21 29, 26 27" stroke="#C83200" strokeWidth="1.6" strokeLinecap="round" opacity="0.9" />
          <path d="M 11 34 C 15 37, 20 36, 24 34" stroke="#801500" strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />

          {/* Toast Grill Marks */}
          <circle cx="15" cy="22" r="1.1" fill="#500010" opacity="0.85" />
          <circle cx="23" cy="25" r="1.3" fill="#500010" opacity="0.9" />
          <circle cx="18" cy="30" r="1" fill="#500010" opacity="0.75" />

          {/* Holographic Chrome Foil Wrap Bottom Section */}
          <path
            d="M 9 32 L 29 30 C 29 30, 28 42, 25 45 C 18 47, 12 45, 9 38 Z"
            fill="url(#chromeFoilGradient)"
            stroke="#FFFFFF"
            strokeWidth="1"
          />
          {/* Chrome Foil Metallic Highlights */}
          <path d="M 12 34 L 14 43" stroke="#FFFFFF" strokeWidth="1.4" opacity="0.85" strokeLinecap="round" />
          <path d="M 19 33 L 21 44" stroke="#00E5FF" strokeWidth="1.2" opacity="0.9" strokeLinecap="round" />
        </svg>

        {/* Mini Flame Indicator on Top of Shawarma Wrap */}
        <motion.div
          className="absolute -top-2 right-0 text-yellow-300"
          animate={{ scale: [0.95, 1.3, 0.95], rotate: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
        >
          <Flame className="w-4 h-4 fill-yellow-300 stroke-red-600 drop-shadow-[0_0_8px_#FFD700]" />
        </motion.div>
      </motion.div>

      {/* Floating Shawarma Hover Badge */}
      <AnimatePresence>
        {isHovered && hoverText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute px-3 py-1 rounded-full bg-black/90 border border-yellow-300/80 text-[11px] font-mono font-bold tracking-widest text-yellow-300 shadow-[0_0_20px_rgba(255,215,0,0.6)] flex items-center gap-1.5 whitespace-nowrap backdrop-blur-md"
            style={{
              left: mousePosition.x + 28,
              top: mousePosition.y + 14,
            }}
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin-slow" />
            <span>{hoverText}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


