"use client";

import { ProgramApplyForm } from "./ProgramApplyForm";

export function QuestFellowshipApply() {
  return (
    <ProgramApplyForm
      config={{
        programId: "quest-fellowship",
        programName: "Quest Fellowship",
        programTagline: "From Ideas to Impact, Powered by Queen's University.",
        cohort: "Cohort 3, Spring 2025",
        applyDeadline: "June 15, 2025",
        submitCohort: "Cohort 3, Spring 2025",
        steps: ["About You", "Your Motivation", "Your Idea & Ikigai", "Review & Submit"],
        programSpecificTitle: "Your Idea & Ikigai",
        programSpecificDesc:
          "Quest is about finding your Ikigai — the intersection of what you love, what the world needs, what you're good at, and what you can be rewarded for. Tell us where you are on that journey.",
        programQuestions: [
          {
            id: "ikigaiStatement",
            label: "What is your Ikigai? What drives you to build? *",
            hint: "100–200 words. The intersection of what you love, what the world needs, what you're good at, and what you can be rewarded for.",
            rows: 5,
          },
          {
            id: "ventureIdea",
            label: "What idea, technology, or passion do you want to transform into a venture? *",
            hint: "200–400 words. It doesn't need to be fully formed — Quest's Explore stage is designed to help you validate it. But we want to know what you're starting with.",
            rows: 7,
          },
          {
            id: "targetMarket",
            label: "What emerging market or community are you focused on? Why? *",
            hint: "Quest focuses on emerging markets because that's where the greatest potential for impact lies. Be specific about the geography and community.",
            rows: 5,
          },
          {
            id: "commitmentLevel",
            label: "Quest is a self-paced, semester-long program with biweekly office hours, assignments, and boot camps. Can you commit to active participation? *",
            hint: "Advancement through Explore → Ignite → Launch depends on demonstrated commitment. Tell us how you'll manage this alongside other commitments.",
            rows: 4,
          },
          {
            id: "impactVision",
            label: "What impact do you want your venture to have in 5 years? *",
            hint: "Think in terms of jobs created, problems solved, communities uplifted. Be bold but grounded.",
            rows: 4,
          },
        ],
        isForYouIf: [
          "You are an unconventional thinker who wants to address challenges on a global or local scale.",
          "You are an ecosystem amplifier looking to drive innovation-driven entrepreneurship.",
          "You want to find your Ikigai: purpose, impact, and sustainable livelihood.",
          "You are committed to building ventures that create employment in emerging markets.",
          "You value a structured, systematic approach backed by MIT's Disciplined Entrepreneurship framework.",
          "You want access to Queen's University faculty, mentorship, and global boot camp experiences.",
        ],
        dealTerms: [
          { label: "Partner", detail: "DDQIC / Queen's University" },
          { label: "Duration", detail: "Semester-long (self-paced)" },
          { label: "Curriculum", detail: "MIT Disciplined Entrepreneurship (24-step)" },
          { label: "Stages", detail: "3: Explore → Ignite → Launch" },
          { label: "Format", detail: "Self-paced video lectures + live office hours + boot camps" },
          { label: "Seed funding", detail: "Available at Launch stage" },
        ],
      }}
    />
  );
}
