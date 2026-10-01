import type { Plan } from '../model'
import { recoveryDetails,recoveryProposal,type Proposal } from '../proposals'
import { schedule } from '../schedule'
import { displayDate } from '../calendar'
const kinds=['scope','resequence','contingency'] as const
export function RecoveryChoices({plan,onPreview}:{plan:Plan;onPreview:(proposal:Proposal)=>void}) {
 const baseline=schedule(plan.tasks)
 return <section className="recovery-section" id="recoveries" aria-labelledby="recovery-title"><div className="section-top"><div><p className="eyebrow">02 / Compare the choice</p><h2 id="recovery-title">Recover a commitment. Keep the tradeoff.</h2></div><span className="quiet-tag">One confirmed recovery per scenario</span></div><p className="section-intro">Preview all alternatives before choosing. Undo returns to the prior confirmed plan so you can explore a different option.</p><div className="recovery-grid">{kinds.map((kind,index)=>{
 const detail=recoveryDetails[kind];let draft:Proposal|undefined,issue='';try {draft=recoveryProposal(plan,kind)}catch(error) {issue=(error as Error).message}
 const finish=draft?schedule(draft.candidate.tasks):undefined
 return <article className="recovery-card" key={kind}><div className="option-no">0{index+1} / {kind==='scope'?'Scope':kind==='resequence'?'Sequence':'Investment'}</div><h3>{detail.title}</h3><p>{detail.description}</p><div className="option-finish"><span>Proposed readiness</span><strong>{finish?displayDate(finish.finishDate):'—'}</strong><small>{finish?`${baseline.length-finish.length} working days recovered from current plan`:'Confirm the partner delay to calculate'}</small></div><p><strong>Cost</strong><br/>{detail.cost}</p><p><strong>Residual risk</strong><br/>{draft?.residual||detail.residual}</p><button type="button" className="button secondary" disabled={!draft} onClick={()=>{if(draft) onPreview(draft)}}>Preview {kind==='scope'?'scope reduction':kind==='resequence'?'resequencing':'contingency'}</button>{issue?<p className="field-help">{issue}</p>:null}</article>
 })}</div></section>
}
