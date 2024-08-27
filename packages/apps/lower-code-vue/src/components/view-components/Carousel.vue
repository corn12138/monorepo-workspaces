<template>
  <div>
    <el-carousel trigger="click" height="150px" v-if="data.settings.urls.length > 0">
      <template v-for="(item, index) of data.settings.urls" :key="item">
        <el-carousel-item>
          <img :src="item" v-if="item" />
          <div v-else class="carouser-placeholder">
            {{ index + 1 }}
          </div>
        </el-carousel-item>
      </template>
    </el-carousel>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps(['data']);

const count = ref(0);
</script>

<style scoped>
.carouser-placeholder {
  height: 150px;
  line-height: 150px;
  background-color: #475669;
  color: #999;
  text-align: center;
  font-size: 20px;
}
</style>