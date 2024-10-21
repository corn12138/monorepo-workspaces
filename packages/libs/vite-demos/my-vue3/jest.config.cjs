module.exports = {
    transform: {
      '^.+\\.vue$': '@vue/vue3-jest',      // 处理 .vue 文件
      '^.+\\.jsx?$': 'babel-jest',         // 处理 .js 和 .jsx 文件
      '^.+\\.tsx?$': 'ts-jest',            // 处理 .ts 和 .tsx 文件
    },
    moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node'],
    // testEnvironment: 'jest-environment-jsdom',// 测试环境
    transformIgnorePatterns: ['/node_modules/'],
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // 模拟样式文件
    },
    setupFilesAfterEnv: ['./jest.setup.js'], // 设置测试环境
  };