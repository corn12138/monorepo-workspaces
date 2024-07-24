import axios from 'axios';

const inst = axios.create();

inst.interceptors.response.use((resp) => resp.data);

const COMMON_URL = `http://192.168.43.215:4000/api`;

export interface FeedOpts {
    url: string;
    startNum: number;
    pageSize: number;
};
export interface TestOpts {
    url?:string
}

export const apiGet = (opts: FeedOpts) => {
    console.log(`${COMMON_URL}/${opts.url}?startNum=${opts.startNum}&pageSize=${opts.pageSize}`)

    return inst<any, any>({
        method: 'get',
        url: `${COMMON_URL}/${opts.url}?startNum=${opts.startNum}&pageSize=${opts.pageSize}`
    })
}
// 模拟测试 rudex 的异步存储的
export const apiPost=(opts:TestOpts)=>{
    return inst<any,any>({
        method:"post",
        url:`${COMMON_URL}/${opts.url}`
    })
}

