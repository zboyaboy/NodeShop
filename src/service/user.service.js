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
        const whereOpt = {}
        id && Object.assign(whereOpt, { id })
        username && Object.assign(whereOpt, { username })
        password && Object.assign(whereOpt, { password })
        role && Object.assign(whereOpt, { role })

        const res = await User.findOne({
            attributes: ['id', 'username', 'password', 'role'],
            where: whereOpt
        })

        return res ? res.dataValues : null
    }
    async loginUser(username, password) {
        //写入数据库操作
        return '登录成功'
    }
    async updateById({ id, username, password, role }) {
        const whereOpt = { id }
        const newUser = {}
        username && Object.assign(newUser, { username })
        password && Object.assign(newUser, { password })
        role && Object.assign(newUser, { role })

        // 创建一个新用户
        const res = await User.update(newUser, { where: whereOpt })
        console.log(res.dataValues)
        return res[0] > 0
    }
}
module.exports = new UserService()