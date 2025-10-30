// 从原项目复制的 API 类型定义 (简化版)
export interface User { id:number; username:string; email?:string; token?:string; }
export interface Plan { id:number; user_id:number; title:string; description?:string; start_date:string; end_date:string; frequency:string; created_at?:string; }
export type TaskStatus = 'pending'|'done'|'missed';
export type TaskRepeatType = 'none'|'daily'|'monthly';
export interface Task { id:number; plan_id:number; user_id:number; title:string; task_date:string; status:TaskStatus; note?:string; repeat_type?:TaskRepeatType; repeat_end_date?:string; created_at?:string; }
export interface ScheduleItem { id:number; user_id:number; title:string; date:string; start_time?:string; end_time?:string; description?:string; completed?:boolean; created_at?:string; }
export interface CreateSchedulePayload { user_id:number; title:string; date:string; start_time?:string; end_time?:string; description?:string; completed?:boolean; }
export interface UpdateSchedulePayload { title?:string; date?:string; start_time?:string; end_time?:string; description?:string; completed?:boolean; }
export interface Streak { id:number; user_id:number; current_streak:number; longest_streak:number; last_checkin:string|null; }
export interface RegisterPayload { username:string; email?:string; password:string; }
export interface UpdatePlanPayload { title?:string; description?:string; start_date?:string; end_date?:string; frequency?:string; }
export interface CreateTaskPayload { plan_id:number; user_id:number; title:string; task_date:string; status?:TaskStatus; note?:string; repeat_type?:TaskRepeatType; repeat_end_date?:string; }
export interface UpdateTaskPayload { title?:string; task_date?:string; status?:TaskStatus; note?:string; repeat_type?:TaskRepeatType; repeat_end_date?:string; }
