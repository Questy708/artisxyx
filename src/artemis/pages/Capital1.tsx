"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, Plus, Minus } from "lucide-react";
import { Link } from "@/artemis/router";

const EASE = [0.22, 1, 0.36, 1] as const;

const vehicles = [
  {
    id: "xcelero-fund",
    name: "xCelero Fund",
    tagline: "The evergreen engine.",
    entry: "$500",
    structure: "Open-ended evergreen fund",
    bestFor: "Everyone. From $500 to $500K.",
    desc: "Quarterly liquidity. Transparent NAV. Zero carry. The broadest exposure to the full xCelero venture portfolio — designed so anyone can back the technology the next century needs.",
    metrics: [
      { label: "Entry", value: "$500" },
      { label: "Fee", value: "1% mgmt" },
      { label: "Carry", value: "0%" },
      { label: "Liquidity", value: "Quarterly" },
    ],
    color: "#FF4D00",
  },
  {
    id: "spv-syndicates",
    name: "SPV Syndicates",
    tagline: "Deal-level precision.",
    entry: "$25K",
    structure: "Single-asset SPV",
    bestFor: "Experienced investors wanting deal-by-deal selection.",
    desc: "Purpose-built vehicles for individual follow-on investments. You know exactly what you're investing in — side-by-side GP economics, institutional-grade terms, single-asset focus.",
    metrics: [
      { label: "Entry", value: "$25K" },
      { label: "Fee", value: "1% + 10% carry" },
      { label: "Hurdle", value: "8%" },
      { label: "Liquidity", value: "At exit" },
    ],
    color: "#E5432F",
  },
  {
    id: "thematic-funds",
    name: "Thematic Funds",
    tagline: "Sector conviction.",
    entry: "$10K",
    structure: "7-year closed-end fund",
    bestFor: "Investors with sector-specific conviction (Energy, Food, Critical Tech, Digital Finance).",
    desc: "Concentrated portfolios of 8–15 ventures within a single domain. Targeted exposure to the sectors you believe in most. Board observer seats for Anchor-tier allocations.",
    metrics: [
      { label: "Entry", value: "$10K" },
      { label: "Fee", value: "1.5% + 20% carry" },
      { label: "Hurdle", value: "8%" },
      { label: "Term", value: "7 years" },
    ],
    color: "#9333EA",
  },
  {
    id: "catalyst-notes",
    name: "Catalyst Notes",
    tagline: "Revenue, not equity.",
    entry: "$5K",
    structure: "Revenue-linked note",
    bestFor: "Investors who want defined returns without valuation dependency.",
    desc: "Revenue-based financing for ventures that have reached revenue milestones. Fixed return multiple (1.5–2.5x). Returns accelerate when the venture grows faster. No equity dilution, no valuation negotiations.",
    metrics: [
      { label: "Entry", value: "$5K" },
      { label: "Return target", value: "1.5–2.5x" },
      { label: "Fee", value: "0%" },
      { label: "Duration", value: "24–36 mo" },
    ],
    color: "#2563EB",
  },
  {
    id: "non-dilutive-desk",
    name: "Non-Dilutive Desk",
    tagline: "Capital that costs no equity.",
    entry: "Service",
    structure: "Grant & incentive matching",
    bestFor: "Every venture. Average raise: $180K in non-dilutive capital.",
    desc: "Not a fund — a service. We match ventures with grants, prizes, government incentives, and development finance across 39 countries. Capital that doesn't cost equity. Success fee only on awarded capital.",
    metrics: [
      { label: "Avg raise", value: "$180K" },
      { label: "Fee", value: "Success-based" },
      { label: "Countries", value: "39+" },
      { label: "Equity cost", value: "0%" },
    ],
    color: "#059669",
  },
  {
    id: "anchor-mandate",
    name: "Anchor Mandate",
    tagline: "Strategic capital at scale.",
    entry: "$250K+",
    structure: "Custom mandate",
    bestFor: "DFIs, endowments, family offices with strategic mandates.",
    desc: "Custom-capital arrangements for institutional investors deploying $250K+. Co-design venture pipelines, thematic focus areas, and geographic concentration. Board seats, observer rights, and co-investment privileges.",
    metrics: [
      { label: "Entry", value: "$250K+" },
      { label: "Structure", value: "Custom" },
      { label: "Governance", value: "Board seats" },
      { label: "Geography", value: "Co-designed" },
    ],
    color: "#7c3aed",
  },
];

const tiers = [
  { id: "scout", name: "Scout", amount: "$500", perks: ["Quarterly reports", "TownSquare access", "Solidarity pricing (0% carry)"] },
  { id: "syndicate", name: "Syndicate", amount: "$5K", perks: ["Monthly updates", "Deal flow access", "Annual gathering invite"] },
  { id: "partner", name: "Partner", amount: "$50K", perks: ["Bi-weekly briefings", "SPV co-investment rights", "Demo Day priority"] },
  { id: "anchor", name: "Anchor", amount: "$250K+", perks: ["Board observer seat", "Thematic fund allocation", "Direct venture selection"] },
];

const faqs = [
  { q: "How do I invest?", a: "Start at $500 in the xCelero Fund — open to everyone. For larger allocations ($25K+), contact us for SPV Syndicates, Thematic Funds, or the Anchor Mandate. We deploy across six vehicles, each designed for a different investor profile." },
  { q: "What are the fees?", a: "xCelero Fund: 1% management, zero carry. SPV Syndicates: 1% + 10% carry above 8% hurdle. Thematic Funds: 1.5% + 20% carry above 8% hurdle. Catalyst Notes: no management fee, return target 1.5–2.5x. No sales load on any vehicle." },
  { q: "What's the minimum?", a: "$500 for the xCelero Fund (solidarity pricing). $5K for Catalyst Notes. $10K for Thematic Funds. $25K for SPV Syndicates. $250K+ for the Anchor Mandate." },
  { q: "Where does the capital go?", a: "Into ventures building critical technology across 39 countries — energy, water, food, health, education, finance, transport, and more. Every venture is built inside the xCelero engine: infrastructure, capital, community, and the Gate System." },
  { q: "Is this regulated?", a: "All vehicle structures are subject to regulatory approval. This is not an offer to sell securities. Offering documents are provided to qualified investors. Contact us for details." },
];

export function Capital1() {
  const [openVehicle, setOpenVehicle] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { once: true, margin: "-80px" });

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen">
      {/* ── HERO ── */}
      <section className="px-6 md:px-12 lg:px-20 pt-32 md:pt-44 pb-16 md:pb-24">
        <div ref={heroRef} className="max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-6"
          >xCelero Capital — Six Vehicles, One Thesis</motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
            className="font-display text-[40px] sm:text-[56px] md:text-[72px] lg:text-[88px] font-medium leading-[0.95] tracking-[-0.03em] mb-8"
          >
            Back the technology<br />
            <span className="text-white/30">the next century </span>
            <span className="text-[#FF4D00]">needs.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="text-[16px] md:text-[20px] leading-[1.6] text-white/50 max-w-2xl mx-auto mb-10"
          >
            Six vehicles. From $500 solidarity tickets to $250K+ anchor mandates. One thesis: critical technology in the markets that need it most. Capital designed to match the reality of building — not the comfort of already-proven returns.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35, ease: EASE }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link to="/capital" className="px-7 py-3.5 bg-[#FF4D00] text-white text-[12px] font-bold tracking-wider rounded-full hover:bg-[#FF6A28] transition-colors inline-flex items-center gap-2">
              Invest from $500 <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#vehicles" className="px-7 py-3.5 border border-white/15 text-white/70 text-[12px] font-bold tracking-wider rounded-full hover:border-white/40 hover:text-white transition-colors">
              Explore vehicles
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="px-6 md:px-12 lg:px-20 py-8 border-y border-white/5">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "$500", label: "Entry point" },
            { value: "6", label: "Vehicles" },
            { value: "39+", label: "Grant markets" },
            { value: "$1.97Bn", label: "10-year target" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }}
              className="text-center md:text-left"
            >
              <p className="text-[32px] md:text-[40px] font-display font-medium leading-none text-[#FF4D00]">{stat.value}</p>
              <p className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/30 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── VEHICLES (Apple-style cards) ── */}
      <section id="vehicles" className="px-6 md:px-12 lg:px-20 py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }}
            className="mb-12 md:mb-16"
          >
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-4">The Six Vehicles</span>
            <h2 className="font-display text-[32px] md:text-[48px] font-medium tracking-tight">Choose your entry.</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-5">
            {vehicles.map((v, i) => {
              const isOpen = openVehicle === v.id;
              return (
                <motion.div
                  key={v.id}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }}
                  className={`rounded-3xl border overflow-hidden transition-all cursor-pointer ${
                    isOpen ? "border-white/20 bg-white/[0.04]" : "border-white/5 bg-white/[0.02] hover:border-white/10"
                  }`}
                  onClick={() => setOpenVehicle(isOpen ? null : v.id)}
                >
                  {/* Card header */}
                  <div className="p-6 md:p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${v.color}20` }}>
                        <div className="w-3 h-3 rounded-full" style={{ background: v.color }} />
                      </div>
                      <span className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-white/30">{v.entry}</span>
                    </div>
                    <h3 className="text-[20px] md:text-[22px] font-display font-medium mb-1">{v.name}</h3>
                    <p className="text-[13px] text-white/40 mb-4">{v.tagline}</p>
                    <p className="text-[13px] text-white/50 leading-relaxed">{v.desc}</p>

                    {/* Metrics row */}
                    <div className="grid grid-cols-4 gap-3 mt-6">
                      {v.metrics.map((m, j) => (
                        <div key={j}>
                          <p className="text-[14px] font-display font-medium" style={{ color: v.color }}>{m.value}</p>
                          <p className="text-[9px] font-mono tracking-wider uppercase text-white/25 mt-1">{m.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Expandable section */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="overflow-hidden border-t border-white/5"
                      >
                        <div className="p-6 md:p-8 space-y-3">
                          <div className="flex justify-between text-[12px]">
                            <span className="text-white/30 font-mono uppercase tracking-wider">Structure</span>
                            <span className="text-white/70">{v.structure}</span>
                          </div>
                          <div className="flex justify-between text-[12px]">
                            <span className="text-white/30 font-mono uppercase tracking-wider">Best for</span>
                            <span className="text-white/70 text-right max-w-[60%]">{v.bestFor}</span>
                          </div>
                          <Link to="/capital" className="flex items-center gap-2 text-[12px] font-bold text-[#FF4D00] hover:gap-3 transition-all mt-2">
                            Invest via this vehicle <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
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

      {/* ── TIERS ── */}
      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }}
            className="mb-12"
          >
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-4">Investment Tiers</span>
            <h2 className="font-display text-[32px] md:text-[48px] font-medium tracking-tight">From solidarity to anchor.</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }}
                className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:border-white/15 transition-colors"
              >
                <p className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-3">{tier.name}</p>
                <p className="text-[28px] font-display font-medium mb-4">{tier.amount}</p>
                <ul className="space-y-2">
                  {tier.perks.map((perk, j) => (
                    <li key={j} className="text-[12px] text-white/50 flex items-start gap-2">
                      <span className="text-[#FF4D00] mt-0.5">→</span> {perk}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }}
            className="mb-10"
          >
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-4">FAQ</span>
            <h2 className="font-display text-[32px] md:text-[48px] font-medium tracking-tight">Questions.</h2>
          </motion.div>

          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-[14px] font-medium pr-4">{faq.q}</span>
                  {openFaq === i ? <Minus className="w-4 h-4 text-[#FF4D00] flex-shrink-0" /> : <Plus className="w-4 h-4 text-white/30 flex-shrink-0" />}
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-[13px] text-white/50 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto bg-[#FF4D00]/5 border border-[#FF4D00]/15 rounded-3xl p-10 md:p-16 text-center">
          <h2 className="font-display text-[28px] md:text-[40px] font-medium tracking-tight mb-4">
            Start with <span className="text-[#FF4D00]">$500.</span>
          </h2>
          <p className="text-[14px] md:text-[16px] text-white/50 max-w-lg mx-auto mb-8">
            Solidarity pricing means early investors pay zero carry. The market forms before it's squeezed. Back the technology the next century needs — in the markets that need it most.
          </p>
          <Link to="/capital" className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF4D00] text-white text-[12px] font-bold tracking-wider rounded-full hover:bg-[#FF6A28] transition-colors">
            Invest Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
