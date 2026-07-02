"use client";

import { useRef, useState, useMemo, useEffect, useCallback, Fragment } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "@/artemis/router";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Building2,
  Rocket,
  Coins,
  Users,
  MapPin,
  Check,
  Calendar,
  Clock,
  Star,
  Zap,
  TrendingUp,
  Globe2,
  Play,
  ChevronRight,
  X,
  Sparkles,
} from "lucide-react";
import { ReviewSection } from "@/artemis/components/ReviewSection";
import { routeLegs, MAP_LOCATIONS } from "@/artemis/data/routes";
import { venturesData } from "@/artemis/data/ventures";

/* ── Data ── */

/* Hero slideshow (adopted from Home 2 cinematic hero) */
const heroSlides = [
  {
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80",
    alt: "Engineer operating advanced machinery",
    position: "center 35%",
  },
  {
    src: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1920&q=80",
    alt: "Solar panel field at dawn",
    position: "center 40%",
  },
  {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80",
    alt: "Circuit board macro detail",
    position: "center 45%",
  },
  {
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80",
    alt: "Earth from space at night",
    position: "center 50%",
  },
];

/* Live ticker metrics */
const tickerMetrics = [
  { label: "Companies on the Route", value: "5,000+" },
  { label: "Projected unicorns", value: "200+" },
  { label: "Hub locations", value: "190" },
  { label: "Countries", value: "39" },
  { label: "Investment vehicles", value: "6" },
  { label: "Civilizational fields", value: "9" },
];

const stats = [
  { value: 5000, prefix: "", suffix: "+", label: "Market-defining companies on the Route", icon: Rocket },
  { value: 1, prefix: "$", suffix: "T+", label: "Projected portfolio value at scale", icon: TrendingUp },
  { value: 200, prefix: "", suffix: "+", label: "Unicorns projected", icon: Zap },
  { value: 190, prefix: "", suffix: "", label: "Hub locations across 39 countries", icon: Globe2 },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Pillars for the interactive showcase (transferred from Home 2) ── */
const showcasePillars = [
  {
    id: "infrastructure",
    icon: Building2,
    label: "01",
    title: "Infrastructure",
    tagline: "The physical substrate",
    description:
      "M1 Core campuses, XEmbassy nodes, and distributed living labs. We build the physical and digital substrate ventures need to move from prototype to production — 50,000+ sq ft of lab, maker, and co-working space in prime hub cities.",
    stats: [
      { value: "190", label: "Hub locations" },
      { value: "39", label: "Countries" },
      { value: "50K", label: "Sq ft / campus" },
    ],
    image:
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80",
    image2:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80",
    link: "/infrastructure",
  },
  {
    id: "ventures",
    icon: Rocket,
    label: "02",
    title: "Ventures",
    tagline: "Critical technology, commercialized",
    description:
      "Structured commercialization programs take ventures from idea to revenue, co-designed with industry and government partners who provide market access, pilot opportunities, and first-customer contracts across the Route.",
    stats: [
      { value: "40+", label: "Portfolio companies" },
      { value: "9", label: "Verticals" },
      { value: "24", label: "MIT steps" },
    ],
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
    image2:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80",
    link: "/ventures",
  },
  {
    id: "capital",
    icon: Coins,
    label: "03",
    title: "Capital",
    tagline: "Aligned, from $500 to $250K+",
    description:
      "Capital that matches the realities of building in the Global South — venture funds, development finance, and a non-dilutive desk matching ventures with grants and incentives across 39+ countries. Solidarity pricing, every stage.",
    stats: [
      { value: "$500", label: "Entry point" },
      { value: "6", label: "Vehicles" },
      { value: "39+", label: "Grant markets" },
    ],
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
    image2:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    link: "/capital",
  },
  {
    id: "community",
    icon: Users,
    label: "04",
    title: "Community",
    tagline: "The connective tissue",
    description:
      "The XCitizens network spans every hub — operators who run infrastructure, founders building ventures, investors deploying capital, mentors transferring knowledge. Compound network effects turn efforts into collective momentum.",
    stats: [
      { value: "100", label: "XCitizens / cohort" },
      { value: "190", label: "Hubs connected" },
      { value: "∞", label: "Compounding" },
    ],
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    image2:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
    link: "/community",
  },
];

/* ══════════════════════════════════════════════════════════════════════════
   HOME
   ══════════════════════════════════════════════════════════════════════════ */
export function Home() {
  return (
    <div className="bg-white text-[#111111]">
      <Hero />
      <ThesisSection />
      <OperatingBeliefsSection />
      <NumbersSection />
      <FourPillarsEngine />
      <VentureGallery />
      <LocationsSection />
      <NowFutureSection />
      <UpcomingEventsSection />
      <ReviewSection title="Dispatches from the field" />
      <NewsletterSection />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   HERO — Cinematic, dark, kinetic headline, metric ticker
   Contained within max-w-[1400px] (adopted from Home 2, width-constrained)
   ══════════════════════════════════════════════════════════════════════════ */
function Hero() {
  const [current, setCurrent] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { once: true, margin: "-80px" });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((p) => (p + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  const headlineWords = ["Build", "the", "next", "century."];

  return (
    <section className="relative w-full px-6 md:px-12 lg:px-20 pt-4 md:pt-6">
      {/* Contained cinematic hero — constant width, not full-bleed */}
      <div
        ref={heroRef}
        className="relative w-full max-w-[1400px] mx-auto overflow-hidden bg-[#0A0A0A] rounded-sm"
      >
        {/* Slideshow */}
        <div className="relative h-[60vh] sm:h-[68vh] md:h-[78vh] lg:h-[82vh]">
          {heroSlides.map((img, i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{
                opacity: i === current ? 1 : 0,
                scale: i === current ? 1 : 1.06,
              }}
              transition={{ duration: 1.1, ease: EASE }}
              className="absolute inset-0"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
                style={{ objectPosition: img.position }}
                loading={i === 0 ? "eager" : "lazy"}
              />
            </motion.div>
          ))}

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/55 to-[#0A0A0A]/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/70 via-transparent to-transparent" />

          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />

          {/* Corner labels */}
          <div className="absolute top-6 left-6 md:top-8 md:left-10 flex items-center gap-2 text-white/40 z-10">
            <span className="w-1.5 h-1.5 bg-[#FF4D00] animate-pulse" />
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase">xCelero Labs</span>
          </div>
          <div className="absolute top-6 right-6 md:top-8 md:right-10 text-white/40 z-10 text-[10px] font-mono tracking-[0.3em] uppercase hidden sm:block">
            Critical Technology
          </div>

          {/* Content */}
          <div className="relative z-10 w-full h-full flex flex-col justify-end px-6 md:px-12 lg:px-16 pb-12 md:pb-16">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-[10px] md:text-[11px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] mb-5 md:mb-7"
            >
              Venture platform for critical technology
            </motion.span>

            {/* Kinetic headline */}
            <h1 className="font-display font-medium tracking-[-0.03em] leading-[0.9] text-white text-[12vw] sm:text-[10vw] md:text-[7vw] lg:text-[6vw] xl:text-[88px] mb-8 md:mb-10">
              {headlineWords.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.18em]">
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={isInView ? { y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.15 + i * 0.09, ease: EASE }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Sub + CTAs — stacked vertically to fit constrained width */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
              className="text-white/55 text-[14px] md:text-[16px] font-medium leading-[1.6] max-w-lg mb-6"
            >
              A network of 190 hubs across 39 countries — a single
              commercialization engine to accelerate human civilization:
              infrastructure to build, ventures to solve, capital to scale,
              and community to compound, across every domain that matters.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.75, ease: EASE }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link
                to="/capital"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#FF4D00] text-white text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-[#FF6A28] transition-colors"
              >
                Invest from $500
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/ventures"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-white/25 text-white text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-white hover:text-[#0A0A0A] transition-colors"
              >
                <Play className="w-3.5 h-3.5" />
                Explore ventures
              </Link>
            </motion.div>

            {/* Slide indicators + scroll cue */}
            <div className="mt-10 md:mt-12 flex items-center justify-between">
              <div className="flex gap-1.5">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    suppressHydrationWarning
                    onClick={() => setCurrent(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className="min-h-[32px] min-w-[32px] flex items-center"
                  >
                    <span
                      className={`block h-[2px] transition-all duration-500 ${
                        i === current ? "bg-[#FF4D00] w-12" : "bg-white/25 w-7"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 1, ease: EASE }}
                className="hidden md:flex items-center gap-2 text-white/40 text-[10px] font-mono tracking-[0.2em] uppercase"
              >
                Scroll
                <motion.span
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  ↓
                </motion.span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Metric ticker */}
        <MetricTicker />
      </div>
    </section>
  );
}

/* ── Metric ticker (marquee) ── */
function MetricTicker() {
  const items = [...tickerMetrics, ...tickerMetrics];
  return (
    <div className="relative z-10 border-t border-white/10 bg-[#0A0A0A] overflow-hidden">
      <div className="flex w-max animate-[scroll_38s_linear_infinite] hover:[animation-play-state:paused]">
        {items.map((m, i) => (
          <div key={i} className="flex items-center gap-3 px-8 py-4 border-r border-white/8 whitespace-nowrap">
            <span className="text-[#FF4D00] text-lg md:text-xl font-display font-medium">{m.value}</span>
            <span className="text-white/40 text-[10px] md:text-[11px] font-mono tracking-[0.15em] uppercase">{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   THE THESIS — bold statement, centered (transferred from Home 2)
   ══════════════════════════════════════════════════════════════════════════ */
function ThesisSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 md:py-36 bg-[#FAFAFA]">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-8"
        >
          The thesis
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          className="font-display font-medium tracking-[-0.025em] leading-[1.05] text-[30px] sm:text-[40px] md:text-[54px] lg:text-[68px] text-[#111111]"
        >
          The next century of human civilization will be built — or lost — in the
          markets that need its breakthroughs most.{" "}
          <span className="text-[#111111]/35">
            We are building the engine to make sure it is built.
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-4xl"
        >
          {[
            {
              k: "The stakes",
              v: "Food, water, energy, health, knowledge — twenty domains on which a civilization of ten billion depends. Each has a bottleneck the century will not forgive.",
            },
            {
              k: "The engine",
              v: "Infrastructure to build, ventures to solve, capital to scale, and community to compound — four pillars fused into one commercialization machine, across 190 hubs and 39 countries.",
            },
            {
              k: "The outcome",
              v: "Not a forecast, but a blueprint. The bottlenecks break open, domain by domain, until the future is not something we wait for — but something we ship.",
            },
          ].map((b) => (
            <div key={b.k} className="border-t border-[#111111]/15 pt-5">
              <p className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-3">
                {b.k}
              </p>
              <p className="text-[14px] md:text-[15px] text-[#111111]/70 font-medium leading-[1.6]">
                {b.v}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


/* ══════════════════════════════════════════════════════════════════════════
   NUMBERS SECTION: Animated counting stats
   ══════════════════════════════════════════════════════════════════════════ */
function AnimatedCounter({ value, prefix, suffix, duration = 2 }: {
  value: number;
  prefix: string;
  suffix: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.disconnect();

          let startTime: number | null = null;
          let animationFrame: number;

          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(value * eased);

            if (progress < 1) {
              animationFrame = requestAnimationFrame(animate);
            }
          };

          animationFrame = requestAnimationFrame(animate);
          return () => cancelAnimationFrame(animationFrame);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated, value, duration]);

  const displayValue = value % 1 === 0 ? Math.round(count) : count.toFixed(1);

  return (
    <div ref={ref} className="tabular-nums">
      <span className="text-[36px] sm:text-[48px] md:text-[72px] lg:text-[88px] font-display font-medium tracking-[-0.03em] leading-[1]">
        {prefix}{displayValue}{suffix}
      </span>
    </div>
  );
}

function NumbersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-20 md:py-32 px-6 md:px-12 lg:px-20 border-t border-[#111111]/10 bg-[#FAFAFA]"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#FF4D00] block mb-4">
            By the numbers
          </span>
          <span className="text-[28px] sm:text-[36px] md:text-[48px] font-display font-medium tracking-[-0.02em] text-[#111111]/80 leading-[1.1]">
            10-Year Outlook
          </span>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`border-t border-[#111111]/10 pt-8 pb-8 ${
                  i > 0 ? "lg:border-l lg:pl-8" : ""
                } ${i % 2 === 1 ? "pl-6 sm:pl-8" : ""}`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Icon className="w-4 h-4 text-[#FF4D00]" strokeWidth={1.5} />
                  <span className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
                <div className="text-[13px] md:text-[15px] leading-[1.5] text-[#111111]/50 font-medium max-w-[200px] mt-4">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   OPERATING BELIEFS — dark contained section, contrarian tenets (Thiel-style)
   ══════════════════════════════════════════════════════════════════════════ */
function OperatingBeliefsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const beliefs = [
    {
      tenet: "Infrastructure before innovation.",
      body: "A lab in Kigali that can't manufacture, ship, or get paid isn't innovation — it's waste. The substrate that lets breakthroughs compound is the scarce thing. We build that.",
      tag: "Sect I",
    },
    {
      tenet: "Connected mediocrity beats isolated genius.",
      body: "A B+ venture wired into 190 hubs compounds past an A+ venture trapped in one. The network is the moat. The idea is a commodity. We build the connections, not the unicorns.",
      tag: "Sect II",
    },
    {
      tenet: "Money exists. Connection doesn't.",
      body: "Capital flows to returns. What's missing is the commercialization rail that turns capital into compounding infrastructure. Solidarity pricing isn't charity — it's the strategy that lets the market form before it's squeezed.",
      tag: "Sect III",
    },
  ];

  return (
    <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28">
      <div
        ref={ref}
        className="relative w-full max-w-[1400px] mx-auto bg-[#0A0A0A] text-white overflow-hidden rounded-sm"
      >
        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        {/* Radial glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF4D00]/8 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative px-6 md:px-12 lg:px-16 py-16 md:py-24">
          {/* Header */}
          <div className="mb-12 md:mb-16 max-w-3xl">
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-6"
            >
              The sects xCelero is built on
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE }}
              className="font-display font-medium tracking-[-0.025em] leading-[0.98] text-[28px] sm:text-[40px] md:text-[52px] lg:text-[60px]"
            >
              The sects xCelero
              <br />
              <span className="text-white/30">is built on.</span>
            </motion.h2>
          </div>

          {/* Contrarian beliefs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/8 border border-white/8">
            {beliefs.map((b, i) => (
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
                className="bg-[#0A0A0A] p-7 md:p-9 flex flex-col"
              >
                {/* Sect tag */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#FF4D00]">{b.tag}</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                {/* The tenet (bold) */}
                <blockquote className="text-[19px] md:text-[21px] lg:text-[23px] font-display font-medium tracking-tight leading-[1.3] text-white mb-5">
                  {b.tenet}
                </blockquote>

                {/* The body */}
                <p className="text-[13px] md:text-[14px] text-white/55 leading-[1.6] flex-1">
                  {b.body}
                </p>
              </motion.figure>
            ))}
          </div>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            className="mt-10 md:mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 border-t border-white/10"
          >
            <p className="text-[13px] md:text-[14px] text-white/50 font-medium leading-[1.6] max-w-md">
              These aren&apos;t aspirations. They&apos;re the constraints every pillar, program, and venture is designed around.
            </p>
            <Link
              to="/manifesto"
              className="group inline-flex items-center gap-2 text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-white/40 hover:text-[#FF4D00] transition-colors flex-shrink-0"
            >
              Read the manifesto
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   FOUR PILLARS, ONE ENGINE — interactive tabbed showcase (transferred from Home 2)
   ══════════════════════════════════════════════════════════════════════════ */
function FourPillarsEngine() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-white">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-24">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-4">
              Four pillars, one engine
            </span>
            <h2 className="font-display font-medium tracking-[-0.025em] leading-[0.98] text-[32px] sm:text-[44px] md:text-[56px] lg:text-[64px] text-[#111111]">
              One machine,
              <br />
              <span className="text-[#111111]/35">four compounding parts.</span>
            </h2>
          </div>
          <p className="text-[14px] md:text-[15px] text-[#111111]/60 font-medium leading-[1.6] max-w-sm">
            Each pillar reinforces the others. Together they form a flywheel no
            single fund, accelerator, or government could replicate alone.
          </p>
        </div>

        {/* Pillar blocks — text left, 2 rectangular framed images right */}
        <div className="space-y-20 md:space-y-28">
          {showcasePillars.map((pillar, i) => {
            const PIcon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
                className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start"
              >
                {/* Left: text content */}
                <div className="lg:col-span-5 lg:sticky lg:top-[100px]">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 flex items-center justify-center border border-[#111111]/15">
                      <PIcon className="w-4 h-4 text-[#FF4D00]" strokeWidth={1.5} />
                    </div>
                    <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#111111]/40">
                      {pillar.label}
                    </span>
                  </div>

                  <h3 className="font-display font-medium tracking-[-0.025em] text-[36px] sm:text-[48px] md:text-[64px] lg:text-[80px] leading-[0.9] mb-5 text-[#111111]">
                    {pillar.heading || pillar.title}
                  </h3>

                  <p className="text-[15px] md:text-[16px] text-[#111111]/60 font-medium leading-[1.6] max-w-md mb-4">
                    {pillar.subtext || pillar.tagline}
                  </p>

                  <p className="text-[14px] md:text-[15px] text-[#111111]/50 font-medium leading-[1.7] max-w-md mb-8">
                    {pillar.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-8 max-w-md">
                    {pillar.stats.map((s) => (
                      <div key={s.label} className="border-t border-[#111111]/15 pt-3">
                        <p className="font-display font-medium text-[26px] md:text-[32px] tracking-tight text-[#111111] leading-none">
                          {s.value}
                        </p>
                        <p className="text-[10px] font-mono tracking-[0.1em] uppercase text-[#111111]/45 mt-2">
                          {s.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Link
                    to={pillar.link}
                    className="group inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#FF4D00] hover:text-[#111111] transition-colors"
                  >
                    Explore {pillar.title}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Right: 2 rectangular framed images */}
                <div className="lg:col-span-7 grid grid-cols-2 gap-4 md:gap-5">
                  {/* Image 1 — taller */}
                  <div className="relative overflow-hidden bg-[#F5F5F5] aspect-[3/4] group">
                    <img
                      src={pillar.image}
                      alt={`${pillar.title} 1`}
                      className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      style={{ objectPosition: "center 30%" }}
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-[#111111]/10 pointer-events-none" />
                  </div>
                  {/* Image 2 — taller, offset down */}
                  <div className="relative overflow-hidden bg-[#F5F5F5] aspect-[3/4] mt-8 md:mt-12 group">
                    <img
                      src={pillar.image2}
                      alt={`${pillar.title} 2`}
                      className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      style={{ objectPosition: "center 30%" }}
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-[#111111]/10 pointer-events-none" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   THE PORTFOLIO · 40+ VENTURES — filterable grid (transferred from Home 2)
   ══════════════════════════════════════════════════════════════════════════ */
function VentureGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const verticals = useMemo(() => {
    const set = new Set(venturesData.map((v) => v.vertical));
    return ["All", ...Array.from(set)];
  }, []);
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(
    () =>
      filter === "All"
        ? venturesData.slice(0, 9)
        : venturesData.filter((v) => v.vertical === filter).slice(0, 9),
    [filter]
  );

  return (
    <section ref={ref} className="py-24 md:py-32 bg-[#FAFAFA]">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-12">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00] block mb-4">
              The portfolio · 40+ ventures
            </span>
            <h2 className="font-display font-medium tracking-[-0.025em] leading-[0.98] text-[32px] sm:text-[44px] md:text-[56px] lg:text-[64px] text-[#111111]">
              Critical technology,
              <br />
              <span className="text-[#111111]/35">for the markets that need it most.</span>
            </h2>
          </div>
          <Link
            to="/ventures"
            className="group inline-flex items-center gap-2 text-[11px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/50 hover:text-[#FF4D00] transition-colors flex-shrink-0"
          >
            All ventures
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {verticals.map((v) => (
            <button
              key={v}
              onClick={() => setFilter(v)}
              className={`px-4 py-2 text-[10px] font-mono font-bold tracking-[0.12em] uppercase border transition-colors ${
                filter === v
                  ? "bg-[#111111] text-white border-[#111111]"
                  : "bg-transparent text-[#111111]/55 border-[#111111]/15 hover:border-[#111111]/40"
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        {/* Grid — matches the Ventures page card layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((v, i) => (
              <motion.div
                key={v.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, delay: (i % 5) * 0.05, ease: EASE }}
              >
                <Link
                  to={`/ventures/${v.id}`}
                  className="group block text-left w-full"
                >
                  <div className="relative bg-[#111111] text-white overflow-hidden transition-all duration-200 group-hover:scale-[1.02] group-hover:brightness-110 group-hover:ring-1 group-hover:ring-[#FF4D00]">
                    {/* Top section: name + code */}
                    <div className="p-4 pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm font-display font-bold text-white leading-tight truncate">
                            {v.name}
                          </h3>
                          <span className="text-[10px] font-mono text-white/50 tracking-wider mt-1 block">
                            {v.code}
                          </span>
                        </div>
                      </div>

                      {/* Vertical badge */}
                      <div className="mt-2.5">
                        <span className="inline-block px-2 py-0.5 bg-white/10 text-[9px] font-mono uppercase tracking-widest text-white/70">
                          {v.vertical}
                        </span>
                      </div>
                    </div>

                    {/* Middle section: solution excerpt */}
                    <div className="px-4 pb-3">
                      <p className="text-[11px] text-white/70 leading-relaxed line-clamp-2">
                        {v.solution}
                      </p>
                    </div>

                    {/* Bottom section: anchor partners */}
                    <div className="px-4 pb-4 pt-1">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-white/30 block mb-0.5">
                        Anchor Partners
                      </span>
                      <span className="text-[11px] text-white/60 leading-snug line-clamp-1 block">
                        {v.anchorPartners}
                      </span>
                    </div>

                    {/* Bottom-right orange square with first letter */}
                    <div className="absolute bottom-3 right-3 w-8 h-8 bg-[#FF4D00] flex items-center justify-center font-display font-bold text-sm text-white">
                      {v.name.charAt(0)}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   NOW × FUTURE — full-bleed cinematic slideshow at humanity's scale.
   "The Now" auto-plays as a slideshow of the bottlenecks humanity faces;
   a pulsing prompt invites the viewer to transition, revealing "The Future"
   we are painting — the same domains, reimagined.
   ══════════════════════════════════════════════════════════════════════════ */
const nowFutureSlides = [
  {
    domain: "Food",
    now: {
      stat: "8,000 yrs",
      caption: "We must produce more food in the next four decades than all farmers in history have harvested over the past 8,000 years. By 2050, ten billion people will sit at the table. A billion may face starvation — hunger could be the century's most urgent problem.",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1920&q=80",
      position: "center 45%",
    },
    future: {
      stat: "10×",
      caption: "Vertical farms stacked forty stories high. AI-bred crops that double yield per drop of water. Lab-grown protein at a tenth of the cost of a cow. We feed ten billion on less land than we farmed in 1950 — and return the rest to forest.",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80",
      position: "center 50%",
    },
  },
  {
    domain: "Energy",
    now: {
      stat: "1.3B",
      caption: "One in five humans has no electricity. The rest burn the cheapest fuel they can find — coal, diesel, wood — and the sky over half the world's cities is a brown smear. Energy poverty is the silent tax on four billion lives.",
      image: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&w=1920&q=80",
      position: "center 40%",
    },
    future: {
      stat: "Too cheap to meter",
      caption: "Fusion reactors the size of a shipping container. Solar paint on every wall. Microgrids that trade power peer-to-peer. A kilowatt costs less than a glass of water, and the carbon curve bends not by sacrifice but by abundance.",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1920&q=80",
      position: "center 45%",
    },
  },
  {
    domain: "Water",
    now: {
      stat: "2B",
      caption: "Two billion people drink water that makes them sick. A child dies every eighty seconds from a waterborne disease. By 2030, half of humanity will live in water-stressed basins — the next wars may be fought over a river, not a border.",
      image: "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?auto=format&fit=crop&w=1920&q=80",
      position: "center 50%",
    },
    future: {
      stat: "Anywhere",
      caption: "Solar atmospheric generators pull clean water from desert air. Desalination at a tenth of today's energy. Every village has a tap. The well is no longer a matter of geography — it is a matter of engineering.",
      image: "https://images.unsplash.com/photo-1559825481-12a05cc00344?auto=format&fit=crop&w=1920&q=80",
      position: "center 40%",
    },
  },
  {
    domain: "Health",
    now: {
      stat: "1 in 5",
      caption: "One in five humans has access to basic diagnostics. The rest find out they are sick when it is already too late — a tumor the size of a fist, a heart half gone. More people die of preventable disease than of every war on earth combined.",
      image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1920&q=80",
      position: "center 45%",
    },
    future: {
      stat: "Predicted",
      caption: "The hospital of the future is a sensor in your bathroom mirror, a lab on your phone, an AI that catches your cancer at cell zero. Therapeutics printed on demand, priced like antibiotics. The ward empties — we stop treating disease and start preventing it.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1920&q=80",
      position: "center 40%",
    },
  },
  {
    domain: "Longevity",
    now: {
      stat: "73 yrs",
      caption: "Global life expectancy is seventy-three — and climbing only for the wealthy. The diseases of aging — dementia, cancer, heart failure — consume the majority of every health budget on earth. We spend a trillion dollars a year managing decline.",
      image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1920&q=80",
      position: "center 45%",
    },
    future: {
      stat: "120+",
      caption: "Cellular reprogramming resets the clock on aging tissues. Senolytics clear the dead cells that drag the body down. Gene therapy edits out the inherited sentence. A hundred and twenty becomes the new sixty — not for the few, but as a baseline.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1920&q=80",
      position: "center 40%",
    },
  },
  {
    domain: "Education",
    now: {
      stat: "617M",
      caption: "Six hundred and seventeen million children lack basic literacy. A child's zip code still decides their ceiling. The syllabus is a century behind the science. We have the sum of human knowledge on a server in California — and a billion kids who can't read the search box.",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1920&q=80",
      position: "center 45%",
    },
    future: {
      stat: "1:1",
      caption: "An AI tutor for every child — patient, fluent in every language, carrying the pedagogy of the best teacher who ever lived. Free. On a twenty-dollar phone. The gap between a kid in Kibera and a kid in Palo Alto collapses in a single generation.",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1920&q=80",
      position: "center 40%",
    },
  },
  {
    domain: "Finance",
    now: {
      stat: "1.4B",
      caption: "One point four billion adults are unbanked. Capital routes through everyone except the people who need it — remittances bleed fifteen percent in fees, a loan requires collateral the poor don't have. Money moves at the speed of a banker's lunch.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1920&q=80",
      position: "center 50%",
    },
    future: {
      stat: "Instant",
      caption: "Money becomes a native protocol of the internet — instant, borderless, costing a fraction of a cent to move. A farmer in Niger receives payment for her crop before the truck leaves the farm. The bank branch becomes a museum. Credit flows to the productive, not the connected.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1920&q=80",
      position: "center 45%",
    },
  },
  {
    domain: "Transport",
    now: {
      stat: "75%",
      caption: "Three quarters of the cost of a product in emerging markets is eaten by logistics. Goods wait weeks at broken borders. The average Lagos commuter spends more time in traffic than with their children. The road network was built for a population a tenth of today's.",
      image: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1920&q=80",
      position: "center 45%",
    },
    future: {
      stat: "Point-to-point",
      caption: "Electric vertical-takeoff aircraft hop between rooftops at two hundred miles an hour. Hyperloop tubes move freight and people at airline speed on the ground. One operating system routes rail, drone, river, and sky. The commute collapses from hours to minutes.",
      image: "https://images.unsplash.com/photo-1473042904451-00171c69419d?auto=format&fit=crop&w=1920&q=80",
      position: "center 40%",
    },
  },
  {
    domain: "Cities",
    now: {
      stat: "70%",
      caption: "By 2050, seven in ten humans will live in cities — most of them cities that don't exist yet, built without a plan, on land without sewers or power. The slum is the fastest-growing settlement type on earth. A billion people live in housing that would be condemned anywhere else.",
      image: "https://images.unsplash.com/photo-1496564203457-11bb12075d90?auto=format&fit=crop&w=1920&q=80",
      position: "center 45%",
    },
    future: {
      stat: "Built for a century",
      caption: "Cities that grow like coral — modular, prefabricated, self-powering, self-cleaning. Roads that charge the vehicles on them. Buildings that sequester carbon as they stand. The city is no longer a drain on the grid; it is the grid.",
      image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1920&q=80",
      position: "center 40%",
    },
  },
  {
    domain: "The Moon",
    now: {
      stat: "12",
      caption: "Twelve humans have walked on the Moon — and none since 1972. The last bootprint is older than most of the people reading this. We went, planted a flag, went home — and then stopped. The launch pad rusted for fifty years.",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1920&q=80",
      position: "center 45%",
    },
    future: {
      stat: "Open",
      caption: "A permanent settlement at the lunar south pole, mining water for fuel. A launchpad for Mars and beyond, free of Earth's gravity well. Industry moves off-world — the heavy, dirty, energy-intensive work of civilization happens where there is no biosphere to harm.",
      image: "https://images.unsplash.com/photo-1517976547714-720226b864c1?auto=format&fit=crop&w=1920&q=80",
      position: "center 45%",
    },
  },
  {
    domain: "Mars",
    now: {
      stat: "0",
      caption: "Zero humans have set foot on Mars. The closest planet that could ever be home is a thirty-million-mile desert, and we have sent only robots to look at it. For fifty years, Mars has been a photograph — not a destination.",
      image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1920&q=80",
      position: "center 40%",
    },
    future: {
      stat: "A second Earth",
      caption: "A self-sustaining city of a million — building their own steel, growing their own food, manufacturing their own rockets. Humanity becomes a multi-planetary species. The lights stay on even if one planet goes dark. The backup is no longer a server in Iceland; it is a world.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80",
      position: "center 50%",
    },
  },
  {
    domain: "Humanoid Robots",
    now: {
      stat: "Manual",
      caption: "Every phone, every shirt, every harvested field is made by human hands — hands that tire, that age, that cost. The global labor market is a hundred trillion dollars a year of human effort, much of it dull, dangerous, or beneath dignity. We are the only intelligent species that cleans its own sewers.",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1920&q=80",
      position: "center 45%",
    },
    future: {
      stat: "One per home",
      caption: "A humanoid robot that costs twenty thousand dollars and works twenty-four hours a day. It folds the laundry, builds the car, harvests the grain. The cost of labor falls by an order of magnitude. The question of the century is no longer how we find work for everyone — but what we do when work is optional.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1920&q=80",
      position: "center 40%",
    },
  },
  {
    domain: "Intelligence",
    now: {
      stat: "1%",
      caption: "The compute that trains a frontier AI model now costs a hundred million dollars and doubles every few months. The intelligence that will define this century is being concentrated in a handful of data centers owned by a handful of companies. Ninety-five percent of humanity has no seat at that table.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1920&q=80",
      position: "center 45%",
    },
    future: {
      stat: "Distributed",
      caption: "Compute becomes a utility — as cheap and ambient as electricity. Every phone, every car, every appliance runs frontier intelligence locally. The model isn't a walled garden; it is open infrastructure. The next Einstein could be a girl with a tablet in a village — and the AI that helps her think.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1920&q=80",
      position: "center 45%",
    },
  },
  {
    domain: "Manufacturing",
    now: {
      stat: "10×",
      caption: "Import-dependent economies ship raw materials out and buy the finished goods back at ten times the price. A country with the lithium sells the lithium, then buys back the battery. The value is added somewhere else. This is the cargo cult of the twenty-first century.",
      image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=1920&q=80",
      position: "center 45%",
    },
    future: {
      stat: "Local",
      caption: "Distributed micro-factories turn local inputs into local products — a 3D printer in every town, a CNC mill in every city. The supply chain shrinks from twelve thousand miles to twelve blocks. The factory of the future is the size of a garage and runs itself.",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1920&q=80",
      position: "center 40%",
    },
  },
  {
    domain: "Materials",
    now: {
      stat: "Finite",
      caption: "Every material we build with — steel, concrete, plastic, rare earth — is dug from a hole in the ground, used once, and thrown into another hole. We have mined the easy stuff; what's left is deeper, dirtier, and more expensive. The materials economy is a one-way pipe from mine to landfill.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80",
      position: "center 45%",
    },
    future: {
      stat: "Programmed",
      caption: "Materials designed atom by atom — concrete that heals its own cracks, steel that grows like bone, plastic that eats itself. We mine the landfill, not the mountain. The material economy becomes a loop, not a line.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80",
      position: "center 45%",
    },
  },
  {
    domain: "Connectivity",
    now: {
      stat: "2.6B",
      caption: "Two point six billion people have no internet. They are invisible to the digital economy — no bank account, no market, no voice. The connection that transformed the rich world in a single generation still hasn't reached a third of humanity.",
      image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=1920&q=80",
      position: "center 45%",
    },
    future: {
      stat: "100%",
      caption: "A constellation of low-orbit satellites blankets the earth in bandwidth. Connectivity costs fall to zero. The last billion come online — not as consumers, but as producers. The network effect compounds by a billion new minds at once.",
      image: "https://images.unsplash.com/photo-1568438350562-2cae6d394ad0?auto=format&fit=crop&w=1920&q=80",
      position: "center 45%",
    },
  },
  {
    domain: "Governance",
    now: {
      stat: "Static",
      caption: "The nation-state, designed in the seventeenth century for a world of horseback and sail, now governs a planet of satellites and software. Institutions built for millions strain under billions. Trust in government is at historic lows across every democracy on earth.",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1920&q=80",
      position: "center 45%",
    },
    future: {
      stat: "Fluid",
      caption: "Governance becomes a protocol, not a geography — opt-in communities with their own rules, currency, and dispute resolution, competing for citizens the way cities compete for talent today. The state is no longer where you were born, but what you choose to belong to.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1920&q=80",
      position: "center 40%",
    },
  },
  {
    domain: "Defense",
    now: {
      stat: "$2.4T",
      caption: "The world spends two point four trillion dollars a year on defense — more than the GDP of all but a handful of nations. Most of it buys hardware designed to fight the last war. A single cyberattack can now shut down a country's power grid for less than the cost of a used car.",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1920&q=80",
      position: "center 45%",
    },
    future: {
      stat: "Deterred",
      caption: "Defense becomes software — autonomous systems that detect and neutralize threats in milliseconds, AI that maps every vulnerability before an adversary finds it. The cost of aggression rises until war is no longer rational. The standing army is a fleet of machines, not a generation of men.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1920&q=80",
      position: "center 40%",
    },
  },
  {
    domain: "Science",
    now: {
      stat: "0.1%",
      caption: "We spend a tenth of a percent of global GDP on basic research — the well everything else drinks from. A new particle accelerator costs more than a hundred universities can afford. The discoveries that could unlock the next century sit in a queue behind the budget of a single quarter's profits.",
      image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1920&q=80",
      position: "center 45%",
    },
    future: {
      stat: "Accelerated",
      caption: "AI runs a billion experiments in simulation before a single one is done in a lab. A fusion breakthrough that took sixty years of human effort arrives in six months of machine effort. The rate of discovery — flat for half a century — bends vertical.",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1920&q=80",
      position: "center 45%",
    },
  },
  {
    domain: "SpaceX & Starship",
    now: {
      stat: "1 planet",
      caption: "All of human civilization, all of our history, all of our dreams — on a single rock. One asteroid, one pandemic, one nuclear exchange, and it's over. We have no backup. We have no second chance. We are one species on one planet with no exit.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80",
      position: "center 45%",
    },
    future: {
      stat: "Multi-planetary",
      caption: "Starship — fully reusable, refuelable in orbit, capable of carrying 100 people to Mars. The cost of access to space drops by 99%. The species becomes multi-planetary. The backup is no longer a server in Iceland; it is a world.",
      image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1920&q=80",
      position: "center 40%",
    },
  },
  {
    domain: "Mega-Infrastructure",
    now: {
      stat: "Fragmented",
      caption: "The world's infrastructure is a patchwork — built by different nations, in different centuries, to different standards. Roads end at borders. Power grids don't connect. Rail gauges change. The global supply chain works despite the infrastructure, not because of it.",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1920&q=80",
      position: "center 45%",
    },
    future: {
      stat: "Connected",
      caption: "China's Belt & Road: 140+ countries, $1T in infrastructure, high-speed rail from Beijing to London. Trans-African highways. Cross-continental power grids. The world's infrastructure becomes one connected system — goods, power, data, and people flowing at the speed of engineering, not the speed of bureaucracy.",
      image: "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?auto=format&fit=crop&w=1920&q=80",
      position: "center 40%",
    },
  },
  {
    domain: "Future Cities",
    now: {
      stat: "1.1B slums",
      caption: "A billion people live in housing that would be condemned anywhere else. The slum is the fastest-growing settlement type on earth. Cities grow by accident — sprawl, congestion, pollution, inequality. The city of the future is a slogan, not a blueprint.",
      image: "https://images.unsplash.com/photo-1496564203457-11bb12075d90?auto=format&fit=crop&w=1920&q=80",
      position: "center 45%",
    },
    future: {
      stat: "Engineered",
      caption: "Floating cities on the ocean. Vertical farms stacked forty stories high. Roads that charge vehicles wirelessly. Buildings that sequester carbon. Cities that grow like coral — modular, self-powering, self-cleaning. The city is no longer a drain on the grid; it is the grid.",
      image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1920&q=80",
      position: "center 40%",
    },
  },
  {
    domain: "Knowledge",
    now: {
      stat: "Locked",
      caption: "The largest waste on earth is human talent — sealed off from capital, markets, and mentorship by the accident of where it was born. A genius in a village without a road is a genius who never gets to be one. We have no idea what we are missing.",
      image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1920&q=80",
      position: "center 50%",
    },
    future: {
      stat: "Unlocked",
      caption: "A single network of operators, founders, and mentors compounding across every route on earth — talent finds capital in a day, not a decade. The next hundred thousand world-changing ideas don't die in a village. They ship.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1920&q=80",
      position: "center 40%",
    },
  },
];

function NowFutureSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [mode, setMode] = useState<"now" | "future">("now");
  const [current, setCurrent] = useState(0);

  // Auto-advance the slideshow (pauses briefly after a user interacts)
  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setCurrent((p) => (p + 1) % nowFutureSlides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isInView, mode]);

  // After ~7s in "now" mode, gently surface the transition prompt.
  // (Independent of slide changes so it reliably appears while "now" plays.)
  const [showPrompt, setShowPrompt] = useState(false);
  useEffect(() => {
    if (mode !== "now" || !isInView) return;
    const t = setTimeout(() => setShowPrompt(true), 12000);
    return () => clearTimeout(t);
  }, [mode, isInView]);

  const slide = nowFutureSlides[current];
  const data = mode === "now" ? slide.now : slide.future;

  const handleTransition = () => {
    setMode((m) => (m === "now" ? "future" : "now"));
    setShowPrompt(false);
  };

  return (
    <section className="px-6 md:px-12 lg:px-20 py-24 md:py-32">
      {/* Contained dark block — matches the Hero / OperatingBeliefs pattern */}
      <div className="relative w-full max-w-[1400px] mx-auto bg-[#0A0A0A] text-white overflow-hidden rounded-sm">
      {/* Section intro */}
      <div className="px-6 md:px-12 lg:px-16 pt-16 md:pt-20 pb-10 md:pb-14">
        <div className="flex items-center gap-3 mb-6">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#FF4D00]"
          >
            Now × Future
          </motion.span>
          <div className="h-px w-16 bg-[#FF4D00]/40" />
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.05, ease: EASE }}
          className="font-display font-medium tracking-[-0.025em] leading-[0.98] text-[32px] sm:text-[44px] md:text-[56px] lg:text-[64px] max-w-4xl"
        >
          The world as it is.{" "}
          <span className="text-white/35">The world we&apos;re </span>
          <span className="text-[#FF4D00]">painting.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="text-white/45 text-[15px] md:text-[17px] font-medium leading-[1.6] max-w-2xl mt-7"
        >
          The case for acceleration, in twenty domains. Each &ldquo;Now&rdquo; is the bottleneck the century hangs on — framed bluntly. Each &ldquo;Future&rdquo; is what we are building to break it open. This is not a forecast. It is a blueprint.
        </motion.p>
      </div>

      {/* Cinematic slideshow — fills the contained block */}
      <div ref={ref} className="px-6 md:px-12 lg:px-16 pb-10 md:pb-14">
        <div className="relative w-full overflow-hidden">
          <div className="relative h-[60vh] sm:h-[68vh] md:h-[78vh] lg:h-[82vh]">
            {/* Sliding images — both now and future layers, crossfaded by mode */}
            {nowFutureSlides.map((s, i) => (
              <Fragment key={s.domain}>
                {/* NOW layer */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: mode === "now" && i === current ? 1 : 0,
                    scale: mode === "now" && i === current ? 1 : 1.06,
                  }}
                  transition={{ duration: 1.1, ease: EASE }}
                  className="absolute inset-0"
                  aria-hidden={!(mode === "now" && i === current)}
                >
                  <img
                    src={s.now.image}
                    alt={`${s.domain} — the now`}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: s.now.position }}
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                </motion.div>
                {/* FUTURE layer */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: mode === "future" && i === current ? 1 : 0,
                    scale: mode === "future" && i === current ? 1 : 1.06,
                  }}
                  transition={{ duration: 1.1, ease: EASE }}
                  className="absolute inset-0"
                  aria-hidden={!(mode === "future" && i === current)}
                >
                  <img
                    src={s.future.image}
                    alt={`${s.domain} — the future`}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: s.future.position }}
                    loading="lazy"
                  />
                </motion.div>
              </Fragment>
            ))}

            {/* Overlays */}
            <div
              className={`absolute inset-0 transition-colors duration-1000 ${
                mode === "now"
                  ? "bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/55 to-[#0A0A0A]/30"
                  : "bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/45 to-[#FF4D00]/8"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/70 via-transparent to-transparent" />
            <div
              className="absolute inset-0 opacity-[0.06] pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
                backgroundSize: "80px 80px",
              }}
            />

            {/* Top-left: live mode badge */}
            <div className="absolute top-6 left-6 md:top-8 md:left-10 flex items-center gap-2.5 z-20">
              <span className={`w-1.5 h-1.5 ${mode === "now" ? "bg-white/60" : "bg-[#FF4D00]"} animate-pulse`} />
              <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-white/60">
                {mode === "now" ? "The Now · Live" : "The Future · Reveal"}
              </span>
            </div>
            {/* Top-right: domain counter */}
            <div className="absolute top-6 right-6 md:top-8 md:right-10 z-20 text-[10px] font-mono tracking-[0.3em] uppercase text-white/40">
              {String(current + 1).padStart(2, "0")} / {String(nowFutureSlides.length).padStart(2, "0")}
            </div>

            {/* Content — domain label + stat + caption */}
            <div className="relative z-10 w-full h-full flex flex-col justify-end px-6 md:px-12 lg:px-16 pb-20 md:pb-24">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${mode}-${current}`}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.55, ease: EASE }}
                  className="max-w-2xl"
                >
                  <span
                    className={`text-[11px] md:text-[12px] font-mono font-bold tracking-[0.3em] uppercase block mb-4 ${
                      mode === "now" ? "text-white/45" : "text-[#FF4D00]"
                    }`}
                  >
                    {slide.domain}
                  </span>
                  <div className="flex items-baseline gap-4 md:gap-6 mb-4">
                    <span
                      className={`font-display font-medium leading-[0.9] tracking-[-0.03em] text-[18vw] sm:text-[14vw] md:text-[10vw] lg:text-[120px] ${
                        mode === "now" ? "text-white" : "text-[#FF4D00]"
                      }`}
                    >
                      {data.stat}
                    </span>
                  </div>
                  <p className="text-white/70 text-[14px] md:text-[17px] font-medium leading-[1.55] max-w-2xl">
                    {data.caption}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Transition prompt — invites the viewer from Now → Future */}
            <AnimatePresence>
              {showPrompt && mode === "now" && (
                <motion.button
                  initial={{ opacity: 0, y: 16, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 16, scale: 0.96 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  onClick={handleTransition}
                  className="absolute right-6 md:right-10 bottom-20 md:bottom-24 z-30 group flex items-center gap-3 pl-5 pr-2 py-2 bg-[#FF4D00] text-white rounded-full shadow-[0_0_40px_rgba(255,77,0,0.5)] hover:bg-[#FF6A28] transition-colors"
                >
                  <span className="text-[11px] font-bold tracking-[0.05em] uppercase">Imagine what&apos;s possible</span>
                  <span className="relative w-9 h-9 rounded-full bg-white/15 flex items-center justify-center overflow-hidden">
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="w-4 h-4 text-white" />
                    </motion.span>
                  </span>
                </motion.button>
              )}
            </AnimatePresence>

            {/* Bottom bar — slide indicators */}
            <div className="absolute bottom-0 left-0 right-0 z-20 px-6 md:px-12 lg:px-16 pb-5 md:pb-7">
              <div className="flex items-center gap-4">
                {/* Slide indicators — clickable */}
                <div className="flex gap-1.5 flex-wrap">
                  {nowFutureSlides.map((s, i) => (
                    <button
                      key={s.domain}
                      suppressHydrationWarning
                      onClick={() => { setCurrent(i); setShowPrompt(false); }}
                      aria-label={`Go to ${s.domain}`}
                      className="min-h-[32px] min-w-[32px] flex items-center"
                    >
                      <span
                        className={`block h-[2px] transition-all duration-500 ${
                          i === current
                            ? mode === "now"
                              ? "bg-white w-10"
                              : "bg-[#FF4D00] w-10"
                            : "bg-white/25 w-6"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mode toggle — below the frame, always accessible (never covered by sticky bars) */}
        <div className="mt-5 flex justify-center">
          <button
            onClick={handleTransition}
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 rounded-full text-white/80 hover:text-white hover:border-white/50 hover:bg-white/5 transition-colors text-[11px] font-bold tracking-[0.1em] uppercase"
          >
            {mode === "now" ? (
              <>See the future <ArrowRight className="w-3.5 h-3.5" /></>
            ) : (
              <><ArrowRight className="w-3.5 h-3.5 rotate-180" /> Back to the now</>
            )}
          </button>
        </div>
      </div>

      {/* CTA strip */}
      <div className="px-6 md:px-12 lg:px-16 pb-16 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <Link
            to="/ventures"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-[#FF4D00] text-white text-[11px] font-bold tracking-[0.05em] rounded-full hover:bg-[#FF6A28] transition-colors"
          >
            See the ventures painting it
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/manifesto"
            className="text-[12px] font-semibold tracking-[0.05em] text-white/50 hover:text-white transition-colors inline-flex items-center gap-1.5"
          >
            Read the manifesto <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </div>
      </div>
    </section>
  );
}

/* ── Upcoming Events Data ── */
const homeEvents = [
  {
    title: "Accelerator Cohort 1 Demo Day",
    date: "March 28, 2026",
    time: "10:00 AM EAT",
    location: "M1 Core Nairobi + Virtual",
    type: "Demo Day",
    description: "Ventures present validated MVPs to investors and partners. Sector deep-dives in energy, life sciences, and digital finance.",
    featured: true,
    image: "https://images.unsplash.com/photo-1762968274962-20c12e6e8ecd?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Route Summit: Gulf of Guinea Arc",
    date: "April 12, 2026",
    time: "9:00 AM WAT",
    location: "XEmbassy Lagos",
    type: "Summit",
    description: "Operators and founders from Lagos, Accra, and Abidjan convene for cross-hub deal flow and peer mentorship.",
    featured: false,
    image: "https://images.unsplash.com/photo-1775163560631-6ff15eb2fa1f?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Building in Life Sciences: From Lab to Market",
    date: "April 25, 2026",
    time: "2:00 PM EAT",
    location: "Virtual Masterclass",
    type: "Masterclass",
    description: "Regulatory pathways for diagnostics and therapeutics in African markets. Case studies from Refract and Allele.",
    featured: false,
    image: "https://images.unsplash.com/photo-1707944746042-e4c81c191812?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Capital Roundtable: Thematic Fund Deep Dive",
    date: "May 15, 2026",
    time: "11:00 AM CAT",
    location: "M1 Core Cape Town + Virtual",
    type: "Investor Event",
    description: "Thematic Fund allocation strategy, portfolio construction, and co-investment opportunities for LPs.",
    featured: true,
    image: "https://images.unsplash.com/photo-1767893609884-622503897e53?auto=format&fit=crop&w=800&q=80",
  },
];

/* ══════════════════════════════════════════════════════════════════════════
   UPCOMING EVENTS SECTION, Magazine-style editorial layout
   ══════════════════════════════════════════════════════════════════════════ */
function UpcomingEventsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const featuredEvents = homeEvents.filter((e) => e.featured);
  const otherEvents = homeEvents.filter((e) => !e.featured);
  const heroEvent = featuredEvents[0];

  const eventTypeStyle: Record<string, string> = {
    "Demo Day": "bg-[#FF4D00] text-white",
    Summit: "bg-[#111111] text-white",
    Masterclass: "bg-[#FF4D00]/10 text-[#FF4D00]",
    "Investor Event": "bg-[#FF4D00] text-white",
  };

  return (
    <section
      ref={ref}
      className="py-20 md:py-32 px-6 md:px-12 lg:px-20 border-t border-[#111111]/10 bg-[#FAFAFA]"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12 md:mb-16"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-[#FF4D00] mb-4 block">
                Upcoming Events
              </span>
              <h2 className="text-[32px] sm:text-[44px] md:text-[56px] lg:text-[64px] font-display font-medium tracking-[-0.03em] leading-[0.95]">
                Where the network
                <br />
                <em className="italic font-serif text-[#FF4D00]">convenes</em>.
              </h2>
            </div>
            <Link
              to="/community"
              className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#FF4D00] hover:text-[#111111] transition-colors group flex-shrink-0"
            >
              View all events
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* Magazine layout: featured hero + compact list */}
        <div className="grid lg:grid-cols-12 gap-5 md:gap-6">
          {/* Left: Featured hero event */}
          {heroEvent && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-7 group border bg-white overflow-hidden hover:shadow-md transition-all duration-300 border-[#FF4D00]/30 hover:border-[#FF4D00]/50"
            >
              {/* Tall hero image */}
              <div className="relative aspect-[4/3] lg:aspect-[3/2] overflow-hidden">
                <img
                  src={heroEvent.image}
                  alt={heroEvent.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                {/* Type badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className={`text-[9px] font-mono font-bold tracking-[0.1em] uppercase px-2.5 py-1 ${eventTypeStyle[heroEvent.type] || "bg-[#111111]/10 text-[#111111]"}`}>
                    {heroEvent.type}
                  </span>
                  <span className="text-[9px] font-mono font-bold tracking-[0.1em] uppercase px-2.5 py-1 bg-[#FF4D00] text-white flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Featured
                  </span>
                </div>
                {/* Title + date overlaid on image */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                  <h3 className="text-[22px] sm:text-[28px] md:text-[34px] font-display font-medium tracking-tight leading-[1.1] text-white mb-3 group-hover:text-[#FF4D00] transition-colors">
                    {heroEvent.title}
                  </h3>
                  <p className="text-[13px] md:text-[15px] text-white/70 leading-[1.6] font-medium mb-4 line-clamp-2">
                    {heroEvent.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-[11px] text-white/60 font-mono font-bold tracking-[0.05em] uppercase">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#FF4D00]" />
                      {heroEvent.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#FF4D00]" />
                      {heroEvent.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#FF4D00]" />
                      {heroEvent.location}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Right: Compact event list */}
          <div className="lg:col-span-5 flex flex-col gap-5 md:gap-6">
            {/* Second featured event (if any) */}
            {featuredEvents[1] && (
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
                className="group border bg-white overflow-hidden hover:shadow-md transition-all duration-300 border-[#FF4D00]/30 hover:border-[#FF4D00]/50"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={featuredEvents[1].image}
                    alt={featuredEvents[1].title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className={`text-[9px] font-mono font-bold tracking-[0.1em] uppercase px-2 py-0.5 ${eventTypeStyle[featuredEvents[1].type] || "bg-[#111111]/10 text-[#111111]"}`}>
                      {featuredEvents[1].type}
                    </span>
                    <span className="text-[9px] font-mono font-bold tracking-[0.1em] uppercase px-2 py-0.5 bg-[#FF4D00] text-white flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-[18px] md:text-[20px] font-display font-medium tracking-tight leading-tight mb-2 group-hover:text-[#FF4D00] transition-colors">
                    {featuredEvents[1].title}
                  </h3>
                  <p className="text-[12px] md:text-[13px] text-[#111111]/50 leading-[1.6] font-medium mb-3 line-clamp-2">
                    {featuredEvents[1].description}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-[#111111]/40 font-mono font-bold tracking-[0.05em] uppercase">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#FF4D00]/60" />
                      {featuredEvents[1].date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#FF4D00]/60" />
                      {featuredEvents[1].location}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Other events as compact rows */}
            {otherEvents.map((event, i) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.1, ease: "easeOut" }}
                className="group border bg-white overflow-hidden hover:shadow-md transition-all duration-300 border-[#111111]/10 hover:border-[#111111]/25"
              >
                <div className="flex gap-4 p-4 md:p-5">
                  {/* Date block */}
                  <div className="flex-shrink-0 w-16 md:w-20 flex flex-col items-center justify-center border border-[#111111]/10 bg-white py-2">
                    <span className="text-[10px] font-mono font-bold tracking-[0.1em] uppercase text-[#FF4D00]">
                      {event.date.split(" ")[0]}
                    </span>
                    <span className="text-[24px] md:text-[28px] font-display font-medium leading-[1] text-[#111111]">
                      {event.date.split(" ")[1].replace(",", "")}
                    </span>
                    <span className="text-[10px] font-mono font-bold tracking-[0.1em] uppercase text-[#111111]/40">
                      {event.date.split(" ")[2]}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`text-[8px] font-mono font-bold tracking-[0.1em] uppercase px-1.5 py-0.5 ${eventTypeStyle[event.type] || "bg-[#111111]/10 text-[#111111]"}`}>
                        {event.type}
                      </span>
                    </div>
                    <h3 className="text-[15px] md:text-[17px] font-display font-medium tracking-tight leading-tight mb-1.5 group-hover:text-[#FF4D00] transition-colors">
                      {event.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-[#111111]/40 font-mono font-bold tracking-[0.05em] uppercase">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#FF4D00]/60" />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#FF4D00]/60" />
                        {event.location}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   ROUTE JOURNEY — 6 horizontal leg cards (adopted from Home 2, contained)
   ══════════════════════════════════════════════════════════════════════════ */
function RouteJourney() {
  const rjRef = useRef<HTMLDivElement>(null);
  const rjInView = useInView(rjRef, { once: true, margin: "-80px" });
  const legs = routeLegs.slice(0, 6);

  const legImages: Record<string, string> = {
    "gulf-of-guinea": "/routes/gulf-of-guinea-1.png",
    "sahel-band": "/routes/sahel-1.png",
    "east-african": "/routes/east-african-1.png",
    "central-african": "/routes/central-african-1.png",
    "southern-arc": "/routes/southern-arc-1.png",
    "north-africa-global": "/routes/north-africa-1.png",
  };

  return (
    <div ref={rjRef} className="mb-16 md:mb-24">
      {/* Horizontal scroll cards */}
      <div className="overflow-x-auto scrollbar-thin [scrollbar-color:rgba(17,17,17,0.25)_transparent]">
        <div className="flex gap-4 md:gap-5 pb-6 w-max">
          {legs.map((leg, i) => (
            <motion.div
              key={leg.id}
              initial={{ opacity: 0, y: 24 }}
              animate={rjInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
            >
              <Link
                to="/routes"
                className="group block w-[280px] md:w-[320px] border border-[#111111]/12 hover:border-[#FF4D00] bg-white hover:bg-[#FF4D00]/5 transition-colors overflow-hidden h-full"
              >
                {/* Leg image */}
                <div className="relative w-full h-[140px] md:h-[160px] overflow-hidden bg-[#F5F5F5]">
                  <img
                    src={legImages[leg.id]}
                    alt={leg.name}
                    className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/40 to-transparent" />
                  {/* Leg number badge on image */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-white bg-[#FF4D00] px-2 py-1">
                      LEG {leg.legNumber}
                    </span>
                  </div>
                  {/* Hub count on image */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 text-[9px] font-mono tracking-[0.1em] text-white/90 bg-black/40 backdrop-blur-sm px-2 py-1">
                    <MapPin className="w-2.5 h-2.5" />
                    {leg.hubCount} hubs
                  </div>
                </div>

                <div className="p-6 md:p-7">
                  <h4 className="font-display font-medium tracking-tight text-[22px] md:text-[24px] leading-[1.15] mb-2 group-hover:text-[#FF4D00] transition-colors">
                    {leg.name}
                  </h4>
                  <p className="text-[12px] text-[#111111]/40 italic font-medium leading-[1.5] mb-5 line-clamp-2">
                    &ldquo;{leg.subtitle}&rdquo;
                  </p>

                  <div className="border-t border-[#111111]/10 pt-4">
                    <p className="text-[9px] font-mono tracking-[0.15em] uppercase text-[#111111]/30 mb-1.5">
                      Primary flow
                    </p>
                    <p className="text-[12px] text-[#111111]/65 font-medium leading-[1.5] line-clamp-2">
                      {leg.primaryFlow}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {leg.countries.slice(0, 4).map((c) => (
                      <span
                        key={c}
                        className="text-[9px] font-mono tracking-[0.05em] uppercase text-[#111111]/50 border border-[#111111]/12 px-2 py-1"
                      >
                        {c}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-[#111111]/30 group-hover:text-[#FF4D00] transition-colors">
                    Enter leg
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   LOCATIONS SECTION, Interactive Blueprint Map with leg filters
   ══════════════════════════════════════════════════════════════════════════ */
function LocationsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeLeg, setActiveLeg] = useState<string | null>(null);

  return (
    <section
      ref={ref}
      className="py-20 md:py-32 px-6 md:px-12 lg:px-20 border-t border-[#111111]/10 bg-white"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Header, centered, NEWLAB style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-[36px] sm:text-[56px] md:text-[80px] lg:text-[110px] font-display font-medium tracking-[-0.03em] leading-[0.9] mb-4 uppercase">
            The Route
          </h2>
          <p className="text-[14px] md:text-[16px] text-[#111111]/40 font-medium tracking-[0.1em] uppercase max-w-2xl mx-auto">
            Global hubs in geographies prioritizing reindustrialization
          </p>
        </motion.div>

        {/* Leg filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-2 mb-8 md:mb-12"
        >
          <button
            onClick={() => setActiveLeg(null)}
            className={`px-3 py-1.5 text-[11px] font-mono font-bold tracking-widest uppercase border transition-colors ${
              activeLeg === null
                ? "bg-[#111111] text-white border-[#111111]"
                : "bg-white text-[#111111]/50 border-[#111111]/15 hover:border-[#111111]/30"
            }`}
          >
            All Legs
          </button>
          {routeLegs.map((leg) => (
            <button
              key={leg.id}
              onClick={() => setActiveLeg(activeLeg === leg.id ? null : leg.id)}
              className={`px-3 py-1.5 text-[11px] font-mono font-bold tracking-widest uppercase border transition-colors ${
                activeLeg === leg.id
                  ? "text-white border-transparent"
                  : "bg-white text-[#111111]/50 border-[#111111]/15 hover:border-[#111111]/30"
              }`}
              style={activeLeg === leg.id ? { backgroundColor: leg.color, borderColor: leg.color } : {}}
            >
              {leg.legNumber}. {leg.name.split(" ")[0]}
            </button>
          ))}
        </motion.div>

        {/* Blueprint Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative w-full mb-8 md:mb-12"
        >
          <BlueprintMap activeLeg={activeLeg} />
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-[10px] font-mono text-[#111111]/40 mb-8 md:mb-12"
        >
          {routeLegs.map((leg) => (
            <button
              key={leg.id}
              onClick={() => setActiveLeg(activeLeg === leg.id ? null : leg.id)}
              className="flex items-center gap-2 hover:text-[#111111]/70 transition-colors"
            >
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: leg.color }} />
              <span>
                Leg {leg.legNumber}: {leg.name}
              </span>
            </button>
          ))}
        </motion.div>

        {/* View Full Route Map link */}
        <div className="text-center mb-16 md:mb-24">
          <Link
            to="/routes"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#111111] text-white text-[12px] uppercase tracking-[0.12em] font-bold hover:bg-[#FF4D00] transition-colors duration-300 group"
          >
            View Full Route Map
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Route Journey — 6 leg cards (adopted from Home 2, contained) */}
        <RouteJourney />
      </div>
    </section>
  );
}

/* ── Blueprint Map, Newlab topographic map with color-coded pin markers ── */
function BlueprintMap({ activeLeg }: { activeLeg: string | null }) {
  const isAnyActive = activeLeg !== null;
  const [activeLocId, setActiveLocId] = useState<string | null>(null);

  const visibleLocations = useMemo(
    () => (isAnyActive ? MAP_LOCATIONS.filter((l) => l.legId === activeLeg) : MAP_LOCATIONS),
    [isAnyActive, activeLeg]
  );

  const activeLocData = useMemo(
    () => MAP_LOCATIONS.find((l) => l.id === activeLocId),
    [activeLocId]
  );
  const legOfActive = activeLocData
    ? routeLegs.find((l) => l.id === activeLocData.legId)
    : null;

  return (
    <div className="w-full relative">
      <div
        className="relative w-full overflow-hidden bg-white"
        onClick={(e) => {
          if (e.target === e.currentTarget) setActiveLocId(null);
        }}
      >
        {/* World map image, Newlab topographic map */}
        <img
          alt="World Map showing xCelero Routes"
          className="w-full h-auto pointer-events-none select-none opacity-80"
          src="/routes/newlab-map.avif"
        />

        {/* Pin markers with always-visible labels — click opens inline info */}
        {visibleLocations.map((loc, index) => {
          const isSelected = activeLocId === loc.id;
          return (
            <div
              key={loc.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10"
              style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 350, damping: 25, delay: index * 0.03 }}
                className="relative flex items-center justify-center"
              >
                {/* Colored marker dot — button toggles inline panel */}
                <button
                  onClick={() => setActiveLocId(isSelected ? null : loc.id)}
                  className={`relative w-3.5 h-3.5 md:w-4 md:h-4 rounded-full shrink-0 cursor-pointer transition-all duration-200 border-[2.5px] border-transparent hover:border-black/20 hover:scale-110 ${isSelected ? "scale-125 border-black/30" : ""}`}
                  style={{ backgroundColor: loc.legColor }}
                  aria-label={`View ${loc.name}`}
                />

                {/* Always-visible label */}
                <div
                  className={`absolute bg-[#111111] text-white font-mono text-[8px] md:text-[10px] font-bold tracking-[0.15em] px-2 py-1 md:px-3 md:py-1.5 whitespace-nowrap top-1/2 -translate-y-1/2 pointer-events-none shadow-sm ${
                    loc.labelPos === "left" ? "right-full mr-2 md:mr-3" : "left-full ml-2 md:ml-3"
                  }`}
                >
                  {loc.name}
                </div>
              </motion.div>
            </div>
          );
        })}

        {/* Inline info panel — matches Routes page behavior */}
        <AnimatePresence>
          {activeLocData && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30, transition: { duration: 0.2 } }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 bottom-0 top-auto sm:inset-x-auto sm:left-auto sm:top-4 sm:bottom-4 sm:right-4 w-full sm:w-72 md:w-80 lg:w-96 max-h-[85vh] sm:max-h-none bg-white border border-[#111111]/10 shadow-2xl p-5 sm:p-6 md:p-8 flex flex-col z-50 overflow-y-auto rounded-t-lg sm:rounded-none"
            >
              <button
                onClick={() => setActiveLocId(null)}
                className="absolute top-4 right-4 p-2 text-[#111111]/30 hover:text-[#111111] transition-colors"
                aria-label="Close panel"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Leg indicator */}
              <div className="flex items-center gap-2 mb-4 mt-2">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: activeLocData.legColor }} />
                <span className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase" style={{ color: activeLocData.legColor }}>
                  Leg {activeLocData.legNumber}
                </span>
              </div>

              {/* City name */}
              <h3 className="text-2xl font-display font-medium uppercase tracking-tight text-[#111111] mb-4 pr-8">
                {activeLocData.name}
              </h3>

              <div className="w-10 h-1 mb-5" style={{ backgroundColor: activeLocData.legColor }} />

              <div className="space-y-6">
                {/* About */}
                <div>
                  <h4 className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-2" style={{ color: activeLocData.legColor }}>
                    About
                  </h4>
                  <p className="text-[#111111]/60 text-sm leading-relaxed">{activeLocData.description}</p>
                </div>

                {/* Route info */}
                {legOfActive && (
                  <div>
                    <h4 className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-2" style={{ color: activeLocData.legColor }}>
                      Route
                    </h4>
                    <p className="text-sm font-display font-medium text-[#111111]/70">{legOfActive.name}</p>
                    <p className="text-xs text-[#111111]/40 mt-1">
                      {legOfActive.subtitle}, {legOfActive.hubCount} hubs
                    </p>
                  </div>
                )}

                {/* Countries */}
                <div>
                  <h4 className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-3" style={{ color: activeLocData.legColor }}>
                    Countries
                  </h4>
                  <ul className="flex flex-wrap gap-2">
                    {activeLocData.countries.map((c, i) => (
                      <li key={i} className="bg-[#111111]/[0.06] px-3 py-1.5 text-xs font-medium text-[#111111]/70 rounded-sm">
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* View full route link */}
              <div className="mt-auto pt-6">
                <Link
                  to="/routes"
                  className="block w-full py-3 text-center text-[11px] font-mono font-bold tracking-widest uppercase text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: activeLocData.legColor }}
                >
                  View Full Route
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   NEWSLETTER SECTION, Two-column: heading + form
   ══════════════════════════════════════════════════════════════════════════ */
function NewsletterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleReturnToSite = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section
      ref={ref}
      className="border-t border-[#111111]/10 relative overflow-hidden"
    >
      {/* Subtle dot-grid background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(#FF4D00 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      <div className="py-20 md:py-32 px-6 md:px-12 lg:px-20 bg-white relative z-10">
        <div className="w-full max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-[28px] sm:text-[40px] md:text-[56px] font-display font-medium tracking-[-0.03em] leading-[0.95] uppercase mb-6">
              Subscribe to the
              <br />
              xCelero Letter
            </h2>
            <p className="text-[15px] md:text-[17px] text-[#111111]/50 font-medium leading-[1.6] max-w-md">
              Quarterly dispatches on critical technology commercialization,
              Route Deal insights, and venture infrastructure across the Global South.
            </p>
          </motion.div>

          {/* Right: Form or Confirmation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col justify-center"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="space-y-6"
              >
                {/* Checkmark icon */}
                <div className="w-16 h-16 rounded-full border-2 border-[#FF4D00] flex items-center justify-center">
                  <Check className="w-7 h-7 text-[#FF4D00]" strokeWidth={2.5} />
                </div>

                {/* Confirmation heading */}
                <h3 className="text-[28px] sm:text-[36px] md:text-[44px] font-display font-medium tracking-[-0.02em] leading-[0.95]">
                  Check your inbox
                </h3>

                {/* Confirmation body */}
                <p className="text-[15px] md:text-[17px] text-[#111111]/50 font-medium leading-[1.6] max-w-md">
                  You&apos;re now subscribed to the xCelero Letter. Look for our quarterly dispatch on critical technology commercialization.
                </p>

                {/* Return to site link */}
                <button
                  onClick={handleReturnToSite}
                  className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#FF4D00] hover:text-[#111111] transition-colors group"
                >
                  Return to site
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setSubmitError("");
                  setIsSubmitting(true);
                  try {
                    const res = await fetch("/api/capital/subscribe", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ email, firstName, lastName, consent: true, source: "newsletter_home" }),
                    });
                    if (!res.ok) {
                      const data = await res.json().catch(() => ({}));
                      throw new Error(data.error || "Subscription failed");
                    }
                    setSubmitted(true);
                  } catch (err) {
                    setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-mono tracking-[0.15em] uppercase text-[#111111]/40 mb-2">
                      First Name *
                    </label>
                    <input
                      suppressHydrationWarning
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full border-b border-[#111111]/20 bg-transparent py-3 text-[15px] font-medium focus:border-[#FF4D00] focus:outline-none transition-colors placeholder:text-[#111111]/20"
                      placeholder="First name"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono tracking-[0.15em] uppercase text-[#111111]/40 mb-2">
                      Last Name *
                    </label>
                    <input
                      suppressHydrationWarning
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full border-b border-[#111111]/20 bg-transparent py-3 text-[15px] font-medium focus:border-[#FF4D00] focus:outline-none transition-colors placeholder:text-[#111111]/20"
                      placeholder="Last name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-mono tracking-[0.15em] uppercase text-[#111111]/40 mb-2">
                    Email *
                  </label>
                  <input
                    suppressHydrationWarning
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-b border-[#111111]/20 bg-transparent py-3 text-[15px] font-medium focus:border-[#FF4D00] focus:outline-none transition-colors placeholder:text-[#111111]/20"
                    placeholder="you@email.com"
                  />
                </div>
                <p className="text-[11px] text-[#111111]/30 leading-[1.5]">
                  By subscribing you agree to our{" "}
                  <span className="text-[#2563EB] underline cursor-pointer">Privacy Policy</span>.
                  We respect your data. Unsubscribe anytime.
                </p>
                {submitError && (
                  <p className="text-[13px] text-red-600 font-medium">{submitError}</p>
                )}
                <button
                  suppressHydrationWarning
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 min-h-[44px] bg-[#FF4D00] text-white text-[12px] uppercase tracking-[0.12em] font-bold hover:bg-[#FF4D00]/90 transition-colors duration-300 shadow-lg shadow-[#FF4D00]/20 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Subscribing…" : "Subscribe Now"}
                  {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                </button>
                <p className="text-[10px] text-[#111111]/25 leading-[1.5] mt-3 max-w-sm">
                  We never share your email with third parties. You can unsubscribe at any time. Read our Privacy Policy for details.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
