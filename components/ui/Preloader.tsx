"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Preloader: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem("wrapistry_preloader_shown");
    if (hasSeen) {
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem("wrapistry_preloader_shown", "true");
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-[#090705] flex flex-col items-center justify-center p-6 pointer-events-auto select-none"
        >
          <div className="flex flex-col items-center space-y-6 text-center">
            {/* Pulsing Gold Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="w-24 h-24 rounded-3xl bg-gold-gradient p-1 shadow-glow"
            >
              <div className="w-full h-full bg-[#0E0B08] rounded-[22px] flex items-center justify-center overflow-hidden">
                <img
                  src="/WRAPISTRY_v2_appicon_badge.png"
                  alt="Wrapistry Badge"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Horizontal Dark-BG Logo */}
            <motion.img
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              src="/WRAPISTRY_v2_horizontal_darkBG.png"
              alt="Wrapistry Craft Shawarma"
              className="h-14 sm:h-18 w-auto object-contain filter drop-shadow-[0_4px_24px_rgba(232,163,61,0.4)]"
            />

            {/* Progress Bar */}
            <div className="w-48 h-1 rounded-full bg-white/10 overflow-hidden relative mt-4">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.6, ease: "easeInOut" }}
                className="h-full bg-gold-gradient rounded-full shadow-glow"
              />
            </div>

            <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-primary/80 pt-2">
              Craft Shawarma • Seared Over Fire
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
