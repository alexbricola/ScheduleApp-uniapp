// Mock 数据与实现（uni-app 环境）
import type { User, Plan, Task, Streak, ScheduleItem, RegisterPayload, UpdatePlanPayload, CreateTaskPayload, UpdateTaskPayload, CreateSchedulePayload, UpdateSchedulePayload } from './api.types';

// 简化：使用内存数组（可改为 storage）
const users: User[] = [ { id: 1, username: 'demoUser', email: 'demo@example.com', token: 'mock-token-1' } ];
const plans: Plan[] = [];
const tasks: Task[] = [];
const schedules: ScheduleItem[] = [];
const streaks: Streak[] = [ { id:1, user_id:1, current_streak:3, longest_streak:10, last_checkin:'2025-10-09' } ];

function nextId(list: {id:number}[]) { return (list.at(-1)?.id ?? 0) + 1; }

export const mockAPI = {
  async login(username: string, _password: string): Promise<User> {
    const u = users.find(u=>u.username===username);
    if(!u) throw new Error('用户名不存在');
    return { ...u };
  },
  async register(payload: RegisterPayload): Promise<User> {
    if(users.some(u=>u.username===payload.username)) throw new Error('用户名已存在');
    const user: User = { id: nextId(users), username: payload.username, email: payload.email, token: 'mock-token-' + Date.now() };
    users.push(user); return { ...user };
  },
  async fetchUser(): Promise<User> { const u = users[0]; if(!u) throw new Error('未登录'); return { ...u }; },
  async fetchPlans(): Promise<Plan[]> { return plans.map(p=>({ ...p })); },
  async addPlan(plan: Partial<Plan>): Promise<Plan> { const p: Plan = { id: nextId(plans), user_id: plan.user_id??1, title: plan.title??'未命名计划', description: plan.description??'', start_date: plan.start_date??new Date().toISOString().slice(0,10), end_date: plan.end_date??new Date().toISOString().slice(0,10), frequency: plan.frequency??'daily', created_at: new Date().toISOString() }; plans.push(p); return { ...p }; },
  async updatePlan(id:number, data:UpdatePlanPayload): Promise<Plan> { const i = plans.findIndex(p=>p.id===id); if(i===-1) throw new Error('计划不存在'); plans[i] = { ...plans[i], ...data }; return { ...plans[i] }; },
  async deletePlan(id:number): Promise<{success:boolean}> { const i = plans.findIndex(p=>p.id===id); if(i!==-1) plans.splice(i,1); for(let j=tasks.length-1;j>=0;j--){ if(tasks[j].plan_id===id) tasks.splice(j,1);} return { success:true }; },
  async fetchTasks(planId?:number): Promise<Task[]> { return (planId?tasks.filter(t=>t.plan_id===planId):tasks).map(t=>({ ...t })); },
  async createTask(payload: CreateTaskPayload): Promise<Task> { const t: Task = { id: nextId(tasks), plan_id: payload.plan_id, user_id: payload.user_id, title: payload.title, task_date: payload.task_date, status: payload.status??'pending', note: payload.note, repeat_type: payload.repeat_type??'none', repeat_end_date: payload.repeat_end_date, created_at: new Date().toISOString() }; tasks.push(t); return { ...t }; },
  async updateTask(id:number, data:UpdateTaskPayload): Promise<Task> { const i = tasks.findIndex(t=>t.id===id); if(i===-1) throw new Error('任务不存在'); tasks[i] = { ...tasks[i], ...data }; return { ...tasks[i] }; },
  async deleteTask(id:number): Promise<{success:boolean}> { const i = tasks.findIndex(t=>t.id===id); if(i!==-1) tasks.splice(i,1); return { success:true }; },
  async updateTaskStatus(id:number, status:Task['status']): Promise<Task> { const t = tasks.find(t=>t.id===id); if(!t) throw new Error('任务不存在'); t.status = status; return { ...t }; },
  async fetchStreak(userId:number): Promise<Streak> { const s = streaks.find(x=>x.user_id===userId); if(!s) throw new Error('未找到签到记录'); return { ...s }; },
  async checkIn(userId:number): Promise<Streak> { const s = streaks.find(x=>x.user_id===userId); if(!s) throw new Error('未找到签到记录'); s.current_streak += 1; s.last_checkin = new Date().toISOString().slice(0,10); if(s.current_streak > s.longest_streak) s.longest_streak = s.current_streak; return { ...s }; },
  async fetchSchedules(date?:string): Promise<ScheduleItem[]> { return (date?schedules.filter(s=>s.date===date):schedules).map(s=>({ ...s })); },
  async createSchedule(payload: CreateSchedulePayload): Promise<ScheduleItem> { const item: ScheduleItem = { id: nextId(schedules), user_id: payload.user_id, title: payload.title, date: payload.date, start_time: payload.start_time, end_time: payload.end_time, description: payload.description, completed: payload.completed??false, created_at: new Date().toISOString() }; schedules.push(item); return { ...item }; },
  async updateSchedule(id:number, data:UpdateSchedulePayload): Promise<ScheduleItem> { const i = schedules.findIndex(s=>s.id===id); if(i===-1) throw new Error('日程不存在'); schedules[i] = { ...schedules[i], ...data }; return { ...schedules[i] }; },
  async deleteSchedule(id:number): Promise<{success:boolean}> { const i = schedules.findIndex(s=>s.id===id); if(i!==-1) schedules.splice(i,1); return { success:true }; }
};
