<template>
  <div>
    <div class="page_edit_header fl fl_jc_sb fl_ai_c">
        <router-link to="/">返回列表页</router-link>
        <div class="fl fl_ai_c">
            <div class="page_edit_header_btn">预览</div>
            <div class="page_edit_header_btn">保存</div>
            <div class="page_edit_header_btn primary" @click="publish">发布</div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const count = ref(0);

const publish = () => {
    console.log('发布');
}
</script>

<style scoped>
.page_edit_header {
    height: 100%;
    background-color: #fff;
}
.page_edit_header_btn {
    padding: 4px 12px;
    border: 1px solid #eee;
    border-radius: 4px;
    cursor: pointer;
    margin: 0 10px;
}
.page_edit_header_btn.primary {
    background-color: #409eff;
    color: #fff;
    border-color: #409eff;
}
</style>