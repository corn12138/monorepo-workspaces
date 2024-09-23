const ora = require('ora');
const inquirer = require('inquirer');

const path = require('path');
const download = require('download-git-repo');
const { geRepoList, geTagList } = require('./http');
const chalk = require('chalk');

// 封装一个loading效果
async function wrapLoading(fn, message, ...args) {
    const spinner = ora(message); // 实例化ora
    spinner.start();
    try {
        const result = await fn(...args); // 执行传入的方法
        spinner.succeed(); // 成功
        return result;  // 返回执行结果
    } catch (error) {
        spinner.fail('Request failed, refetch...'); // 请求失败，重新请求
    }
}
// 
class Generator {
    constructor(name, targetDir) {
        this.name = name;
        this.targetDir = targetDir;
        this.downloadGitRepo = util.promisify(downloadGitRepo); // 将下载方法promise化
    }
    // 创建
    async create() {
        // 1.获取模板名称
        const repo = await this.getRepo();
        //   2 获取tag名称
        const tag = await this.getTag(repo);
        //  3.下载模板
        await this.download(repo, tag);
    }

    // 获取用户选择模板
    // 1. 从远程拉取模板数据
    // 2. 用户选择自己已有的模板名称
    // 3. 返回用户选择的结果
    async getRepo() {
        const repoList = await wrapLoading(geRepoList, 'waiting fetch template');
        if (!repoList) return; // 如果没有获取到数据

        const repos = repoList.data.map(item => item.name); // 获取到数据

        // 用户选择
        const { repo } = await inquirer.prompt({
            name: 'repo',
            type: 'list',
            choices: repos,
            message: 'Please choose a template to create project'
        });
        return repo;
    }
    // 获取用户选择的版本
    // 1. 远程拉取tag数据
    // 2. 用户选择自己需要的tag
    // 3. 返回用户选择的结果
    async getTag(repo) {
        const tags = await wrapLoading(geTagList, 'waiting fetch tag');
        if (!tags) return;
        const tagsList = tags.map(item => item.name);

        // const { tag } = await inquirer.prompt({
        //     name: 'tag',
        //     type: 'list',
        //     choices: tagsList,
        //     message: 'Please choose a tag to create project'
        // });

        return tagsList[0]; // 返回第一个tag
    }

    // 下载模板
    async download(repo, tag) {
        // 1.拼接下载地址
        const requestUrl = `http://api.github.com/orgs/FEcourseZone/${repo}${tag ? '#' + tag : ''}`;
        // 2. 把资源下载到某个路径
        await wrapLoading(
            this.downloadGitRepo,   // 下载方法
            'waiting download template',
            requestUrl,
            path.resolve(process.cwd(), this.targetDir) // 下载到当前目录
        );
        console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`);
    }
    // 下载git仓库
    downloadGitRepo(repo, target) {
        // 返回一个promise
        return new Promise((resolve, reject) => {
            download(repo, target, (err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
    }
}

module.exports = Generator;