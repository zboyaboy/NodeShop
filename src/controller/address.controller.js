const { createAddress, findAllAddress, updateAddress, removeAddress, setDefultAddress } = require('../service/address.service')
class AddressController {
    async create(ctx) {
        //解析user_id,consignee,phone,address
        const user_id = ctx.state.user.id
        const { consignee, phone, address } = ctx.request.body
        //添加记录
        const res = await createAddress({ user_id, consignee, phone, address })

        ctx.body = {
            code: 0,
            message: '添加地址成功',
            result: res,
        }
    }
    async findAll(ctx) {
        const user_id = ctx.state.user.id
        //获取地址记录
        const res = await findAllAddress(user_id)
        ctx.body = {
            code: 0,
            message: '获取地址成功',
            result: res
        }
    }
    async update(ctx) {
        const id = ctx.request.params.id
        const res = await updateAddress(id, ctx.request.body)
        ctx.body = {
            code: 0,
            message: '变更地址成功',
            result: res
        }
    }
    async remove(ctx) {
        const id = ctx.request.params.id
        const res = await removeAddress(id)
        ctx.body = {
            code: 0,
            message: '地址删除成功',
            result: res
        }
    }
    async setDefault(ctx) {
        const user_id = ctx.state.user.id
        const id = ctx.request.params.id
        const res = await setDefultAddress(id, user_id)
        ctx.body = {
            code: 0,
            message: '默认地址设置成功',
            result: res
        }
    }
}
module.exports = new AddressController()