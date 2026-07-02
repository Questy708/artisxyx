# xHANSA FELLOWSHIP — POD FORMATION ALGORITHM SPEC

**INTERNAL — STRATEGIC COMMAND USE**

---

## 1. PURPOSE

To compose 100 ten-person Pods from 1,000 classified Xcitizens, such that each Pod:
- Contains all six Archetypes (Pilot, Builder, Hustler, Operator, Tracker, Comms)
- Is assigned to one of the Nine Civilizational Fields
- Maximizes complementary strengths within the assigned field
- Minimates known conflict patterns (from historical deployment data)

Pod formation is deterministic — there is no human override. The algorithm runs once per cohort, after all candidates have been classified.

---

## 2. INPUTS

### Per-Xcitizen data (from the Typing Assessment):
```
{
  id: string,
  field_assignment: one of [Water, Energy, Food, Health, BuiltEnv, Data, Logistics, Governance, Education],
  primary_archetype: one of [Pilot, Builder, Hustler, Operator, Tracker, Comms],
  secondary_archetype: one of [Pilot, Builder, Hustler, Operator, Tracker, Comms],
  archetype_scores: { Pilot: 0-20, Builder: 0-20, ... },
  location: string (city/country of XEmbassy assignment),
  deployable_from: date,
  risk_flags: string[] (e.g., ["solo-operator-tendency", "conflict-avoidance"]),
}
```

### Per-ProtoCo commission (from Strategic Command):
```
{
  id: string,
  field: one of the Nine,
  required_archetypes: { Pilot: 1-2, Builder: 2-3, Hustler: 1-2, Operator: 1-2, Tracker: 1, Comms: 1 },
  location: string (XEmbassy),
  complexity: "standard" | "high",
  min_team_size: 10,
  max_team_size: 10,
}
```

---

## 3. THE ALGORITHM (5 PASSES)

### Pass 1: Field Bucketing
Group all 1,000 Xcitizens by `field_assignment`. Result: 9 buckets. Each bucket's size must match the number of ProtoCo commissions in that field × 10.

If a bucket is over/under-populated, reassign the excess/deficit to adjacent fields (per the Field Adjacency Map):
- Water ↔ Energy ↔ Food (physical infrastructure cluster)
- Health ↔ Data ↔ Logistics (systems cluster)
- BuiltEnv ↔ Governance ↔ Education (civic cluster)

Reassignment priority: candidates whose secondary field preference matches the adjacent field.

### Pass 2: Location Clustering
Within each field bucket, cluster Xcitizens by `location` (XEmbassy). A Pod must be co-located — you cannot have a Pod split across Lagos and Nairobi (the Crucible and deployment require physical co-presence).

If a location has fewer than 10 Xcitizens in a field, merge with the nearest XEmbassy (per the Hub Distance Matrix) or flag for remote-deployment exception (rare, requires Strategic Command approval).

### Pass 3: Archetype Balancing (Greedy Assignment)
Within each (field, location) cluster, compose Pods of 10 using a greedy algorithm:

**Target Pod composition (per ProtoCo):**
| Archetype | Count | Rationale |
|-----------|-------|-----------|
| Pilot | 1 | Sets direction |
| Builder | 2-3 | Constructs (the majority) |
| Hustler | 1-2 | Closes deals/partnerships |
| Operator | 1-2 | Maintains the system |
| Tracker | 1 | Surveils risk/data |
| Comms | 1 | Translates/synthesizes |
| **Total** | **10** | |

**Algorithm:**
1. For each ProtoCo commission (in complexity order: high → standard):
2. Select 1 Pilot (highest Pilot score in the cluster)
3. Select 2-3 Builders (highest Builder scores)
4. Select 1-2 Hustlers (highest Hustler scores)
5. Select 1-2 Operators (highest Operator scores)
6. Select 1 Tracker (highest Tracker score)
7. Select 1 Comms (highest Comms score)
8. Fill any remaining slot with the highest-scoring Xcitizen of any Archetype (the "floater")
9. Remove selected Xcitizens from the cluster pool
10. Repeat for the next ProtoCo

**Tiebreaker:** If two candidates have equal Archetype scores, prefer the one whose `secondary_archetype` fills a gap in the Pod's composition.

### Pass 4: Risk-Flag Deconfliction
Review each composed Pod for risk-flag conflicts:

| Conflict Pattern | Rule |
|-----------------|------|
| Two "solo-operator-tendency" flags | Do not place in the same Pod (they'll compete for control) |
| "Conflict-avoidance" + "aggressive-closer" | Acceptable (complementary) |
| Two "aggressive-closer" | Do not place together (Hustler collision) |
| "Burnout-risk" flag | Pair with a strong Operator (stabilizer) |

If a Pod violates a rule, swap one member with the next-best candidate from the cluster pool.

### Pass 5: Validation + Output
For each composed Pod, validate:
- [ ] Exactly 10 members
- [ ] All 6 Archetypes present
- [ ] Co-located (same XEmbassy)
- [ ] No risk-flag conflicts
- [ ] Field matches the ProtoCo commission

Output: 100 Pods, each with 10 Xcitizens, assigned to a ProtoCo and an XEmbassy.

---

## 4. EDGE CASES

### What if a cluster can't fill a full Pod?
The algorithm flags it. Strategic Command decides:
- **Option A:** Merge with the nearest XEmbassy (if within 200km).
- **Option B:** Hold the Pod open and fill from the waitlist (within 2 weeks of Crucible start).
- **Option C:** Reduce the cohort by 1 ProtoCo commission (rare).

### What if an Xcitizen's Archetype scores are too flat (no clear primary)?
They should have been caught at the Waitlist stage (see Selection Rubric). If they slip through, assign them as the "floater" in the Pod with the most Archetype coverage.

### What if an Xcitizen drops out during the Crucible?
The Pod runs with 9 until a replacement is sourced from the waitlist (within 1 week). If no replacement, the Pod may be dissolved (Kill Switch at Gate 0).

---

## 5. POST-FORMATION

Once Pods are formed:
1. Each Xcitizen receives their Pod assignment, ProtoCo commission, and XEmbassy location.
2. Pods do not meet until the Crucible begins (Day 1 of the Crucible is the first meeting).
3. Pod composition is frozen for the duration of the Crucible. Reassignment only occurs via Gate 0 failure.

---

## 6. HISTORICAL DATA FEEDBACK LOOP

After each cohort completes (Month 24), the algorithm is retrained on:
- Which Pod compositions produced surviving ventures?
- Which Archetype pairings correlated with Kill Switch events?
- Which risk-flag conflicts actually caused problems?

The algorithm is versioned. Any change requires Strategic Command approval and is logged.

---

**Document classification:** Internal — Strategic Command
**Algorithm version:** 1.0
**Last trained:** Cohort 2 data
