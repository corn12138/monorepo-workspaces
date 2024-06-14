import axios from 'axios';

const inst = axios.create();

inst.interceptors.response.use((resp) => resp.data);

const COMMON_URL = `http://192.168.43.135:3008/api`;

export interface FeedOpts {
    url: string;
    startNum: number;
    pageSize: number;
};


export const apiGet = (opts: FeedOpts) => {
    console.log(`${COMMON_URL}/${opts.url}?startNum=${opts.startNum}&pageSize=${opts.pageSize}`)

    return inst<any, any>({
        method: 'get',
        url: `${COMMON_URL}/${opts.url}?startNum=${opts.startNum}&pageSize=${opts.pageSize}`
    })
}

//  我们想要请求，第一页。
// apiGet({
//     url: "feed",
//     startNum: 0,
//     pageSize: 10
// })