import { freshPlan, ids, type Plan, type Task, type Risk, type Decision } from './model'
import { validateTasks } from './schedule'
import { validWorkDate, workDate } from './calendar'
export const storageKey='program-atlas:v1'
export type StorageMode='saved'|'invalid'|'memory'
export interface StorageResult {plan:Plan; mode:StorageMode; token:string|null; message:string}
export type StorageAccess=()=>Pick<Storage,'getItem'|'setItem'>
const access:StorageAccess=()=>window.localStorage
function record(value:unknown):value is Record<string,unknown> {return typeof value==='object' && value!==null && !Array.isArray(value)}
function text(value:unknown):value is string {return typeof value==='string' && value.length>=1 && value.length<=1200}
function integer(value:unknown,min=0,max=Number.MAX_SAFE_INTEGER):value is number {return typeof value==='number' && Number.isInteger(value) && value>=min && value<=max}
function validRisk(value:unknown):value is Risk {return record(value) && typeof value.kind==='string' && ['delay','scope','resequence','contingency','dependency'].includes(value.kind) && text(value.reason) && text(value.cost) && text(value.residual)}
function validDecision(value:unknown,revision:number):value is Decision {
 if(!record(value) || !text(value.owner) || !text(value.needed) || !text(value.evidence) || typeof value.due!=='string' || !validWorkDate(value.due) || !integer(value.revision) || value.revision>revision || !Array.isArray(value.riskSnapshot) || !value.riskSnapshot.every(validRisk)) return false
 const snapshot=value.commitments
 if(!record(snapshot) || !integer(snapshot.length,1,160) || typeof snapshot.finishDate!=='string' || snapshot.finishDate!==workDate(snapshot.length-1) || !Array.isArray(snapshot.order) || snapshot.order.length!==8 || new Set(snapshot.order).size!==8 || !snapshot.order.every(id=>ids.includes(id)) || !Array.isArray(snapshot.critical) || !snapshot.critical.every(id=>ids.includes(id)) || !record(snapshot.tasks)) return false
 for(const id of ids) {
  const task=snapshot.tasks[id]
  if(!record(task) || task.id!==id || !integer(task.start,0,159) || !integer(task.finish,task.start,159) || !integer(task.latestStart,task.start,159) || !integer(task.slack,0,159) || task.latestStart-task.start!==task.slack || task.critical!==(task.slack===0) || task.startDate!==workDate(task.start) || task.finishDate!==workDate(task.finish)) return false
 }
 const slots=ids.map(id=>(snapshot.tasks as Record<string,Record<string,unknown>>)[id])
 if(Math.max(...slots.map(t=>t.finish as number))+1!==snapshot.length || new Set(snapshot.critical).size!==snapshot.critical.length || ids.some(id=>(snapshot.critical as unknown[]).includes(id)!==(snapshot.tasks as Record<string,Record<string,unknown>>)[id].critical)) return false
 return value.due>='2026-10-05' && value.due<=snapshot.finishDate
}
export function parsePlan(raw:string):Plan|null {
 try {
  const value:unknown=JSON.parse(raw)
  if(!record(value) || value.schema!==1 || !integer(value.revision) || !Array.isArray(value.tasks) || !Array.isArray(value.risks) || !Array.isArray(value.decisions) || value.risks.length>100 || value.decisions.length>20 || !value.risks.every(validRisk) || !value.decisions.every(d=>validDecision(d,value.revision as number))) return null
  if(!value.tasks.every(t=>record(t) && typeof t.id==='string' && integer(t.duration,1,20) && Array.isArray(t.predecessors) && t.predecessors.every(p=>typeof p==='string') && typeof t.handoffMode==='string' && ['standard','rehearsal'].includes(t.handoffMode))) return null
  const tasks=value.tasks as Task[]
  if(validateTasks(tasks)) return null
  if(tasks.some(t=>t.handoffMode==='rehearsal') && !value.risks.some(r=>r.kind==='resequence')) return null
  return {schema:1,revision:value.revision,tasks:tasks.map(t=>({id:t.id,duration:t.duration,predecessors:[...t.predecessors],handoffMode:t.handoffMode})),risks:value.risks as Risk[],decisions:value.decisions as Decision[]}
 } catch {return null}
}
export function loadStorage(get:StorageAccess=access):StorageResult {
 try {
  const raw=get().getItem(storageKey)
  if(raw===null) return {plan:freshPlan(),mode:'saved',token:null,message:'The original sample is ready. Confirmed actions will be saved in this browser.'}
  const plan=parsePlan(raw)
  if(!plan) return {plan:freshPlan(),mode:'invalid',token:raw,message:'Saved data is incompatible or invalid. It is preserved. The original sample is shown for inspection; confirm Reset sample to replace saved data.'}
  return {plan,mode:'saved',token:raw,message:'Compatible confirmed scenario restored. Unsaved drafts and Undo do not survive refresh.'}
 } catch {return {plan:freshPlan(),mode:'memory',token:null,message:'Browser storage is unavailable. Changes work in memory for this tab and will be lost on refresh.'}}
}
export class StorageConflict extends Error {constructor(){super('Saved data changed in another tab. Your action was not applied. Review the restored current plan.')}}
export function saveStorage(plan:Plan,expectedToken:string|null,mode:StorageMode,allowReset=false,get:StorageAccess=access):{mode:StorageMode;token:string|null} {
 if(mode==='invalid' && !allowReset) throw new Error('Saved data is invalid. Confirm Reset sample before saving changes.')
 if(mode==='memory') return {mode:'memory',token:null}
 const raw=JSON.stringify(plan)
 try {
  const storage=get()
  if(storage.getItem(storageKey)!==expectedToken) throw new StorageConflict()
  storage.setItem(storageKey,raw)
  if(storage.getItem(storageKey)!==raw) throw new Error('Storage did not retain the confirmed scenario.')
  return {mode:'saved',token:raw}
 } catch(error) {
  if(error instanceof StorageConflict) throw error
  return {mode:'memory',token:null}
 }
}
