import { RequestMapping, Controller, RequestMethod } from "../utils/decorator";


@Controller("/user")
export default class UserController{
    @RequestMapping(RequestMethod.GET,"/all")
    async getAllTeachers(ctx){
        ctx.body = {
            data:['luyi',"yunyin"]
        }
    }
}