<template>
  <view v-if="open" class="overlay">
    <view class="modal">
      <slot />
      <button @click="$emit('close')" class="close">关闭</button>
    </view>
  </view>
</template>
<script setup lang="ts">
const props = defineProps<{ open: boolean }>();
</script>
<style scoped>
.overlay{ position:fixed; inset:0; background:rgba(0,0,0,.5); display:flex; justify-content:center; align-items:center; }
.modal{ background:#fff; padding:16px; border-radius:8px; min-width:260px; }
.close{ margin-top:12px; padding:8px 12px; background:#3b82f6; color:#fff; border:none; border-radius:6px; }
</style>