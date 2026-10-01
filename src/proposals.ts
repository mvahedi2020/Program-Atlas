import { freshPlan, info, type Decision, type Plan, type Risk, type RiskKind, type Task, type TaskId } from './model'
import { validWorkDate } from './calendar'
import { changes, schedule, validateTasks } from './schedule'
export type ProposalKind = RiskKind | 'decision' | 'reset'
export interface Proposal { title:string; expected:string; candidate:Plan; kind:ProposalKind; description:string; cost:string; residual:string; changed:TaskId[] }
export const recoveryDetails = {
 scope:{title:'Reduce pilot scope',description:'Shorten Pilot evidence from 3 to 1 working day. Keep every acceptance prerequisite, run a narrow pilot and defer broad coverage.',cost:'Deferred broad acceptance coverage; 2 working days of evidence removed.',residual:'Limited evidence may miss edge cases.'},
 resequence:{title:'Resequence with a rehearsal pack',description:'Substitute the real partner pack prerequisite for Connected routing with a locally reviewed rehearsal pack, and shorten that task to 2 days. Partner acceptance still gates Pilot evidence.',cost:'One extra rehearsal review and potential platform rework; no invented dollar estimate.',residual:'Real partner contract may differ. No broad pilot evidence can begin before Partner acceptance.'},
 contingency:{title:'Fund expedited partner review',description:'Spend a fictional $4,800 to shorten the delayed Partner sample pack by 2 working days. Keep scope and predecessor relationships.',cost:'$4,800 additional fictional cost; other durations remain fixed.',residual:'Compressed partner review may miss quality issues.'},
} as const
export function fingerprint(plan:Plan):string {return JSON.stringify(plan)}
function make(plan:Plan,candidate:Plan,kind:ProposalKind,title:string,description:string,cost:string,residual:string):Proposal {
 const issue=validateTasks(candidate.tasks);if(issue) throw new Error(issue)
 if(candidate.risks.length>100) throw new Error('This sample supports 100 change records. Export and reset before adding another change.')
 candidate.revision=plan.revision+1
 return {title,expected:fingerprint(plan),candidate,kind,description,cost,residual,changed:changes(plan.tasks,candidate.tasks)}
}
function addRisk(candidate:Plan,kind:RiskKind,reason:string,cost:string,residual:string) {candidate.risks.push({kind,reason,cost,residual})}
export function delayProposal(plan:Plan):Proposal {
 if(plan.risks.some(r=>r.kind==='delay') || plan.tasks.find(t=>t.id==='P1')!.duration!==3) throw new Error('The sample delay needs the original 3-day Partner sample pack. Reset the sample to replay it.')
 const c=structuredClone(plan); c.tasks.find(t=>t.id==='P1')!.duration=7
 const shift=schedule(c.tasks).length-schedule(plan.tasks).length
 const cost=`Partner pack takes 4 additional working days; program completion moves ${shift} working day${shift===1?'':'s'} from the current plan.`
 const residual='Partner acceptance and downstream readiness remain dependent on the delayed pack.'
 addRisk(c,'delay','Partner schema review requires four extra working days.',cost,residual)
 return make(plan,c,'delay','Apply the partner delay','Increase Partner sample pack from 3 to 7 working days. Only its duration is edited; downstream dates are recomputed.',cost,residual)
}
export function recoveryProposal(plan:Plan,kind:'scope'|'resequence'|'contingency'):Proposal {
 if(!plan.risks.some(r=>r.kind==='delay')) throw new Error('First confirm the partner delay to compare recoveries.')
 if(plan.risks.some(r=>['scope','resequence','contingency'].includes(r.kind))) throw new Error('One recovery may be confirmed per scenario. Undo or reset before comparing a different choice.')
 const c=structuredClone(plan), detail=recoveryDetails[kind]
 if(kind==='scope') {const task=c.tasks.find(t=>t.id==='A2')!;if(task.duration!==3) throw new Error('Scope reduction requires the original 3-day evidence task. Reset for the declared example.');task.duration=1}
 if(kind==='resequence') {const task=c.tasks.find(t=>t.id==='T2')!;if(task.duration!==3 || task.handoffMode!=='standard') throw new Error('Resequencing requires the original Connected routing handoff. Reset for the declared example.');task.duration=2;task.predecessors=task.predecessors.filter(id=>id!=='P1');task.handoffMode='rehearsal'}
 if(kind==='contingency') {const task=c.tasks.find(t=>t.id==='P1')!;if(task.duration!==7) throw new Error('Expedited review requires the declared 7-day delayed partner pack. Reset for the declared example.');task.duration=5}
 const gap=schedule(c.tasks).length-schedule(freshPlan().tasks).length
 const residual=`${detail.residual} Resulting readiness is ${gap===0?'on the baseline date':`${Math.abs(gap)} working day${Math.abs(gap)===1?'':'s'} ${gap>0?'after':'before'} baseline`}.`
 addRisk(c,kind,detail.description,detail.cost,residual)
 return make(plan,c,kind,detail.title,detail.description,detail.cost,residual)
}
export function dependencyProposal(plan:Plan,id:TaskId,predecessors:string,duration:number):Proposal {
 const c=structuredClone(plan),task=c.tasks.find(t=>t.id===id)!
 task.predecessors=predecessors.trim() ? predecessors.split(',').map(id=>id.trim().toUpperCase() as TaskId) : []
 task.duration=duration
 if(JSON.stringify(c.tasks)===JSON.stringify(plan.tasks)) throw new Error('Change a duration or predecessor before previewing.')
 const reason=`Edit ${id} ${info[id].name}: ${duration} working days; predecessors ${task.predecessors.join(', ') || 'none'}.`
 addRisk(c,'dependency',reason,'Changed sequencing requires owner handoff review.','Handoff evidence is declared, not verified by real owners.')
 return make(plan,c,'dependency',`Change ${id} handoff`,reason,'No modeled cost estimate. Review the affected commitments before confirmation.','Owner evidence is still a fictional assumption.')
}
export type DecisionInput=Pick<Decision,'owner'|'needed'|'evidence'|'due'>
export function decisionProposal(plan:Plan,input:DecisionInput):Proposal {
 if(plan.decisions.length>=20) throw new Error('This bounded sample supports 20 decisions. Reset to begin a new sample.')
 for(const key of ['owner','needed','evidence'] as const) if(input[key].trim().length<3 || input[key].length>600) throw new Error('Owner, decision needed and evidence must each contain 3–600 characters.')
 if(!validWorkDate(input.due)) throw new Error('Choose a valid weekday due point using the declared calendar.')
 if(input.due<'2026-10-05' || input.due>schedule(plan.tasks).finishDate) throw new Error('The due point must fall between the sample origin and current program finish.')
 const c=structuredClone(plan)
 c.decisions.push({...input,owner:input.owner.trim(),needed:input.needed.trim(),evidence:input.evidence.trim(),revision:plan.revision,commitments:structuredClone(schedule(plan.tasks)),riskSnapshot:structuredClone(plan.risks)})
 return make(plan,c,'decision','Save the escalation decision','Record the reviewed owner, decision needed, evidence and due point with an immutable schedule snapshot. Saving this record edits no deliverable.', 'No message or notification is sent.','Recording a decision does not authorize a recovery. Confirm the chosen recovery separately.')
}
export function resetProposal(plan:Plan):Proposal {return make(plan,freshPlan(),'reset','Reset the fictional sample','Restore all eight original tasks and remove this sample’s decisions and risk records. This confirmed reset can be undone once in this tab.','Local scenario history will be removed.','Export a detached report first if you need to keep this scenario.')}
export function confirm(plan:Plan,proposal:Proposal):Plan {
 if(fingerprint(plan)!==proposal.expected) throw new Error('This preview is stale. Cancel and review a new proposal against the current plan.')
 const issue=validateTasks(proposal.candidate.tasks);if(issue) throw new Error(issue)
 return structuredClone(proposal.candidate)
}
export function undoPlan(current:Plan,previous:Plan):Plan {return {...structuredClone(previous),revision:current.revision+1}}
export function riskSummary(risk:Risk):string {return `${risk.reason} Cost: ${risk.cost} Residual risk: ${risk.residual}`}
export function taskPatch(before:Task[],after:Task[]):string[] {return after.filter(t=>JSON.stringify(t)!==JSON.stringify(before.find(b=>b.id===t.id))).map(t=>`${t.id}: ${t.duration} days; predecessors ${t.predecessors.join(', ') || 'none'}; ${t.handoffMode} handoff`)}
