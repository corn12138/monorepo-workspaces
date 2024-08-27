<template>
    <div>
        <el-input v-model="inputValue" style="max-width: 347px;" :placeholder="placeHolder" @input="changeInputValue" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({
    placeHolder: {
        type: String,
        default: '请输入内容'
    },
    defaultValue: {
        type: String,
        default: ''
    }
});
const emit = defineEmits(['change']);

const inputValue = ref(props.defaultValue || '');

const changeInputValue = (value) => {
    inputValue.value = value;
    emit('change', value);
};
</script>

<style></style>