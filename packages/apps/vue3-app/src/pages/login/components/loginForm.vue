<!--这是登录表单-->
<script setup lang="ts">
import { computed, ref, watch, reactive } from "vue";
interface objs {
  userName?: string;
  passwords?: string;
  a?: string
}
let obj = reactive<objs>({ userName: '', passwords: "" })
let objtest = reactive<objs>({ a: "", userName: '', passwords: "" })

const emit = defineEmits<{
  'update:modelValue': [obj: objs],
  // (e: 'update:modelValue', value: objs): void,  //使用默认的 实现 父子组件的 emit 
  'zidingyiobj1': [objtest: objs]
}>()


const add = () => {
  emit("update:modelValue", obj)
}

const zidingyiobj1 = () => {
  emit("zidingyiobj1", objtest)
}

</script>

<template>
  <div class="grid place-items-center">
    <div class=" mt-80 max-w-lg border border-solid border-sky-600 h-max px-6 py-6 rounded-md bg-sky-600">
      <header>
        <h2 class="text-center font-bold text-2xl text-gray-50 w-full">登录页</h2>
      </header>
      <main>
        <form>
          <form>
            <label for="name">用户名</label>
            <input type="text"
              class="w-64 box-border rounded-md border-solid bg-slate-300 mb-8 focus:bg-white py-2 px-1"
              v-model="obj.userName" @input="add" placeholder="请输入用户名" />
          </form>
          <form>
            <label for="name">密码</label>
            <input type="password" class="w-64 box-border rounded-md border-solid bg-slate-300 focus:bg-white py-2 px-1"
              v-model="obj.passwords" @input="add" placeholder="请输入密码" />
          </form>
          <form>
            <label for="name">tset</label>
            <input type="text" class="w-64 box-border rounded-md border-solid bg-slate-300 focus:bg-white py-2 px-1"
              v-model="objtest.a" @input="zidingyiobj1" placeholder="请输入密码" />
          </form>
        </form>
      </main>
      <footer>
        <button
          class="w-full mx-1 rounded-full box-border text-center text-2xl hover:bg-emerald-500/20 focus:outline-none active:bg-amber-600 bg-amber-600 mt-7">点击登录</button>
        <slot name="footerbtn"></slot>
      </footer>
    </div>
  </div>
</template>

<style scoped></style>