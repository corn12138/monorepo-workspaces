<template>
    <div class="page_edit_content_tools">
        <div class="_content_tools_inner fl fl_jc_sb fl_ai_c fl_wrap">
            <template v-for="item of toolsList" :key="item.title">
                <div class="_content_tools_item flv fl_ai_c" @click="() => {
                        console.log('添加组件---》》》》》', item.componentSchema);
                        addComponent(item.componentSchema);
                    }
                    ">
                    <img :src="item.icon" class="_content_tools_item_icon" />
                    <span>{{ item.title }}</span>
                    <span class=""> {{ pageConfigs.count[item.componentName] ?? 0 }}/{{ item.limit }}</span>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
import { getUuid } from '../../utils/uuid';
import _ from 'lodash';
//  使用vuex
const stote = useStore();
//  获取vuex中的state
const pageConfigs = computed(() => stote.state.lowerCode);
console.log('pageConfigs', pageConfigs.count);
//  我先在这里定义了一个工具列表，后续会从vuex中获取
import { toolsList } from "@/assets/js/list.js"
//  添加组件
const addComponent = async (item) => {

    // const componentItem = Object.assign({}, item);
    const componentItem = _.cloneDeep(item); //  这里是深拷贝
    const uuid = getUuid();
    //  这里是将组件添加到vuex中
    componentItem._id = uuid;
    //  这里是将组件添加到vuex中
    await stote.dispatch('lowerCode/setComponents', [...pageConfigs.value.components, componentItem]);
    //将id添加到vuex中
    await stote.dispatch('lowerCode/setCurrentComponentId', uuid);
    //  如果在vuex中有这个组件的计数，就加1，没有就设置为1 --目的是为了区分组件
    if (pageConfigs.value.count && pageConfigs.value.count[componentItem.componentName]) {
        await stote.dispatch('lowerCode/setCount', { ...pageConfigs.value.count, [componentItem.componentName]: pageConfigs.value.count[componentItem.componentName] + 1 });


    } else {
        await stote.dispatch('lowerCode/setCount', { ...pageConfigs.value.count, [componentItem.componentName]: 1 });
    }
};
</script>

<style scoped>
._content_tools_inner {
    padding: 5px 10px;
}

._content_tools_item {
    height: 80px;
    width: 80px;
    padding: 6px;
    cursor: pointer;
    margin-top: 20px;
}

._content_tools_item:hover {
    background-color: #155bd4;
    color: #fff;
}

._content_tools_item_icon {
    width: 32px;
    height: 32px;
}
</style>