const { createUser, loginUser } = require('../service/user.service');

class UserController {
    async register(ctx, next) {
        console.log('注册' + ctx.request.body)
        ctx.body = ctx.request.body
        //1、获取数据
        const { username, password } = ctx.request.body
        //2、操作数据库
        const res = await createUser(username, password)
        //3、返回结果
        console.log(res)
    }
    async login(ctx, next) {
        console.log('登录' + ctx.request.body)
        ctx.body = ctx.request.body
        //1、获取数据
        const { username, password } = ctx.request.body
        //2、操作数据库
        const res = await loginUser(username, password)
        //3、返回结果
        console.log(res)
    }
}
module.exports = new UserController()