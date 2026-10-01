export type TaskId = 'P1' | 'P2' | 'T1' | 'T2' | 'A1' | 'A2' | 'E1' | 'E2'
export type Stream = 'Partner readiness' | 'Platform' | 'Pilot assurance' | 'Enablement'
export type RiskKind = 'delay' | 'scope' | 'resequence' | 'contingency' | 'dependency'
export interface Task { id: TaskId; duration: number; predecessors: TaskId[]; handoffMode: 'standard' | 'rehearsal' }
export interface TaskInfo { name: string; stream: Stream; owner: string; handoff: string; outcome: string; allowed: TaskId[]; required: TaskId[] }
export const ids: TaskId[] = ['P1','P2','T1','T2','A1','A2','E1','E2']
export const streams: Stream[] = ['Partner readiness','Platform','Pilot assurance','Enablement']
export const info: Record<TaskId, TaskInfo> = {
 P1:{name:'Partner sample pack',stream:'Partner readiness',owner:'Mira Vale',handoff:'Pack and schema signed',outcome:'Reliable routing',allowed:['P2'],required:[]},
 P2:{name:'Partner acceptance',stream:'Partner readiness',owner:'Mira Vale',handoff:'Contract examples accepted',outcome:'Reproducible acceptance',allowed:['P1','T1'],required:['P1']},
 T1:{name:'Routing scaffold',stream:'Platform',owner:'Owen Reed',handoff:'Route rules reviewed',outcome:'Reliable routing',allowed:['T2','P1'],required:[]},
 T2:{name:'Connected routing',stream:'Platform',owner:'Owen Reed',handoff:'Example paths match pack',outcome:'Reliable routing',allowed:['P1','T1','P2'],required:['P1','T1']},
 A1:{name:'Assurance protocol',stream:'Pilot assurance',owner:'Tessa North',handoff:'Protocol reviewed',outcome:'Reproducible acceptance',allowed:['P1'],required:[]},
 A2:{name:'Pilot evidence',stream:'Pilot assurance',owner:'Tessa North',handoff:'Checks and exceptions recorded',outcome:'Reproducible acceptance',allowed:['P2','T2','A1','E1'],required:['P2','T2','A1']},
 E1:{name:'Support playbook',stream:'Enablement',owner:'Jules Finch',handoff:'Escalation roles reviewed',outcome:'Support-ready handoff',allowed:['P1','A1'],required:[]},
 E2:{name:'Pilot readiness',stream:'Enablement',owner:'Jules Finch',handoff:'Evidence and playbook accepted',outcome:'Support-ready handoff',allowed:['A2','E1','P2'],required:['A2','E1']},
}
export const seed: Task[] = [
 {id:'P1',duration:3,predecessors:[],handoffMode:'standard'},
 {id:'P2',duration:2,predecessors:['P1'],handoffMode:'standard'},
 {id:'T1',duration:4,predecessors:[],handoffMode:'standard'},
 {id:'T2',duration:3,predecessors:['P1','T1'],handoffMode:'standard'},
 {id:'A1',duration:2,predecessors:[],handoffMode:'standard'},
 {id:'A2',duration:3,predecessors:['P2','T2','A1'],handoffMode:'standard'},
 {id:'E1',duration:4,predecessors:[],handoffMode:'standard'},
 {id:'E2',duration:2,predecessors:['A2','E1'],handoffMode:'standard'},
]
export interface Risk { kind: RiskKind; reason: string; cost: string; residual: string }
export interface Decision { owner: string; needed: string; evidence: string; due: string; revision: number; commitments: import('./schedule').Schedule; riskSnapshot: Risk[] }
export interface Plan { schema: 1; revision: number; tasks: Task[]; risks: Risk[]; decisions: Decision[] }
export function freshPlan(): Plan { return {schema:1,revision:0,tasks:structuredClone(seed),risks:[],decisions:[]} }
export const objective = 'Launch a community learning pilot with reliable routing, reproducible acceptance evidence, and a support-ready handoff.'
