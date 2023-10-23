const { off } = require('../app');
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
    async paranoidProducts(id) {
        const res = await Products.destroy({ where: { id } })
        console.log(res)
        return res > 0 ? true : false
    }
    async unparanoidProducts(id) {
        const res = await Products.restore({ where: { id } })
        console.log(res)
        return res > 0 ? true : false
    }
    async findProducts(PageNum, PageSize) {
        // //获取商品总数
        // const count = await Products.count()
        // //获取分页的具体数据
        // const offset = (PageNum - 1) * PageSize
        // const rows = await Products.findAll({ offset: offset, limit: PageSize * 1 })

        const offset = (PageNum - 1) * PageSize
        const { count, rows } = await Products.findAndCountAll({ offset: offset, limit: PageSize * 1 })
        return {
            PageNum,
            PageSize,
            total: count,
            result: rows
        }
    }
}
module.exports = new ProductsService()