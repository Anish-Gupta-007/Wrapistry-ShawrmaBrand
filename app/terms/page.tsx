"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, ArrowLeft, Scale, Flame, ShieldAlert, Sparkles, CheckCircle2 } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

export default function TermsOfServicePage() {
  return (
    <div className="relative pt-32 pb-28 px-4 sm:px-6 lg:px-8 bg-background min-h-screen font-inter select-none">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-secondary/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        {/* Header */}
        <div className="space-y-4 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-primary hover:underline mb-2">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO HOME</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-xs font-mono tracking-widest uppercase shadow-glow mx-auto">
            <Scale className="w-3.5 h-3.5" />
            <span>TERMS & CONDITIONS</span>
          </div>

          <h1 className="font-bebas text-5xl sm:text-7xl text-cream tracking-tight leading-none">
            TERMS OF SERVICE<span className="text-primary">.</span>
          </h1>

          <p className="text-muted text-xs sm:text-sm font-mono uppercase tracking-widest">
            LAST UPDATED: SEPTEMBER 2026 • WRAPISTRY CRAFT SHAWARMA INC.
          </p>
        </div>

        {/* Content Glass Container */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#140F0B]/90 border border-white/10 backdrop-blur-md shadow-2xl space-y-10 text-body/90 text-sm leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="font-bebas text-2xl text-cream tracking-wide flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              1. ACCEPTANCE OF TERMS
            </h2>
            <p className="text-muted font-light leading-relaxed">
              Welcome to Wrapistry Craft Shawarma ("Wrapistry", "we", "our"). By accessing or using our website, placing an order via our online ordering platform, or inquiring about franchise opportunities, you agree to comply with and be bound by these Terms of Service.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 pt-6 border-t border-white/10">
            <h2 className="font-bebas text-2xl text-cream tracking-wide flex items-center gap-2">
              <Flame className="w-4 h-4 text-secondary" />
              2. ONLINE ORDERING & KITCHEN FULFILLMENT
            </h2>
            <p className="text-muted font-light leading-relaxed">
              All orders placed through Wrapistry website or authorized delivery partners are subject to product availability and kitchen prep lead times:
            </p>
            <ul className="space-y-2 text-xs font-mono text-cream/90 pt-2 pl-4 border-l-2 border-secondary/40">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-secondary shrink-0" />
                <span>Kitchen Times: Average fulfillment time is 15 minutes for pickup orders.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-secondary shrink-0" />
                <span>Freshness Guarantee: All wraps are double-baked in domed Saj bread and seared over charcoal at 700°F upon order confirmation.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-secondary shrink-0" />
                <span>Cancellations: Orders may be cancelled within 2 minutes of placement prior to charcoal fire searing.</span>
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 pt-6 border-t border-white/10">
            <h2 className="font-bebas text-2xl text-cream tracking-wide flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              3. INTELLECTUAL PROPERTY
            </h2>
            <p className="text-muted font-light leading-relaxed">
              All original content, 3D interactive models, trademarked logos, recipes, garlic toum formulations, and brand aesthetics displayed on this website are the exclusive property of Wrapistry Craft Shawarma Inc. Unauthorized reproduction or commercial use is strictly prohibited.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 pt-6 border-t border-white/10">
            <h2 className="font-bebas text-2xl text-cream tracking-wide flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-primary" />
              4. GOVERNING LAW & LEGAL CONTACT
            </h2>
            <p className="text-muted font-light leading-relaxed">
              These terms are governed by the laws of the State of New York, without regard to its conflict of law principles. For legal inquiries or formal notices:
            </p>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono space-y-1">
              <span className="block text-secondary font-bold">WRAPISTRY LEGAL COUNSEL</span>
              <span className="block text-cream">Email: legal@wrapistrycraft.com</span>
              <span className="block text-muted">HQ: 742 Grand Ave, Financial District, NY 10001</span>
            </div>
          </section>

          {/* CTA Footer */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link href="/menu">
              <MagneticButton variant="primary" size="md">
                ORDER ONLINE NOW
              </MagneticButton>
            </Link>

            <Link href="/privacy" className="text-xs font-mono text-primary hover:underline">
              READ PRIVACY POLICY →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
