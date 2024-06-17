import { RequestMapping, Controller, RequestMethod } from "../utils/decorator";

import mockData from '../../mockList'

@Controller("/feed")
export default class BookController {
    @RequestMapping(RequestMethod.GET, "/list")
    async getAllBooks(ctx) {
        // return new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //         resolve("success")
        //     }, 1000);
        // }).then(res => {
        //     console.log(ctx, res, "sd")
        //     ctx.body = {
        //         data: ['一秒学会前端', "一天精通web3"]
        //     }
        // })
        const { request, response } = ctx;
        const { startNum = 0, pageSize = 10 } = ctx.query;
        const resList = mockData.mockList.slice(Number(startNum), Number(startNum) + Number(pageSize));
        ctx.body = {
            list: resList
        }
        console.log("REQ", request, response, "RES", ctx.query);
    }

}
