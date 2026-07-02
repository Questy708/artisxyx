"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Mail, Plus, Minus, CircleDollarSign, Layers,
  PiggyBank, Banknote, Shield, Landmark, Zap, HandCoins, Crown, Vault,
} from "lucide-react";
import { Link } from "@/artemis/router";
import { venturesData } from "@/artemis/data/ventures";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Data (same content, Apple presentation) ── */
const stats = [
  { value: "$4B", label: "Capital target" },
  { value: String(venturesData.length), label: "Ventures" },
  { value: "39+", label: "Countries" },
  { value: "190", label: "Hubs" },
];

const vehicles = [
  { id: "xcelero-fund", name: "xCelero Fund", icon: CircleDollarSign, tagline: "Continuous capital. Broad exposure.", entry: "$500", fee: "1% mgmt", carry: "0%", liquidity: "Quarterly", desc: "Open-ended evergreen fund across the full venture portfolio. Quarterly liquidity windows, transparent NAV, entry from $500.", bestFor: "First-time investors, diversification, passive exposure", color: "#FF4D00" },
  { id: "spv-syndicates", name: "SPV Syndicates", icon: Layers, tagline: "Co-invest on breakout deals.", entry: "$5K", fee: "1% + 10%", carry: "above 8%", liquidity: "At exit", desc: "Single-asset SPVs for individual follow-on investments. Full transparency, side-by-side GP economics.", bestFor: "Experienced investors, deal-level selection", color: "#E5432F" },
  { id: "thematic-funds", name: "Thematic Funds", icon: PiggyBank, tagline: "Sector conviction bets.", entry: "$50K", fee: "1.5% + 20%", carry: "above 8%", liquidity: "Semi-annual", desc: "Closed-end funds targeting Energy, Food, Critical Tech, or Digital Finance. 8–15 ventures per fund.", bestFor: "Sector-conviction investors, institutional allocators", color: "#9333EA" },
  { id: "catalyst-notes", name: "Catalyst Notes", icon: Banknote, tagline: "Revenue, not equity.", entry: "$10K", fee: "0%", carry: "1.5–2.5x target", liquidity: "24–48 mo", desc: "Revenue-linked notes for revenue-stage ventures. Fixed return multiple, no dilution, no valuation dependency.", bestFor: "Yield-oriented investors, non-dilutive supporters", color: "#2563EB" },
  { id: "non-dilutive-desk", name: "Non-Dilutive Desk", icon: Shield, tagline: "Capital that costs no equity.", entry: "Service", fee: "Success-based", carry: "Avg $180K", liquidity: "N/A", desc: "Grant and incentive matching across 39 countries. 2,400+ active programs. Success fee only on awarded capital.", bestFor: "Ventures seeking working capital without dilution", color: "#059669" },
  { id: "anchor-mandate", name: "Anchor Mandate", icon: Landmark, tagline: "Custom portfolio at scale.", entry: "$250K+", fee: "Negotiated", carry: "Negotiated", liquidity: "Custom", desc: "Bespoke portfolio construction with advisory board seats, custom SPVs, GP carry participation, real-time dashboard.", bestFor: "DFIs, endowments, family offices", color: "#7c3aed" },
];

const tiers = [
  { id: "scout", name: "Scout", amount: "$500", icon: Zap, color: "#FF4D00", benefits: ["xCelero Fund access", "Quarterly NAV reports", "Route Deal Flow visibility", "Community network access"] },
  { id: "syndicate", name: "Syndicate", amount: "$5K", icon: HandCoins, color: "#FF4D00", benefits: ["All Scout benefits", "SPV co-investment rights", "Side-by-side GP economics", "Annual LP meeting invite"] },
  { id: "partner", name: "Partner", amount: "$50K", icon: Vault, color: "#FF4D00", benefits: ["All Syndicate benefits", "Thematic Fund allocation", "Board observer eligibility", "Dedicated IR contact"] },
  { id: "anchor", name: "Anchor", amount: "$250K+", icon: Crown, color: "#FF4D00", benefits: ["All Partner benefits", "Advisory board seat", "Custom SPV formation", "GP carry participation"] },
];

const faqs = [
  { q: "How do I invest?", a: "Start at $500 in the xCelero Fund — open to everyone. For larger allocations ($25K+), contact us for SPV Syndicates, Thematic Funds, or the Anchor Mandate. Six vehicles, each designed for a different investor profile." },
  { q: "What are the fees?", a: "xCelero Fund: 1% management, zero carry. SPV Syndicates: 1% + 10% carry above 8% hurdle. Thematic Funds: 1.5% + 20% carry above 8% hurdle. Catalyst Notes: no management fee, return target 1.5–2.5x. No sales load on any vehicle." },
  { q: "What's the minimum?", a: "$500 for the xCelero Fund (solidarity pricing). $5K for Catalyst Notes. $10K for Thematic Funds. $25K for SPV Syndicates. $250K+ for the Anchor Mandate." },
  { q: "Where does the capital go?", a: "Into ventures building critical technology across 39 countries — energy, water, food, health, education, finance, transport. Every venture is built inside the xCelero engine: infrastructure, capital, community, and the Gate System." },
  { q: "Is this regulated?", a: "All vehicle structures are subject to regulatory approval. This is not an offer to sell securities. Offering documents are provided to qualified investors." },
];

export function Capital2() {
  const [openVehicle, setOpenVehicle] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showSubscribe, setShowSubscribe] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { once: true, margin: "-80px" });

  return (
    <div className="bg-[#0A0A0A] text-white">
      {/* ═══ HERO ═══ */}
      <section className="px-6 md:px-12 lg:px-20 pt-32 md:pt-48 pb-20 md:pb-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#FF4D00]/6 blur-[160px] pointer-events-none" />
        <div ref={heroRef} className="max-w-4xl mx-auto text-center relative z-10">
          <motion.span initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }} className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-8">
            xCelero Capital
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.05, ease: EASE }} className="font-display text-[44px] sm:text-[60px] md:text-[80px] lg:text-[96px] font-medium leading-[0.95] tracking-[-0.03em] mb-8">
            Invest in critical<br /><span className="text-white/30">technology from </span><span className="text-[#FF4D00]">$500.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2, ease: EASE }} className="text-[16px] md:text-[20px] leading-[1.6] text-white/50 max-w-2xl mx-auto mb-12">
            Six vehicles. One thesis: the technology that defines the next century will be built in the markets that need it most. Capital designed to match the reality of building — not the comfort of proven returns.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.35, ease: EASE }} className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
            <a href="#vehicles" className="px-8 py-4 bg-[#FF4D00] text-white text-[12px] font-bold tracking-wider rounded-full hover:bg-[#FF6A28] transition-all hover:scale-105 inline-flex items-center gap-2">Invest Now <ArrowRight className="w-4 h-4" /></a>
            <button onClick={() => setShowSubscribe(true)} className="px-8 py-4 border border-white/15 text-white/70 text-[12px] font-bold tracking-wider rounded-full hover:border-white/40 hover:text-white transition-all hover:scale-105 inline-flex items-center gap-2">Get Updates <Mail className="w-4 h-4" /></button>
          </motion.div>
          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.5, ease: EASE }} className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-[32px] md:text-[44px] font-display font-medium text-[#FF4D00] leading-none">{s.value}</p>
                <p className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/30 mt-2">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ THESIS (dark rounded container) ═══ */}
      <section className="px-6 md:px-12 lg:px-20 py-8 md:py-12">
        <div className="max-w-[1400px] mx-auto rounded-3xl overflow-hidden shadow-2xl">
          <div className="relative h-[50vh] md:h-[60vh]">
            <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=80" alt="Critical technology infrastructure" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-14">
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE }}>
                <p className="text-[22px] md:text-[32px] font-display font-medium leading-[1.2] mb-4 max-w-2xl">
                  Capital designed to understand the terrain, not just the <span className="text-[#FF4D00]">return profile</span>.
                </p>
                <p className="text-[14px] md:text-[16px] text-white/50 leading-relaxed max-w-xl">
                  Traditional venture flows where returns are proven. xCelero deploys where the technology is most needed. Six vehicles, one thesis: critical technology in the markets that need it most.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ VEHICLES (Apple card grid) ═══ */}
      <section id="vehicles" className="px-6 md:px-12 lg:px-20 py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }} className="mb-12 md:mb-16 text-center">
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-4">Investment Vehicles</span>
            <h2 className="font-display text-[32px] md:text-[52px] font-medium tracking-tight">Six ways to deploy.</h2>
            <p className="text-[15px] text-white/40 max-w-xl mx-auto mt-4">From $500 to $250K+. Every vehicle serves the same thesis.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {vehicles.map((v, i) => {
              const Icon = v.icon;
              const isOpen = openVehicle === v.id;
              return (
                <motion.div key={v.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }}
                  onClick={() => setOpenVehicle(isOpen ? null : v.id)}
                  className={`rounded-3xl border p-6 md:p-7 cursor-pointer transition-all ${isOpen ? "border-white/20 bg-white/[0.04] shadow-lg" : "border-white/5 bg-white/[0.02] hover:border-white/15 hover:shadow-md"}`}>
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: `${v.color}18` }}>
                      <Icon className="w-5 h-5" style={{ color: v.color }} />
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-white/25">{v.entry}</span>
                  </div>
                  <h3 className="text-[19px] font-display font-medium mb-1">{v.name}</h3>
                  <p className="text-[12px] text-white/35 mb-3">{v.tagline}</p>
                  <p className="text-[13px] text-white/50 leading-relaxed mb-5">{v.desc}</p>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {[{ l: "Fee", v: v.fee }, { l: "Carry", v: v.carry }, { l: "Entry", v: v.entry }, { l: "Liquidity", v: v.liquidity }].map((m, j) => (
                      <div key={j}>
                        <p className="text-[13px] font-display font-medium" style={{ color: v.color }}>{m.v}</p>
                        <p className="text-[9px] font-mono tracking-wider uppercase text-white/25 mt-0.5">{m.l}</p>
                      </div>
                    ))}
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: EASE }} className="overflow-hidden border-t border-white/5">
                        <div className="pt-4">
                          <p className="text-[11px] font-mono font-bold tracking-wider uppercase text-white/30 mb-1">Best For</p>
                          <p className="text-[12px] text-white/50 mb-3">{v.bestFor}</p>
                          <Link to="/capital" className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#FF4D00] hover:gap-2.5 transition-all">Invest via this vehicle <ArrowRight className="w-3.5 h-3.5" /></Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ TIERS ═══ */}
      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }} className="mb-12 text-center">
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-4">Investment Tiers</span>
            <h2 className="font-display text-[32px] md:text-[52px] font-medium tracking-tight">From solidarity to anchor.</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tiers.map((t, i) => {
              const Icon = t.icon;
              return (
                <motion.div key={t.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }} className="rounded-3xl border border-white/5 bg-white/[0.02] p-7 hover:border-white/15 hover:shadow-lg hover:scale-[1.02] transition-all">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5" style={{ background: `${t.color}18` }}>
                    <Icon className="w-5 h-5" style={{ color: t.color }} />
                  </div>
                  <p className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-2">{t.name}</p>
                  <p className="text-[32px] font-display font-medium mb-5">{t.amount}</p>
                  <ul className="space-y-2.5">
                    {t.benefits.map((b, j) => (<li key={j} className="text-[12px] text-white/50 flex items-start gap-2"><span className="text-[#FF4D00] mt-0.5">→</span>{b}</li>))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }} className="mb-10 text-center">
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-4">FAQ</span>
            <h2 className="font-display text-[32px] md:text-[48px] font-medium tracking-tight">Questions.</h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden hover:border-white/10 transition-colors">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors">
                  <span className="text-[14px] font-medium pr-4">{faq.q}</span>
                  {openFaq === i ? <Minus className="w-4 h-4 text-[#FF4D00] flex-shrink-0" /> : <Plus className="w-4 h-4 text-white/30 flex-shrink-0" />}
                </button>
                <AnimatePresence>
                  {openFaq === i && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: EASE }} className="overflow-hidden"><p className="px-5 pb-5 text-[13px] text-white/50 leading-relaxed">{faq.a}</p></motion.div>)}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto rounded-3xl border border-[#FF4D00]/15 bg-[#FF4D00]/5 p-10 md:p-16 text-center">
          <h2 className="font-display text-[28px] md:text-[44px] font-medium tracking-tight mb-4">Start with <span className="text-[#FF4D00]">$500.</span></h2>
          <p className="text-[14px] md:text-[16px] text-white/50 max-w-lg mx-auto mb-8">Solidarity pricing means early investors pay zero carry. The market forms before it's squeezed. Back the technology the next century needs.</p>
          <Link to="/capital" className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF4D00] text-white text-[12px] font-bold tracking-wider rounded-full hover:bg-[#FF6A28] transition-all hover:scale-105">Invest Now <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </section>

      {/* ═══ Subscribe Modal ═══ */}
      <SubscribeModal isOpen={showSubscribe} onClose={() => setShowSubscribe(false)} />
    </div>
  );
}

function SubscribeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch("/api/capital/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, firstName, consent: true }) });
      setSubmitted(true);
    } catch { /* ignore */ }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ duration: 0.25, ease: EASE }} onClick={(e) => e.stopPropagation()} className="bg-[#111] border border-white/10 rounded-3xl w-full max-w-md p-8 overflow-hidden">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#FF4D00] flex items-center justify-center"><ArrowRight className="w-8 h-8 text-white" /></div>
                <h3 className="text-[20px] font-display font-medium mb-2">You're on the list.</h3>
                <p className="text-[13px] text-white/40">We'll send updates as vehicles launch.</p>
              </div>
            ) : (
              <>
                <h3 className="text-[20px] font-display font-medium mb-2">Get Updates</h3>
                <p className="text-[13px] text-white/40 mb-6">Be the first to know when investment vehicles launch.</p>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white placeholder:text-white/20 focus:outline-none focus:border-[#FF4D00]/40 transition-colors" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white placeholder:text-white/20 focus:outline-none focus:border-[#FF4D00]/40 transition-colors" />
                  <button type="submit" className="w-full py-3.5 bg-[#FF4D00] text-white text-[13px] font-bold rounded-xl hover:bg-[#FF6A28] transition-colors">Subscribe</button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
