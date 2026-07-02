"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, Plus, Minus, MapPin, Navigation } from "lucide-react";
import { Link } from "@/artemis/router";
import { routeLegs } from "@/artemis/data/routes";

const EASE = [0.22, 1, 0.36, 1] as const;

// We focus on Route Leg 1 (Gulf of Guinea Arc) but show all 6 legs as a navigable strip
const leg1 = routeLegs[0]; // Gulf of Guinea Arc

export function Route1() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { once: true, margin: "-80px" });
  const [activeLeg, setActiveLeg] = useState(0);
  const [openDeal, setOpenDeal] = useState<number | null>(0);
  const leg = routeLegs[activeLeg];

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen">
      {/* ── HERO ── */}
      <section className="px-6 md:px-12 lg:px-20 pt-32 md:pt-44 pb-16 md:pb-24">
        <div ref={heroRef} className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-2 h-2 rounded-full" style={{ background: leg.color || "#FF4D00" }} />
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00]">
              Route {leg.legNumber} of {routeLegs.length}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
            className="font-display text-[40px] sm:text-[56px] md:text-[72px] lg:text-[88px] font-medium leading-[0.95] tracking-[-0.03em] mb-4"
          >
            {leg.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
            className="text-[18px] md:text-[22px] text-white/40 italic mb-8"
          >
            {leg.subtitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
            className="text-[15px] md:text-[18px] leading-[1.7] text-white/50 max-w-3xl mb-10"
          >
            {leg.historicalAnchor}
          </motion.p>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35, ease: EASE }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            <div>
              <p className="text-[28px] font-display font-medium" style={{ color: leg.color }}>{leg.hubCount}</p>
              <p className="text-[10px] font-mono tracking-wider uppercase text-white/30 mt-1">Hubs</p>
            </div>
            <div>
              <p className="text-[28px] font-display font-medium" style={{ color: leg.color }}>{leg.countries.length}</p>
              <p className="text-[10px] font-mono tracking-wider uppercase text-white/30 mt-1">Countries</p>
            </div>
            <div>
              <p className="text-[28px] font-display font-medium" style={{ color: leg.color }}>{leg.keyCities.length}</p>
              <p className="text-[10px] font-mono tracking-wider uppercase text-white/30 mt-1">Key Cities</p>
            </div>
            <div>
              <p className="text-[28px] font-display font-medium" style={{ color: leg.color }}>{leg.signatureDeals.length}</p>
              <p className="text-[10px] font-mono tracking-wider uppercase text-white/30 mt-1">Signature Deals</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ROUTE SWITCHER (all 6 legs as pill tabs) ── */}
      <section className="px-6 md:px-12 lg:px-20 pb-8 border-t border-white/5 pt-8">
        <div className="max-w-[1400px] mx-auto flex gap-2 overflow-x-auto pb-2">
          {routeLegs.map((l, i) => (
            <button
              key={l.id}
              onClick={() => setActiveLeg(i)}
              className={`px-4 py-2.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                activeLeg === i
                  ? "text-white"
                  : "text-white/40 hover:text-white/70"
              }`}
              style={activeLeg === i ? { background: `${l.color}20`, border: `1px solid ${l.color}50` } : { border: "1px solid transparent" }}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: l.color }} />
              Leg {l.legNumber}: {l.name}
            </button>
          ))}
        </div>
      </section>

      {/* ── CORE FLOWS ── */}
      <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }}
            className="mb-10"
          >
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-4">Core Flows</span>
            <h2 className="font-display text-[28px] md:text-[40px] font-medium tracking-tight">What moves along this route.</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Goods", value: leg.coreFlows.goods, color: leg.color },
              { label: "Capital", value: leg.coreFlows.capital, color: leg.color },
              { label: "Data", value: leg.coreFlows.data, color: leg.color },
              { label: "People", value: leg.coreFlows.people, color: leg.color },
            ].map((flow, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }}
                className="rounded-2xl border border-white/5 bg-white/[0.02] p-6"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-4" style={{ background: `${flow.color}15` }}>
                  <Navigation className="w-4 h-4" style={{ color: flow.color }} />
                </div>
                <p className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/30 mb-2">{flow.label}</p>
                <p className="text-[13px] text-white/60 leading-relaxed">{flow.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KEY CITIES ── */}
      <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }}
            className="mb-10"
          >
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-4">Key Cities</span>
            <h2 className="font-display text-[28px] md:text-[40px] font-medium tracking-tight">The hubs that anchor the route.</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {leg.keyCities.map((city, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }}
                className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:border-white/15 transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4" style={{ color: leg.color }} />
                  <h3 className="text-[18px] font-display font-medium">{city.name}</h3>
                </div>
                <p className="text-[13px] text-white/50 leading-relaxed">{city.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SIGNATURE DEALS ── */}
      <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }}
            className="mb-10"
          >
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-4">Signature Deals</span>
            <h2 className="font-display text-[28px] md:text-[40px] font-medium tracking-tight">What the cohort experiences.</h2>
          </motion.div>

          <div className="space-y-3">
            {leg.signatureDeals.map((deal, i) => (
              <div key={i} className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden">
                <button
                  onClick={() => setOpenDeal(openDeal === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${leg.color}15` }}>
                      <span className="text-[12px] font-bold" style={{ color: leg.color }}>{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <div>
                      <h3 className="text-[15px] font-medium">{deal.name}</h3>
                      <p className="text-[11px] text-white/30 mt-0.5">{deal.duration} · {deal.focus.slice(0, 60)}...</p>
                    </div>
                  </div>
                  {openDeal === i ? <Minus className="w-4 h-4 text-[#FF4D00] flex-shrink-0" /> : <Plus className="w-4 h-4 text-white/30 flex-shrink-0" />}
                </button>
                <AnimatePresence>
                  {openDeal === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 md:px-6 pb-6 pl-16 md:pl-[68px]">
                        <p className="text-[13px] text-white/50 leading-relaxed mb-4">{deal.focus}</p>
                        <div className="flex flex-wrap gap-2">
                          {deal.inclusions.map((inc, j) => (
                            <span key={j} className="text-[11px] px-3 py-1.5 rounded-full bg-white/5 text-white/50 border border-white/5">
                              {inc}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CULTURAL WEAVING ── */}
      <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }}
            className="mb-10"
          >
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-4">Cultural Weaving</span>
            <h2 className="font-display text-[28px] md:text-[40px] font-medium tracking-tight">The route is not just geography.</h2>
          </motion.div>

          <div className="space-y-6">
            {[
              { label: "Commons Feast", text: leg.culturalWeaving.commonsFeast },
              { label: "Heritage Walk", text: leg.culturalWeaving.heritageWalk },
              { label: "Ritual Closing", text: leg.culturalWeaving.ritualClosing },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1, ease: EASE }}
                className="border-l-2 pl-6" style={{ borderColor: leg.color }}
              >
                <p className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-2" style={{ color: leg.color }}>{item.label}</p>
                <p className="text-[14px] text-white/50 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEAL THESIS ── */}
      <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }}
            className="rounded-3xl border p-8 md:p-12"
            style={{ borderColor: `${leg.color}30`, background: `${leg.color}05` }}
          >
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase block mb-4" style={{ color: leg.color }}>
              Route Deal Thesis
            </span>
            <h3 className="font-display text-[24px] md:text-[32px] font-medium mb-6">{leg.routeDealThesis.title}</h3>
            <p className="text-[14px] md:text-[16px] text-white/60 leading-[1.7]">{leg.routeDealThesis.description}</p>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="font-display text-[28px] md:text-[40px] font-medium tracking-tight mb-4">
            Walk the route. <span className="text-[#FF4D00]">See the engine.</span>
          </h2>
          <p className="text-[14px] text-white/50 max-w-lg mx-auto mb-8">
            The xRoute Expedition takes you along this route — 14 days, 4–6 cities, XEmbassies, deployed ProtoCos, and Commons Feasts.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/programs/xroute-expedition" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#FF4D00] text-white text-[12px] font-bold tracking-wider rounded-full hover:bg-[#FF6A28] transition-colors">
              Join the Expedition <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/routes" className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/15 text-white/70 text-[12px] font-bold tracking-wider rounded-full hover:border-white/40 hover:text-white transition-colors">
              Full Routes Map <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
