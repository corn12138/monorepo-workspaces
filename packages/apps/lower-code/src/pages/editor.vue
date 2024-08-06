<template>
    <div>
        <div class="header">
            <Header />
        </div>
        <div class="fl body">
            <div class="tool">
                <Tools></Tools>
            </div>
            <div class="preview fl fl_jc_c">
                <!-- <Preview></Preview> -->
            </div>
            <div class="config"><Config
            ></Config></div>
        </div>
    </div>
</template>

<script setup>
import Header from '@c/page-edit-header/index.vue';
import Tools from '@c/page-edit-tools/index.vue';
// import Preview from '@c/page-edit-preview/index.vue';
import Config from '@c/page-edit-config/index.vue';
import { ref, computed, reactive } from 'vue';
// import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
const store = useStore();
const count = ref(0);
const lists = reactive({
    toolsList: [
        {
            icon: "/images/title_text.svg",
            title: "标题文本",
            limit: 100,
            componentName: "TitleText",
            componentSchema: {
                name: "标题文本",
                componentName: "TitleText",
                configName: "TitleTextConfig",
                settings: {
                    content: "这是一个标题文本",
                    style: {
                        textAlign: "left",
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "#333" // 完全符合style css属性驼峰书写
                    }
                }
            }
        },
        {
            icon: "/images/image.svg",
            title: "图片",
            limit: 500,
            componentName: "Image",
            componentSchema: {
                name: "图片",
                componentName: "Image",
                configName: "ImageConfig",
                settings: {
                    content: "",
                    style: {
                        backgroundPosition: "" // 完全符合style css属性驼峰书写
                    }
                }
            }
        },
    ]
});
store.dispatch('Permission/setUserList',lists.toolsList);
console.log(store.state.User, "store")
</script>

<style scoped>
.header {
    height:58px;
    padding: 0 16px;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
}   
.body {
    height: calc(100vh - 58px);
}
.tool {
    width: 200px;
    border-right: 1px solid rgba(0, 0, 0, .1);
}
.preview {
    flex: 1;
    background-color: #f7f8f9;
}
.config {
    width: 375px;
   
}
</style>