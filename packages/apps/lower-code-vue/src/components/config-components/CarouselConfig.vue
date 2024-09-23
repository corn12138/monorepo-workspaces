<template>
    <div>
        <div class="config-title">轮播配置</div>
        <div class="config-content">
            <div class="config-content-item fl fl_jc_sb fl_ai_c" :style="styleString">
                <el-button size="small" :icon="Plus" @click="addUrlInput">新增url</el-button>
            </div>
            <div class="config-content-item" v-if="data.settings.urls && data.settings.urls.length > 0">
                <template v-for="(url, ind) of data?.settings?.urls" :key="ind">
                    <!-- key 使用ind v-model="urlValue[ind]" 可以避免重新渲染（也就避免了 输入一次就失去焦点） -->
                    <el-input v-model="urlValue[ind]" style="max-width: 600px;margin-bottom: 10px;"
                        placeholder="请输入图片地址" class="input-with-select" @input="(val) => setUrls(ind, val)">
                        <template #prepend>
                            <span>URL:</span>
                        </template>
                        <template #append>
                            <el-button :icon="Delete" @click="() => removeUrl(ind)">
                            </el-button>
                        </template>
                    </el-input>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
import './index.css'
import { ref, watch } from 'vue';
import { Delete, Plus } from '@element-plus/icons-vue'
import NumberInput from '@lc/number-input/index.vue';


const props = defineProps({
    data: {
        type: Object,
        default: () => {
            return {}
        }
    },
    change: {
        type: Function,
        default: () => { }
    }
});

const urlValue = ref(props.data.settings.urls || []); // urls
// 监听urlValue的变化
watch(urlValue.value, (newVal, oldVal) => {
    if (newVal.length === 0 || newVal.length > 4) { // 限制最多4个url
        urlValue.value = oldVal;
    }
    changeValue();
    console.log(newVal, "urlValue.value");

},{immediate: true});
//  修改urls
const changeValue = () => {
    props.change('urls', urlValue.value);
};
//  添加url
const addUrlInput = () => {
    urlValue.value.push('');
};
//  移除url
const removeUrl = (index) => {
    urlValue.value.splice(index, 1);// 删除url
};

//  修改url
const setUrls = (index, val) => {
    urlValue.value[index] = val; // 修改url

};  
</script>

<style></style>