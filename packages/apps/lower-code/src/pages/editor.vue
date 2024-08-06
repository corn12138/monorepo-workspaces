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
                <Preview></Preview>
            </div>
            <div class="config"><Config
            ></Config></div>
        </div>
    </div>
</template>

<script setup>
import Header from '@c/page-edit-header/index.vue';
import Tools from '@c/page-edit-tools/index.vue';
import Preview from '@c/page-edit-preview/index.vue';
import Config from '@c/page-edit-config/index.vue';
import { ref, computed } from 'vue';
// import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
const store = useStore();
const count = ref(0);
// let usersName = computed(()=>store);
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