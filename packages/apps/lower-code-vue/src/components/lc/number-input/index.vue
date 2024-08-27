<template>
    <div>
        <el-input-number v-model="inputValue" class="mx-4" :min="0" :max="1000" label="数量" controls-position="right"
            @change="handleChange" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
// props 用于定义组件的属性
const props = defineProps({
    defaultValue: {
        type: Number,
        default: 0
    }
});
// emits 用于定义组件的事件
const emit = defineEmits(["change"]);
const inputValue = ref(+props.defaultValue); //  定义一个响应式变量
const handleChange = () => {
    emit("change", +inputValue.value);
}
</script>

<style></style>