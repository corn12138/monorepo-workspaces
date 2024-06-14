# ValidCore

- 一个标准的 plugin ，预期的形式

## 标准能力

### 默阶段

 status : "stepInfo", "stepValid", "stepPost"

### 默认插件

 phoneValidPlugin,postUrlPlugin


 #### phoneValidPlugin
 参数1：执行阶段
 参数2：正则规则

 #### postUrlPlugin
 参数1：执行阶段
 参数2：提交地址


## 使用api 

### addPlugin

#### 插件形式：
1.promise 的形式
2.正常函数的形式

ctx 是什么？

### usePlugins

### run







 // plugin的标准，由 谁开发core 谁就可以 定义

//
/**

- 1. 所有的plugin 必须是promise的形式
- --第一个参数，是上下文，全局生效 ctx （compliation）
- --第二个参数，是一个插件可选参数，在使用特定插件时 进行传入
-

 */
