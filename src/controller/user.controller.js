class UserController {
    async register(ctx, next) {
        console.log('注册')
        ctx.body = '用户注册成功'
    }
    async login(ctx, next) {
        console.log('登录')
        ctx.body = '用户登录成功'
    }
}
module.exports = new UserController()