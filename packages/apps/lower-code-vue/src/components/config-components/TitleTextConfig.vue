<template>
  <div>
    <div class="config-title">标题文本配置</div>
    {{ data.settings }}
    <div class="config-content">
      <div class="config-content-item fl fl_jc_sb">
        <input type="text" :value="data.settings.content" @input="e => changeValue('content', e.target.value)" />
      </div>
      <div class="config-content-item fl fl_jc_sb">
        <span class="config-content-item-label">字号
        </span>
        <span>
          <FontSizeInput :fontSize="data.settings.style.fontSize" @change="val => changeValue('style.fontSize', val)" />
        </span>
      </div>
      <div class="config-content-item fl fl_jc_sb">
        <span class="config-content-item-label">
          文本方向：
        </span>
        <span>
          <FontSizeInput :fontSize="data.settings.style.fontSize" @change="val => changeValue('style.fontSize', val)" />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import FontSizeInput from '@lc/font-size-input/index.vue';
import './index.css';
const props = defineProps(['data', 'change']); // 定义组件的属性
const changeValue = (key, val) => {
  props.change(key, val); // 触发父组件的change事件
}
</script>

<style></style>