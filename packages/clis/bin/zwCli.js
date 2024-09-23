#! /usr/bin/env node
const { program } = require('commander');

// 定义命令和参数
// creact 命令
program
    .command('create <app-name>')   // 命令名称
    .description('create a new project')  // 命令描述
    .option('-f, --force', 'overwrite target directory if it exist')  // 命令参数
    .action((name, options) => {  // 命令执行的操作
        console.log(name, options.force);
        require('../lib/create')(name, options);
    });

program.parse(process.argv);  // 解析命令行参数



// 如何给到用户的提示？
// 如何主流程的开启
// 如何进行参数的传递