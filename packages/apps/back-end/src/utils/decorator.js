export const RequestMethod = {
    GET:"get",
    POST:"post",
    PUT:"put",
    DELETE:"delete",
    OPTIONS:"options",
}

export const controllers = [];

export function Controller(prefix =''){
    return function(target){
        target.prefix = prefix;
    }
}

export function RequestMapping(method = "",url = "") {
    return function (target,proKey,descriptor){
        let path = url || `\${proKey}`;
        const item = {
            path,
            method,
            handler:target[proKey], //函数体
            constructor:target.constructor
        }

        controllers.push(item);
    }
}