import { RequestMapping, Controller, RequestMethod } from "../utils/decorator";
import UserService from '../services/UserServices';

@Controller("/user")
export default class UserController {
    @RequestMapping(RequestMethod.GET, "/all")
    async getAllTeachers(ctx) {
        ctx.body = {
            data: ['luyi', "yunyin"]
        }
    }

    @RequestMapping(RequestMethod.POST, "/login")
    async loginUser(ctx) {
        const { body } = ctx.request;
        const userService = new UserService();

        ctx.body = await userService.validate(body);
    }
}

