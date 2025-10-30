<template>
  <view class="page">
    <view class="form">
      <input v-model="title" placeholder="计划标题" />
      <textarea v-model="description" placeholder="描述" />
      <input v-model="start_date" type="date" />
      <input v-model="end_date" type="date" />
      <picker mode="selector" :range="freqOptions" @change="onFreqChange">
        <view class="picker">频率：{{ frequency }}</view>
      </picker>
      <button @click="submit">{{ editId? '保存修改':'创建计划' }}</button>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref, onLoad } from '@dcloudio/uni-app';
import { usePlanStore } from '@/store/plans';
const planStore = usePlanStore();
const title = ref('');
const description = ref('');
const start_date = ref(new Date().toISOString().slice(0,10));
const end_date = ref(new Date().toISOString().slice(0,10));
const frequency = ref('daily');
const freqOptions = ['daily','weekly'];
const editId = ref<number|null>(null);
function onFreqChange(e:any){ frequency.value = freqOptions[e.detail.value]; }
onLoad((query:any)=>{ if(query.edit){ editId.value = Number(query.edit); const p = planStore.getPlan(editId.value); if(p){ title.value=p.title; description.value=p.description||''; start_date.value=p.start_date; end_date.value=p.end_date; frequency.value=p.frequency; } } });
async function submit(){ const payload = { title:title.value, description:description.value, start_date:start_date.value, end_date:end_date.value, frequency:frequency.value }; if(editId.value){ await planStore.updatePlan(editId.value, payload); uni.showToast({ title:'修改成功', icon:'success' }); } else { await planStore.createPlan(payload); uni.showToast({ title:'创建成功', icon:'success' }); } uni.navigateBack(); }
</script>
<style scoped>
.page{ padding:16px; }
.form{ display:flex; flex-direction:column; gap:12px; }
input, textarea{ border:1px solid #ddd; padding:8px; border-radius:6px; }
button{ padding:10px; background:#3b82f6; color:#fff; border:none; border-radius:6px; }
.picker{ padding:10px; background:#f8f8f8; border:1px solid #ddd; border-radius:6px; }
</style>