# store

- 在 localstorage 或者sessionstorage 存储一些数据

 ```js
const valStr = window.localstorage.getItem("key");
let val;

try {

val = JSON.parse(valStr)

} catch (error){
//...  error
}

if(val&& val instanceof Array){
    val.push("xxx");

}
const newValStr = JSON.stringfy(val);

window.localstorage.setItem(newValStr);

 ```

 ---写一个库，非常简单的Api
 
 ```js
 
const store = CreateLocalStore();
store.push("key","values");
store.get("key");

 ```
