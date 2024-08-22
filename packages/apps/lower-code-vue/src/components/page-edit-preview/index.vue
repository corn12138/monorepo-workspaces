<template>
  <!-- 这是中间的 组件堆叠起来的样式 -->
  <iframe id="edit_preview_iframe_ref" src="/edit/preview/:page_id" class="child-iframe" />
</template>

<script setup>
// 通过useStore获取store对象
import { computed, onMounted, onUnmounted, watch, toRaw } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const previews = computed(() => store.state.lowerCode);
let listpreviews = computed(() => store.state.lowerCode.components);

//  
let childIframeWin = null;

watch(listpreviews, (newVal) => {
  // 通过postMessage将数据传递给子iframe
  if (childIframeWin) {
    let lista = JSON.parse(JSON.stringify(toRaw(newVal)));
    console.log(lista, "我是page-edit-preview--->watch监听到的数据");
    childIframeWin.postMessage({ message: "onCreateComponent", data: lista });
  }
});

async function onSelectComponent(item) {
  console.log(item, "onSelectComponent");
  console.log("我是page-edit-preview ---收到选择组件的信息", item);
  await store.dispacth('lowerCode/setCurrentComponentId', item._id);
}
onMounted(() => {
  // 获取iframe的window对象
  const iframes = document.getElementById('edit_preview_iframe_ref');
  //将iframe的window对象赋值给childIframeWin
  childIframeWin = iframes?.contentWindow;
  console.log("我是page-edit-preview--->childIframeWin", childIframeWin);
  // 通过postMessage将数据传递给子iframe
  if (childIframeWin) {
    // setTimeout是为了确保iframe加载完成
    setTimeout(() => {
      childIframeWin.postMessage({ message: "init", data: null });
    }, 600);
  }
  // 监听子iframe传递过来的数据
  window.addEventListener('message', (event) => {
    if (event.data) {
      const { message, data } = event.data;
      // 根据子iframe传递过来的数据做相应的处理
      switch (message) {
        case 'onSelectComponent':
          onSelectComponent(data);
          break;
        default:
          break;
      }
    }
  });
});

</script>

<style scoped>
.child-iframe {
  width: 100%;
  height: 100%;
  border: none;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>