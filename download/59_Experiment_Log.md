# 59. EXPERIMENT LOG

**xHansa Fellowship — Experiment Log**
**Pod [ID] | ProtoCo: [Name]**

---

## PURPOSE

The Experiment Log tracks every experiment the Pod runs — technical tests, market tests, pricing tests, operational tests. Experiments are how the Pod learns what works before committing resources. The Gate System rewards evidence-based decisions; the Experiment Log is where that evidence lives.

The Tracker maintains this log. All members can propose experiments.

---

## WHAT COUNTS AS AN EXPERIMENT

An experiment is a structured test with:
1. A **hypothesis** (what you think will happen)
2. A **method** (how you'll test it)
3. A **metric** (what you'll measure)
4. A **threshold** (what result confirms or denies the hypothesis)
5. A **timeline** (when it starts and ends)

If it doesn't have all five, it's not an experiment — it's a guess.

---

## EXPERIMENT LOG TEMPLATE

Each experiment is logged using this format:

```
### Experiment [###]: [Title]
**Date proposed:** [YYYY-MM-DD]
**Proposed by:** [Name] ([Archetype])
**Phase:** [Q1/Q2/Q3/Q4]
**Status:** [Planned / Running / Complete / Abandoned]

---

**Hypothesis:**
[What we think will happen — one sentence. Format: "If we [action], then [outcome] because [rationale]."]

**Method:**
[How we'll test it — 2-3 sentences. What will we do? Who/what will we test it on?]

**Metric:**
[What we'll measure — specific, quantifiable]

**Threshold:**
[What result confirms the hypothesis? What denies it?]
- Confirm: [metric ≥/≤/ = threshold]
- Deny: [metric ≥/≤/ = threshold]

**Timeline:**
- Start: [date]
- End: [date]
- Duration: [X days/weeks]

**Resources needed:**
- [Materials / tools / budget / people]

---

**Results:**
[Filled in after the experiment runs]

**Metric observed:** [actual number]
**Hypothesis confirmed or denied:** [Confirmed / Denied / Inconclusive]

**What we learned:**
[2-3 sentences — what the result means for the ProtoCo]

**Action taken:**
[What the Pod did with this learning — e.g., "Adjusted pricing to $X", "Pivoted to approach Y", "Logged as Commons contribution"]

**Commons contribution:** [Yes/No — if yes, what was submitted]

**Follow-up experiment:** [If needed — link to Experiment #___]
```

---

## SAMPLE EXPERIMENTS

### Experiment 001: Pricing Sensitivity — $0.01/L vs $0.02/L

**Date proposed:** 2025-09-15
**Proposed by:** [Hustler name]
**Phase:** Q1
**Status:** Complete

**Hypothesis:** If we price water at $0.01/L (vs $0.02/L), then adoption will increase by 50%+ because the target community's willingness to pay is under $0.015/L based on customer discovery.

**Method:** Deploy the Minimal Version at two adjacent sites. Site A prices at $0.01/L. Site B prices at $0.02/L. Both sites run for 14 days. Measure total liters dispensed and unique users at each site.

**Metric:** Unique users per day at each site.

**Threshold:**
- Confirm: Site A has 50%+ more unique users/day than Site B
- Deny: Site A has < 50% more unique users/day than Site B

**Timeline:**
- Start: 2025-10-01
- End: 2025-10-15
- Duration: 14 days

**Resources needed:** Two Minimal Version units, USSD billing system configured for two price points, field staff to monitor.

---

**Results:**

**Metric observed:** Site A: 42 unique users/day. Site B: 28 unique users/day. Site A had 50% more users.

**Hypothesis confirmed or denied:** Confirmed

**What we learned:** The community's willingness to pay is highly price-sensitive between $0.01 and $0.02/L. At $0.01/L, adoption is significantly higher. At $0.02/L, a meaningful segment is priced out. The $0.01/L price point is optimal for adoption (and still meets unit economics targets).

**Action taken:** Set pricing at $0.01/L for Gate 2 revenue model. Logged in Decision Log as Decision #007.

**Commons contribution:** Yes — submitted "Price sensitivity testing in Sahelian water markets" to the Commons.

**Follow-up experiment:** Experiment #004 — Test $0.008/L vs $0.01/L to see if even lower pricing drives enough volume to compensate.

---

### Experiment 002: Solar Panel Tilt — 15° vs 25°

**Date proposed:** 2025-09-20
**Proposed by:** [Builder name]
**Phase:** Q1
**Status:** Complete

**Hypothesis:** If we set the solar panel tilt at 15° (vs the standard 25° for this latitude), then daily energy harvest will increase by 5%+ because the pilot site receives more diffuse light than direct light due to dust haze.

**Method:** Install two identical Minimal Version units at the pilot site. Unit 1: panel tilt at 15°. Unit 2: panel tilt at 25°. Run for 7 days. Measure daily energy harvest (Wh) from each unit.

**Metric:** Average daily energy harvest (Wh) per unit.

**Threshold:**
- Confirm: Unit 1 harvests 5%+ more Wh/day than Unit 2
- Deny: Unit 1 harvests < 5% more Wh/day than Unit 2

**Timeline:** 7 days

**Results:**
**Metric observed:** Unit 1 (15°): 420 Wh/day avg. Unit 2 (25°): 395 Wh/day avg. Unit 1 harvested 6.3% more.

**Hypothesis confirmed or denied:** Confirmed

**What we learned:** At this specific site (dust haze), a 15° tilt outperforms the standard 25°. This may not generalize to other sites — test in replication geographies.

**Action taken:** Set panel tilt to 15° for all units at this site. Flag for Q3 replication testing.

**Commons contribution:** Yes — submitted "Solar panel tilt optimization in dust-haze environments" to the Commons.

**Follow-up experiment:** Experiment #008 — Test 15° vs 10° in the next geography (different dust conditions).

---

## EXPERIMENT RULES

### 1. Log Before You Run
Log the experiment (hypothesis, method, metric, threshold, timeline) BEFORE you run it. If you log after, you'll rationalize the result. Pre-registration prevents bias.

### 2. One Hypothesis Per Experiment
Don't test three things at once. If you change pricing AND features AND messaging simultaneously, you won't know which caused the result. One variable.

### 3. Define the Threshold Before You Run
"Did it work?" is not a metric. "Did Site A have 50%+ more users than Site B?" is. Define the pass/fail threshold before the experiment starts.

### 4. Report Honestly
If the hypothesis is denied, report it as denied. Don't spin. Denied hypotheses are as valuable as confirmed ones — they prevent you from scaling a bad idea. The Commons wants your failures.

### 5. Run Quickly
Experiments should be short — days, not months. If an experiment takes a month, it's too complex. Break it down. The faster you run experiments, the faster you learn.

### 6. Contribute to the Commons
Every experiment learning goes to the Commons. Other Pods may face the same question. Your result saves them time.

---

## EXPERIMENT CADENCE

| Phase | Target Experiments/Week | Focus |
|-------|------------------------|-------|
| Q1 (Months 1–6) | 2–3 | Minimal Version design, pricing, deployment logistics |
| Q2 (Months 7–12) | 1–2 | Revenue optimization, unit economics, customer acquisition |
| Q3 (Months 13–18) | 1–2/geo | Replication validation, local adaptation |
| Q4 (Months 19–24) | 0.5–1 | Operational efficiency, handover optimization |

---

*Experiment Log template version: 1.0*
*See also: ProtoCo Dossier (Doc 55), Pilot Tracker (Doc 58), Risk Register (Doc 60)*
