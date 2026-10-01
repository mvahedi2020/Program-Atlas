# Reproducible sample walkthrough

Use [the interactive demo](https://mvahedi2020.github.io/Program-Atlas/), or run `npm ci`, `npm run build`, then `npm run preview` and open `http://127.0.0.1:4187/Program-Atlas/`. If stored data exists, review Reset sample and confirm it before replaying the original example. All people, costs and program data are fictional.

## Primary journey

1. Inspect the four workstreams. P1 Partner sample pack is owned by Mira Vale; its signed pack/schema enables reliable routing. Map and List show the same eight deliverables; the inspector explains owners, handoffs, outcomes, dates and slack.
2. Read the declared calendar: Monday 2026-10-05 origin, Monday–Friday workdays, no holidays, inclusive finish, next-working-day successor start, no resource contention. Baseline T1→T2→A2→E2 totals 4+3+3+2 = 12 working days and ends Tuesday October 20. P1 has one day slack, P2 two, A1 five and E1 six.
3. Preview the partner delay: P1 goes from 3 to 7 working days. The review shows P1/P2/T2/A2/E2 affected and readiness October 20→23. Cancel first; confirm there is no new saved scenario or date change.
4. Preview again and confirm. P1 ends Tuesday October 13, T2 runs October 14–16, A2 runs October 19–21, E2 runs October 22–23. The new zero-slack tasks are P1/T2/A2/E2; T1, A1 and E1 keep their original independent dates.
5. Compare recovery choices. Scope reduction: A2 from 3 to 1 day, readiness October 21, broad evidence deferred and edge-case risk. Resequencing: T2 uses a reviewed rehearsal pack, drops the P1 prerequisite and takes 2 days; P2 still gates A2, readiness October 22, real-contract mismatch/rework risk. Contingency: P1 from 7 to 5 days, fictional $4,800, readiness October 21, compressed-review quality risk. Every option is a deterministic assumption, not a promise.
6. Preview contingency and cancel. Preview resequencing and cancel. No candidate is applied through comparison or cancellation. Confirm scope reduction; the original October 20 baseline stays fixed and the confirmed scenario is one working day later.
7. Review the suggested fictional escalation owner Anika Lark, the decision needed, evidence and October 9 weekday due point. Enter evidence naming the P1 delay, A2 scope reduction, October 21 readiness and edge-case risk. Review before confirming the record. Saving edits no deliverable and sends no message. The saved record captures October 21 readiness and risk evidence immutably at the current revision.
8. Inspect the executive brief. It shows each original/current finish, slack, upstream prerequisite sets and unresolved handoff evidence. A confirmed recovery still retains its residual risk. Export the detached Markdown report; no local schedule mutation or transmission occurs.
9. Refresh: the compatible confirmed scenario and record return. Unsaved drafts, previews and one-level Undo do not return.

## Meaningful error and recovery

1. With the original sample, select P1. Enter `UNKNOWN` as predecessor; preview explains the missing reference and saves nothing. Enter `P2`; preview explains the P1/P2 cycle and saves nothing.
2. Clear predecessors, change P1 duration to 5 and preview. Confirm: readiness becomes October 21. Use Undo last confirmation: restore October 20 and the prior records/risks. Undo is one level and is then consumed.
3. Confirm the declared partner delay. Review Reset sample and cancel; October 23 and saved data stay intact. Review reset again and confirm; original sample/records are restored. Undo once can restore the delayed scenario.
4. An incompatible saved value is preserved, original sample shown, and save actions remain blocked until Reset is reviewed and confirmed. An unavailable storage getter or quota failure permits an explicitly announced memory-only scenario, lost on refresh.
5. In two tabs, open a preview in the first and confirm an edit in the second. The first restores the current saved state and disables its stale preview. Even a write retaining the same revision number is rejected if content changes. If the storage event is missed, confirmation compares the actual saved value before writing and rejects the conflict.

## Independent examples beyond the original route

Friday October 9 (index 4) is followed by Monday October 12 (index 5). When P2 duration becomes 4, P2 and T2 both finish at index 6 and both branches have zero slack. When T1 duration becomes 10, the original P1 3→7 delay moves the current program finish by zero days because T1 remains the bottleneck; scope recovery then ends October 26, four working days after the fixed original baseline. Adding P1 as a predecessor of T1 produces zero-slack P1/T1/T2; the redundant P1→T2 edge is not driving because it is not tight in time.

## Reviewer discussion still open

Explain why an escalation or sequencing choice is needed rather than merely selecting a new date. Name the rejected alternative, the remaining risk and the missing human evidence. This discussion has not been observed with Mo or any participant.
