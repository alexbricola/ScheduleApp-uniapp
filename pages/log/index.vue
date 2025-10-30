<template>
  <view class="page">
    <view>
      <button @click="refresh">刷新日志</button>
    </view>
    <view v-for="log in logs" :key="log.id" class="log-item">
      <text class="date">{{ log.date }}</text>
      <text class="content">{{ log.content }}</text>
    </view>
    <view v-if="logs.length===0" class="empty">暂无日志</view>
  </view>
</template>
<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app';
import { useLogStore } from '@/store/log';
import { useUserStore } from '@/store/user';
const logStore = useLogStore();
const userStore = useUserStore();
const logs = logStore.logs;
async function refresh(){ const uid = userStore.user?.id; if(uid) await logStore.loadLogs(uid); }
onShow(refresh);
</script>
<style scoped>
.page{ padding:12px; }
.log-item{ padding:8px; border:1px solid #eee; border-radius:6px; margin-bottom:6px; }
.date{ font-weight:600; }
.content{ display:block; margin-top:4px; white-space:pre-line; }
.empty{ color:#999; margin-top:12px; text-align:center; }
</style>