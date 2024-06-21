<template>
  <div>
    
    <div>

      <!-- <div
        class="font-bold font-mono text-lg rounded-md ml-20 text-center hover:text-violet-600 active:text-violet-700 cursor-pointer"
        v-for="n in list" :key="n.value" @click="handleClick(n)">{{ n.label }}</div>-->
    </div>
    <div class="mt-32">
      <h1 class="text-center mb-4 font-mono text-violet-900 text-xl">关于页</h1>
      
    </div>
    <csE></csE>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter, RouterView } from "vue-router"
import csE from './component/BalloonBlockEditor.vue'
// 定义list里的类型
interface obj {
  label: string,
  value: string,
  name: string
}
// router route
const router = useRouter();
const route = useRoute();
const list = ref([{ label: '气球块编辑器', value: '1', name: 'balloonBlockEditor' }]);

const handleClick = (item: obj) => {
  switch (item.label) {
    case "气球块编辑器":
      router.push({
        name: item.name
      })
      break;


    default:
      router.push({
        name: "balloonBlockEditor"
      })
      break;
  }
}
</script>

<style></style>