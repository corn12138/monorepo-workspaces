<template>
  <div>
    <div class="space-blank" :style="`height:${data.settings.style.height}px`">

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps(['data']);

</script>

<style scoped>
.space-blank {
    display: inline-block;
    width: 100%;
    border: none;
    background: none;
    padding: 0;
    margin: 0;
}
</style>