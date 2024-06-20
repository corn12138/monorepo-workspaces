// 构建一个自定义的 jwt的插件
import jwt from "jsonwebtoken"

const SALT = 'fengkuangxingqisi.vme50'

export const signature = (user) => jwt.sign(user, SALT, {
    expiresIn: "10h"
})


const verify = async (token) => {
    return new Promise((resolve, reject) => {
        if (token) {
            jwt.verify(token, SALT, (err, data) => {
                if (err) {
                    if (err.name === "tokenExprieError") {
                        resolve({
                            status: "failed",
                            error: "tokenExprieError"
                        });
                    } else {
                        resolve({
                            status: "failed",
                            error: "token 非法"
                        });
                    }
                } else {
                    resolve({
                        status: "success",
                        // error:"token is null"
                        data
                    })
                }
            })
        } else {
            resolve({
                status: "failed",
                error: "token is null"
            })
        }
    })
}

export const jwtVerify = (whiteList) => async (ctx, next) => {
    if (whiteList.includes(ctx.path)) {
        next(ctx);
    } else {
        // 这里开始鉴权的逻辑
        let token;
        try {
            token = ctx.request.header.authorization.split("Bearer ")[1]
        } catch (error) {
            const res = await verify(token);

            if (res.status === 'success') {
                next(ctx);
            } else {
                ctx.body = {
                    ...res, code: 401
                }
            }
        }
    }


}