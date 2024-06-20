//

import { signature } from "../utils/jwt";

export default class UserService {


    async validate({ username, password }) {
        console.log(username,password,"<=======")
        if (username && password) {
            //走 SQL的逻辑
            if (username === 'luyi') {
                if (password === '123456') {
                    const token = signature({ username });
                    return {
                        code: 200,
                        msg: '登录成功',
                        status: "success",
                        data: {
                            token
                        }
                    }
                };
                return {
                    code: 200,
                    msg: "密码不正确",
                    status: "failed"
                };
            };
            return {
                code: 200,
                msg: "账号未注册",
                status: "failed"
            };
        };
        return {
            code: 200,
            msg: "账号密码未填写",
            status: "failed"
        };
    }
};