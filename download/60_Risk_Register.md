# 60. RISK REGISTER

**xHansa Fellowship — Pod Risk Register**
**Pod [ID] | ProtoCo: [Name]**

---

## PURPOSE

The Risk Register is the Pod's living inventory of threats to the ProtoCo and to Gate passage. It is maintained by the Tracker, reviewed weekly in the Weekly Review, and updated monthly. It is a Gate submission evidence document (operational discipline).

---

## RISK SCORING

Every risk is scored on two dimensions:

### Severity (Impact if it occurs)
| Score | Meaning |
|-------|---------|
| H (High) | Could cause a Gate failure (Kill Switch) or venture failure |
| M (Medium) | Could cause a sprint delay, budget overrun, or operational disruption |
| L (Low) | Minor inconvenience; manageable within the sprint |

### Probability (Likelihood of occurring)
| Score | Meaning |
|-------|---------|
| H (High) | > 60% likely |
| M (Medium) | 20–60% likely |
| L (Low) | < 20% likely |

### Priority = Severity × Probability
| | L Prob | M Prob | H Prob |
|---|--------|--------|--------|
| **H Sev** | Medium | High | Critical |
| **M Sev** | Low | Medium | High |
| **L Sev** | Low | Low | Medium |

**Critical and High risks** must have a mitigation plan and an owner. They are reviewed every week until resolved.

---

## RISK REGISTER TEMPLATE

```
# Risk Register — Pod [ID]
**Last updated:** [YYYY-MM-DD]
**Maintained by:** [Tracker name]
**Total active risks:** ___
**Critical:** ___ | **High:** ___ | **Medium:** ___ | **Low:** ___

---

## Active Risks

### Risk [###]: [Risk Title]
**Added:** [Date]
**Category:** [Technical / Market / Operational / Financial / Regulatory / Team / Partner / External]
**Description:** [1-2 sentences — what is the risk?]
**Trigger:** [What would cause this risk to materialize?]
**Impact:** [What happens if it materializes? How does it affect the Gate?]

**Severity:** H / M / L
**Probability:** H / M / L
**Priority:** Critical / High / Medium / Low

**Mitigation plan:** [What are we doing to prevent or reduce this risk?]
**Contingency plan:** [What will we do if it materializes despite mitigation?]
**Owner:** [Name]
**Review date:** [When to reassess]
**Status:** Open / Mitigated / Closed

**Updates:**
- [Date]: [Update — what changed?]
- [Date]: [Update]

---

[Repeat for each risk]
```

---

## SAMPLE RISKS

### Risk 001: Anchor Partner Delays LOI Signing

**Added:** 2025-09-01
**Category:** Partner
**Description:** The Anchor Partner (NGO) has expressed interest but has not yet signed the LOI. Their internal approval process is slower than expected.
**Trigger:** The partner's board meeting is delayed, or they change their mind.
**Impact:** Without the LOI, we fail Gate 1 (Month 6). Kill Switch.

**Severity:** H
**Probability:** M
**Priority:** High

**Mitigation plan:** The Hustler is in weekly contact with the partner's project lead. We've prepared a draft LOI that minimizes their legal review burden. We've identified a backup partner (secondary option) in case the primary falls through.
**Contingency plan:** If the primary partner hasn't signed by Month 5, Week 2, we pivot to the backup partner. The backup LOI is pre-drafted.
**Owner:** [Hustler name]
**Review date:** Weekly (every Friday Review)
**Status:** Open

**Updates:**
- 2025-09-08: Partner's board meeting scheduled for 2025-09-20. LOI on the agenda.
- 2025-09-22: Board approved. LOI sent to legal review. Expected signing: 2025-10-01.
- 2025-10-02: LOI signed. Risk closed.

---

### Risk 002: Solar Panel Supply Chain Disruption

**Added:** 2025-08-15
**Category:** Operational / Supply Chain
**Description:** Our solar panel supplier (Vendor A, Nairobi) is a small operation. If they cannot fulfill our order, we lose 4 weeks of build time.
**Trigger:** Vendor A goes bankrupt, has production issues, or raises prices significantly.
**Impact:** Build delay → Gate 1 delay → potential Kill Switch.

**Severity:** H
**Probability:** L
**Priority:** Medium

**Mitigation plan:** Ordered 2 extra panels as buffer. Identified Vendor C (backup, same city) with equivalent specs at 10% higher cost. Pre-negotiated a rush-order agreement with Vendor C.
**Contingency plan:** If Vendor A fails, activate Vendor C rush order. Build timeline extends by 1 week (within buffer).
**Owner:** [Operator name]
**Review date:** Monthly
**Status:** Open

---

### Risk 003: Regulatory Permit Delay in Pilot Geography

**Added:** 2025-08-20
**Category:** Regulatory
**Description:** The pilot geography requires a water utility permit that takes 8-12 weeks to process. We applied in Month 3 but have not yet received approval.
**Trigger:** The regulatory agency is slow, or our application is rejected.
**Impact:** If the permit doesn't arrive by Month 5, we cannot deploy the Minimal Version. Gate 1 at risk.

**Severity:** H
**Probability:** M
**Priority:** High

**Mitigation plan:** The Hustler has a contact at the regulatory agency who is tracking our application. We've submitted all required documentation. We've also identified a second geography (in case we need to pivot the pilot site) where permits are faster.
**Contingency plan:** If the permit isn't received by Month 4, Week 3, we pivot the pilot to the backup geography (permits take 3 weeks there). The Anchor Partner LOI is geography-agnostic.
**Owner:** [Hustler name]
**Review date:** Weekly
**Status:** Open

---

## RISK CATEGORIES

| Category | Examples |
|----------|---------|
| **Technical** | Build failure, prototype doesn't work, technology doesn't scale |
| **Market** | Users don't adopt, pricing is wrong, market is smaller than expected |
| **Operational** | Supply chain disruption, logistics failure, equipment failure, maintenance issues |
| **Financial** | Budget overrun, revenue shortfall, cost inflation |
| **Regulatory** | Permit delays, regulatory changes, compliance issues |
| **Team** | Member attrition, conflict, burnout, performance issues |
| **Partner** | Anchor Partner withdrawal, vendor failure, customer churn |
| **External** | Political instability, natural disaster, pandemic, economic crisis |

---

## RISK REVIEW PROTOCOL

### Weekly (Friday Review)
- The Tracker presents the top 3-5 risks.
- Status updates on each (what changed this week?).
- Any new risks identified this week? Add to the register.
- Any risks resolved? Close them (don't delete — keep the record).

### Monthly (Monthly Strategic Review)
- Full Risk Register review (all active risks).
- Re-score each risk (severity and probability may have changed).
- Identify trends (are risks increasing? decreasing?).
- Flag any risks that could cause a Gate failure.
- Submit the Risk Register as part of the Monthly Review to Strategic Command.

### Before Each Gate (Gate Readiness Review, 4 weeks out)
- Comprehensive risk review focused on Gate-pass risks.
- "What could cause us to fail this Gate?" — list and assess each.
- Mitigation plans confirmed.
- Contingency plans ready.

---

## RISK RULES

1. **The Tracker owns it.** They maintain the register, score the risks, and present in reviews.
2. **All members can identify risks.** If you see a risk, tell the Tracker. They'll add it.
3. **Don't hide risks.** If a risk is embarrassing (you caused it, it's your responsibility), add it anyway. Hiding a risk is a Conduct violation (radical honesty). The Kill Switch is far more embarrassing than the risk.
4. **Close risks when resolved.** Don't leave stale risks in the register. If it's resolved, close it (with a resolution date and summary).
5. **Every Critical/High risk has an owner and a mitigation.** No orphan risks. No "we'll figure it out" mitigations. Specific, owned, dated.

---

*Risk Register template version: 1.0*
*See also: ProtoCo Dossier (Doc 55), Decision Log (Doc 50), Gate Criteria (xHansa_Resource_Gate_Criteria_Kill_Switch.md)*
