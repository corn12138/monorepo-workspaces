import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';


export default defineConfig({
    // 配置插件  用于解析 .vue 文件
    plugins: [vue()],
    resolve: {  // 配置别名 
        alias: {
            '@': '/src',
            "@c": '/src/components',
            '@lc':'/src/components/lc'
        }
    },
    server: {  // 配置服务
        host: "0.0.0.0", // 主机 
        port: 9004, // 端口
        open: true, // 自动打开浏览器
        // proxy: {  // 代理
        //     '/api': {
        //         target: 'http://localhost:3000',
        //         changeOrigin: true,
        //         rewrite: (path) => path.replace(/^\/api/, '')
        //     }
        // }
    }
});