# Sample and state contract

All names, costs and dates are invented. Northstar's objective is a community learning pilot with reliable routing, reproducible acceptance evidence, and a support-ready handoff. Four workstreams are Partner readiness (Mira Vale), Platform (Owen Reed), Pilot assurance (Tessa North), and Enablement (Jules Finch).

## Calendar and dependency rules

Origin: Monday 2026-10-05, UTC date-only arithmetic. Monday–Friday are working days; no holidays. Durations are integer working days, 1–20. Finish dates are inclusive. A successor starts on the next working day after all predecessors finish. Roots start at the origin. Float is total business-day slack relative to the earliest overall completion; no resource constraint or probabilistic forecast is modeled.

Each deliverable has an id, workstream, duration, accountable owner, handoff condition, outcome link and explicit allowed predecessors. Required dependencies cannot be removed except an explicitly permitted recovery substitution. No dangling reference, duplicate, self-reference, disallowed handoff, or cycle may be accepted. Editing a link previews the changed list and affected dates before confirmation.

## Original records

| ID | Deliverable | Stream | Duration | Predecessors | Handoff evidence | Outcome |
|---|---|---|---|---|---|---|
| P1 | Partner sample pack | Partner readiness | 3 | none | Pack and schema signed | Reliable routing |
| P2 | Partner acceptance | Partner readiness | 2 | P1 | Contract examples accepted | Reproducible acceptance |
| T1 | Routing scaffold | Platform | 4 | none | Route rules reviewed | Reliable routing |
| T2 | Connected routing | Platform | 3 | P1, T1 | Example paths match pack | Reliable routing |
| A1 | Assurance protocol | Pilot assurance | 2 | none | Protocol reviewed | Reproducible acceptance |
| A2 | Pilot evidence | Pilot assurance | 3 | P2, T2, A1 | Checks and exceptions recorded | Reproducible acceptance |
| E1 | Support playbook | Enablement | 4 | none | Escalation roles reviewed | Support-ready handoff |
| E2 | Pilot readiness | Enablement | 2 | A2, E1 | Evidence and playbook accepted | Support-ready handoff |

Baseline: T1→T2→A2→E2, 12 working days, finish 2026-10-20. P1 has one day slack, P2 two, A1 five, E1 six. A four-day partner delay changes P1 from three to seven days; completion becomes 2026-10-23, three working days later. Descendant dates recompute; independent roots retain dates.

## Recovery proposals

Scope reduction shortens A2 from 3 to 1 day: a narrow pilot retains all predecessors, defers broad acceptance coverage, and leaves a one-day slip. Resequencing substitutes an approved rehearsal pack for the P1 input to T2 and shortens T2 to 2 days: platform work can proceed before the real pack, but P2 still blocks evidence; contract mismatch and rework remain. Contingency shortens delayed P1 by 2 days through a fictional $4,800 expedited review: spend rises, partner quality risk remains, and other durations stay unchanged. These are explanatory fixed alternatives, not promises.

## State and confirmation

Schema 1 stores only the declared original deliverables, revision, decisions and confirmed risk records under `program-atlas:v1`. Each preview captures the revision and expected current state. Preview, cancel and export never commit a schedule change. Confirmation validates the complete candidate graph, applies only the named patch, and recomputes derived consequences. An escalation saves its own record only. Storage events invalidate open previews; a stale tab must reload the current plan. Invalid storage is preserved until explicit reset. Unavailable storage falls back to an explained in-memory session. Refresh preserves compatible saved state; drafts and previews do not persist.

Undo restores the last confirmed plan snapshot in this tab, including its decisions and risk records. One level only; refresh and an external tab update clear Undo. Reset previews all sample changes, restores the original sample after confirmation, and can itself be undone once. Export is a detached Markdown snapshot; it does not transmit or synchronize data.
