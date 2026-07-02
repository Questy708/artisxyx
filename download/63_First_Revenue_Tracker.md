# 63. FIRST REVENUE TRACKER

**xHansa Fellowship — First Revenue Tracker**
**Pod [ID] | ProtoCo: [Name] | Q2: Months 7–12**

---

## PURPOSE

The First Revenue Tracker monitors the transition from "deployed Minimal Version" (Gate 1) to "demonstrated revenue with sustainable unit economics" (Gate 2). Revenue is the sole proof of product-market fit — no substitutes accepted.

This tracker is activated at the start of Q2 (Month 7) and maintained by the Operator. It is the primary Gate 2 evidence document.

---

## GATE 2 REMINDER

**Gate 2 requires ALL of the following:**
1. Revenue ≥ field-specific monthly threshold
2. CAC < LTV / 3
3. LTV > 3 × CAC
4. Churn < 10% monthly (subscription) or < 20% (transactional)
5. No critical operational failure in the last 60 days

Missing ANY single criterion = Gate failure = Kill Switch.

---

## TRACKER TEMPLATE

### Section 1: Revenue Targets (Field-Specific)

```
**ProtoCo:** [Name]
**Field:** [Field]
**Gate 2 Revenue Threshold:** $[amount]/month MRR (set by Strategic Command)
**Gate 2 Date:** Month 12 — [Date]
```

| Field | Gate 2 Min MRR |
|-------|---------------|
| Water Systems | $2,000/month |
| Energy Systems | $3,000/month |
| Food & Agriculture | $2,500/month |
| Health & Mobility | $3,000/month |
| Built Environment | $5,000/month (project-based) |
| Data & Intelligence | $4,000/month |
| Logistics & Trade | $5,000/month (transaction volume) |
| Governance & Identity | $3,000/month |
| Education & Human Capital | $2,000/month |

### Section 2: Monthly Revenue Log

| Month | MRR | One-Time Rev | Total Rev | Cumulative | Customers (New) | Customers (Churned) | Net New | ARPU |
|-------|-----|-------------|-----------|------------|-----------------|--------------------|--------- | ---- |
| Mo 7 | $___ | $___ | $___ | $___ | ___ | ___ | ___ | $___ |
| Mo 8 | | | | | | | | |
| Mo 9 | | | | | | | | |
| Mo 10 | | | | | | | | |
| Mo 11 | | | | | | | | |
| Mo 12 (Gate) | | | | | | | | |

**Target trajectory:**
- Mo 7: $___ (25% of Gate 2 threshold — activation)
- Mo 9: $___ (50% — growing)
- Mo 11: $___ (80% — close to target)
- Mo 12: $___ (100% — Gate 2 pass)

### Section 3: Unit Economics Tracker

Updated monthly. These are the numbers that determine Gate 2 pass/fail.

| Metric | Mo 7 | Mo 8 | Mo 9 | Mo 10 | Mo 11 | Mo 12 (Gate) | Target |
|--------|------|------|------|-------|-------|-------------|--------|
| CAC | $___ | | | | | | < LTV/3 |
| LTV | $___ | | | | | | > 3× CAC |
| LTV/CAC ratio | ___x | | | | | | > 3.0x |
| Gross margin | ___% | | | | | | [field]% |
| Churn (monthly) | ___% | | | | | | < 10% |
| Payback period | ___ mo | | | | | | < 12 mo |

**Gate 2 Status Check (updated monthly):**

| Criterion | Met? | Evidence |
|-----------|------|----------|
| Revenue ≥ $[threshold]/mo | ☐ Yes ☐ No | [MRR data] |
| CAC < LTV/3 | ☐ Yes ☐ No | [CAC and LTV calculations] |
| LTV > 3× CAC | ☐ Yes ☐ No | [ratio] |
| Churn < 10% | ☐ Yes ☐ No | [churn data] |
| No critical failure in 60 days | ☐ Yes ☐ No | [incident log] |
| **Overall Gate 2 readiness** | **___/5 met** | |

### Section 4: Customer Acquisition Tracker

| Week | Outreach | Leads | Conversations | Trials | Conversions | CAC |
|------|----------|-------|--------------|--------|-------------|-----|
| 1 | ___ | ___ | ___ | ___ | ___ | $___ |
| 2 | | | | | | |
| 3 | | | | | | |
| 4 | | | | | | |

**Funnel conversion rates:**
- Outreach → Lead: ___%
- Lead → Conversation: ___%
- Conversation → Trial: ___%
- Trial → Conversion: ___%
- Overall (Outreach → Conversion): ___%

### Section 5: Churn Tracker

| Month | Start Customers | Churned | Churn Rate | Reasons for Churn |
|------|----------------|---------|-----------|-------------------|
| Mo 7 | ___ | ___ | ___% | [reason 1, reason 2] |
| Mo 8 | | | | |
| ... | | | | |

**Churn reasons (categorize):**
- Price (too expensive)
- Product (doesn't meet needs)
- Service (operational issues, downtime)
- Competitive (switched to alternative)
- Other (moved, closed, etc.)

If churn > 10%, the Pod must identify the primary reason and address it. High churn = no product-market fit = Gate 2 failure.

### Section 6: Operational Stability Tracker (60-Day Lookback)

| Metric | 60-Day Target | Current 60-Day | Status |
|--------|--------------|----------------|--------|
| Uptime | > 95% | ___% | 🟢/🟡/🔴 |
| Critical incidents | 0 | ___ | |
| Mean time to resolve (MTTR) | < 24 hrs | ___ hrs | |
| Customer complaints | < 5/month | ___ | |
| Supply chain disruptions | 0 | ___ | |

**Critical incident log (last 60 days):**
| Date | Incident | Duration | Impact | Resolution | Recurrence risk |
|------|----------|----------|--------|------------|----------------|
| | | | | | |

### Section 7: Revenue Recovery Plan (If Behind Target)

If MRR is below the trajectory target at any monthly checkpoint:

```
## Revenue Recovery Plan — Month [X]
**Gap:** $___/month below target
**Root cause:** [Why are we behind? — be honest]

### Actions
| Action | Owner | Target Date | Expected Impact |
|--------|-------|------------|-----------------|
| [Action 1] | [Hustler] | [date] | +$___/mo |
| [Action 2] | [Builder] | [date] | +$___/mo |
| [Action 3] | [Pilot] | [date] | +$___/mo |

### Revised Forecast
- Mo [X+1]: $___ (with actions)
- Mo [X+2]: $___
- Mo 12 (Gate): $___ — [On track / Still behind]

### Escalation
- [ ] Pod Leader notified
- [ ] Strategic Command notified (if gap is critical)
```

---

## REVENUE RULES

1. **Revenue is the sole proof of PMF.** LOIs, pilots, grants, and projections do NOT count. Only actual customer payments.
2. **Count what's real.** If a customer paid $10, log $10. Don't annualize, don't project, don't count "committed" revenue. Only money received.
3. **MRR definition:** Monthly Recurring Revenue = the annualized value of all active subscriptions / 12. For transactional models (pay-per-use), use the trailing 30-day revenue as MRR.
4. **CAC includes ALL acquisition costs:** outreach, sales time (prorated stipend), marketing materials, referral fees. Not just ad spend.
5. **LTV is projected, not historical** (in early stages): Average revenue per user × expected lifetime. Expected lifetime = 1 / monthly churn rate. If churn is 10%, expected lifetime = 10 months.
6. **The 60-day stability window is rolling.** A critical incident in the last 60 days = Gate 2 at risk. The window shrinks as incidents age out.

---

## GATE 2 EVIDENCE COMPILATION (MONTH 12, WEEK 4)

| Evidence Required | Source | Compiled By | Status |
|-------------------|--------|-------------|--------|
| 6-month revenue log (Section 2) | This tracker | Operator | ☐ |
| Unit economics calculations (Section 3) | This tracker | Operator | ☐ |
| Customer acquisition data (Section 4) | CRM / this tracker | Hustler | ☐ |
| Churn data + reasons (Section 5) | This tracker | Operator | ☐ |
| 60-day operational stability log (Section 6) | Pilot Tracker + this | Operator | ☐ |
| Financial summary report | Comms | Comms | ☐ |

---

*First Revenue Tracker template version: 1.0*
*See also: KPI Dashboard (Doc 62), Budget Tracker (Doc 61), Gate Criteria (xHansa_Resource_Gate_Criteria_Kill_Switch.md)*
