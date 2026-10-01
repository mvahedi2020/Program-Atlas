import { ids, info, type Task, type TaskId } from './model'
import { workDate } from './calendar'
export interface ScheduledTask { id: TaskId; start: number; finish: number; latestStart: number; slack: number; critical: boolean; startDate: string; finishDate: string }
export interface Schedule { tasks: Record<TaskId,ScheduledTask>; order: TaskId[]; length: number; finishDate: string; critical: TaskId[] }
export function validateTasks(tasks: Task[]): string | null {
 if (tasks.length !== ids.length || new Set(tasks.map(t=>t.id)).size !== ids.length || tasks.some(t=>!ids.includes(t.id))) return 'The plan must contain each of the eight original deliverables exactly once.'
 for (const task of tasks) {
  if (!Number.isInteger(task.duration) || task.duration<1 || task.duration>20) return `${task.id}: duration must be a whole number from 1 to 20 working days.`
  if (task.handoffMode !== 'standard' && !(task.id==='T2' && task.handoffMode==='rehearsal')) return `${task.id}: unknown handoff mode.`
  if (new Set(task.predecessors).size !== task.predecessors.length) return `${task.id}: list each predecessor only once.`
  for (const id of task.predecessors) {
   if (!ids.includes(id)) return `${task.id}: predecessor ${id} does not exist. Use an original deliverable ID.`
   if (id===task.id) return `${task.id}: a deliverable cannot depend on itself.`
   if (!info[task.id].allowed.includes(id)) return `${task.id}: ${id} is not a permitted handoff.`
  }
  const required = info[task.id].required.filter(id=>!(task.id==='T2' && task.handoffMode==='rehearsal' && id==='P1'))
  if (required.some(id=>!task.predecessors.includes(id))) return `${task.id}: keep required predecessors ${required.join(', ')}. Only the reviewed resequencing proposal may substitute the partner pack.`
 }
 const visiting = new Set<TaskId>(), done = new Set<TaskId>(), chain: TaskId[]=[]
 const byId = new Map(tasks.map(t=>[t.id,t]))
 function visit(id:TaskId): string|null {
  if (visiting.has(id)) return `Dependency cycle: ${[...chain.slice(chain.indexOf(id)),id].join(' → ')}. Remove the circular handoff.`
  if (done.has(id)) return null
  visiting.add(id); chain.push(id)
  for (const pred of byId.get(id)!.predecessors) { const issue=visit(pred); if(issue) return issue }
  chain.pop(); visiting.delete(id); done.add(id); return null
 }
 for(const id of ids) {const issue=visit(id); if(issue) return issue}
 return null
}
export function schedule(tasks: Task[]): Schedule {
 const issue=validateTasks(tasks); if(issue) throw new Error(issue)
 const byId = new Map(tasks.map(t=>[t.id,t])), order:TaskId[]=[], seen=new Set<TaskId>()
 function visit(id:TaskId) {if(seen.has(id)) return; seen.add(id); byId.get(id)!.predecessors.forEach(visit); order.push(id)}
 ids.forEach(visit)
 const result = {} as Record<TaskId,ScheduledTask>
 for(const id of order) {
  const task=byId.get(id)!, start=Math.max(0,...task.predecessors.map(pred=>result[pred].finish+1)), finish=start+task.duration-1
  result[id]={id,start,finish,latestStart:0,slack:0,critical:false,startDate:workDate(start),finishDate:workDate(finish)}
 }
 const length=Math.max(...ids.map(id=>result[id].finish))+1
 for(const id of [...order].reverse()) {
  const task=byId.get(id)!, successors=tasks.filter(t=>t.predecessors.includes(id))
  const latestFinish=successors.length ? Math.min(...successors.map(t=>result[t.id].latestStart-1)) : length-1
  const latestStart=latestFinish-task.duration+1, slack=latestStart-result[id].start
  result[id]={...result[id],latestStart,slack,critical:slack===0}
 }
 return {tasks:result,order,length,finishDate:workDate(length-1),critical:order.filter(id=>result[id].critical)}
}
export function changes(before: Task[], after: Task[]): TaskId[] {
 const a=schedule(before), b=schedule(after)
 return ids.filter(id=>a.tasks[id].start!==b.tasks[id].start || a.tasks[id].finish!==b.tasks[id].finish || before.find(t=>t.id===id)!.predecessors.join()!==after.find(t=>t.id===id)!.predecessors.join() || before.find(t=>t.id===id)!.handoffMode!==after.find(t=>t.id===id)!.handoffMode)
}
export function causes(tasks:Task[],id:TaskId):TaskId[] {
 const seen = new Set<TaskId>()
 function visit(current:TaskId) {for(const p of tasks.find(t=>t.id===current)!.predecessors) {if(!seen.has(p)) {seen.add(p);visit(p)}}}
 visit(id);return ids.filter(t=>seen.has(t))
}

export function criticalEdge(value:Schedule,predecessor:TaskId,successor:TaskId):boolean {return value.tasks[predecessor].critical && value.tasks[successor].critical && value.tasks[predecessor].finish+1===value.tasks[successor].start}
