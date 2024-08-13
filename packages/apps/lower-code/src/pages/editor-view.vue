<template>
    <!-- <h1>编辑器中的预览，所见即所得</h1> -->
    <div class="view-container">
        <template v-for="item of storeList" :key="item._id">
            <div class="component-place"
                :class="{ current: storeState.currentComponentId && storeState.currentComponentId === item._id }">
                <div class="select-box"></div>
                <component :is="item.componentName" :data="item" @click="selectComponent(item._id)" />
            </div>
        </template>
    </div>
</template>

<script>
import TitleText from '@c/view-components/TitleText.vue';
import Image from '@c/view-components/Image.vue';

export default {
    components: {
        TitleText,
        Image
    }
}
</script>

<script setup>
import { useStore } from 'vuex';
import { computed, onMounted, watch } from 'vue';

const store = useStore();
const storeState = computed(() => store.state.lowerCode);
//  获取vuex中的state
const storeList = computed(() => store.getters['lowerCode/getComponents']);



//
let parent = null;
const selectComponent = async (_id) => {
    await store.dispatch('lowerCode/setCurrentComponentId', _id);
    // storeState.currentComponentId = _id;
    if (parent) {
        parent.postMessage({ message: 'onSelectComponent', data: { _id } })
    }
}

const syncState = async (data) => {
    await store.dispatch('lowerCode/setComponents', [...storeState.value.components, ...data]);
    await store.dispatch('lowerCode/setCurrentComponentId', data[data.length - 1]._id);
}

onMounted(() => {
    window.addEventListener("message", (event) => {
        parent = event.source;
        if (event.data) {
            const { message, data } = event.data;
            switch (message) {
                case "onCreateComponent":
                    console.log(data, "我是editor-view--->onCreateComponent");
                    syncState(data);
                    break;
                default:
                    break;
            }
        }
    });

});
</script>
<style>
#root {
    display: flex;
    justify-content: center;
    height: 100%;
}
</style>
<style scoped>
.view-container {
    width: 375px;
    height: 450px;
    border: 1px solid rgba(0, 0, 0, .3);
    position: relative;
    margin-top: 20px;
}

.component-place {
    width: 100%;
    height: auto;
    box-sizing: content-box;
    position: relative;
}

.select-box {
    width: calc(100% + 4px);
    height: 100%;
    box-sizing: border-box;
    position: absolute;
    top: -2px;
    left: -2px;
    border: 2px solid #409eff;
    display: none;
}

.component-place.current .select-box {
    display: block;
}
</style>