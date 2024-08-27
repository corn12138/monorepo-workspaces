<template>
    <!-- <h1>编辑器配置组件属性的地方</h1> -->
    <component v-if="currentComponent && currentComponent.configComponentName"
        :is="currentComponent.configComponentName" :data="currentComponent" :change="onSettubgsChange" />
</template>

<script>
import TitleTextConfig
    from '@c/config-components/TitleTextConfig.vue';
import ImageConfig from '@c/config-components/ImageConfig.vue';
import { keys } from 'lodash';

export default {
    components: {
        TitleTextConfig,
        ImageConfig
    }
}

</script>
<script setup>
import { ref, watch, toRaw, computed } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const configStore = computed(() => store.state.lowerCode);
const currentComponent = ref(null);    // 当前组件
// 当前组件的数据
function getCurrentComponent(newVal) {
    if (configStore.value.components.length > 0) {
        const stateRC = toRaw(configStore.value.components);
        stateRC.forEach((item) => {
            if (item._id === newVal) {
                console.log(item,"这是一个标题文本")
                currentComponent.value = Object.assign({}, item);
                return;
            }
        });
    }
}
// 监听当前componentId的变化--->获取当前组件的数据
watch(() => configStore.value.currentComponentId, (newVal, oldVal) => {
    if (newVal && newVal !== oldVal) {
        getCurrentComponent(newVal);
    }
});
// 监听当前组件的数据变化
function onSettubgsChange(key, val) {
    console.log('page-edit-config--->onSettubgsChange', key, val);
    currentComponent.value.settings[key] = val;
}   
</script>
<style scoped></style>