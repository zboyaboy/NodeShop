const User = require('../model/user.model')

class UserService {
    async createUser(username, password) {
        // 创建一个新用户
        const res = await User.create({ username: username, password: password });
        //console.log(res);
        //写入数据库操作
        return res.dataValues
    }
    async getUserInfo({ id, username, password, role }) {
        console.log('getuserinfo')
        const whereOpt = {}
        id && Object.assign(whereOpt, { id })
        username && Object.assign(whereOpt, { username })
        password && Object.assign(whereOpt, { password })
        role && Object.assign(whereOpt, { role })

        console.log(whereOpt)
        const res = await User.findOne({
            attributes: ['id', 'username', 'password', 'role'],
            where: whereOpt
        })
        console.log(res)

        return res ? res.dataValues : null
    }
    async loginUser(username, password) {
        //写入数据库操作
        return '登录成功'
    }
}
module.exports = new UserService()