<template>
  <div ref="containerRef" class="petal-container">
    <!-- 这里可以放置其他内容或组件 -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const containerRef = ref<HTMLElement | null>(null);

const createPetals = () => {
  if (containerRef.value) {
    const container = containerRef.value;
    setInterval(() => {
      const petal = document.createElement('div');
      petal.className = 'petal';

      // 随机生成一个颜色
      const color = `hsl(${Math.random() * 360}, 100%, 75%)`; // 使用 HSL 颜色模式
      petal.style.backgroundColor = color;

      container.appendChild(petal);

      // 设置动画持续时间和延迟
      petal.style.animationDuration = `${Math.random() * 3 + 2}s`;
      petal.style.animationDelay = `${Math.random() * 2}s`;

      // 动画结束后移除元素
      petal.addEventListener('animationend', () => {
        container.removeChild(petal);
      });
    }, 150);
  }
};

onMounted(() => {
  createPetals();
});
</script>

<style scoped lang="less">
@keyframes fall {
  0% { top: -50px; opacity: 1; } // 调整起始位置使花瓣可见
  100% { top: 100vh; opacity: 0; } // 确保花瓣完全离开视窗后消失
}

.petal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  pointer-events: none; // 防止花瓣干扰页面其他元素的交互
}

.petal {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 20px; // 增大花瓣尺寸以便更容易看到
  height: 20px;
  background-color: pink;
  border-radius: 50%;
  opacity: 1;
  animation-name: fall;
  animation-timing-function: linear;
  animation-iteration-count: 1; // 每个花瓣只下落一次
}
</style>
