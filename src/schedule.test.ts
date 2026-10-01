import { describe,it,expect } from 'vitest'
import { freshPlan } from './model'
import { workDate, validWorkDate } from './calendar'
import { schedule, validateTasks, causes } from './schedule'
describe('independent hand-calculated calendar and path cases',()=>{
 it('Friday index 4 to Monday index 5 skips the weekend and rolls a weekend origin forward',()=>{expect(workDate(4)).toBe('2026-10-09');expect(workDate(5)).toBe('2026-10-12');expect(workDate(0,'2026-10-10')).toBe('2026-10-12');expect(validWorkDate('2026-02-30')).toBe(false);expect(validWorkDate('2026-10-11')).toBe(false)})
 it('baseline is four plus three plus three plus two days, inclusive finish Oct 20',()=>{
  const a=schedule(freshPlan().tasks)
  expect(a.length).toBe(12);expect(a.finishDate).toBe('2026-10-20');expect(a.critical).toEqual(['T1','T2','A2','E2'])
  expect(a.tasks.P1.slack).toBe(1);expect(a.tasks.P2.slack).toBe(2);expect(a.tasks.A1.slack).toBe(5);expect(a.tasks.E1.slack).toBe(6)
 })
 it('convergence waits for the latest predecessor; delay gives 7+3+3+2 = 15 days',()=>{
  const p=freshPlan();p.tasks[0].duration=7;const a=schedule(p.tasks)
  expect(a.tasks.T2.startDate).toBe('2026-10-14');expect(a.tasks.P2.finishDate).toBe('2026-10-15');expect(a.tasks.A2.startDate).toBe('2026-10-19');expect(a.finishDate).toBe('2026-10-23')
  expect(a.critical).toEqual(['P1','T2','A2','E2']);expect(a.tasks.T1.finishDate).toBe('2026-10-08');expect(a.tasks.E1.finishDate).toBe('2026-10-08')
 })
 it('tied converging branches both get zero slack',()=>{
  const p=freshPlan();p.tasks[1].duration=4
  const a=schedule(p.tasks);expect(a.tasks.P2.finish).toBe(6);expect(a.tasks.T2.finish).toBe(6);expect(a.tasks.P2.slack).toBe(0);expect(a.tasks.T2.slack).toBe(0)
 })
 it('rejects cycles before computing dates',()=>{const p=freshPlan();p.tasks[0].predecessors=['P2'];expect(validateTasks(p.tasks)).toMatch(/cycle/);expect(()=>schedule(p.tasks)).toThrow(/cycle/)})
 it('rejects missing references, required removal, self and invalid duration',()=>{
  const p=freshPlan();p.tasks[0].predecessors=['UNKNOWN' as 'P1'];expect(validateTasks(p.tasks)).toMatch(/does not exist/)
  p.tasks[0].predecessors=[];p.tasks[1].predecessors=[];expect(validateTasks(p.tasks)).toMatch(/required/)
  p.tasks[1].predecessors=['P1'];p.tasks[0].predecessors=['P1'];expect(validateTasks(p.tasks)).toMatch(/itself/)
  p.tasks[0].predecessors=[];p.tasks[0].duration=1.5;expect(validateTasks(p.tasks)).toMatch(/whole number/)
 })
 it('traces upstream causes for executive exceptions',()=>{expect(causes(freshPlan().tasks,'E2')).toEqual(['P1','P2','T1','T2','A1','A2','E1'])})
})
