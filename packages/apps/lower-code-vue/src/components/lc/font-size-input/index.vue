<template>
    <div>
        <el-input type="number" v-model="inputValue" style="max-width: 200px;" placeholder="输入字号" @input="changeValue">
            <template #append>PX</template>
        </el-input>
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
//  定义一个响应式变量
const inputValue = ref(props.fontSize ? +props.fontSize.replace("px", "") : 14);

// 监听输入框的值
const changeValue = () => {
    if (inputValue.value > 0) {
        emit("change", `${inputValue.value}px`);
    }
}
</script>

<style></style>