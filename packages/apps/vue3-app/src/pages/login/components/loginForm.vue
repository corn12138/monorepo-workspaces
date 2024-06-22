<!--这是登录表单-->
<script setup lang="ts">
import {ref} from "vue";

let userName = ref("");
let passwords = ref(null);
</script>

<template>
  <div class="top-1/2 grid place-items-center">
    <header>
      <h2 class="text-center font-bold text-2xl text-emerald-600">登录页</h2>
    </header>
    <main>
      <form>
        <form-item label="用户名">
          <input type="text" class="w-64 box-border rounded-md border-solid" v-model="userName"  placeholder="请输入用户名"  />
        </form-item>
        <form-item label="密码">
          <input type="password" class="w-64 box-border rounded-md border-solid" v-model="passwords" placeholder="请输入密码" />
        </form-item>
      </form>
    </main>
    <footer>
      <button class="w-full mx-1 rounded-full box-border text-center text-2xl hover:bg-emerald-500/20 focus:outline-none active:bg-amber-600 bg-amber-600 px-1.5">点击登录</button>
    </footer>
  </div>
</template>

<style scoped>

</style>