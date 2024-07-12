<template>
  <div class="bg-white">
    <div
      class="px-4 py-4 w-full bg-white fixed z-1029 border-2 border-red-100 border-solid left-0 top-0 flex justify-center mt-2">
      <div
        class="font-bold font-mono text-lg rounded-md ml-20 text-center hover:text-violet-600 active:text-violet-700 cursor-pointer"
        v-for="n in list" :key="n.value" @click="handleClick(n)">{{ n.label }}</div>
    </div>
    <div class="mt-32">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter, RouterView } from "vue-router"
// 定义list里的类型
interface obj {
  label: string,
  value: string,
  name: string
}
// router route
const router = useRouter();
const route = useRoute();

// 首页tab
const list = ref([{ label: '首页', value: '1', name: 'frontPage' }, { label: '好文翻译', value: '2', name: 'translation' }, { label: '存档', value: '3', name: 'archive' }, { label: '关于', value: '4', name: "about" }, { label: '登录', value: '5', name: "Login" },{label:'测试',value:"6",name:"testPage"}])

// 点击 跳转对应的页面
const handleClick = (item: obj) => {
  switch (item.label) {
    case "首页":
      router.push({
        name: item.name
      })
      break;
    case "好文翻译":
      router.push({
        name: item.name
      })
      break;
    case "存档":
      router.push({
        name: item.name
      })
      break;
    case "关于":
      router.push({
        name: item.name
      })
      break;
    case "登录":
      console.log(item.name, "<===========")
      router.push({
        name: item.name
      })
      break;
    case "测试":
      router.push({
        name: item.name
      })
      break;

    default:
      router.push({
        name: "frontPage"
      })
      break;
  }
}
</script>

<style></style>