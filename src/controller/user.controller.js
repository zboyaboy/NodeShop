const { createUser, loginUser, getUserInfo, updateById } = require('../service/user.service');
const { userRegisterError, changePasswordError } = require('../constant/error.type')
var jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config.default');

class UserController {
    async register(ctx, next) {
        //1、获取数据
        const { username, password } = ctx.request.body

        //2、操作数据库
        //增加异常捕获
        try {
            const res = await createUser(username, password)
            //3、返回结果
            ctx.body = {
                code: 0,
                message: '用户注册成功',
                result: {
                    id: res.id,
                    username: res.username
                }
            }
        }
        catch (err) {
            console.error(err)
            ctx.app.emit('error', userRegisterError, ctx)
        }
    }
    async login(ctx, next) {
        //1、获取数据
        const { username, password } = ctx.request.body
        //获取用户信息（在token的playload中，记录id，username，role）

        try {
            //返回结果对象中，剔除password字段
            const { password, ...res } = await getUserInfo({ username })
            console.log(res)
            ctx.body = {
                code: 0,
                message: '用户登录成功',
                result: {
                    id: res.id,
                    username: res.username,
                    token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' })
                }
            }
        } catch (err) {
            console.error('用户登录失败', err)
        }
    }
    async changePassword(ctx, next) {
        //1、获取数据
        const id = ctx.state.user.id
        const password = ctx.request.body.password

        console.log(id, password)
        //2、操作数据库
        //增加异常捕获
        try {
            if (await updateById({ id, password })) {
                //3、返回结果
                ctx.body = {
                    code: 1,
                    message: '用户密码修改成功',
                    result: {
                    }
                }
            } else {
                //3、返回结果
                ctx.body = {
                    code: 0,
                    message: '用户密码修改失败',
                    result: {
                    }
                }
            }
        }
        catch (err) {
            console.error(err)
            ctx.app.emit('error', changePasswordError, ctx)
        }
    }
}
module.exports = new UserController()