export const origin = '2026-10-05'
const DAY = 86400000
function utcDate(value: string): Date {
 if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error('Use a valid YYYY-MM-DD calendar date.')
 const date = new Date(`${value}T00:00:00Z`)
 if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0,10) !== value) throw new Error('Use a valid YYYY-MM-DD calendar date.')
 return date
}
export function isWorkday(date: Date): boolean { return date.getUTCDay() !== 0 && date.getUTCDay() !== 6 }
export function workDate(index: number, start = origin): string {
 if (!Number.isInteger(index) || index < 0 || index > 1000) throw new Error('Working-day index must be 0–1000.')
 const date = utcDate(start)
 while (!isWorkday(date)) date.setTime(date.getTime()+DAY)
 for (let i=0;i<index;i++) { do {date.setTime(date.getTime()+DAY)} while (!isWorkday(date)) }
 return date.toISOString().slice(0,10)
}
export function validWorkDate(value:string): boolean {
 try {return isWorkday(utcDate(value))} catch {return false}
}
export function displayDate(value: string): string {
 return utcDate(value).toLocaleDateString('en-US',{month:'short',day:'numeric',timeZone:'UTC'})
}
