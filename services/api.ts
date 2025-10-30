// uni-app API 封装：自动在真实后端与 mock 之间切换
import { mockAPI } from './mock';
// 真实后端调用使用 uni.request
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

function request<T>(url:string, method:'GET'|'POST'|'PUT'|'DELETE', data?:any): Promise<T> {
  return new Promise((resolve, reject) => {
    uni.request({ url: BASE_URL + url, method, data, success: (res) => {
      if(res.statusCode === 200) resolve(res.data as T); else reject(new Error('HTTP '+res.statusCode));
    }, fail: (err) => reject(err) });
  });
}

const backendAPI = {
  login(username:string, password:string){ return request('/auth/login','POST',{ username, password }); },
  register(payload:any){ return request('/auth/register','POST', payload); },
  fetchUser(){ return request('/user/profile','GET'); },
  fetchPlans(){ return request('/plans','GET'); },
  addPlan(plan:any){ return request('/plans','POST', plan); },
  updatePlan(id:number, data:any){ return request(`/plans/${id}`,'PUT', data); },
  deletePlan(id:number){ return request(`/plans/${id}`,'DELETE'); },
  fetchTasks(planId?:number){ return request(planId?`/tasks?planId=${planId}`:'/tasks','GET'); },
  createTask(payload:any){ return request('/tasks','POST', payload); },
  updateTask(id:number, data:any){ return request(`/tasks/${id}`,'PUT', data); },
  deleteTask(id:number){ return request(`/tasks/${id}`,'DELETE'); },
  updateTaskStatus(id:number, status:string){ return request(`/tasks/${id}`,'PUT',{ status }); },
  fetchStreak(userId:number){ return request(`/streak/${userId}`,'GET'); },
  checkIn(userId:number){ return request('/streak/checkin','POST',{ userId }); },
  fetchSchedules(date?:string){ return request(date?`/schedules?date=${date}`:'/schedules','GET'); },
  createSchedule(payload:any){ return request('/schedules','POST', payload); },
  updateSchedule(id:number, data:any){ return request(`/schedules/${id}`,'PUT', data); },
  deleteSchedule(id:number){ return request(`/schedules/${id}`,'DELETE'); }
};

const USE_MOCK = !BASE_URL; // 没有后端地址时使用 mock
export const API = USE_MOCK ? mockAPI : backendAPI;
