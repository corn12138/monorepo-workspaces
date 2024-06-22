<script setup lang="ts">
  import {ref,watch,computed,onMounted} from 'vue'
  import {TransitionRoot} from "@headlessui/vue";
  import  loginForm from "./loginForm.vue"
  const isActive = ref(true);

  const handleClick = ()=>{
    isActive.value = !isActive.value;
    setTimeout(()=>{
      isActive.value = true;
    },500);
  };
</script>

<template>
  <div>
    <div class="grid place-items-center">
      <div class="h-32 w-32">
        <TransitionRoot
            appear
            :show="isActive"
            as="loginForm"
            enter="transform transition duration-[400ms]"
            enter-from="opacity-0 rotate-[-120deg] scale-50"
            enter-to="opacity-100 rotate-[0] scale-0"
            leave="transform transition duration-200 ease-in-out"
            leave-from="opacity-100 rotate-0 scale-100"
            leave-to="opacity-0 scale-95"
        >
<!--          <div class="h-full w-full rounded-md bg-cyan-500 shadow-orange-500"></div>-->
          <div>
            <loginForm></loginForm>
          </div>
        </TransitionRoot>
      </div>
      <div>
        <button @click="handleClick" class="w-full mt-8 flex transform items-center rounded-full bg-emerald-500/20 px-3 py-3 text-sm font-medium transition hover:scale-95 hover:bg-cyan-500/20 focus:outline-none active:bg-violet-600 text-2xl text-center text-teal-700">
        登录
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>