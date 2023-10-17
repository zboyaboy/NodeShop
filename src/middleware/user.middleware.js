const { getUserInfo } = require('../service/user.service')
const { userFormateError, userAlreadyExisted } = require('../constant/error.type')

const userValidator = async (ctx, next) => {
    const { username, password } = ctx.request.body
    //验证
    if (!username || !password) {
        console.error('用户名或密码为空', ctx.request.body)
        ctx.app.emit('error', userFormateError, ctx)
        return
    }
    await next();
}

const veryfyUser = async (ctx, next) => {
    const { username } = ctx.request.body
    if (getUserInfo({ username })) {
        ctx.app.emit('error', userAlreadyExisted, ctx)
        return
    }
    await next();
}

module.exports = {
    userValidator,
    veryfyUser
}