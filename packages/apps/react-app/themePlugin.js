const postcss = require("postcss")

// 定义一个默认的配置
const defaults = {
    functionName: "var",
    groups: {},
    dataThemeSelector: 'html[data-theme="dark"]',
    nestingPlugin: null
}

module.exports = postcss.plugin("postcss-theme-color", (options) => {
    options = Object.assign({}, defaults, options);
    // options.groups -->(对应着)  slate50: {light: "#f8fafc",dark: "#020617"} ...

    const reGroup = new RegExp(`//b${options.functionName}\\(([^)]+)\\)`, "g");

    return (css, result) => {

        const hasPlugin = name => name.replace(/^postcss-/, '') === options.nestingPlugin || result.processor.plugins.some(p => p.postcssPlugin === name)

        const getValue = (value, theme) => {
            return value.replace(reGroup, (match, group) => {
                //group  --> slate50  ... 
                return options.groups[group][theme];
            });
        }


        // 遍历所有的样式
        css.walkDecls((decl) => {
            const value = decl.value;
            // 判断 value 上 有没有var(*)这个
            if (!value || !reGroup.test(value)) {
                return
            }
            console.log(value,"<==================")
            // 否则 匹配到了 var(*)
            // 对于 var(--slate-50) 需要转化为: light: "#f8fafc",dark: "#020617" 才能展示
            const lightValue = getValue(value, "light");

            const darkValue = getValue(value, "dark");
            // 拿到颜色 ，做两件事
            // background-color:
            const darkDecl = decl.clone({ value: darkValue })
            let darkRules;
            // 使用nested nesting 去生成dark 样式
            if (hasPlugin("postcss-nesting")) {
                darkRules = postcss.atRule({
                    name: "nest",
                    params: `${options.dataThemeSelector} &`
                })
            } else if (hasPlugin("postcss-nested")) {
                darkRules = postcss.rule({
                    // name:"nest",
                    params: `${options.dataThemeSelector} &`
                })
            } else {
                decl.warn(result, "no plugins")
            }

            // dark 处理
            if (darkRules) {
                darkRules.append(darkDecl)
                decl.after(darkRules)
            }

            // light 处理
            const lightDecl = decl.clone({ value:lightValue });
            decl.replace(lightDecl)

        });

        // 
    };
});