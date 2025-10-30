<template>
  <view class="page">
    <view class="form">
      <input v-model="username" placeholder="用户名" />
      <input v-model="email" placeholder="邮箱" />
      <input v-model="password" placeholder="密码" password />
      <button @click="doRegister" :disabled="loading">{{ loading?'注册中...':'注册' }}</button>
      <button @click="goLogin" class="link">已有账号? 去登录</button>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/store/user';
const userStore = useUserStore();
const username = ref('');
const email = ref('');
const password = ref('');
const loading = ref(false);
async function doRegister(){ loading.value=true; try { await userStore.register({ username:username.value, email:email.value, password:password.value }); uni.showToast({ title:'注册成功', icon:'success' }); uni.switchTab({ url:'/pages/home/index' }); } catch(e:any){ uni.showToast({ title:e?.message||'失败', icon:'none' }); } finally { loading.value=false; } }
function goLogin(){ uni.navigateTo({ url:'/pages/auth/login' }); }
</script>
<style scoped>
.page{ padding:20px; }
.form{ display:flex; flex-direction:column; gap:12px; }
input{ border:1px solid #ddd; padding:8px; border-radius:6px; }
button{ padding:10px; background:#3b82f6; color:#fff; border:none; border-radius:6px; }
button.link{ background:transparent; color:#3b82f6; }
</style>