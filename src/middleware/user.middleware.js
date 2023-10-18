const { getUserInfo } = require('../service/user.service')
const { userFormateError, userAlreadyExisted, userRegisterError } = require('../constant/error.type')

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
    try {
        const res = await getUserInfo({ username })
        console.error('error:用户名已经存在', { username })
        ctx.app.emit('error', userAlreadyExisted, ctx)
        return
    } catch (err) {
        console.error('error:用户注册异常', err)
        ctx.app.emit('error', userRegisterError, ctx)
    }
    await next();
}

module.exports = {
    userValidator,
    veryfyUser
}