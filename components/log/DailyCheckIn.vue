<template>
  <view class="checkin">
    <text>连续签到：{{ streak?.current_streak || 0 }} 天 (最高 {{ streak?.longest_streak || 0 }})</text>
    <button @click="check" :disabled="loading">{{ loading?'处理中...':'签到' }}</button>
  </view>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStreakStore } from '@/store/streak';
import { useUserStore } from '@/store/user';
const streakStore = useStreakStore();
const userStore = useUserStore();
const streak = streakStore.streak;
const loading = ref(false);
onMounted(async ()=>{ if(userStore.user?.id) await streakStore.loadStreak(userStore.user.id); });
async function check(){ if(!userStore.user?.id) return; loading.value=true; await streakStore.doCheckIn(userStore.user.id); loading.value=false; }
</script>
<style scoped>
.checkin{ padding:12px; border:1px solid #eee; border-radius:6px; }
button{ margin-top:8px; padding:8px 12px; background:#3b82f6; color:#fff; border:none; border-radius:6px; }
</style>