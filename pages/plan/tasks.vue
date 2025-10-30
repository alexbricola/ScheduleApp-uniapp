<template>
  <view class="page">
    <view class="header">
      <text class="title">计划任务管理</text>
      <button @click="goCreateTask">新增任务</button>
    </view>
    <view v-if="filtered.length===0" class="empty">暂无任务</view>
    <view v-for="t in filtered" :key="t.id" class="task" @click="open(t.id)">
      <text class="tt">{{ t.title }}</text>
      <text class="date">{{ t.task_date }}</text>
      <text class="status" :class="t.status">{{ t.status }}</text>
    </view>
  </view>
</template>
<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { useTaskStore } from '@/store/tasks';
const taskStore = useTaskStore();
const planId = ref<number|null>(null);
const filtered = computed(()=> planId.value? taskStore.tasks.filter((t:any)=>t.plan_id===planId.value): taskStore.tasks );
onLoad(async (q:any)=>{ if(q.id) planId.value = Number(q.id); await taskStore.loadTasks(planId.value??undefined); });
function open(id:number){ uni.navigateTo({ url:'/pages/task/detail?id='+id }); }
function goCreateTask(){ /* TODO: 任务创建页 */ }
</script>
<style scoped>
.page{ padding:12px; }
.header{ display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; }
.task{ padding:8px; border:1px solid #eee; border-radius:6px; margin-bottom:6px; }
.status.done{ color:#16a34a; }
.status.pending{ color:#3b82f6; }
.status.missed{ color:#dc2626; }
.empty{ color:#999; }
</style>