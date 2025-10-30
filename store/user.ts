import { defineStore } from 'pinia';
import { API } from '@/services/api';
export const useUserStore = defineStore('user', () => {
  const user = ref<any>(JSON.parse(uni.getStorageSync('user') || 'null'));
  const token = ref<string|null>(uni.getStorageSync('token') || null);
  async function restore(){ if(user.value && token.value) return user.value; const tk = token.value || uni.getStorageSync('token'); if(!tk) return null; if(user.value) return user.value; const u = await API.fetchUser?.(); if(u){ user.value=u; token.value=u.token??token.value; uni.setStorageSync('user', JSON.stringify(u)); if(token.value) uni.setStorageSync('token', token.value); } return user.value; }
  async function login(username:string, password:string){ const u = await API.login(username,password); user.value=u; token.value=u.token??null; uni.setStorageSync('user', JSON.stringify(u)); if(token.value) uni.setStorageSync('token', token.value); return u; }
  async function register(payload:any){ const u = await API.register(payload); user.value=u; token.value=u.token??null; uni.setStorageSync('user', JSON.stringify(u)); if(token.value) uni.setStorageSync('token', token.value); return u; }
  function logout(){ user.value=null; token.value=null; uni.removeStorageSync('user'); uni.removeStorageSync('token'); }
  return { user, token, restore, login, register, logout };
});