class UserService {
    async createUser(username, password) {
        //写入数据库操作
        return '注册用户写入数据库成功'
    }
    async loginUser(username, password) {
        //写入数据库操作
        return '登录成功'
    }
}
module.exports = new UserService()