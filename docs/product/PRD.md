# Program Atlas PRD

## User, problem and observable decision

The fictional Northstar program lead coordinates a community learning pilot across Partner readiness, Platform, Pilot assurance and Enablement. A shared handoff can threaten readiness even when independent streams are on plan. The primary task is to identify the upstream impact, compare recovery choices and review an accountable escalation with a changed commitment and residual risk.

A status-only dashboard is the principal alternative. It is easier to scan but weak at exposing dependency causality and the decision behind a date. Program Atlas prioritizes a readable dependency map with a complete list equivalent, explicit schedule assumptions and reviewed local proposals.

## Functional acceptance

| Capability | Product rule | Observable behavior |
|---|---|---|
| Outcome-linked program map | Every deliverable has one accountable owner, a named handoff and an outcome | Eight deliverables across four original workstreams; inspector and equivalent list expose all fields |
| Relationship validation | A missing, duplicate, self, disallowed, required-removed or cyclic reference cannot enter the plan | Preview rejects the relation with a specific explanation before mutation |
| Calendar consequences | Origin and weekday rules are declared; finish is inclusive and successor begins next working day | Partner duration 3→7 recomputes dates, zero-slack tasks and slack; baseline remains fixed |
| Recovery comparison | Scope, sequencing and investment must expose cost and unresolved risk | Each alternative shows current-to-proposed readiness and permits nonmutating preview/cancel |
| Bounded confirmation | Only explicitly named task definitions change; dates derive from graph | Confirmation states the patch and affected commitments; only one recovery can be confirmed per scenario |
| Accountable escalation | Owner, decision needed, evidence and weekday due point are required | Review all four fields before save; store an immutable schedule/risk snapshot; no deliverable changes and no message |
| Executive exception | Trace causes and compare original versus confirmed commitments | Every task has baseline/scenario finish and slack; upstream prerequisites are a set, not a fabricated path; residual risks remain visible |
| Local report | Export a detached review snapshot | Download Markdown without committing or transmitting the scenario |
| Recovery | Explain compatible refresh, invalid/unavailable storage, stale previews and Undo/reset scope | Invalid data preserved until reviewed reset; memory-only fallback announced; external changes invalidate previews and Undo; one-level Undo |
| Accessibility | No information depends only on the map, color or mouse | Semantic buttons/forms/table, list equivalent, focus ring, native modal focus trap and Escape restoration, polite status/alerts, mobile default list |

## Interaction states

Original baseline → partner-delay preview → cancel or confirm → compare three recoveries → confirm one option → review escalation → save local decision → export. A saved escalation does not authorize the chosen recovery; confirmation of the actual recovery is a separate action. Changing task definitions before applying the sample scenario can change the resulting schedule, and consequence language derives from those actual calculations.

Invalid relationship: leave current graph untouched, explain missing/circular/required/disallowed handoff, revise input and preview again. Invalid saved state: show the original for inspection, preserve the incompatible value and require reviewed reset before saving. Storage unavailable: permit an announced memory-only scenario. Stale preview: block confirmation and ask for a new review. Reset and Undo alter only this browser-local sample, not public files or external systems.

## Original acceptance work packages

| Work package | Implementation/evidence | Release status |
|---|---|---|
| S009 | Product_Brief.md: lead, decision, alternative, non-goals | Local product framing complete; Mo discussion not observed |
| S010 | Sample_Contract.md; original seed/model and state rules | Complete local contract; choices visibly provisional |
| S011 | React/TypeScript/Vite foundation, guarded Node 24, Pages base, CSP/referrer, pinned CI | Local foundation verified; public repository/demo pending primary review |
| S012 | DependencyMap + Inspector: four streams, eight tasks, ownership/handoff/outcome | Implemented |
| S013 | validateTasks and dependencyProposal with graph/input regression cases | Implemented |
| S014 | schedule/calendar and independent weekday/parallel/slack calculations | Implemented |
| S015 | Three recovery alternatives with costs, computed dates and residual risk | Implemented |
| S016 | EscalationForm and reviewed immutable Decision snapshot | Implemented |
| S017 | ExecutiveBrief and detached report export | Implemented |
| S018 | Revision/content/epoch checks, storage safeguards, Reset/Undo | Implemented |
| S019 | Production browser primary/recovery, mobile/keyboard and software checks; case study/evaluation plan | Local evidence recorded in Validation.md; human research unperformed |
| S020 | Local release gates and reviewable repository/documents | Publication, live parity, profile routing and Mo comprehension review pending primary verification |

## Exclusions and quality boundary

No real schedules, staffing optimizer, defense material, certifications, EVM, notifications, live AI or production integrations. Unlimited parallel capacity and a holiday-free calendar are deliberate simplifications. These examples explain causality, not schedule probability. Metrics are proposed research measures rather than observed product outcomes. Publication checks cannot substitute for human comprehension.
