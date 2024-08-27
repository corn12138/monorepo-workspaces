<template>
  <div>
    <div class="config-title">标题文本配置</div>

    <div class="config-content">
      <div class="config-content-item flv">
        <div class="config-content-item-label" style="margin-bottom: 10px;">
          文本内容：
        </div>
        <ContentInput place-holder="请输入文本内容" :default-value="data.settings.text"
          @change="val => changeValue('content', val)" /> <!-- ContentInput组件 -->
      </div>
      <div class="config-content-item fl fl_jc_sb fl_ai_c">
        <span class="config-content-item-label">字号：
        </span>
        <span>
          <FontSizeInput :fontSize="data.settings.style.fontSize"
            @change="val => changeValue(['style.fontSize'], val)" />
        </span>
      </div>
      <div class="config-content-item fl fl_jc_sb fl_ai_c">
        <span class="config-content-item-label">
          文本方向：
        </span>
        <span>
          <TextAlignSelector :default-value="data.settings.style.textAlign"
            @change="val => changeValue(['style.fontSize'], val)" />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import FontSizeInput from '@lc/font-size-input/index.vue';
import TextAlignSelector from '@lc/text-align-selector/index.vue';
import ContentInput from '@lc/content-input/index.vue';
import './index.css';
const props = defineProps(['data', 'change']); // 定义组件的属性
const changeValue = (key, val) => {
  props.change(key, val); // 触发父组件的change事件
}
</script>

<style></style>