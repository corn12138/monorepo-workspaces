<template>
  <div class="page_edit_content_tools">
    <div class="_content_tools_inner fl fl_jc_sb fl_ai_c fl_warp">
        <template v-for="item in toolsList" :key="item.title">
            <img :src="item.icon" class="_content_tools_item_icon" />
            <span>{{ item.title }}</span>
            <span class=""> 0/{{ item.limit }}</span>
        </template>
    </div>
  </div>
</template>

<script setup>
const toolsList = [
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
];
</script>

<style scoped>
._content_tools_inner {
    padding: 5px 10px;
}
._content_tools_item:hover {
    background-color: #155bd4;
    color: #fff;
}
._content_tools_item_icon{
    width: 20px;
    height: 20px;
}
</style>