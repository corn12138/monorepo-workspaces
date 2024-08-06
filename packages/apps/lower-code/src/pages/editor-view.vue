<template>
    <h1>编辑器中的预览，所见即所得</h1>
</template>
<script setup>
import { useStore, mapGetters, mapState } from 'vuex';
import { computed, onMounted, watch } from 'vue';

const store = useStore();
// const useList = computed(() => store.state.Permission.list);
watch(() => store.state.Permission.useList, (newVal, oldVal) => {
    console.log(newVal, oldVal, "watch")
}, { immediate: true });
const getstore = () => {
    // console.log(useList.value,"获取数据");
}
onMounted(() => {
    getstore();
    console.log("editor-view")
});
let useList = computed(() => store.state.Permission.useList);
console.log(useList.value, "useList")
</script>