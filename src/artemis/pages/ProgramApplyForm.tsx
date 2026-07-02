"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, Loader2 } from "lucide-react";
import { useRouter } from "@/artemis/router";

const EASE = [0.22, 1, 0.36, 1] as const;

export interface ProgramFormConfig {
  programId: string;
  programName: string;
  programTagline: string;
  cohort: string;
  applyDeadline: string;
  steps: string[];
  // Section 3: program-specific questions
  programSpecificTitle: string;
  programSpecificDesc: string;
  programQuestions: { id: string; label: string; hint?: string; rows?: number }[];
  // "Is this for you" list
  isForYouIf: string[];
  // The deal / terms
  dealTerms: { label: string; detail: string }[];
  // Submit cohort label
  submitCohort: string;
}

export function ProgramApplyForm({ config }: { config: ProgramFormConfig }) {
  const { navigate } = useRouter();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [form, setForm] = useState<Record<string, string>>({
    programId: config.programId,
    cohort: config.submitCohort,
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedinUrl: "",
    currentRole: "",
    companyName: "",
    motivation: "",
    referral: "",
  });

  // Initialize program-specific fields
  config.programQuestions.forEach((q) => {
    if (!(q.id in form)) form[q.id] = "";
  });

  const update = useCallback((key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const canProceed = () => {
    switch (step) {
      case 0: return form.fullName.trim() && form.email.trim().includes("@");
      case 1: return form.motivation.trim().length > 20;
      case 2:
        // Check all program questions have content
        return config.programQuestions.every((q) => form[q.id]?.trim().length > 5);
      case 3: return true; // Review
      default: return true;
    }
  };

  const next = () => { setDirection(1); if (step < config.steps.length - 1) setStep(step + 1); };
  const back = () => { setDirection(-1); if (step > 0) setStep(step - 1); };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/programs/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          programSlug: config.programId,
          firstName: form.fullName.split(" ")[0] || form.fullName,
          lastName: form.fullName.split(" ").slice(1).join(" ") || "—",
          email: form.email,
          phone: form.phone || undefined,
          location: form.location || undefined,
          linkedinUrl: form.linkedinUrl || undefined,
          currentRole: form.currentRole || undefined,
          companyName: form.companyName || undefined,
          motivation: form.motivation || undefined,
          referral: form.referral || undefined,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
      } else {
        setSubmitError(data.error || "Submission failed. Please try again.");
      }
    } catch {
      setSubmitError("Network error. Please check your connection.");
    } finally {
      setSubmitting(false);
    }
  };

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
            <Check className="w-10 h-10 text-white" strokeWidth={3} />
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-medium tracking-tight mb-4">
            Application received.
          </h1>
          <p className="text-white/50 text-lg leading-relaxed mb-8">
            Your application to {config.programName}, {config.submitCohort} has been submitted.
            We read every application. You'll hear from us within 21 days.
          </p>
          <div className="space-y-3 text-left bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
            <p className="text-sm text-white/60">While you wait:</p>
            <p className="text-sm text-white/70">• Review the program page for FAQ and details</p>
            <p className="text-sm text-white/70">• Join TownSquare to connect with the community</p>
            <p className="text-sm text-white/70">• Keep building. We notice people who keep operating.</p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 bg-[#FF4D00] text-white text-sm font-bold tracking-wider rounded-full hover:bg-[#FF6A28] transition-colors inline-flex items-center gap-2"
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
              <span className="text-white font-bold text-sm">X</span>
            </div>
            <span className="text-[13px] font-bold tracking-tight uppercase">
              xCelero<span className="text-[#FF4D00]"> Labs</span>
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-medium tracking-tight mb-3">
            {config.programName} <span className="text-[#FF4D00]">Application</span>
          </h1>
          <p className="text-white/40 text-sm md:text-base">{config.cohort} · Applications close {config.applyDeadline}</p>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-1.5 mb-10">
          {config.steps.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                i <= step ? "bg-[#FF4D00]" : "bg-white/10"
              }`}
            />
          ))}
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-[#FF4D00]">
            Step {step + 1} of {config.steps.length}
          </span>
          <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-white/30">
            {config.steps[step]}
          </span>
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            initial={{ opacity: 0, x: direction * 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -20 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {/* STEP 0: About You */}
            {step === 0 && (
              <StepWrap title="About You" desc="Tell us who you are. This information is confidential.">
                <InputField label="Full Name *" value={form.fullName} onChange={(v) => update("fullName", v)} />
                <InputField label="Email *" type="email" value={form.email} onChange={(v) => update("email", v)} />
                <InputField label="Phone / WhatsApp" value={form.phone} onChange={(v) => update("phone", v)} />
                <InputField label="Location (City, Country)" value={form.location} onChange={(v) => update("location", v)} />
                <InputField label="LinkedIn / Portfolio URL" value={form.linkedinUrl} onChange={(v) => update("linkedinUrl", v)} />
                <InputField label="Current Role / Occupation" value={form.currentRole} onChange={(v) => update("currentRole", v)} />
                <InputField label="Company / Organization Name" value={form.companyName} onChange={(v) => update("companyName", v)} />
              </StepWrap>
            )}

            {/* STEP 1: Why This Program */}
            {step === 1 && (
              <StepWrap title="Your Motivation" desc="Why are you applying? What drives you? Be honest.">
                <TextAreaField
                  label="Why do you want to join this program? What are you looking to achieve? *"
                  hint="200–400 words. Be specific about your goals, your venture (if you have one), and what you bring."
                  value={form.motivation}
                  onChange={(v) => update("motivation", v)}
                  rows={8}
                />
                <InputField label="Did someone refer you? If so, who?" value={form.referral} onChange={(v) => update("referral", v)} />
              </StepWrap>
            )}

            {/* STEP 2: Program-Specific Questions */}
            {step === 2 && (
              <StepWrap title={config.programSpecificTitle} desc={config.programSpecificDesc}>
                {config.programQuestions.map((q) => (
                  <TextAreaField
                    key={q.id}
                    label={q.label}
                    hint={q.hint}
                    value={form[q.id] || ""}
                    onChange={(v) => update(q.id, v)}
                    rows={q.rows || 5}
                  />
                ))}
              </StepWrap>
            )}

            {/* STEP 3: Review & Submit */}
            {step === 3 && (
              <StepWrap title="Review & Submit" desc="Review your answers. Once submitted, you cannot edit.">
                {/* Deal terms */}
                <div className="bg-[#FF4D00]/5 border border-[#FF4D00]/20 rounded-xl p-5 mb-5">
                  <p className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-3">The Deal</p>
                  <div className="space-y-2">
                    {config.dealTerms.map((term, i) => (
                      <div key={i} className="flex justify-between items-start gap-4 text-sm">
                        <span className="text-white/50 font-medium">{term.label}</span>
                        <span className="text-white/80 text-right">{term.detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Is this for you */}
                <div className="bg-white/[0.02] border border-white/10 rounded-xl p-5 mb-5">
                  <p className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/40 mb-3">This Program Is For You If:</p>
                  <ul className="space-y-1.5">
                    {config.isForYouIf.map((item, i) => (
                      <li key={i} className="text-xs text-white/50 flex items-start gap-2">
                        <span className="text-[#FF4D00] mt-0.5">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Summary */}
                <div className="space-y-2 mb-5">
                  <ReviewRow label="Name" value={form.fullName} />
                  <ReviewRow label="Email" value={form.email} />
                  <ReviewRow label="Location" value={form.location || "—"} />
                  <ReviewRow label="Company" value={form.companyName || "—"} />
                  <ReviewRow label="Motivation" value={form.motivation ? `${form.motivation.slice(0, 80)}...` : "—"} />
                </div>

                {submitError && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-4">
                    <p className="text-sm text-red-400">{submitError}</p>
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full py-4 bg-[#FF4D00] text-white text-sm font-bold tracking-wider rounded-xl hover:bg-[#FF6A28] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
                  ) : (
                    <>Submit Application <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </StepWrap>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          {step > 0 ? (
            <button onClick={back} className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white/50 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : (
            <button onClick={() => navigate("/")} className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white/50 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" /> Cancel
            </button>
          )}
          {step < config.steps.length - 1 && (
            <button
              onClick={next}
              disabled={!canProceed()}
              className="flex items-center gap-2 px-6 py-2.5 bg-white/10 text-white text-sm font-bold rounded-full hover:bg-white/15 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
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

function StepWrap({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-medium tracking-tight mb-2">{title}</h2>
      <p className="text-sm text-white/40 leading-relaxed mb-6">{desc}</p>
      <div className="space-y-5">{children}</div>
    </div>
  );
}

function InputField({ label, value, onChange, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-white/60 mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-[#FF4D00]/40 focus:ring-1 focus:ring-[#FF4D00]/20 transition-all"
      />
    </div>
  );
}

function TextAreaField({ label, hint, value, onChange, rows = 5 }: {
  label: string; hint?: string; value: string; onChange: (v: string) => void; rows?: number;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-white/60 mb-1.5">{label}</label>
      {hint && <p className="text-[10px] text-white/30 mb-1.5">{hint}</p>}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-[#FF4D00]/40 focus:ring-1 focus:ring-[#FF4D00]/20 transition-all resize-y"
      />
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start gap-4 py-2 border-b border-white/5">
      <span className="text-xs font-mono font-bold tracking-wider uppercase text-white/30 flex-shrink-0">{label}</span>
      <span className="text-sm text-white/70 text-right">{value || "—"}</span>
    </div>
  );
}
