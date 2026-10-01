# Program Atlas

A fictional program decision lab: follow a partner delay through four workstreams, compare recovery choices, and record the decision that changes a commitment.

**Bounded release candidate. Local and independent review complete; public deployment verification in progress.** [Interactive demo](https://mvahedi2020.github.io/Program-Atlas/) · [Public source](https://github.com/mvahedi2020/Program-Atlas). This is a deterministic simulation, not a delivery prediction. It contains original fictional workstreams, people, costs and schedules. No messages are sent; no production system or real customer data is connected.

Mo owns product and program direction. AI assists implementation and verification. No human research, customer outcomes or personal review by Mo is claimed.

[Product brief](docs/product/Product_Brief.md) · [PRD](docs/product/PRD.md) · [Sample contract](docs/product/Sample_Contract.md) · [Case study](docs/product/Case_Study.md) · [Decisions and risks](docs/product/Decisions_and_Risks.md) · [Validation](docs/product/Validation.md) · [Walkthrough](docs/product/Sample_Walkthrough.md)

## Run and verify

Requires Node 24. No runtime credentials or external services are supported.

```sh
npm ci
npm run lint
npm run typecheck
npm run test
npm run build
npm audit --audit-level=high
npm run test:e2e
npm run preview
```

Preview: `http://127.0.0.1:4187/Program-Atlas/`. Browser tests run against the production build and use the same strict port. No database or notifications exist. Confirmed actions stay in browser-local storage; compatible refresh restores them, invalid data is preserved until reviewed reset, and unavailable storage is explained as memory only. Preview/cancel/export are nonmutating. One-level Undo restores the last confirmed snapshot in this tab, until refresh/external update.

The primary route is partner delay → causal map/list → recovery comparison → confirmed proposal → reviewed escalation → executive brief/export. The original scenario ends October 20, the delay October 23, and scope/resequencing/contingency October 21/22/21 under the declared weekday calendar. Every option retains a cost or risk. S009–S020 traceability is in the PRD; S020 public head/live parity verification is in progress; Mo's personal comprehension review remains unobserved.

The repository includes a pinned verification/Pages workflow and `/Program-Atlas/` base. The build also rejects tracked runtime/environment files. Publication is accepted only after Actions/Pages success and artifact/live parity checks.
