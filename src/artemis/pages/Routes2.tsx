"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, Plus, Minus, MapPin, Navigation, X } from "lucide-react";
import { Link } from "@/artemis/router";
import { routeLegs } from "@/artemis/data/routes";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Routes2() {
  const [activeLeg, setActiveLeg] = useState<string | null>(null);
  const [expandedLeg, setExpandedLeg] = useState<string | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveLeg((prev) => {
        const idx = prev ? routeLegs.findIndex((l) => l.id === prev) : -1;
        return routeLegs[(idx + 1) % routeLegs.length].id;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const selectLeg = useCallback((id: string | null) => {
    setIsAutoPlaying(false);
    setActiveLeg(id);
    if (id) setExpandedLeg(id);
  }, []);

  return (
    <div className="bg-[#0A0A0A] text-white">
      {/* ═══ HERO ═══ */}
      <section className="px-6 md:px-12 lg:px-20 pt-32 md:pt-48 pb-20 md:pb-32 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#FF4D00]/6 blur-[150px] pointer-events-none" />
        <div ref={heroRef} className="max-w-4xl mx-auto text-center relative z-10">
          <motion.span initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }} className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-8">
            The Ba-Hanse · Six Legs
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.05, ease: EASE }} className="font-display text-[44px] sm:text-[60px] md:text-[80px] lg:text-[96px] font-medium leading-[0.95] tracking-[-0.03em] mb-8">
            Borders are not the<br /><span className="text-white/30">real geography. </span><span className="text-[#FF4D00]">Flow</span> is.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2, ease: EASE }} className="text-[16px] md:text-[20px] leading-[1.6] text-white/50 max-w-2xl mx-auto mb-12">
            A union of flow. Six legs. 190+ hubs. 35+ countries. One circulatory system where goods, capital, data, and people move not across borders, but through them.
          </motion.p>
          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.35, ease: EASE }} className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { value: "6", label: "Legs" }, { value: "190+", label: "Hubs" },
              { value: "35+", label: "Countries" }, { value: "100", label: "XCitizens/cohort" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-[32px] md:text-[44px] font-display font-medium text-[#FF4D00] leading-none">{s.value}</p>
                <p className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/30 mt-2">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ CINEMATIC BRIDGE ═══ */}
      <section className="px-6 md:px-12 lg:px-20 pb-8 md:pb-12">
        <div className="max-w-[1400px] mx-auto rounded-3xl overflow-hidden shadow-2xl">
          <div className="relative h-[50vh] md:h-[65vh]">
            <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1920&q=80" alt="The routes" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-14">
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE }}>
                <p className="text-[22px] md:text-[32px] font-display font-medium leading-[1.2] max-w-2xl mb-3">
                  The route is not a road. It is a <span className="text-[#FF4D00]">covenant</span>.
                </p>
                <p className="text-[14px] md:text-[16px] text-white/50 leading-relaxed max-w-xl">
                  For a thousand years, caravans crossed the Sahel carrying salt, gold, and manuscripts. The route was not a road: it was a covenant for surviving hostile terrain through distributed knowledge. xCelero rebuilds that covenant for the next century.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ LEG FILTER PILLS ═══ */}
      <section className="px-6 md:px-12 lg:px-20 py-8 md:py-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00]">The Six Legs</span>
            {isAutoPlaying && <span className="flex items-center gap-1.5 text-[9px] font-mono font-bold tracking-[0.12em] uppercase text-[#FF4D00]/60"><span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] animate-pulse" />Auto-playing</span>}
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => selectLeg(null)} className={`px-4 py-2 text-[11px] font-mono font-bold tracking-widest uppercase border rounded-full transition-all ${activeLeg === null ? "bg-white text-[#0A0A0A] border-white" : "text-white/50 border-white/10 hover:border-white/30 hover:scale-105"}`}>All Legs</button>
            {routeLegs.map((leg) => (
              <button key={leg.id} onClick={() => selectLeg(leg.id)} className={`px-4 py-2 text-[11px] font-mono font-bold tracking-widest uppercase border rounded-full transition-all ${activeLeg === leg.id ? "text-white border-transparent" : "text-white/50 border-white/10 hover:border-white/30 hover:scale-105"}`} style={activeLeg === leg.id ? { backgroundColor: leg.color, borderColor: leg.color } : {}}>
                {leg.legNumber}. {leg.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ LEG CARDS (Apple-style expandable cards) ═══ */}
      <section className="px-6 md:px-12 lg:px-20 pb-20 md:pb-28">
        <div className="max-w-[1400px] mx-auto space-y-4">
          {routeLegs.map((leg, idx) => {
            const isExpanded = expandedLeg === leg.id;
            const isActive = activeLeg === leg.id;
            return (
              <motion.div key={leg.id} id={`leg-${leg.id}`}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.06, ease: EASE }}
                className={`rounded-3xl border overflow-hidden transition-all ${isExpanded ? "border-white/15 bg-white/[0.03] shadow-xl" : isActive ? "border-white/10 bg-white/[0.02]" : "border-white/5 bg-white/[0.01] hover:border-white/10"}`}>
                {/* Header */}
                <button onClick={() => { setExpandedLeg(isExpanded ? null : leg.id); setIsAutoPlaying(false); setActiveLeg(leg.id); }} className="w-full flex items-center justify-between p-6 md:p-8 text-left group">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: `${leg.color}20` }}>
                      <span className="text-[16px] font-display font-bold" style={{ color: leg.color }}>{leg.legNumber}</span>
                    </div>
                    <div>
                      <h3 className="text-[18px] md:text-[22px] font-display font-medium">{leg.name}</h3>
                      <p className="text-[12px] text-white/35 mt-0.5">{leg.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="hidden md:flex items-center gap-4 text-right">
                      <div><p className="text-[16px] font-display font-medium" style={{ color: leg.color }}>{leg.hubCount}</p><p className="text-[9px] font-mono tracking-wider uppercase text-white/25">Hubs</p></div>
                      <div><p className="text-[16px] font-display font-medium" style={{ color: leg.color }}>{leg.countries.length}</p><p className="text-[9px] font-mono tracking-wider uppercase text-white/25">Countries</p></div>
                    </div>
                    {isExpanded ? <Minus className="w-5 h-5 text-[#FF4D00]" /> : <Plus className="w-5 h-5 text-white/30 group-hover:text-white/60" />}
                  </div>
                </button>
                {/* Expanded content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: EASE }} className="overflow-hidden border-t border-white/5">
                      <div className="p-6 md:p-8 space-y-8">
                        {/* Historical anchor */}
                        <div>
                          <p className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-3" style={{ color: leg.color }}>Historical Anchor</p>
                          <p className="text-[14px] text-white/55 leading-relaxed">{leg.historicalAnchor}</p>
                        </div>
                        {/* Core flows */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {[{ l: "Goods", v: leg.coreFlows.goods }, { l: "Capital", v: leg.coreFlows.capital }, { l: "Data", v: leg.coreFlows.data }, { l: "People", v: leg.coreFlows.people }].map((f, i) => (
                            <div key={i} className="rounded-2xl border border-white/5 p-4">
                              <Navigation className="w-4 h-4 mb-2" style={{ color: leg.color }} />
                              <p className="text-[10px] font-mono font-bold tracking-wider uppercase text-white/30 mb-1">{f.l}</p>
                              <p className="text-[12px] text-white/50 leading-relaxed">{f.v}</p>
                            </div>
                          ))}
                        </div>
                        {/* Key cities */}
                        <div>
                          <p className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-4" style={{ color: leg.color }}>Key Cities</p>
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {leg.keyCities.map((city, i) => (
                              <div key={i} className="flex items-start gap-3 rounded-2xl border border-white/5 p-4 hover:border-white/10 transition-colors">
                                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: leg.color }} />
                                <div><p className="text-[14px] font-medium">{city.name}</p><p className="text-[12px] text-white/40 mt-1 leading-relaxed">{city.description}</p></div>
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* Signature deals */}
                        <div>
                          <p className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-4" style={{ color: leg.color }}>Signature Deals</p>
                          <div className="space-y-3">
                            {leg.signatureDeals.map((deal, i) => (
                              <div key={i} className="rounded-2xl border border-white/5 p-5">
                                <div className="flex items-center gap-3 mb-2">
                                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${leg.color}15` }}><span className="text-[11px] font-bold" style={{ color: leg.color }}>{String(i + 1).padStart(2, "0")}</span></div>
                                  <p className="text-[14px] font-medium">{deal.name}</p>
                                  <span className="text-[10px] font-mono text-white/25 ml-auto">{deal.duration}</span>
                                </div>
                                <p className="text-[12px] text-white/45 leading-relaxed mb-3">{deal.focus}</p>
                                <div className="flex flex-wrap gap-2">{deal.inclusions.map((inc, j) => (<span key={j} className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 text-white/40 border border-white/5">{inc}</span>))}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* Cultural weaving */}
                        <div>
                          <p className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-4" style={{ color: leg.color }}>Cultural Weaving</p>
                          <div className="space-y-4">
                            {[{ l: "Commons Feast", t: leg.culturalWeaving.commonsFeast }, { l: "Heritage Walk", t: leg.culturalWeaving.heritageWalk }, { l: "Ritual Closing", t: leg.culturalWeaving.ritualClosing }].map((c, i) => (
                              <div key={i} className="border-l-2 pl-5" style={{ borderColor: leg.color }}>
                                <p className="text-[10px] font-mono font-bold tracking-wider uppercase mb-1.5" style={{ color: leg.color }}>{c.l}</p>
                                <p className="text-[13px] text-white/45 leading-relaxed">{c.t}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* Deal thesis */}
                        <div className="rounded-2xl p-6" style={{ background: `${leg.color}08`, border: `1px solid ${leg.color}20` }}>
                          <p className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-3" style={{ color: leg.color }}>Route Deal Thesis</p>
                          <h4 className="text-[18px] font-display font-medium mb-4">{leg.routeDealThesis.title}</h4>
                          <p className="text-[13px] text-white/50 leading-relaxed">{leg.routeDealThesis.description}</p>
                        </div>
                        {/* CTA */}
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Link to="/programs/xroute-expedition" className="inline-flex items-center gap-2 px-6 py-3 text-[12px] font-bold rounded-full transition-all hover:scale-105" style={{ background: leg.color, color: "#fff" }}>Join the Expedition <ArrowRight className="w-4 h-4" /></Link>
                          <Link to="/routes" className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 text-white/60 text-[12px] font-bold rounded-full hover:border-white/40 hover:text-white transition-all">Full Map <ArrowUpRight className="w-3.5 h-3.5" /></Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto rounded-3xl border border-[#FF4D00]/15 bg-[#FF4D00]/5 p-10 md:p-16 text-center">
          <h2 className="font-display text-[28px] md:text-[44px] font-medium tracking-tight mb-4">Walk the route. <span className="text-[#FF4D00]">See the engine.</span></h2>
          <p className="text-[14px] text-white/50 max-w-lg mx-auto mb-8">The xRoute Expedition takes you along any leg — 14 days, 4–6 cities, XEmbassies, deployed ProtoCos, and Commons Feasts.</p>
          <Link to="/programs/xroute-expedition" className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF4D00] text-white text-[12px] font-bold tracking-wider rounded-full hover:bg-[#FF6A28] transition-all hover:scale-105">Join the Expedition <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </section>
    </div>
  );
}
