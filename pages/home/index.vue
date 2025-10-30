<template>
  <view class="page">
    <view class="actions">
      <button @click="goLog">查看日志</button>
      <button @click="refresh">刷新数据</button>
    </view>
    <view>
      <text class="subtitle">计划列表</text>
      <view v-for="p in plans" :key="p.id" class="plan">
        <text class="title">{{ p.title }}</text>
        <text class="range">{{ p.start_date }} ~ {{ p.end_date }}</text>
        <text class="pct">{{ progressFor(p.id) }}%</text>
      </view>
    </view>
    <view class="tasks">
      <text class="subtitle">今日任务</text>
      <view v-for="t in tasks" :key="t.id" class="task">
        <label>
          <checkbox :checked="t.status==='done'" @click="toggle(t.id)" />
          <text>{{ t.title }} ({{ t.task_date }})</text>
        </label>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app';
import { usePlanStore } from '@/store/plans';
import { useTaskStore } from '@/store/tasks';
import { useLogStore } from '@/store/log';
import { useUserStore } from '@/store/user';
const planStore = usePlanStore();
const taskStore = useTaskStore();
const logStore = useLogStore();
const userStore = useUserStore();
const todayStr = new Date().toISOString().slice(0,10);
const plans = planStore.plans;
const tasks = taskStore.tasks;
function progressFor(id:number){ const p = plans.find((x:any)=>x.id===id); if(!p) return 0; const start = new Date(p.start_date); const end = new Date(p.end_date); const inRange = tasks.filter((t:any)=>t.plan_id===id && new Date(t.task_date)>=start && new Date(t.task_date)<=end); if(inRange.length===0) return 0; const done = inRange.filter((t:any)=>t.status==='done').length; return Math.round(done/inRange.length*100); }
async function toggle(id:number){ await taskStore.toggleTaskStatus(id); const userId = userStore.user?.id; if(userId){ await logStore.generateTodayLog(userId, tasks, []); } }
onShow(async ()=>{ await planStore.loadPlans(); await taskStore.loadTasks(); });
function refresh(){ planStore.loadPlans(); taskStore.loadTasks(); }
function goLog(){ uni.navigateTo({ url:'/pages/log/index' }); }
</script>
<style scoped>
.page{ padding:12px; }
.subtitle{ font-weight:600; margin:8px 0; }
.plan, .task{ padding:8px; border:1px solid #eee; border-radius:6px; margin-bottom:6px; }
.pct{ color:#3b82f6; font-weight:600; }
</style>