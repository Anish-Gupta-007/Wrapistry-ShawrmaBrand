"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowLeft, Lock, FileText, Sparkles, CheckCircle2 } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

export default function PrivacyPolicyPage() {
  return (
    <div className="relative pt-32 pb-28 px-4 sm:px-6 lg:px-8 bg-background min-h-screen font-inter select-none">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-primary/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        {/* Header */}
        <div className="space-y-4 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-primary hover:underline mb-2">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO HOME</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-mono tracking-widest uppercase shadow-glow mx-auto">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>LEGAL & COMPLIANCE</span>
          </div>

          <h1 className="font-bebas text-5xl sm:text-7xl text-cream tracking-tight leading-none">
            PRIVACY POLICY<span className="text-secondary">.</span>
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
              1. INFORMATION WE COLLECT
            </h2>
            <p className="text-muted font-light leading-relaxed">
              At Wrapistry Craft Shawarma ("Wrapistry", "we", "us", or "our"), we respect your privacy. When you place an online order for delivery or pickup, join the Inner Circle newsletter, or submit a franchise inquiry, we collect information necessary to fulfill your craft food experience:
            </p>
            <ul className="space-y-2 text-xs font-mono text-cream/90 pt-2 pl-4 border-l-2 border-primary/40">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>Contact Details: Name, email address, telephone number, and delivery street address.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>Order Preferences: Favorite craft wraps, dietary choices (veg/spicy), and kitchen notes.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>Payment Information: Tokenized credit card transactions processed via PCI-DSS compliant gateways (Stripe/Apple Pay).</span>
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 pt-6 border-t border-white/10">
            <h2 className="font-bebas text-2xl text-cream tracking-wide flex items-center gap-2">
              <Lock className="w-4 h-4 text-secondary" />
              2. HOW WE USE YOUR INFORMATION
            </h2>
            <p className="text-muted font-light leading-relaxed">
              We never sell your personal data to third parties. We utilize your data exclusively to ensure your 24-hour slow-marinated craft shawarma is delivered fresh, hot, and on time:
            </p>
            <ul className="space-y-2 text-xs font-mono text-cream/90 pt-2 pl-4 border-l-2 border-secondary/40">
              <li>• Kitchen Order Fulfillment & Courier Routing</li>
              <li>• Inner Circle Secret Menu Drops & Event Invitations</li>
              <li>• Franchise Inquiry Evaluation & Regional Partner Outreach</li>
              <li>• Website Security & Fraud Prevention</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 pt-6 border-t border-white/10">
            <h2 className="font-bebas text-2xl text-cream tracking-wide flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              3. COOKIES & TRACKING TECHNOLOGIES
            </h2>
            <p className="text-muted font-light leading-relaxed">
              We use essential cookies to maintain your shopping cart state, store pickup location preferences, and measure website performance using privacy-focused analytics. You can adjust your browser settings at any time to block non-essential cookies.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 pt-6 border-t border-white/10">
            <h2 className="font-bebas text-2xl text-cream tracking-wide flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              4. YOUR DATA RIGHTS & CONTACT US
            </h2>
            <p className="text-muted font-light leading-relaxed">
              You have the right to access, update, or request the deletion of your personal information at any time. For privacy inquiries or data requests, contact our Data Governance Team:
            </p>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono space-y-1">
              <span className="block text-primary font-bold">WRAPISTRY DATA GOVERNANCE</span>
              <span className="block text-cream">Email: privacy@wrapistrycraft.com</span>
              <span className="block text-muted">Address: 742 Grand Ave, Financial District, NY 10001</span>
            </div>
          </section>

          {/* CTA Footer */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link href="/menu">
              <MagneticButton variant="primary" size="md">
                EXPLORE CRAFT MENU
              </MagneticButton>
            </Link>

            <Link href="/terms" className="text-xs font-mono text-primary hover:underline">
              READ TERMS OF SERVICE →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
