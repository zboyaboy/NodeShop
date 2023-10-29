const Cart = require('../model/cart.model')
const { Op } = require('sequelize')
const Products = require('../model/products.model')

class CartService {
    async createOrUpdate(user_id, products_id) {
        //根据user_id 和 products_id同时查找是否有记录
        let res = await Cart.findOne({
            where: {
                [Op.and]: {
                    user_id,
                    products_id
                }
            }
        })
        if (res) {
            //已经存在一条记录
            await res.increment('number', { by: 1 })
            return await res.reload()
        }
        else {
            return await Cart.create({ user_id, products_id })
        }
    }
    async findCarts(pageNum, pageSize) {
        const offset = (pageNum - 1) * pageSize
        const { count, rows } = await Cart.findAndCountAll({
            attributes: ['id', 'number', 'selected'],
            offset: offset,
            limit: pageSize * 1,
            include: {
                model: Products,
                as: 'products_info',
                attributes: ['id', 'products_name', 'products_price', 'products_img']
            }
        })
        return {
            pageNum,
            pageSize,
            total: count,
            result: rows
        }
    }
    async updateCarts(params) {
        const { id, number, selected } = params
        const res = await Cart.findByPk(id)
        if (!res) return ''
        number !== undefined ? (res.number = number) : ''
        if (selected !== undefined) {
            res.selected = selected
        }
        return await res.save()
    }
    async removeCarts(ids) {
        return await Cart.destroy({
            where: {
                id: {
                    [Op.in]: ids,
                }
            }
        })
    }
    async selectAllCasts(user_id) {
        return await Cart.update(
            { selected: true },
            {
                where: {
                    user_id
                }
            }
        )
    }
    async unselectAllCasts(user_id) {
        return await Cart.update(
            { selected: false },
            {
                where: {
                    user_id
                }
            }
        )
    }
    async getTotalCast(user_id) {
        const { count } = await Cart.findAndCountAll(
            { user_id }
        )
        return count
    }
}

module.exports = new CartService