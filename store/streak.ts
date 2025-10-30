import { defineStore } from 'pinia';
import { API } from '@/services/api';
export const useStreakStore = defineStore('streak', () => {
  const streak = ref<any>(null);
  async function loadStreak(userId:number){ try { const s = await API.fetchStreak(userId); streak.value = s ?? { user_id:userId, current_streak:0, longest_streak:0, last_checkin:null }; return streak.value; } catch(e){ streak.value = { user_id:userId, current_streak:0, longest_streak:0, last_checkin:null }; return streak.value; } }
  async function doCheckIn(userId:number){ try { const s = await API.checkIn(userId); streak.value = s ?? streak.value; return streak.value; } catch(e){ return streak.value; } }
  return { streak, loadStreak, doCheckIn };
});