<template>
  <view class="card"><slot /></view>
</template>
<script setup lang="ts"></script>
<style scoped>
.card{ background:#fff; border:1px solid #eee; border-radius:8px; padding:12px; box-shadow:0 1px 2px rgba(0,0,0,.04); }
</style>