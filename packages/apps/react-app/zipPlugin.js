// 先下载一个 jszip 和 webpack-sources 插件 --- 自定义的这个插件的目的是 将打包的产物自动 压缩一下

const JSZip = require("jszip");
const { RawSource } = require("webpack-sources");

/**
 * 在我的 webpack 最后的输出产物之前，我把文件压缩好 和其他文件一起输出；
 */
class ZipPlugin {
    constructor(options) {
        this.options = options;
    };

    // tapabel
    apply(compiler) {
        let context = this;
        compiler.hooks.emit.tapAsync("zipPlugin", (compilation, callback) => {

            const assets = compilation.assets;

            const zip = new JSZip();

            // emit 阶段，生成代码的阶段，所以我能拿到 所有待生成的文件
            Object.keys(assets).forEach((filename) => {
                const source = assets[filename].source();
                zip.file(filename, source);
            });

            zip.generateAsync({ type: "nodebuffer" }).then(res => {
                compilation.assets[context.options.filename] = new RawSource(res);
                callback();
            });

        }); //tapAsync 异步插件
    }
};

module.exports = ZipPlugin;