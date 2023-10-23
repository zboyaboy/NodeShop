const Products = require('../model/products.model')

class ProductsService {
    async createProducts(products) {
        // 创建一个新用户
        const res = await Products.create(products);
        //console.log(res);
        //写入数据库操作
        return res.dataValues
    }
    async updateProducts(id, products) {
        // 更新一个用户
        const res = await Products.update(products, { where: { id } });
        //写入数据库操作
        return res[0] > 0 ? true : false
    }
    async removeProducts(id) {
        const res = await Products.destroy({ where: { id } })
        return res[0] > 0 ? true : false
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
}
module.exports = new ProductsService()