console.log("hello world");
import createEle from "./create.js";

import('./console.js').then(res => {
    res.myLog('hello world');
});
import('./console2.js').then(res => {
    res.myLog2('hello world2');
});

const element = createEle()
document.body.append(element);