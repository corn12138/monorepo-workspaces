<template>
    <div>
        <svg :width="width" :height="height">
            <use :href="svgSrc" :fill="fillColor" :stroke="strokeColor" :width="width" :height="height" />


        </svg>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({
    name: {
        type: String,
        required: true
    },
    fill: {
        type: String,
        default: "#000"
    },
    stroke: {
        type: String,
        default: "#000"
    },
    width: {
        type: String,
        default: "100px"
    },
    height: {
        type: String,
        default: "100px"
    }
});
const svgSrc = ref(`/images/${props.name}.svg`);
const fillColor = ref(props.fill);
const strokeColor = ref(props.stroke);
</script>

<style></style>