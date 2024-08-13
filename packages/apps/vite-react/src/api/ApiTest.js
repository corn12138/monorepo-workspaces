import request from "../utils/request";

export const getApiTest = async (url, data, method = "post", responseType = 'json') => {
    const config = {
        url: url,
        method: method,
        responseType: responseType,
    };
    // 判断请求方式
    if (method.toLocaleLowerCase() === 'get') {
        config.params = data;
    } else {
        config.data = data;
    }
    // 发送请求
    const response = await request(config);
    return response;
}