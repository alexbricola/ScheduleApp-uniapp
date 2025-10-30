import { defineStore } from 'pinia';
import { generateDailyLog } from '@/services/generate-log';
export const useLogStore = defineStore('log', () => {
  const logs = ref<any[]>([]);
  async function loadLogs(userId:number){ const key = 'logs_'+userId; const stored = uni.getStorageSync(key); logs.value = stored?JSON.parse(stored):[]; return logs.value; }
  async function generateTodayLog(userId:number, tasks:any[], schedules:any[]=[]){ const today = new Date().toISOString().slice(0,10); const key = 'logs_'+userId; let existing: any[] = JSON.parse(uni.getStorageSync(key) || '[]'); const idx = existing.findIndex(l=>l.date===today); const newLog = await generateDailyLog(userId, tasks, schedules); if(idx!==-1){ newLog.id = existing[idx].id; existing[idx] = newLog; } else { existing = existing.filter(l=>l.date!==today); existing.unshift(newLog); } uni.setStorageSync(key, JSON.stringify(existing)); logs.value=[...existing]; return newLog; }
  return { logs, loadLogs, generateTodayLog };
});