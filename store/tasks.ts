import { defineStore } from 'pinia';
import { API } from '@/services/api';
export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<any[]>([]);
  const loading = ref(false);
  const error = ref<string|null>(null);
  async function loadTasks(planId?:number){ loading.value=true; error.value=null; try { tasks.value = await API.fetchTasks(planId); } catch(e:any){ error.value = e?.message ?? '加载任务失败'; } finally { loading.value=false; } }
  function findIndexById(id:number){ return tasks.value.findIndex(t=>t.id===id); }
  async function toggleStatus(id:number){ const t = tasks.value.find(x=>x.id===id); if(!t) return; const next = t.status==='done'?'pending':'done'; try { const updated = await API.updateTaskStatus?.(id,next); if(updated) Object.assign(t,updated); else t.status=next; } catch(e:any){ error.value = e?.message ?? '更新任务状态失败'; } }
  async function createTask(payload:any){ error.value=null; try { const c = await API.createTask(payload); tasks.value.push(c); return c; } catch(e:any){ error.value = e?.message ?? '创建任务失败'; throw e; } }
  async function updateTask(id:number, payload:any){ error.value=null; try { const u = await API.updateTask(id,payload); const idx=findIndexById(id); if(idx>-1) tasks.value[idx]=u; return u; } catch(e:any){ error.value=e?.message ?? '更新任务失败'; throw e; } }
  async function deleteTask(id:number){ error.value=null; try { await API.deleteTask(id); const idx=findIndexById(id); if(idx>-1) tasks.value.splice(idx,1); } catch(e:any){ error.value=e?.message ?? '删除任务失败'; throw e; } }
  async function toggleTaskStatus(id:number){ await toggleStatus(id); }
  async function removeTask(id:number){ return deleteTask(id); }
  return { tasks, loading, error, loadTasks, createTask, updateTask, deleteTask, toggleTaskStatus, toggleStatus, removeTask };
});