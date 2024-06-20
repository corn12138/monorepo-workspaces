// JWT   本质是一个三段的 base64  
// header  playload  hader,playload

const crypto = require("crypto");  //

//加密签名
function sign(playload, salt) {

    let header = { alg: "HS256", type: "JWT" };
    const tokenArr = [];

    tokenArr.push(base64urlEncode(JSON.stringify(header)));

    tokenArr.push(base64urlEncode(JSON.stringify(playload)));

    const signature = encryption(tokenArr.join("."), salt);

    return [...tokenArr, signature].join(".")

}

// 解码
function verfy(token, salt) {
    const [header, payload, signature] = token.split(".");
    const newSignature = encryption(header + "." + payload, salt);
    return newSignature === signature;
}

// 转base64
function base64urlEncode(str) {
    return Buffer.from(str).toString("base64");
}

// 加密
function encryption(value, salt) {
    return crypto.createHmac("SHA256", salt).update(value).digest("base64")

}


console.log(sign({ name: "luyi" }, "xwjyujiusha"))

console.log(verfy('eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ==.eyJuYW1lIjoibHV5aSJ9.ErBX6cwpNyLhQ6AYYlyFuTChUmRH4u8m+uFbGCytlQU=', 'xwjyujiusha'))