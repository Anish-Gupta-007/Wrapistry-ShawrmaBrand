"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "gold";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) * 0.35;
    const y = (e.clientY - (top + height / 2)) * 0.35;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles =
    "relative inline-flex items-center justify-center font-bebas tracking-wider rounded-full transition-all duration-300 select-none overflow-hidden group interactive cursor-pointer";

  const variants = {
    primary:
      "bg-gold-gradient text-background font-bold shadow-glow hover:shadow-glow-red hover:scale-105 active:scale-95",
    secondary:
      "bg-secondary text-cream font-bold hover:bg-secondary-hover shadow-glow-red hover:scale-105 active:scale-95",
    outline:
      "border border-primary/40 text-cream hover:border-primary hover:bg-primary/10 hover:scale-105 active:scale-95",
    gold:
      "bg-primary text-background font-bold hover:bg-primary-hover shadow-glow hover:scale-105 active:scale-95",
  };

  const sizes = {
    sm: "px-5 py-2 text-base",
    md: "px-7 py-3.5 text-lg",
    lg: "px-9 py-4 text-xl",
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 20, mass: 0.2 }}
      onClick={onClick}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...(props as any)}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {/* Subtle shine effect on hover */}
      <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
    </motion.button>
  );
};
