// 模拟创建一个异步的action ---- 实质就是存数据
import{addUser} from '../modules/userReducer';

//异步获取用户 并添加到action ---- Action 创建函数 异步
export function fetchUser(){
    return async(dispatch:any) => {
       const res =await fetch('https://json')
       const users = await res.json();
       users.forEach((user:string) => {
        // 这里调用同步的 action creactor  函数 
           dispatch(addUser(user));
       }); 
        
    }
}