### 工程化webpack
 #### 1.模块化的诉求
 *预期：
    1.功能上：能够将散落的模块打包到一起
    2.场景上：支持过程中编译的集成 -es ts vue react
    3.拓扑化能力：能够支持不同类型的前端资源模块，以非一定链式的情况进行组织 

 * 面试题：主流工具？ gulp vs webapck的区别?
 webpack rollup vite grunt gulp ... 

 相同点：
    打包编译需求 ｜ 三方依赖引入 ｜ 自定义模块介入 ｜ 自动化可监听运行
 不同点：
    本质 - gulp 只会按照 开发者预定的模块任务流进行工作 ｜ webpack 深入到代码中，处理资源的关系
    配置 - 文件层级半自动 ｜ 自动
    使用方式 - 半自动 ｜ 自动
 
 *理解 -webpack重点
    1.webpack config
    2.webpack 核心流程
    3.loaders & plugins 

#### webpack 配置

```js
 // 1.初始化
 npm init
 npm i webpack webpack-cli --save-dev

 //2. 默认打包
 npx webpack
    //追问： 默认打包入口/出口？ 配置？ 文件化配置
    // npm run dev/serve/build ...
    // package.json ---配置 ｜ webpack.config.js --- 深入配置 | entry & output

// 3.主要配置
// entry ｜ output

// mode:
// production (启动内置的文件优化内容插件、打包速度偏慢)
// development(自动优化打包速度，添加一些调试辅助插件)
// none 最原始的打包

// plugins：
// 外部能力的扩充

//loader：
// 内部能力的延伸
// pitch loader
// loader 收集顺序和执行顺序

//分包
config.optiomization.splitChunks({
    chunks:"all",
    cacheGroups:{
    vendors:{
        name:"chunk-vendors",
        test:/[/]node_modules[/]/
    },
    echarts:{
        name:"chunk-vendors",
        test:/[/]node_modules[/]_?echarts(.*)/
    },
    commons:{ 
      name:"chunk-common",
        minChunks:2,
        priority:5 //优先级
        }
    }
})

// 4.打包产物
//  * 面试： webpack的打包产物有何特点？
//主入口 default 形式进行挂载
// __webpack_module_cache__ 模块缓存主储存
// __webpack_require__ 依赖模块封装

// 异步模块
    // 函数封装=>独立promise不在同步cache中，故不会一起加载

```

#### webpack的异步加载 - 异步分包
1.webpack 的 require.ensure()
2.ES6的 import()

#### 热更新 HMR
1. devServer =>runtime
2. 页面首次加载 =>websoket 连接

3. webpack监听到文件变化，增量构建=> hash事件
4. 浏览器接收事件，增量范围确认
5. 加载更新的模块
6. webpack回调执行代码变更后逻辑
7.finish