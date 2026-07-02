"use client";

import { ProgramApplyForm } from "./ProgramApplyForm";

export function AcceleratorApply() {
  return (
    <ProgramApplyForm
      config={{
        programId: "xcelero-accelerator",
        programName: "xCelero Accelerator",
        programTagline: "High-velocity launchpad for exceptional founders.",
        cohort: "Batch 7, Spring 2025",
        applyDeadline: "March 31, 2025",
        submitCohort: "Batch 7, Spring 2025",
        steps: ["About You", "Your Motivation", "Your Venture", "Review & Submit"],
        programSpecificTitle: "Your Venture",
        programSpecificDesc:
          "Tell us about your company. The Accelerator is for existing ventures — we embed with you for 4 months and stress-test every assumption.",
        programQuestions: [
          {
            id: "ventureDescription",
            label: "Describe your venture. What problem does it solve, and for whom? *",
            hint: "200–400 words. Be specific about the problem, the market, and the solution.",
            rows: 7,
          },
          {
            id: "traction",
            label: "What traction do you have? (Revenue, users, pilots, partnerships) *",
            hint: "Be honest. We embed with your team — we'll see the real numbers anyway.",
            rows: 5,
          },
          {
            id: "teamDescription",
            label: "Describe your team. Who are the founders, and what are their roles? *",
            hint: "Include backgrounds, complementary skills, and how long you've worked together.",
            rows: 5,
          },
          {
            id: "whyAccelerator",
            label: "Why the xCelero Accelerator specifically? What do you need from the 4 months? *",
            hint: "Don't give us a generic answer. Tell us what leverage points you're looking for.",
            rows: 5,
          },
          {
            id: "useOfFunds",
            label: "If accepted, how would you use the $620k funding package? *",
            hint: "Rough allocation — hiring, product, go-to-market, etc.",
            rows: 4,
          },
        ],
        isForYouIf: [
          "You are an exceptional founder looking to redefine the future of innovation.",
          "You want to think bigger, execute faster, and 10x your odds.",
          "You value individualized support over one-size-fits-all playbooks.",
          "You have a venture with early traction (revenue, users, or pilots).",
          "You can commit to a 4-month immersive residency across 19 cities.",
          "You are willing to accept $120k for 3% equity + $500k uncapped SAFE.",
        ],
        dealTerms: [
          { label: "Duration", detail: "4 months immersive" },
          { label: "Funding", detail: "$120k for 3% equity ($5M cap) + $500k uncapped SAFE" },
          { label: "Equity", detail: "3% fixed" },
          { label: "Batch size", detail: "20 companies" },
          { label: "Residency", detail: "19 cities globally" },
          { label: "Mentor ratio", detail: "3:1 (mentors per company)" },
        ],
      }}
    />
  );
}
