<template>
  <div>
    <Transition name="fade">
        <div v-if="isvisible" class="fixed top-0 left-0 right-0 bottom-0 bg-black flex justify-center items-center z-1000">
            <div class="absolute w-full h-full bg-white p-5 rounded-md" @click="close">
                <div class="relative bg-white p-5 rounded-md z-10">
                    <!-- 使用slot 自定义内容 -->
                    <slot></slot>
                    <button @click="close">close</button>
                </div>
            </div>
        </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const isvisible = ref(true);

const open = () => {
    isvisible.value = true;
}
const close = () => {
    isvisible.value = false;
}
</script>

<style lang="less" scoped>
    .modal{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000; // z-index--
    }
    .modal-overlay{
        position: absolute;
        width: 100%;
        height: 100%;
        background: #fff;
        padding: 20px;
        border-radius: 5px;
    }
    .modal-content{
        position: relative;
        background: #fff;
        padding: 20px;
        border-radius: 5px;
        z-index: 10;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter-from, .fade-leave-to {
        opacity: 0;
    }
</style>