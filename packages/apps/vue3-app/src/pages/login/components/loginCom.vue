<script setup lang="ts">
interface objs {
  userName?: string;
  passwords?: string;
  a?:string
}
import { ref, watch, computed, onMounted, reactive, Ref } from 'vue'
import { TransitionRoot } from "@headlessui/vue";
import loginForm from "./loginForm.vue"
const isActive = ref(true);

let updateName = ref({})

let zidingyiobj = reactive<objs>({})

const zidingyiobj1 = (val:objs)=>{
  //zidingyiobj = val  //如此赋值 不会追踪 页面展示不出来
  Object.assign(zidingyiobj,val)  //保持数据响应式
  console.log(zidingyiobj.a,"asdsweefffff")
}
const handleClick = () => {
  isActive.value = !isActive.value;
  setTimeout(() => {
    isActive.value = true;
  }, 500);
};

onMounted(() => {
  console.log(updateName, "<-==========")
});
watch([updateName], (newName, oldName) => {
  console.log(newName, oldName, "<wcs")

})
</script>

<template>
  <div>
    <div class="grid place-items-center">
      <div class="h-32 w-32">
        <TransitionRoot appear :show="isActive" as="loginForm" enter="transform transition duration-[400ms]"
          enter-from="opacity-0 rotate-[-120deg] scale-50" enter-to="opacity-100 rotate-[0] scale-0"
          leave="transform transition duration-200 ease-in-out" leave-from="opacity-100 rotate-0 scale-100"
          leave-to="opacity-0 scale-95">
          <!--          <div class="h-full w-full rounded-md bg-cyan-500 shadow-orange-500"></div>-->
          <div>
            <loginForm v-model="updateName" v-model:objtest="zidingyiobj" @zidingyiobj1="zidingyiobj1">
              <template v-slot:footerbtn>
                <div>
                  <button @click="handleClick"
                    class="w-full mt-8 transform rounded-full bg-emerald-500/20 px-3 py-3 font-medium transition hover:scale-95 hover:bg-cyan-500/20 focus:outline-none active:bg-violet-600 text-2xl text-center text-gray-50">
                    登录
                  </button>
                </div>
              </template>
            </loginForm>
          </div>
        </TransitionRoot>
      </div>
      <div class="bg-fuchsia-500">{{ updateName + "asdsadsad" }}</div>
      <div>{{ updateName }}</div>
      <div class="bg-red-500">{{ zidingyiobj.a }}</div>
    </div>
  </div>
</template>

<style scoped></style>