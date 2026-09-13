"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, ChevronDown, CheckCircle2, MessageSquare, Sparkles } from "lucide-react";
import { FAQS } from "@/lib/data";
import { MagneticButton } from "@/components/ui/MagneticButton";

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", subject: "General Inquiry", message: "" });
    }, 4000);
  };

  return (
    <div className="relative pt-32 pb-28 px-4 sm:px-6 lg:px-8 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-mono tracking-widest uppercase">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>

          <h1 className="font-bebas text-5xl sm:text-7xl text-cream tracking-tight leading-none">
            TALK TO THE TEAM<span className="text-secondary">.</span>
          </h1>

          <p className="text-muted text-sm sm:text-base font-inter font-light">
            Have questions about catering an event, feedback on your recent roll, or press inquiries? We’d love to hear from you.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-bg-card border border-white/10 space-y-6">
              <h3 className="font-bebas text-3xl text-cream tracking-wide">DIRECT CHANNELS</h3>

              <div className="space-y-4 text-xs font-mono">
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <span className="text-muted block">EMAIL US</span>
                    <span className="text-cream font-bold">hello@wrapistrycraft.com</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <span className="text-muted block">CALL HEADQUARTERS</span>
                    <span className="text-cream font-bold">+91 98200 55101</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <MapPin className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <span className="text-muted block">HQ ADDRESS</span>
                    <span className="text-cream font-bold">742 Linking Road, Bandra West, Mumbai, MH 400050</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Catering Highlight Card */}
            <div className="p-8 rounded-3xl bg-gold-gradient text-background space-y-4 shadow-glow">
              <h3 className="font-bebas text-3xl font-bold tracking-wide">PRIVATE & CORPORATE CATERING</h3>
              <p className="text-xs leading-relaxed opacity-90 font-medium">
                Bring our vertical charcoal spit and master chef setup to your corporate retreat, wedding, or festival. Serving groups from 30 to 2,000 guests.
              </p>
              <div className="pt-2">
                <span className="text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-background text-primary">
                  Catering@wrapistrycraft.com
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Form Side */}
          <div className="lg:col-span-7 p-8 sm:p-12 rounded-3xl bg-bg-card border border-white/10 shadow-2xl font-inter">
            <h3 className="font-bebas text-3xl text-cream tracking-wide mb-6">SEND A DIRECT MESSAGE</h3>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-3"
              >
                <CheckCircle2 className="w-12 h-12 text-primary mx-auto" />
                <h4 className="font-bebas text-2xl text-cream">MESSAGE SENT SUCCESSFULLY!</h4>
                <p className="text-xs text-muted">We will respond to {form.email} within 4 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase text-muted mb-2">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Marcus Vance"
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-xs text-cream focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-muted mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="marcus@example.com"
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-xs text-cream focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-muted mb-2">Subject Category</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-xs text-cream focus:outline-none focus:border-primary"
                  >
                    <option>General Inquiry</option>
                    <option>Event & Corporate Catering</option>
                    <option>Customer Experience Feedback</option>
                    <option>Press & Media Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-muted mb-2">Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="How can we assist you today?"
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-xs text-cream focus:outline-none focus:border-primary"
                  />
                </div>

                <MagneticButton type="submit" variant="primary" size="lg" className="w-full">
                  SEND MESSAGE
                  <Send className="w-4 h-4" />
                </MagneticButton>
              </form>
            )}
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="space-y-8 max-w-4xl mx-auto pt-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-primary uppercase tracking-widest">Common Questions</span>
            <h2 className="font-bebas text-4xl sm:text-5xl text-cream tracking-wide">FREQUENTLY ASKED QUESTIONS</h2>
          </div>

          <div className="space-y-4 font-inter">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="rounded-2xl bg-bg-card border border-white/5 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="font-bebas text-xl text-cream tracking-wide">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-primary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-6 pb-6 text-xs text-muted leading-relaxed"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
