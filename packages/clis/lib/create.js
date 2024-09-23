const path = require('path');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const Generator = require('./generator');
// 1. 对外抛出一个方法用来接收用户所需要传文件的项目&参数
moudules.exports = async function create(name, options) {
    // 判断项目是否存在
    const cwd = process.cwd(); // 获取当前命令执行时的工作目录
    const targetDir = path.join(cwd, name || '.'); // 目标目录

    // 判断目录是否已经存在
    if (fs.existsSync(targetDir)) {
        // 是否强制创建
        if (options.force) {
            await fs.remove(targetDir); // 移除已存在的目录
        } else {
            // 询问用户是否覆盖
            // 提示用户是否覆盖
            const { action } = await inquirer.prompt([
                {
                    // 询问类型
                    name: 'action',
                    type: 'list', // 询问类型为列表
                    message: 'Target directory already exists Pick an action:', // 提示用户选择
                    choices: [
                        { name: 'Overwrite', value: 'overwrite' },
                        { name: 'Cancel', value: false }
                    ]
                }
            ]);
            //  判断用户选择的是什么
            if (!action) {
                return;
            } else if (action === 'overwrite') {
                console.log('\nRemoving...');
                await fs.remove(targetDir);
            }
        }
    }

    //新建模板
    const generator = new Generator(name, targetDir); // 创建一个生成器
    generator.create(); // 开始创建
};