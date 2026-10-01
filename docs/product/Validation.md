# Validation evidence

Local checks dated September 30, 2026 (America/Los_Angeles). The final production browser replay used `http://127.0.0.1:4187/Program-Atlas/`. Generated build/test output and screenshots are ignored by Git. Independent public release verification subsequently passed on October 1, 2026, as recorded below.

## Software evidence

| Check | Local result | Scope |
|---|---|---|
| Dependency installation | `npm ci` succeeds | Lockfile-pinned Node 24 tooling; no credentials |
| Lint | `npm run lint` passes | Source, browser tests and tooling |
| Strict types | `npm run typecheck` passes | TypeScript strict/no-unused settings |
| Domain/state checks | `npm run test`: 22 passing tests in 3 files | Calendar, graph, proposals, immutable records, persistence |
| Production build | `npm run build` passes | Runtime/environment guard, strict types, Vite base and document copy |
| Dependency audit | `npm audit --audit-level=high`: zero vulnerabilities | Installed dependency tree at check time |
| Production browser | `npm run test:e2e`: 14 passing Chromium tests | Exact primary/recovery, stale/unavailable/invalid state, keyboard and mobile |
| Initial browser inspection | Meaningful heading/content, 19 initial buttons, zero console/page errors | Real production page; desktop screenshot inspected |
| Workflow action references | Four pinned action commits resolved through GitHub read API | Reference existence verified; workflow execution remains a release gate |

## Independent expectations

Independently calculated expectations, including the original contract and later regression counterexamples, were asserted in tests.

- Friday Oct 9 is index 4; next workday Monday Oct 12 is index 5. Weekend origin Oct 10 rolls to Oct 12.
- Original readiness: T1 4 + T2 3 + A2 3 + E2 2 = 12 working days, inclusive Oct 20. P1/P2/A1/E1 total slack is 1/2/5/6.
- Delayed P1 is 7 working days; T2 begins Oct 14, ends Oct 16; A2 begins Oct 19; readiness ends Oct 23 at length 15. Converging A2 waits for all required predecessors.
- Scope: 7+3+1+2 = 13 days, Oct 21. Resequencing: max(P2=9, T2=6, A1=2)+3+2 = 14 days, Oct 22. Contingency: 5+3+3+2 = 13 days, Oct 21, fictional $4,800.
- P2 duration 4 gives tied P2/T2 branches ending index 6; both have zero slack.
- T1 duration 10 makes the original partner delay add zero completion days; scope then yields length 16, Oct 26, four days after the original baseline. Consequence text uses the actual custom schedule.
- Add P1 predecessor to T1: P1/T1/T2 are zero slack, but redundant P1→T2 is not a driving critical edge because it is not temporally tight.

Graph tests reject missing, duplicate, self, disallowed, required-removed and cyclic predecessors before scheduling. Decision tests verify snapshot immutability and no unrelated milestone mutation. Storage checks include the getter itself throwing, quota failure, preserved incompatible data, same-revision content conflict and contradictory saved schedule aggregates.

## Browser walkthrough coverage

Primary: original Oct 20 → delay preview/cancel (no storage) → delay confirmation Oct 23 → contingency/resequencing previews/cancel → scope confirmation Oct 21 → reviewed escalation → immutable record → nonmutating detached download → compatible refresh. Error/recovery: missing reference and cycle rejected → valid duration edit → one-level Undo; reset preview cancel/confirm/Undo. Recovery: incompatible storage preserved until reset; storage getter denied; write quota failure; same-revision cross-tab writes invalidate preview; missed events caught by actual-value check. Accessibility: skip link, native modal with explicit boundary focus wrap, Escape/focus restoration, status/alerts, equivalent complete list, 390px and 320px layouts without body overflow. Security/document route: CSP/referrer and all seven copied Markdown links checked.

An initial keyboard replay found that native dialog Shift+Tab could leave the intended first/last-button loop. The explicit boundary wrap was repaired and the full production suite passed. Program map horizontal scrolling is confined to its labeled region, with a visible hint and complete List alternative. Visual screenshots were inspected for desktop and mobile; this is not a formal screen-reader audit or cross-browser certification.

## Evidence still open

- The software/publication evidence is recorded below; the public [profile](https://github.com/mvahedi2020) provides the case study, PRD, walkthrough and demo route.
- Mo’s comprehension and product tradeoff discussion are not observed.
- No human research, actual partner review, customer outcomes, forecast accuracy or commercial results are claimed.

## Proposed human evaluation

Use a cause-identification task, a recovery-choice task and an escalation-completeness rubric. Proposed measures: correct identification of upstream impact; recognition of remaining risk; owner/decision/evidence/due completeness. Keep those denominators distinct from completion speed. Software tests cannot establish these human measures; no participants have been recruited or observed.

## Independent release review

The primary reviewer checked domain calculations, cause explanations, immutable records and persistence rules, then replayed cancellation, partner delay, recovery comparison, scope confirmation, decision capture and return in a separate production browser. Observed dates were October 20 → 23 → 21, with recovery alternatives October 21/22/21. The 320px page defaulted to the complete List view with no body overflow and no reported browser errors. Private-source and local-link preflight passed across 40 tracked files and seven relative document links before the final release preparation. The tracked-runtime/environment guard is also enforced during builds. Public deployment checks subsequently passed, as recorded below.

## Public release verification

The initial public release at `22a91f1de1750a5b11a77b31b4b8ab325269be0c` passed [GitHub verification and Pages deployment](https://github.com/mvahedi2020/Program-Atlas/actions/runs/36827844912). Local HEAD matched GitHub main, the worktree was clean, and all 11 deployed files matched the local production build and GitHub deployment artifact byte for byte. CSP and no-referrer metadata were present. The live page loaded its original October 20 readiness and primary controls with no reported page errors. These are point-in-time observations from 2026-10-01, not uptime, human research or commercial-outcome claims. [Try Program Atlas](https://mvahedi2020.github.io/Program-Atlas/).
