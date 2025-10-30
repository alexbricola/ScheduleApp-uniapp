<template>
  <view class="page">
    <view v-if="task">
      <text class="title">{{ task.title }}</text>
      <text class="date">日期：{{ task.task_date }}</text>
      <text class="status">状态：{{ task.status }}</text>
      <text class="note">备注：{{ task.note || '无' }}</text>
      <button @click="toggle">切换完成状态</button>
      <button @click="remove" class="danger">删除任务</button>
    </view>
    <view v-else>
      <text>任务不存在</text>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref, onLoad } from '@dcloudio/uni-app';
import { useTaskStore } from '@/store/tasks';
const taskStore = useTaskStore();
const task = ref<any>(null);
onLoad(async (query:any)=>{ const id = Number(query.id); await taskStore.loadTasks(); task.value = taskStore.tasks.find((t:any)=>t.id===id) || null; });
async function toggle(){ if(!task.value) return; await taskStore.toggleTaskStatus(task.value.id); task.value = taskStore.tasks.find((t:any)=>t.id===task.value.id); }
async function remove(){ if(!task.value) return; if(!confirm('确定删除?')) return; await taskStore.deleteTask(task.value.id); uni.navigateBack(); }
</script>
<style scoped>
.page{ padding:16px; }
.title{ font-size:20px; font-weight:600; }
.date, .status, .note{ display:block; margin-top:6px; }
button{ margin-top:12px; padding:10px; background:#3b82f6; color:#fff; border:none; border-radius:6px; }
button.danger{ background:#ef4444; }
</style>