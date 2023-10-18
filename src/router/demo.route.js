const Router = require('@koa/router')


const router = new Router({ prefix: '/demo' })

//GET /users/
router.get('/', (ctx, next) => {
    ctx.body = 'hello users'
})

router.post('/login', (ctx, next) => {
    const { user_id, password, verification_code } = ctx.request.body
    if (!user_id || !password || !verification_code) {
        ctx.body = '信息为空'
        return
    }
    if (verification_code != 'crfvw') {
        ctx.body = '验证码错误'
        return
    }
    if (user_id == 'iwen@qq.com' && password == 'iwen123') {
        ctx.body = { msg: "登录成功", msg_code: "20000", success: true }
    }

})

router.get('/getChengpinDetails', (ctx, next) => {
    ctx.body = { msg: "获取成功", msg_code: "20000", success: true }
})

module.exports = router