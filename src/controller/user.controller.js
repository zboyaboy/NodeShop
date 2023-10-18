const { createUser, loginUser, getUserInfo } = require('../service/user.service');
const { userRegisterError } = require('../constant/error.type')

class UserController {
    async register(ctx, next) {
        //1、获取数据
        const { username, password } = ctx.request.body
        //2、操作数据库
        //增加异常捕获
        try {
            const res = await createUser(username1, password)
            //3、返回结果
            ctx.body = {
                code: 0,
                message: '用户注册成功',
                result: {
                    id: res.id,
                    username: res.username
                }
            }
            console.log(res)
        }
        catch (err) {
            console.log(err)
            ctx.app.emit('error', userRegisterError, ctx)
        }
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