const Router = require('@koa/router')
const { userValidator, verifyUser, cryptPassword, verifyLogin } = require('../middleware/user.middleware')
const { auth } = require('../middleware/auth.middleware')
const { register, login, changePassword } = require('../controller/user.controller')

const router = new Router({ prefix: '/users' })

//GET /users/
router.get('/', (ctx, next) => {
    ctx.body = 'hello users'
    console.log('111')
})

//注册接口
router.post('/register', userValidator, verifyUser, cryptPassword, register)

//登录接口
router.post('/login', userValidator, verifyLogin, login)

//修改登录密码
router.patch('/', auth, cryptPassword, changePassword)

module.exports = router