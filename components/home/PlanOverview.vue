<template>
  <view class="overview">
    <view class="header">
      <text class="title">计划进度概览</text>
      <button @click="goCreate">新建计划</button>
    </view>
    <view v-if="plans.length===0" class="empty">暂无计划</view>
    <view v-for="p in plans" :key="p.id" class="plan">
      <text class="name">{{ p.title }}</text>
      <text class="range">{{ p.start_date }} ~ {{ p.end_date }} / {{ p.frequency }}</text>
      <view class="bar"><view class="fill" :style="{ width: progressFor(p.id)+'%' }"></view></view>
      <view class="ops">
        <button @click="editPlan(p.id)">修改</button>
        <button @click="goPlanTasks(p.id)">管理任务</button>
        <button class="danger" @click="removePlan(p.id)">删除</button>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { usePlanStore } from '@/store/plans';
import { useTaskStore } from '@/store/tasks';
const planStore = usePlanStore();
const taskStore = useTaskStore();
const plans = planStore.plans;
function progressFor(id:number){ const p = plans.find((x:any)=>x.id===id); if(!p) return 0; const start = new Date(p.start_date); const end = new Date(p.end_date); const inRange = taskStore.tasks.filter((t:any)=>t.plan_id===id && new Date(t.task_date)>=start && new Date(t.task_date)<=end); if(inRange.length===0) return 0; const done = inRange.filter((t:any)=>t.status==='done').length; return Math.round(done/inRange.length*100); }
async function removePlan(id:number){ await planStore.removePlan(id); }
function goCreate(){ uni.navigateTo({ url:'/pages/plan/create' }); }
function editPlan(id:number){ uni.navigateTo({ url:'/pages/plan/create?edit='+id }); }
function goPlanTasks(id:number){ uni.navigateTo({ url:'/pages/plan/tasks?id='+id }); }
onMounted(async ()=>{ await planStore.loadPlans(); await taskStore.loadTasks(); });
</script>
<style scoped>
.header{ display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; }
.plan{ padding:8px; border:1px solid #eee; border-radius:6px; margin-bottom:8px; }
.range{ display:block; color:#666; margin:4px 0; }
.bar{ height:8px; background:#f1f5f9; border-radius:4px; overflow:hidden; }
.fill{ height:100%; background:#3b82f6; }
.ops{ display:flex; gap:6px; margin-top:6px; }
button{ padding:6px 10px; background:#3b82f6; color:#fff; border:none; border-radius:6px; font-size:12px; }
button.danger{ background:#ef4444; }
.empty{ color:#888; }
</style>