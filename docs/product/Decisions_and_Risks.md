# Decisions and risks

| Decision | Reason | Cost / limit |
|---|---|---|
| Causal map plus equivalent list | Shared dependencies are the decision surface; list preserves a complete accessible route | Dense maps require local horizontal scrolling at some desktop sizes; mobile opens the list |
| Fixed weekday calendar | Makes date/critical-path consequences independently reproducible | No holidays, shared resource contention, lead time uncertainty or forecast probabilities |
| Fixed original baseline | A reviewer needs a stable reference after multiple local actions | Confirmed scenario can diverge; reports must name baseline and revision |
| Preview each action, then confirm | Changing a date or saving a decision is a consequential local action | Extra review step, justified by patch and residual-risk visibility |
| Separate escalation record from recovery authorization | An accountable record is evidence; it is not silent schedule mutation | A lead must separately confirm the recovery proposal |
| One recovery per scenario | Avoids presenting unmodeled combinations as validated packages | Undo/reset is needed to compare another confirmed alternative |
| Immutable decision snapshots | Later edits must not rewrite the evidence previously reviewed | Snapshot records are local and bounded to 20 decisions |
| Local storage with preserved invalid data | Refresh should retain compatible confirmed state without destroying bad data | Invalid values require explicit reset; drafts/Undo do not survive refresh |
| Content check plus external-event epoch | Revision numbers alone miss same-revision cross-tab modifications | Cross-tab conflict checks reject instead of merging; localStorage is not a transactional collaboration system |
| Memory-only fallback | Storage getter denial or quota failure should not crash the lab | Refresh loses the unsaved scenario; UI announces the limitation |
| Detached Markdown export | Review evidence can be carried away without a backend | File has no ongoing sync and may become stale |
| Restrained white/ink/cyan visual system | Emphasize commitment changes and traceability | Color always has text/symbol counterparts; no decorative graphics obscure dependencies |

The scope-reduction recommendation is provisional. It is defensible only if the accountable owner accepts narrow evidence and the delayed baseline commitment. Resequencing buys earlier platform progress but does not remove the partner-acceptance gate. Contingency adds a fictional $4,800 and leaves review-quality risk. Each option retains an exception and unresolved evidence rather than marking the problem “resolved” because a new date was selected.

Source review found and corrected three teaching risks: hardcoded date impact after custom edits, critical-edge highlighting based only on critical endpoints, and arrows between unrelated upstream prerequisites. Consequences now derive from actual schedules; a critical edge also requires tight timing; sets of prerequisites and zero-slack tasks are comma-separated.

Open evidence: no owner has reviewed the fictional handoffs; no human user has been observed; no customer/commercial impact is known; Mo’s comprehension/rejected-alternative discussion is pending; public deployment and live parity have been independently verified as recorded in [Validation](Validation.md).
