import { RequestMapping, Controller, RequestMethod } from "../utils/decorator";

@Controller("/book")
export default class BookController {
    @RequestMapping(RequestMethod.GET,"/all")
    async getAllBooks(ctx){
        return new Promise((resolve, reject) => {
            setTimeout(()=>{
                resolve("success")
            },1000);
        }).then(res=>{
            ctx.body = {
                data:['一秒学会前端',"一天精通web3"]
            }
        })
    }
    // 
    // async getFeed()
}

// 预期是 我访问 /book/all 的时候 就直接走到 getAllBooks 此函数
/**
 * router的本质 就是函数和地址对应的关系
 * 
 * router.get('/book/all', async (ctx)=>{
 * 
 *     return new Promise((resolve, reject) => {
            setTimeout(()=>{
                resolve("success")
            },1000);
        }).then(res=>{
            ctx.body = {
                data:['一秒学会前端',"一天精通web3"]
            }
        })
 * })

        所以， 装饰器 ，是帮我们在运行之前 做收集的。
 */