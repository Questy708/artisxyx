"use client";

import { ProgramApplyForm } from "./ProgramApplyForm";

export function InceptionStudiosApply() {
  return (
    <ProgramApplyForm
      config={{
        programId: "inception-studios",
        programName: "The Inception Studios",
        programTagline: "Co-creation with the world's giants.",
        cohort: "Studio Cycle 5, 2025",
        applyDeadline: "April 30, 2025",
        submitCohort: "Studio Cycle 5, 2025",
        steps: ["About You", "Your Motivation", "Your Expertise & Vision", "Review & Submit"],
        programSpecificTitle: "Your Expertise & Vision",
        programSpecificDesc:
          "The Studio builds companies from scratch — not from pitches. Tell us about your domain expertise and the systemic bottleneck you want to solve.",
        programQuestions: [
          {
            id: "domainExpertise",
            label: "What is your deep domain expertise? What have you spent years mastering? *",
            hint: "The Studio model pairs scientists and operational executives with Fortune 500 partners. We need to know what you bring.",
            rows: 6,
          },
          {
            id: "systemicBottleneck",
            label: "What systemic bottleneck do you want to solve? Why does it matter? *",
            hint: "200–400 words. Think big — the Studio targets market-defining companies, not incremental improvements.",
            rows: 7,
          },
          {
            id: "partnerExperience",
            label: "Have you worked with Fortune 500 companies, governments, or large institutions? Describe the experience. *",
            hint: "The Studio model leverages institutional partnerships. Tell us about your experience navigating large organizations.",
            rows: 5,
          },
          {
            id: "protoCoIdea",
            label: "If given a technology blueprint and Studio resources, what ProtoCo would you build? *",
            hint: "A ProtoCo is a lightweight, resource-constrained experiment to validate a core assumption. Be specific and deployable.",
            rows: 6,
          },
          {
            id: "ipPerspective",
            label: "Under the Studio model, IP is initially held by the Studio and shared across ventures. How do you feel about this? *",
            hint: "Honest answer. The shared IP infrastructure is a feature, not a bug — but we want to know your perspective.",
            rows: 4,
          },
        ],
        isForYouIf: [
          "You are a seasoned scientist or operational executive looking to fuel growth.",
          "You want to tackle complex issues affecting cities and industries.",
          "You believe in the power of shared resources and expertise.",
          "You want to build a market-defining company from Day 0.",
          "You have deep domain expertise but need the infrastructure to commercialize it.",
          "You want to leverage Fortune 500 and government partnerships from the start.",
        ],
        dealTerms: [
          { label: "Model", detail: "Venture Studio (co-creation, not investment)" },
          { label: "Partners", detail: "Fortune 500 / Government / Foundations" },
          { label: "Outcome", detail: "Market-defining NewCo (spun out independently)" },
          { label: "IP ownership", detail: "Studio-held initially; licensed to NewCo on spinout" },
          { label: "Infrastructure", detail: "Full operational support (legal, finance, HR, governance)" },
          { label: "First customers", detail: "Provided by partner network before incorporation" },
        ],
      }}
    />
  );
}
