<template>
  <div>
    <div v-if="data.settings.url">
        <img :src="data.settings.url" alt="---" />
    </div>
    <div v-else>这是占位符</div>
  </div>
</template>

<script setup>
const props = defineProps(['data']);
</script>

<style>

</style>