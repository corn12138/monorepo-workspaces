<template>
  <div>
    <div class="config-title">图片配置</div>
    <div class="config-content">
      <div class="config-content-item flv">
        <div class="config-content-item-label" style="margin-bottom: 10px;">图片Url：</div>
        <ContentInput place-holder="请输入图片URL" :default-value="data.settings.url"
          @change="val => changeValue('url', val)" />
      </div>
    </div>
  </div>
</template>

<script setup>
import "./index.css"
import ContentInput from "@lc/content-input/index.vue";
// props 用于定义组件的属性
const props = defineProps(['data', 'change']);
// const props = {
//   data: {
//     type: Object,

//     default: () => { return {} }
//   },
//   change: {
//     type: Function,
//     default: () => { }
//   }
// }
const changeValue = (key, val) => {
  props.change(key, val);
}
</script>

<style></style>