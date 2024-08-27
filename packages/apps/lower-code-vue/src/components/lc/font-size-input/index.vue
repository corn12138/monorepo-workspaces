<template>
    <div>
        <input type="number" v-model="inputValue" @input="changeValue" />
        <span>px</span>
    </div>
</template>

<script setup>
import { ref } from 'vue';
// props 用于定义组件的属性
const props = defineProps({
    fontSize: {
        type: Number,
        default: 0
    }
});
// emits 用于定义组件的事件
const emit = defineEmits(["change"]);
// 
const inputValue = ref(0);

// 监听输入框的值
const changeValue = () => {
    if (inputValue.value >0) {
        emit("change", `${inputValue.value}px`);
    }
}
</script>

<style></style>