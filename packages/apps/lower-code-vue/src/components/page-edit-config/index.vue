<template>
    <!-- <h1>编辑器配置组件属性的地方</h1> -->
    <component v-if="currentComponent && currentComponent.configComponentName"
        :is="components[currentComponent.configComponentName]" :data="currentComponent" :change="onSettubgsChange" />
</template>

<script setup>
import TitleTextConfig from '@c/config-components/TitleTextConfig.vue'; //标题文本配置
import ImageConfig from '@c/config-components/ImageConfig.vue'; //图片配置
import SpaceConfig from '@c/config-components/SpaceConfig.vue'; //留白配置
import CarouselConfig from '../config-components/CarouselConfig.vue'; //轮播配置
// 组件
const components = {
    TitleTextConfig,
    ImageConfig,
    SpaceConfig,
    CarouselConfig
};
import { ref, watch, toRaw, computed } from 'vue';
import { useStore } from 'vuex';
import _ from 'lodash';
const store = useStore();
const configStore = computed(() => store.state.lowerCode);
const currentComponent = ref(null);    // 当前组件
// 当前组件的数据
function getCurrentComponent(newVal) {
    if (configStore.value.components.length > 0) {
        const stateRC = [].concat(toRaw(configStore.value.components));
        stateRC.forEach((item) => {
            if (item._id === newVal) {
                console.log(item, "这是一个标题文本")
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
    console.log('page-edit-config--->onSettubgsChange', key);
    if (_.isArray(key)) {
        currentComponent.value.settings[key[0]][key[1]] = val;
    } else if (_.isString(key)) {
        currentComponent.value.settings[key] = val;
    }
}   
</script>
<style scoped></style>