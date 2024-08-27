<template>
    <div>
      <div class="config-title">图片配置</div>
      <div class="config-content">{{ data.settings }}</div>
    </div>
  </template>
  
  <script setup>
  import "./index.css"

  // props 用于定义组件的属性
  const props = defineProps(['data','change']);
  </script>
  
  <style>
  
  </style>