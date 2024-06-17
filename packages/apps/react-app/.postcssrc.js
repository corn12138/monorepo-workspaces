const { groups } = require("./colorCard")

module.exports = {
    "plugins": [
        "tailwindcss",
        "autoprefixer",
        require("postcss-nested"), //目的向代码嵌入 相应的功能
        require("postcss-nesting"), //目的向代码嵌入 相应的功能
        require("./themePlugin")({groups}), //自定义的postcss 插件
    ]
}