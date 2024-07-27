<template>
    <div>
        <div class="grid place-items-center">
            <button class="w-16 border rounded-lg border-solid border-orange-400 hover:bg-green-500"
                @click="pluses">plus</button>

            <div>{{ count }}</div>
        </div>
        <div>
            <Modal>
                测试
            </Modal>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed,watch,onMounted} from 'vue';

import Modal from '@/components/modal/index.vue';

let count = ref<number>(1);
let price = ref<number>(0);
let incle = ref<number>(0);

const pluses = () => {

    price.value = ++price.value;
    incle.value = ++incle.value;
    console.log(price.value, incle.value)
    // 将计算属性的值赋给 count.value
    count.value = iscomp.value;
    console.log(iscomp.value)
}

const iscomp = computed(() => price.value * incle.value);




</script>

<style></style>