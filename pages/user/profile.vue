<template>
  <view class="page">
    <view v-if="user">
      <text class="name">{{ user.username }}</text>
      <text class="email">{{ user.email || '无邮箱' }}</text>
      <button @click="logout">退出登录</button>
    </view>
    <view v-else>
      <text>未登录</text>
      <button @click="goLogin">去登录</button>
    </view>
  </view>
</template>
<script setup lang="ts">
import { useUserStore } from '@/store/user';
const userStore = useUserStore();
const user = userStore.user;
function logout(){ userStore.logout(); uni.reLaunch({ url:'/pages/auth/login' }); }
function goLogin(){ uni.navigateTo({ url:'/pages/auth/login' }); }
</script>
<style scoped>
.page{ padding:16px; }
.name{ font-size:20px; font-weight:600; }
.email{ display:block; margin:6px 0 12px; color:#666; }
button{ padding:10px; background:#ef4444; color:#fff; border:none; border-radius:6px; }
</style>