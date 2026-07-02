"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, X, Loader2 } from "lucide-react";
import { useRouter } from "@/artemis/router";

const EASE = [0.22, 1, 0.36, 1] as const;

const NINE_FIELDS = [
  "Water Systems",
  "Energy Systems",
  "Food & Agriculture",
  "Health & Mobility",
  "Built Environment",
  "Data & Intelligence",
  "Logistics & Trade",
  "Governance & Identity",
  "Education & Human Capital",
];

const ARCHETYPES = [
  { name: "Pilot", desc: "I set direction. I see the path before others do." },
  { name: "Builder", desc: "I construct. I turn ideas into working things." },
  { name: "Hustler", desc: "I close. I get the deal, the partner, the customer." },
  { name: "Operator", desc: "I maintain. I keep the system running when others are spent." },
  { name: "Tracker", desc: "I surveil. I find the data, the signal, the risk before it hits." },
  { name: "Comms", desc: "I translate. I make the complex legible to the people who need it." },
];

const STEPS = [
  "Who You Are",
  "What You've Operated",
  "The Commitment",
  "The Nine Fields",
  "The Six Archetypes",
  "The Honest Part",
  "Review & Submit",
];

export function XHansaApply() {
  const { navigate } = useRouter();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Form state
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    dateOfBirth: "",
    links: "",
    mostSignificantBuild: "",
    buildLink: "",
    currentOperations: "",
    commitment24mo: "",
    stipendAcceptance: "",
    supremacyClause: "",
    gateSystem: "",
    cliffAcceptance: "",
    cruciblePreparedness: "",
    fieldPreferences: [] as string[],
    whyFields: "",
    whatWouldYouBuild: "",
    archetypeSelf: "",
    archetypeStory: "",
    weakestArchetype: "",
    hardestThing: "",
    cognitiveExhaustion: "",
    disagreementBelief: "",
    whyXHansa: "",
    ifRejected: "",
    referrer: "",
    voucher: "",
    additionalInfo: "",
  });

  const update = useCallback((key: string, value: string | string[]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const toggleField = (field: string) => {
    setForm((prev) => {
      const current = prev.fieldPreferences;
      if (current.includes(field)) {
        return { ...prev, fieldPreferences: current.filter((f) => f !== field) };
      }
      if (current.length >= 3) return prev; // Max 3
      return { ...prev, fieldPreferences: [...current, field] };
    });
  };

  const canProceed = () => {
    switch (step) {
      case 0: return form.fullName.trim() && form.email.trim().includes("@");
      case 1: return form.mostSignificantBuild.trim().length > 20;
      case 2: return form.commitment24mo && form.stipendAcceptance && form.supremacyClause &&
                     form.gateSystem && form.cliffAcceptance && form.cruciblePreparedness;
      case 3: return form.fieldPreferences.length > 0 && form.whyFields.trim().length > 10;
      case 4: return form.archetypeSelf && form.archetypeStory.trim().length > 10;
      case 5: return form.hardestThing.trim().length > 5 && form.whyXHansa.trim().length > 5;
      case 6: return true; // Review
      default: return true;
    }
  };

  const next = () => { setDirection(1); if (step < STEPS.length - 1) setStep(step + 1); };
  const back = () => { setDirection(-1); if (step > 0) setStep(step - 1); };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/xhansa/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, fieldPreferences: form.fieldPreferences.join(", "), cohort: "Cohort 1, 2026" }),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
      } else {
        setSubmitError(data.error || "Submission failed. Please try again.");
      }
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success Screen ──
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="max-w-xl text-center"
        >
          <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-[#FF4D00] flex items-center justify-center">
            <Check className="w-10 h-10 text-[#111111]" strokeWidth={3} />
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-medium tracking-tight mb-4">
            Application received.
          </h1>
          <p className="text-[#111111]/50 text-lg leading-relaxed mb-8">
            Your application to the xHansa Fellowship, Cohort 1, 2026 has been submitted.
            We read every application. You'll hear from us within 21 days, regardless of outcome.
          </p>
          <div className="space-y-3 text-left bg-[#111111]/5 border border-[#111111]/10 rounded-xl p-6 mb-8">
            <p className="text-sm text-[#111111]/60">While you wait:</p>
            <p className="text-sm text-[#111111]/70">• Read the Applicant FAQ on the program page</p>
            <p className="text-sm text-[#111111]/70">• Join TownSquare — current Xcitizens and alumni are there</p>
            <p className="text-sm text-[#111111]/70">• Keep building. We notice people who keep operating while they wait</p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 bg-[#FF4D00] text-[#111111] text-sm font-bold tracking-wider rounded-full hover:bg-[#FF6A28] transition-colors inline-flex items-center gap-2"
          >
            Return Home <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-12 md:py-20">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2.5 mb-6">
            <div className="w-9 h-9 bg-[#FF4D00] flex items-center justify-center rounded-lg">
              <span className="text-[#111111] font-bold text-sm">X</span>
            </div>
            <span className="text-[13px] font-bold tracking-tight uppercase">
              xCelero<span className="text-[#FF4D00]"> Labs</span>
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-medium tracking-tight mb-3">
            xHansa Fellowship <span className="text-[#FF4D00]">Application</span>
          </h1>
          <p className="text-[#111111]/40 text-sm md:text-base">Cohort 1, 2026 · Applications close May 15, 2026</p>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-1.5 mb-10">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                i <= step ? "bg-[#FF4D00]" : "bg-[#111111]/10"
              }`}
            />
          ))}
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-[#FF4D00]">
            Step {step + 1} of {STEPS.length}
          </span>
          <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-[#111111]/30">
            {STEPS[step]}
          </span>
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            initial={{ opacity: 0, x: direction * 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -20 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {/* STEP 0: Who You Are */}
            {step === 0 && (
              <StepWrapper title="Who You Are" desc="Basic identification. Confidential.">
                <Input label="Full Name *" value={form.fullName} onChange={(v) => update("fullName", v)} />
                <Input label="Email *" type="email" value={form.email} onChange={(v) => update("email", v)} />
                <Input label="Phone / WhatsApp" value={form.phone} onChange={(v) => update("phone", v)} />
                <Input label="Location (City, Country)" value={form.location} onChange={(v) => update("location", v)} />
                <Input label="Date of Birth" value={form.dateOfBirth} onChange={(v) => update("dateOfBirth", v)} placeholder="YYYY-MM-DD" />
                <Input label="LinkedIn / GitHub / Portfolio" value={form.links} onChange={(v) => update("links", v)} />
              </StepWrapper>
            )}

            {/* STEP 1: What You've Operated */}
            {step === 1 && (
              <StepWrapper title="What You've Operated" desc="We care less about where you've worked and more about what you've operated — built, run, fixed, deployed, or scaled.">
                <TextArea
                  label="What is the most significant thing you have ever built or operated? *"
                  hint="200–400 words. What it was, why you built it, what happened, what you learned."
                  value={form.mostSignificantBuild}
                  onChange={(v) => update("mostSignificantBuild", v)}
                  rows={8}
                />
                <Input label="Link to it (if it exists online)" value={form.buildLink} onChange={(v) => update("buildLink", v)} />
                <TextArea
                  label="What are you operating right now?"
                  hint="If nothing, tell us what you want to operate next."
                  value={form.currentOperations}
                  onChange={(v) => update("currentOperations", v)}
                  rows={4}
                />
              </StepWrapper>
            )}

            {/* STEP 2: The Commitment */}
            {step === 2 && (
              <StepWrapper title="The Commitment" desc="These questions confirm you understand and accept the terms. Hesitation on any of these is a signal.">
                <CommitmentQuestion
                  label="24-month commitment with no exit before the cliff. Early departure = total equity forfeiture."
                  value={form.commitment24mo}
                  onChange={(v) => update("commitment24mo", v)}
                />
                <CommitmentQuestion
                  label="$500–$1,200/month stipend, needs-based. No salary. No benefits. You are a deployed operator, not an employee."
                  value={form.stipendAcceptance}
                  onChange={(v) => update("stipendAcceptance", v)}
                />
                <CommitmentQuestion
                  label="Individual IP is subordinate to the League Commons (the Supremacy Clause). Breakthroughs are shared across the network."
                  value={form.supremacyClause}
                  onChange={(v) => update("supremacyClause", v)}
                />
                <CommitmentQuestion
                  label="Quarterly Gates are binary (pass/fail). If your Pod misses a Gate, it is dissolved within 48 hours (the Kill Switch). No appeals."
                  value={form.gateSystem}
                  onChange={(v) => update("gateSystem", v)}
                />
                <CommitmentQuestion
                  label="At Month 24 (the cliff), the top 3% ('Keepers') transition to permanent payroll. The remaining 97% ('The Cycled') are severed with performance equity (36-month vesting). This is by design."
                  value={form.cliffAcceptance}
                  onChange={(v) => update("cliffAcceptance", v)}
                />
                <CommitmentQuestion
                  label="The Crucible (8-week onboarding) involves systematic psychological destabilization and sustained cognitive exhaustion."
                  value={form.cruciblePreparedness}
                  onChange={(v) => update("cruciblePreparedness", v)}
                />
              </StepWrapper>
            )}

            {/* STEP 3: The Nine Fields */}
            {step === 3 && (
              <StepWrapper title="The Nine Civilizational Fields" desc="Every ProtoCo is commissioned against one of these fields. Pick up to 3 that call to you.">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                  {NINE_FIELDS.map((field) => {
                    const selected = form.fieldPreferences.includes(field);
                    return (
                      <button
                        key={field}
                        onClick={() => toggleField(field)}
                        className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${
                          selected
                            ? "border-[#FF4D00] bg-[#FF4D00]/10"
                            : "border-[#111111]/10 bg-[#111111]/[0.02] hover:border-[#111111]/25"
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 ${
                          selected ? "border-[#FF4D00] bg-[#FF4D00]" : "border-[#111111]/25"
                        }`}>
                          {selected && <Check className="w-3 h-3 text-[#111111]" strokeWidth={3} />}
                        </div>
                        <span className={`text-sm font-medium ${selected ? "text-[#111111]" : "text-[#111111]/60"}`}>
                          {field}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-[#111111]/30 mb-4">{form.fieldPreferences.length}/3 selected</p>
                <TextArea
                  label="Why those fields? *"
                  hint="100–200 words"
                  value={form.whyFields}
                  onChange={(v) => update("whyFields", v)}
                  rows={4}
                />
                <TextArea
                  label="If deployed tomorrow, what would you build? *"
                  hint="200–400 words. Be specific. We don't want a vision — we want a deployable concept."
                  value={form.whatWouldYouBuild}
                  onChange={(v) => update("whatWouldYouBuild", v)}
                  rows={6}
                />
              </StepWrapper>
            )}

            {/* STEP 4: The Six Archetypes */}
            {step === 4 && (
              <StepWrapper title="The Six Archetypes" desc="Your Archetype is determined by observed behavior under stress — not by what you pick here. But we want to know how you see yourself.">
                <div className="space-y-2.5 mb-6">
                  {ARCHETYPES.map((arch) => {
                    const selected = form.archetypeSelf === arch.name;
                    return (
                      <button
                        key={arch.name}
                        onClick={() => update("archetypeSelf", arch.name)}
                        className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-all w-full ${
                          selected ? "border-[#FF4D00] bg-[#FF4D00]/10" : "border-[#111111]/10 bg-[#111111]/[0.02] hover:border-[#111111]/25"
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 ${
                          selected ? "border-[#FF4D00] bg-[#FF4D00]" : "border-[#111111]/25"
                        }`}>
                          {selected && <div className="w-2 h-2 bg-white rounded-full m-auto mt-[3px]" />}
                        </div>
                        <div>
                          <p className={`text-sm font-semibold ${selected ? "text-[#111111]" : "text-[#111111]/70"}`}>{arch.name}</p>
                          <p className="text-xs text-[#111111]/40 mt-0.5">{arch.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <TextArea
                  label="Tell us about a time you operated in that role under pressure. *"
                  hint="150–300 words"
                  value={form.archetypeStory}
                  onChange={(v) => update("archetypeStory", v)}
                  rows={5}
                />
                <Input
                  label="Which Archetype do you think you're weakest in?"
                  value={form.weakestArchetype}
                  onChange={(v) => update("weakestArchetype", v)}
                />
              </StepWrapper>
            )}

            {/* STEP 5: The Honest Part */}
            {step === 5 && (
              <StepWrapper title="The Honest Part" desc="This is where we see who you are. Be honest. The Crucible will find out anyway.">
                <TextArea
                  label="What is the hardest thing you've ever done? *"
                  hint="Not the most impressive — the hardest."
                  value={form.hardestThing}
                  onChange={(v) => update("hardestThing", v)}
                  rows={4}
                />
                <TextArea
                  label="What happens to you under sustained cognitive exhaustion? *"
                  hint="Be honest. The Crucible will find out anyway."
                  value={form.cognitiveExhaustion}
                  onChange={(v) => update("cognitiveExhaustion", v)}
                  rows={4}
                />
                <TextArea
                  label="What is a belief you hold that most people disagree with? *"
                  value={form.disagreementBelief}
                  onChange={(v) => update("disagreementBelief", v)}
                  rows={3}
                />
                <TextArea
                  label="Why xHansa? Why now? *"
                  hint="100–200 words"
                  value={form.whyXHansa}
                  onChange={(v) => update("whyXHansa", v)}
                  rows={4}
                />
                <TextArea
                  label="If we don't accept you, what will you do? *"
                  hint="There's no wrong answer. We're curious."
                  value={form.ifRejected}
                  onChange={(v) => update("ifRejected", v)}
                  rows={3}
                />
                <Input label="Did someone refer you? If so, who?" value={form.referrer} onChange={(v) => update("referrer", v)} />
                <TextArea
                  label="Anything else we should know?"
                  hint="A link, a video, a drawing, a recording, a github repo, a farm, a fix."
                  value={form.additionalInfo}
                  onChange={(v) => update("additionalInfo", v)}
                  rows={4}
                />
              </StepWrapper>
            )}

            {/* STEP 6: Review & Submit */}
            {step === 6 && (
              <StepWrapper title="Review & Submit" desc="Review your answers. Once submitted, you cannot edit. Take a moment.">
                <div className="space-y-4 mb-6">
                  <ReviewItem label="Name" value={form.fullName} />
                  <ReviewItem label="Email" value={form.email} />
                  <ReviewItem label="Location" value={form.location || "—"} />
                  <ReviewItem label="Fields" value={form.fieldPreferences.join(", ") || "—"} />
                  <ReviewItem label="Archetype" value={form.archetypeSelf || "—"} />
                  <ReviewItem label="Commitment" value={
                    [form.commitment24mo, form.stipendAcceptance, form.supremacyClause,
                     form.gateSystem, form.cliffAcceptance, form.cruciblePreparedness]
                      .every(v => v === "yes") ? "All accepted ✓" : "Some not fully accepted"
                  } />
                </div>

                {submitError && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-4">
                    <p className="text-sm text-red-400">{submitError}</p>
                  </div>
                )}

                <div className="bg-[#FF4D00]/5 border border-[#FF4D00]/20 rounded-xl p-5 mb-6">
                  <p className="text-xs text-[#111111]/50 leading-relaxed">
                    By submitting, you confirm that your answers are honest and your own.
                    You understand this is a deployment, not employment; that the stipend is needs-based;
                    that IP belongs to the League Commons; that the Gates are binary; and that the cliff at Month 24 is final.
                  </p>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full py-4 bg-[#FF4D00] text-[#111111] text-sm font-bold tracking-wider rounded-xl hover:bg-[#FF6A28] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
                  ) : (
                    <>Submit Application <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </StepWrapper>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          {step > 0 ? (
            <button
              onClick={back}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#111111]/50 hover:text-[#111111] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : (
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#111111]/50 hover:text-[#111111] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Cancel
            </button>
          )}

          {step < STEPS.length - 1 && (
            <button
              onClick={next}
              disabled={!canProceed()}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#111111]/10 text-[#111111] text-sm font-bold rounded-full hover:bg-[#111111]/15 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Sub-components ──

function StepWrapper({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-medium tracking-tight mb-2">{title}</h2>
      <p className="text-sm text-[#111111]/40 leading-relaxed mb-6">{desc}</p>
      <div className="space-y-5">{children}</div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text", placeholder }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#111111]/60 mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#111111]/[0.03] border border-[#111111]/10 rounded-lg px-4 py-2.5 text-sm text-[#111111] placeholder-[#111111]/20 outline-none focus:border-[#FF4D00]/40 focus:ring-1 focus:ring-[#FF4D00]/20 transition-all"
      />
    </div>
  );
}

function TextArea({ label, hint, value, onChange, rows = 4 }: {
  label: string; hint?: string; value: string; onChange: (v: string) => void; rows?: number;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#111111]/60 mb-1.5">{label}</label>
      {hint && <p className="text-[10px] text-[#111111]/30 mb-1.5">{hint}</p>}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full bg-[#111111]/[0.03] border border-[#111111]/10 rounded-lg px-4 py-2.5 text-sm text-[#111111] placeholder-[#111111]/20 outline-none focus:border-[#FF4D00]/40 focus:ring-1 focus:ring-[#FF4D00]/20 transition-all resize-y"
      />
    </div>
  );
}

function CommitmentQuestion({ label, value, onChange }: {
  label: string; value: string; onChange: (v: string) => void;
}) {
  const options = [
    { val: "yes", label: "Yes", accent: true },
    { val: "questions", label: "I have questions" },
    { val: "no", label: "No" },
  ];
  return (
    <div>
      <p className="text-sm text-[#111111]/70 leading-relaxed mb-2.5">{label}</p>
      <div className="flex gap-2">
        {options.map((opt) => (
          <button
            key={opt.val}
            onClick={() => onChange(opt.val)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              value === opt.val
                ? opt.accent
                  ? "bg-[#FF4D00] text-[#111111]"
                  : "bg-[#111111]/15 text-[#111111]"
                : "bg-[#111111]/5 text-[#111111]/40 hover:bg-[#111111]/10"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start gap-4 py-2 border-b border-[#111111]/5">
      <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#111111]/30 flex-shrink-0">{label}</span>
      <span className="text-sm text-[#111111]/70 text-right">{value || "—"}</span>
    </div>
  );
}
