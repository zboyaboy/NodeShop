const { cartFormatError } = require('../constant/error.type')
const { createOrUpdate, findCarts, updateCarts, removeCarts, selectAllCasts, unselectAllCasts, getTotalCast } = require('../service/cart.service')
class CartController {
    async add(ctx) {
        //将商品添加到购物车
        //1、解析user_id，products_id。
        const user_id = ctx.state.user.id
        const products_id = ctx.request.body.products_id
        //2、操作数据库
        const res = await createOrUpdate(user_id, products_id)
        //3、返回结果
        ctx.body = {
            code: 0,
            message: '添加购物车成功',
            result: res,
        }
    }
    async findAll(ctx) {
        //1.解析请求参数
        const { pageNum = 1, pageSize = 10 } = ctx.request.query
        //2.操作数据库
        const res = await findCarts(pageNum, pageSize)
        //3.返回结果
        ctx.body = {
            code: 0,
            message: '获取购物车列表成功',
            result: res,
        }
    }
    async update(ctx) {
        //1.解析参数
        const { id } = ctx.request.params// url中的参数
        const { number, selected } = ctx.request.body//post信息中的参数
        if (number === undefined && selected === undefined) {
            cartFormatError.message = 'number和selected不能同时为空'
            return ctx.app.emit('error', cartFormatError, ctx)
        }
        //2.操作数据库
        const res = await updateCarts({ id, number, selected })
        //3.返回数据
        ctx.body = {
            code: 0,
            message: '更新购物车成功',
            result: res
        }
    }
    async remove(ctx) {
        const { ids } = ctx.request.body
        const res = await removeCarts(ids)
        ctx.body = {
            code: 0,
            message: '删除购物车成功',
            result: res,
        }
    }
    async selectAll(ctx) {
        const user_id = ctx.state.user.id
        const res = await selectAllCasts(user_id)
        ctx.body = {
            code: 0,
            message: '全选成功',
            result: res,
        }
    }
    async unselectAll(ctx) {
        const user_id = ctx.state.user.id
        const res = await unselectAllCasts(user_id)
        ctx.body = {
            code: 0,
            message: '取消全选成功',
            result: res,
        }
    }
    async getTotal(ctx) {
        console.log('111')
        const user_id = ctx.state.user.id
        const res = await getTotalCast(user_id)
        console.log(user_id)
        ctx.body = {
            code: 0,
            message: '获取购物车总数成功',
            result: res,
        }
    }
}

module.exports = new CartController()