<template>
  <view class="form">
    <input v-model="form.title" placeholder="标题" />
    <textarea v-model="form.description" placeholder="描述" />
    <input v-model="form.start_date" type="date" />
    <input v-model="form.end_date" type="date" />
    <picker mode="selector" :range="['daily','weekly']" @change="onFreq">
      <view class="picker">频率：{{ form.frequency }}</view>
    </picker>
    <button @click="submit">{{ mode==='edit'?'保存修改':'创建计划' }}</button>
  </view>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
const props = withDefaults(defineProps<{ mode?:'create'|'edit'; initial?: any }>(), { mode:'create', initial: () => ({}) });
const mode = props.mode;
const form = ref({ title: props.initial.title||'', description: props.initial.description||'', start_date: props.initial.start_date||'', end_date: props.initial.end_date||'', frequency: props.initial.frequency||'daily' });
watch(()=>props.initial, v=>{ form.value = { title: v?.title||'', description: v?.description||'', start_date: v?.start_date||'', end_date: v?.end_date||'', frequency: v?.frequency||'daily' }; }, { deep:true });
const emit = defineEmits<{(e:'submit', payload:any):void}>();
function submit(){ emit('submit', { ...form.value }); }
function onFreq(e:any){ form.value.frequency = ['daily','weekly'][e.detail.value]; }
</script>
<style scoped>
.form{ display:flex; flex-direction:column; gap:12px; }
input, textarea{ border:1px solid #ddd; padding:8px; border-radius:6px; }
button{ padding:10px; background:#3b82f6; color:#fff; border:none; border-radius:6px; }
.picker{ padding:10px; background:#f8f8f8; border:1px solid #ddd; border-radius:6px; }
</style>