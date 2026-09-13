"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Navigation, ExternalLink, Flame, CheckCircle2 } from "lucide-react";
import { LOCATIONS, LocationItem } from "@/lib/data";
import { MagneticButton } from "@/components/ui/MagneticButton";

export default function LocationsPage() {
  const [selectedLoc, setSelectedLoc] = useState<LocationItem>(LOCATIONS[0]);

  return (
    <div className="relative pt-32 pb-28 px-4 sm:px-6 lg:px-8 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Title */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-mono tracking-widest uppercase">
            <MapPin className="w-3.5 h-3.5" />
            <span>Store Locator</span>
          </div>

          <h1 className="font-bebas text-5xl sm:text-7xl text-cream tracking-tight leading-none">
            FIND A WRAPISTRY KITCHEN<span className="text-secondary">.</span>
          </h1>

          <p className="text-muted text-sm sm:text-base font-inter font-light">
            Visit our flagship craft kitchens or stop by our late-night spit windows across Mumbai, Delhi, Bengaluru, and Hyderabad.
          </p>
        </div>

        {/* Location Selector Grid & Map View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Branch Cards Column */}
          <div className="lg:col-span-5 space-y-4">
            {LOCATIONS.map((loc) => {
              const isSelected = selectedLoc.id === loc.id;
              return (
                <motion.div
                  key={loc.id}
                  onClick={() => setSelectedLoc(loc)}
                  whileHover={{ scale: 1.01 }}
                  className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "bg-bg-card border-primary shadow-glow"
                      : "bg-background border-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bebas text-2xl text-cream tracking-wide">{loc.city}</span>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-mono font-bold uppercase">
                      ● OPEN NOW
                    </span>
                  </div>

                  <h3 className="font-bebas text-xl text-primary mb-2">{loc.name}</h3>

                  <p className="text-xs text-muted leading-relaxed flex items-start gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{loc.address}</span>
                  </p>

                  <div className="flex items-center justify-between text-xs text-muted font-mono pt-3 border-t border-white/5">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-primary" /> {loc.hours}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Map & Detailed Branch Preview Column */}
          <div className="lg:col-span-7 rounded-3xl bg-bg-card border border-white/10 overflow-hidden shadow-2xl p-6 space-y-6">
            {/* Store Photo / Map Visual Placeholder */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 group">
              <img
                src={selectedLoc.image}
                alt={selectedLoc.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/40" />

              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-md border border-white/10 text-xs font-mono text-cream flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span>{selectedLoc.city} Coordinates: {selectedLoc.coordinates.lat.toFixed(2)}, {selectedLoc.coordinates.lng.toFixed(2)}</span>
              </div>
            </div>

            {/* Selected Branch Info */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-bebas text-3xl text-cream tracking-wide">{selectedLoc.name}</h2>
                  <p className="text-xs text-muted font-mono">{selectedLoc.address}</p>
                </div>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(selectedLoc.address)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MagneticButton variant="primary" size="sm">
                    GET DIRECTIONS
                    <Navigation className="w-4 h-4" />
                  </MagneticButton>
                </a>
              </div>

              {/* Features Grid */}
              <div>
                <h4 className="text-xs uppercase tracking-wider text-muted font-mono mb-2">Location Features</h4>
                <div className="grid grid-cols-2 gap-2">
                  {selectedLoc.features.map((feat, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2 text-xs text-cream">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Phone & Ordering CTA */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-muted font-mono">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>{selectedLoc.phone}</span>
                </div>

                <span className="text-primary font-bold">Delivery & Pickup Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
