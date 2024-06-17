// 自定义的babel插件 (先下载一个 @babel/generator)  --- babel的插件是一个访问者模式

const generate = require("@babel/generator").default;

const consolePlugin = function ({ types }) {
    return {
        visitor: {
            CallExpression(path) {
                const name = generate(path.node.callee).code;
                if (['console.log', "console.warn", "console.error"].includes(name)) {
                    const { line, column } = path.node.loc.start;

                    path.node.arguments.unshift(types.stringLiteral(`filePath: ${line}:${column}--自定义的babel插件`))
                }
            }
        }
    }
}

module.exports = consolePlugin;