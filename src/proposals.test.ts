import {it,expect} from 'vitest'
import {freshPlan} from './model'
import {schedule} from './schedule'
import {confirm,delayProposal,recoveryProposal,decisionProposal,dependencyProposal,resetProposal,undoPlan} from './proposals'
it('preview does not mutate; confirm delay changes only P1 definition',()=>{
 const p=freshPlan(),original=JSON.stringify(p),draft=delayProposal(p);expect(JSON.stringify(p)).toBe(original)
 const c=confirm(p,draft);expect(schedule(c.tasks).finishDate).toBe('2026-10-23');expect(c.tasks.slice(1)).toEqual(p.tasks.slice(1));expect(draft.changed).toEqual(['P1','P2','T2','A2','E2'])
})
it('independently expected recovery dates expose remaining consequences',()=>{
 const p=confirm(freshPlan(),delayProposal(freshPlan()))
 // scope: 7 + 3 + 1 + 2 = 13; resequence: max(P2=9,T2=6,A1=2)+3+2=14; contingency: 5+3+3+2=13.
 const scope=recoveryProposal(p,'scope'),seq=recoveryProposal(p,'resequence'),cont=recoveryProposal(p,'contingency')
 expect(schedule(scope.candidate.tasks).finishDate).toBe('2026-10-21');expect(schedule(seq.candidate.tasks).finishDate).toBe('2026-10-22');expect(schedule(cont.candidate.tasks).finishDate).toBe('2026-10-21')
 expect(cont.cost).toContain('$4,800');expect(seq.residual).toContain('contract');expect(scope.residual).toContain('edge cases')
 expect(()=>recoveryProposal(scope.candidate,'contingency')).toThrow(/One recovery/)
})
it('stale previews reject same-revision content changes',()=>{const p=freshPlan(),draft=delayProposal(p);p.tasks[2].duration=5;expect(()=>confirm(p,draft)).toThrow(/stale/)})
it('dependency edits validate unknown, duplicate, cycle and permitted handoffs before acceptance',()=>{
 const p=freshPlan();expect(()=>dependencyProposal(p,'P1','ZZ',3)).toThrow(/does not exist/);expect(()=>dependencyProposal(p,'P2','P1,P1',2)).toThrow(/once/);expect(()=>dependencyProposal(p,'T1','T2',4)).toThrow(/cycle/);expect(()=>dependencyProposal(p,'E1','E2',4)).toThrow(/permitted/)
 const draft=dependencyProposal(p,'P2','P1,T1',2);expect(draft.candidate.tasks[1].predecessors).toEqual(['P1','T1'])
})
it('escalation snapshot cannot change unrelated milestones or later saved evidence',()=>{
 const p=freshPlan(),draft=decisionProposal(p,{owner:'Mira Vale',needed:'Authorize narrow pilot',evidence:'P1 has four days delay',due:'2026-10-09'})
 const c=confirm(p,draft);expect(c.tasks).toEqual(p.tasks);expect(c.decisions[0].commitments.finishDate).toBe('2026-10-20');const delayed=confirm(c,delayProposal(c));expect(delayed.decisions[0].commitments.finishDate).toBe('2026-10-20')
})
it('invalid due point and blank decision do not mutate',()=>{const p=freshPlan();expect(()=>decisionProposal(p,{owner:'  ',needed:'review',evidence:'pack',due:'2026-10-11'})).toThrow();expect(()=>decisionProposal(p,{owner:'Mira',needed:'review',evidence:'pack',due:'2026-10-11'})).toThrow(/weekday/);expect(p.decisions).toHaveLength(0)})
it('reset and one snapshot Undo produce new revisions',()=>{const p=confirm(freshPlan(),delayProposal(freshPlan())),r=confirm(p,resetProposal(p));expect(r.tasks).toEqual(freshPlan().tasks);expect(undoPlan(r,p).tasks).toEqual(p.tasks);expect(undoPlan(r,p).revision).toBe(3)})
