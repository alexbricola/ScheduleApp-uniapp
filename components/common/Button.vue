<template>
  <button class="btn" :class="variant" :disabled="disabled" @click="$emit('click')">
    <slot />
  </button>
</template>
<script setup lang="ts">
const props = defineProps<{ variant?: 'primary'|'secondary'|'danger'; disabled?: boolean }>();
</script>
<style scoped>
.btn{ padding:8px 14px; border-radius:6px; border:none; font-size:14px; background:#f1f5f9; }
.btn.primary{ background:#3b82f6; color:#fff; }
.btn.secondary{ background:#64748b; color:#fff; }
.btn.danger{ background:#ef4444; color:#fff; }
.btn:disabled{ opacity:.5; }
</style>