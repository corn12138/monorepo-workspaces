import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";
import e from "cors";

export default defineConfig({
    plugins: [react(), svgr({svgrOptions:{icon:true}})],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "c": path.resolve(__dirname, "./src/components"),
            "@assets": path.resolve(__dirname, "./src/assets"),
        },
    },
});

