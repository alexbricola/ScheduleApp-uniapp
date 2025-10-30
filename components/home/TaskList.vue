<template>
  <view class="tasks">
    <text class="subtitle">今日任务</text>
    <view v-for="t in displayed" :key="t.id" class="task">
      <label>
        <checkbox :checked="t.status==='done'" @click="toggle(t.id)" />
        <text>{{ t.title }} ({{ t.task_date }})</text>
      </label>
    </view>
    <view v-if="displayed.length===0" class="empty">今天暂无任务</view>
  </view>
</template>
<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useTaskStore } from '@/store/tasks';
const taskStore = useTaskStore();
const todayStr = new Date().toISOString().slice(0,10);
const displayed = computed(()=>{ const today = taskStore.tasks.filter((t:any)=>t.task_date===todayStr); if(today.length>0) return today; return taskStore.tasks.filter((t:any)=>t.task_date>=todayStr).sort((a:any,b:any)=>a.task_date.localeCompare(b.task_date)).slice(0,5); });
onMounted(()=>{ taskStore.loadTasks(); });
async function toggle(id:number){ await taskStore.toggleTaskStatus(id); }
</script>
<style scoped>
.subtitle{ font-weight:600; margin:8px 0; }
.task{ padding:6px; border:1px solid #eee; border-radius:6px; margin-bottom:6px; }
.empty{ color:#888; margin-top:6px; }
</style>