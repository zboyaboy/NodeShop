const Router = require('@koa/router')


const router = new Router({ prefix: '/demo' })

//GET /users/
router.get('/', (ctx, next) => {
    ctx.body = 'hello users'
})

router.post('/login', (ctx, next) => {
    console.log(ctx.request.body)
    const { user_id, password, verification_code } = ctx.request.body
    if (!user_id || !password || !verification_code) {
        ctx.body = '信息为空'
        console.log('信息为空')
        return
    }
    if (verification_code != 'aaaa') {
        ctx.body = '验证码错误'
        console.log('验证码错误')
        return
    }
    if (user_id == 'iwen@qq.com' && password == 'iwen123') {
        ctx.body = { msg: "登录成功", msg_code: "20000", success: true }
        console.log('loginok')
    }
    else {
        ctx.body = { msg: "登录失败", msg_code: "20001", success: true }
        console.log('loginfalse')
    }
})

router.get('/getChengpinDetails', (ctx, next) => {
    ctx.body = { msg: "获取成功", msg_code: "20000", success: true }
})

module.exports = router