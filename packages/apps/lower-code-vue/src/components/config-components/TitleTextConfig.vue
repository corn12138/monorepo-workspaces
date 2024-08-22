<template>
  <div>
    <h3>标题文本配置</h3>
    <div>{{ data.settings }}</div>
  </div>
</template>

<script setup>
const  props = defineProps(['data', 'change']);

</script>

<style>

</style>