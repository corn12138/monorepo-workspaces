<template>
    <div :style="data.settings.style" class="text-title">
        {{ data.settings.content }}
    </div>
</template>

<script setup>
const props = defineProps(['data']);
</script>

<style scoped>
.text-title {
    font-size: 24px;
    color: #333;
    padding: 10px;
}
</style>