<template>
  <div>
    <el-radio-group v-model="selectValue" @change="changeTextAlign">
        <el-radio label="left">左对齐</el-radio>
        <el-radio label="center">居中对齐</el-radio>
        <el-radio label="right">右对齐</el-radio>
    </el-radio-group>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({
    defaultTextAlign: {
        type: String,
        default: 'left'
    }
});
const emit = defineEmits(['change']);
const selectValue = ref(props.defaultTextAlign);

const changeTextAlign = (value) => {
    emit('change', value);
};
</script>

<style>

</style>