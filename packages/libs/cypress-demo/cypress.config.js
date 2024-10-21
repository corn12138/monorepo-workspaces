const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // 在这里实现节点事件监听器
    },
    // 您可以在这里添加更多配置选项
    baseUrl: 'http://localhost:3000', // 根据您的项目实际情况设置
  },
});