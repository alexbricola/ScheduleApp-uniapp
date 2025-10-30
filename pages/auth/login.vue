<template>
  <view class="page">
    <view class="form">
      <input v-model="username" placeholder="用户名" />
      <input v-model="password" placeholder="密码" password />
      <button @click="doLogin" :disabled="loading">{{ loading?'登录中...':'登录' }}</button>
      <button @click="goRegister" class="link">去注册</button>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/store/user';
const userStore = useUserStore();
const username = ref('demoUser');
const password = ref('123456');
const loading = ref(false);
async function doLogin(){ loading.value=true; try { await userStore.login(username.value,password.value); uni.showToast({ title:'登录成功', icon:'success' }); uni.switchTab({ url:'/pages/home/index' }); } catch(e:any){ uni.showToast({ title:e?.message||'失败', icon:'none' }); } finally { loading.value=false; } }
function goRegister(){ uni.navigateTo({ url:'/pages/auth/register' }); }
</script>
<style scoped>
.page{ padding:20px; }
.form{ display:flex; flex-direction:column; gap:12px; }
input{ border:1px solid #ddd; padding:8px; border-radius:6px; }
button{ padding:10px; background:#3b82f6; color:#fff; border:none; border-radius:6px; }
button.link{ background:transparent; color:#3b82f6; }
</style>