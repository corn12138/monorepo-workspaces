<template>
<!--  <div class="mx-auto my-0 w-1/2" >-->
<!--    <h1 class="text-center">这是首页</h1>-->
<!--    <div class="text-red-900 text-center">头部</div>-->
<!--    <div></div>-->
<!--  </div>-->
  <div ref="ld" class="grid justify-center bg-lime-700">
    水平居中01
  </div>
  <div class="flex justify-center bg-emerald-500">
    水平居中02
  </div>
  <div class="w-1/2 mx-auto my-0 flex justify-center bg-violet-600">水平居中3</div>
  
</template>

<script setup lang="ts">
import { ref,onMounted } from 'vue';
const ld = ref(null);

onMounted(()=>{
  console.log(ld.value,"cc")
})

</script>

<style></style>