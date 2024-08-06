const mongo = require('./mongo');

mongo.tryConnect().then((_: any) => { require("./server") }).catch((err: any) => console.log(err))