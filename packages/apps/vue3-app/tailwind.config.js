/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,vue}",  // 调整这里以匹配你项目中的文件结构
  ],
  theme: {
    extend: {
      zIndex: {
        // 1000: '1000',
      },
    },
  },
  plugins: [],
}

