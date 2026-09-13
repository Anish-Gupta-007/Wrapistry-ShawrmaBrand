"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Flame, Award, Sparkles, Clock, Heart, ShieldCheck, CheckCircle2 } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

const BRAND_PILLARS = [
  {
    step: "01",
    title: "24-HOUR SPICED MARINADE",
    description: "We steep prime chicken thighs and ribeye beef in 14 raw Mediterranean spices, extra virgin olive oil, fresh garlic, and citrus zest for a full 24 hours.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop"
  },
  {
    step: "02",
    title: "OPEN CHARCOAL SPITFIRE",
    description: "Our vertical spits burn natural oak charcoal at 700°F. The dripping fats continuously baste the seared outer layer, locking in intense smokiness.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000&auto=format&fit=crop"
  },
  {
    step: "03",
    title: "HAND-WHIPPED GARLIC TOUM",
    description: "Never mayonnaise. Never store-bought emulsifiers. Our garlic toum is whipped by hand every 30 minutes using raw garlic cloves, sea salt, lemon juice, and cold-pressed oil.",
    image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?q=80&w=1000&auto=format&fit=crop"
  },
  {
    step: "04",
    title: "DOUBLE-BAKED SAJ FLATBREAD",
    description: "Our dough is yeast-fermented over 18 hours and stretched ultra-thin over a dome-shaped Saj oven. Crisp on the outside, pliable on the inside.",
    image: "https://images.unsplash.com/photo-1561651823-34feb02250e4?q=80&w=1000&auto=format&fit=crop"
  }
];

const TIMELINE = [
  { year: "2018", title: "The Charcoal Cart", desc: "Started as a late-night street cart in Downtown with just 1 spit and 2 secret marinade recipes." },
  { year: "2020", title: "First Flagship Kitchen", desc: "Opened our first brick-and-mortar spot, pioneering double-baked Saj flatbread and custom Toum dips." },
  { year: "2023", title: "International Expansion", desc: "Launched flagship locations in London Soho and Dubai Marina to critical food reviewer acclaim." },
  { year: "2026", title: "50+ Global Locations", desc: "Now serving over 500,000 craft shawarmas annually while preserving 100% charcoal authenticity." }
];

export default function AboutPage() {
  const [activePillarIndex, setActivePillarIndex] = useState(0);

  return (
    <div className="relative pt-32 pb-28 bg-background min-h-screen">
      {/* 1. HERO BRAND INTRO */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-28">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-mono tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Origin & Craft Philosophy</span>
          </div>

          <h1 className="font-bebas text-5xl sm:text-7xl lg:text-8xl text-cream tracking-tight leading-[0.9]">
            REDEFINING STREET FOOD<br />
            <span className="text-transparent bg-clip-text bg-gold-gradient">
              INTO AN ART FORM.
            </span>
          </h1>

          <p className="text-muted text-base sm:text-lg leading-relaxed font-inter font-light max-w-2xl mx-auto">
            Wrapistry was born out of anger at bland, soggy shawarma. We spent 3 years perfecting open charcoal fire roasting, hand-whipped toum, and double-baked Saj flatbread.
          </p>
        </div>
      </section>

      {/* 2. STICKY / PINNED BRAND STORY PILLARS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-bg-card/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-2">
            <span className="text-xs font-mono text-primary uppercase tracking-widest">The 4 Pillars of Wrapistry</span>
            <h2 className="font-bebas text-4xl sm:text-6xl text-cream tracking-wide">
              HOW WE ROLL PERFECTION
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Pinned Image Canvas Display */}
            <div className="lg:col-span-6 lg:sticky lg:top-32 rounded-3xl overflow-hidden border border-white/10 aspect-[4/3] shadow-2xl">
              <motion.img
                key={activePillarIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                src={BRAND_PILLARS[activePillarIndex].image}
                alt={BRAND_PILLARS[activePillarIndex].title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Column: Interactive Story Steps */}
            <div className="lg:col-span-6 space-y-8">
              {BRAND_PILLARS.map((pillar, idx) => (
                <motion.div
                  key={pillar.step}
                  onClick={() => setActivePillarIndex(idx)}
                  className={`p-8 rounded-3xl border transition-all duration-500 cursor-pointer ${
                    activePillarIndex === idx
                      ? "bg-bg-card border-primary/50 shadow-glow"
                      : "bg-background/50 border-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bebas text-3xl text-primary">{pillar.step}</span>
                    {activePillarIndex === idx && (
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30 text-xs font-mono">
                        ACTIVE STEP
                      </span>
                    )}
                  </div>
                  <h3 className="font-bebas text-2xl sm:text-3xl text-cream tracking-wide mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed font-inter font-light">
                    {pillar.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. TIMELINE SECTION */}
      <section className="py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-secondary uppercase tracking-widest">Our Journey</span>
            <h2 className="font-bebas text-4xl sm:text-6xl text-cream tracking-wide">
              FROM A SINGLE SPIT TO A GLOBAL EMPIRE
            </h2>
          </div>

          <div className="relative border-l-2 border-primary/30 ml-4 sm:ml-32 space-y-12 pl-8">
            {TIMELINE.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative group"
              >
                {/* Year Marker */}
                <div className="absolute -left-[45px] top-1.5 w-6 h-6 rounded-full bg-background border-2 border-primary group-hover:bg-primary transition-colors flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary group-hover:bg-background" />
                </div>
                <div className="sm:absolute sm:-left-36 sm:top-1 font-bebas text-3xl text-primary mb-2 sm:mb-0">
                  {item.year}
                </div>

                <div className="p-6 rounded-2xl bg-bg-card border border-white/5 group-hover:border-primary/40 transition-colors">
                  <h3 className="font-bebas text-2xl text-cream tracking-wide mb-1">{item.title}</h3>
                  <p className="text-muted text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FOUNDER'S QUOTE BANNER */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-bg-card/60 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Flame className="w-12 h-12 text-primary mx-auto" />
          <blockquote className="font-playfair italic text-2xl sm:text-4xl text-cream leading-relaxed">
            "True shawarma isn't fast food — it's slow culinary reverence served with high-speed hospitality."
          </blockquote>
          <div className="space-y-1">
            <h4 className="font-bebas text-xl text-primary tracking-wider">CHEF SAMIR AL-MANSORI</h4>
            <p className="text-xs text-muted font-mono uppercase tracking-widest">Co-Founder & Culinary Director</p>
          </div>
        </div>
      </section>
    </div>
  );
}
