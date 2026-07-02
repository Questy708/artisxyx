"use client";

import { ProgramApplyForm } from "./ProgramApplyForm";

export function XRouteExpeditionApply() {
  return (
    <ProgramApplyForm
      config={{
        programId: "xroute-expedition",
        programName: "xRoute Expedition",
        programTagline: "See the engine. Walk the routes.",
        cohort: "Spring 2026 — Gulf of Guinea Arc",
        applyDeadline: "February 28, 2026",
        submitCohort: "Spring 2026 — Gulf of Guinea Arc",
        steps: ["About You", "Your Motivation", "Route Selection", "Review & Submit"],
        programSpecificTitle: "Route Selection",
        programSpecificDesc:
          "Tell us which route leg draws you and why. The Expedition is about seeing the engine in action — your route choice determines what you'll witness.",
        programQuestions: [
          {
            id: "routePreference",
            label: "Which route leg are you most interested in, and why? *",
            hint: "Gulf of Guinea Arc (fintech/trade), Sahel Corridor (water/energy), East African Corridor (health/mobility), Central Africa (mining/materials), Southern Africa (manufacturing/cities), or North Africa (governance/connectivity). 200–300 words.",
            rows: 6,
          },
          {
            id: "whatYouWant",
            label: "What do you want to see, learn, or find during the expedition? *",
            hint: "Be honest. Investment opportunities? Partnership possibilities? A specific venture or domain? The route to determine if xCelero is real? We tailor the expedition to the group.",
            rows: 5,
          },
          {
            id: "background",
            label: "What is your background? (Investor, partner, operator, future Xcitizen, other) *",
            hint: "The group is curated for diversity of perspective. Tell us what you bring.",
            rows: 4,
          },
          {
            id: "postExpedition",
            label: "What would you do with the experience after the expedition? *",
            hint: "Invest? Partner? Join a program? Build something? The expedition is often the beginning, not the end.",
            rows: 4,
          },
        ],
        isForYouIf: [
          "You are an investor who wants to see ventures in the field, not in a pitch deck.",
          "You are a partner (corporate, government, NGO) who wants to understand the route geography before committing.",
          "You are a future Xcitizen who wants to experience the engine before deploying.",
          "You are an operator who wants to see how infrastructure is built in emerging markets.",
          "You believe that seeing is believing — and that 14 days on the ground beats 14 months of reports.",
          "You want a network, not a tour. The Expedition alumni community is permanent.",
        ],
        dealTerms: [
          { label: "Duration", detail: "14 days immersive" },
          { label: "Route legs", detail: "6 available (pick one per expedition)" },
          { label: "Cities visited", detail: "4–6 per leg" },
          { label: "Group size", detail: "12–15 explorers" },
          { label: "Includes", detail: "In-country travel, accommodation, meals, XEmbassy access, field visits" },
          { label: "Excludes", detail: "International flights to/from hub city" },
        ],
      }}
    />
  );
}
