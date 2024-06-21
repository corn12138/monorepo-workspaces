<template>
    <div id="app">
        <RouterView></RouterView>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from "vue-router"

const count = ref(0);
</script>

<style></style>