import { defineStore } from 'pinia';
import { API } from '@/services/api';
export const usePlanStore = defineStore('plans', () => {
  const plans = ref<any[]>([]);
  const tasks = ref<any[]>([]);
  async function loadPlans(){ plans.value = await API.fetchPlans(); }
  async function createPlan(data:any){ const p = await API.addPlan(data); plans.value.push(p); return p; }
  async function updatePlan(id:number, data:any){ const updated = await API.updatePlan(id,data); const i = plans.value.findIndex(p=>p.id===id); if(i!==-1) plans.value[i]=updated; return updated; }
  async function removePlan(id:number){ await API.deletePlan(id); const i = plans.value.findIndex(p=>p.id===id); if(i!==-1) plans.value.splice(i,1); }
  function getPlan(id:number){ return plans.value.find(p=>p.id===id)??null; }
  async function loadTasks(planId?:number){ tasks.value = await API.fetchTasks(planId); }
  async function createTask(payload:any){ const t = await API.createTask(payload); tasks.value.push(t); return t; }
  async function updateTask(id:number, data:any){ const u = await API.updateTask(id,data); const i = tasks.value.findIndex(t=>t.id===id); if(i!==-1) tasks.value[i]=u; return u; }
  async function deleteTask(id:number){ await API.deleteTask(id); const i = tasks.value.findIndex(t=>t.id===id); if(i!==-1) tasks.value.splice(i,1); }
  async function toggleTaskStatus(id:number){ const t = tasks.value.find(x=>x.id===id); if(!t) return null; const next = t.status==='done'?'pending':'done'; const u = await API.updateTaskStatus(id,next); const i = tasks.value.findIndex(x=>x.id===id); if(i!==-1) tasks.value[i]=u; return u; }
  return { plans, tasks, loadPlans, createPlan, updatePlan, removePlan, getPlan, loadTasks, createTask, updateTask, deleteTask, toggleTaskStatus };
});