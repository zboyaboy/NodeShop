const Address = require('../model/address.model')
class AddressService {
    async createAddress(address) {
        return await Address.create(address)
    }

    async findAllAddress(user_id) {
        return await Address.findAll({
            attributes: ['id', 'consignee', 'phone', 'is_default'],
            where: { user_id }
        })
    }
    async updateAddress(id, address) {
        return await Address.update(address, { where: { id } })
    }
    async removeAddress(id, address) {
        return await Address.destroy({ where: { id } })
    }
    async setDefultAddress(id, user_id) {
        await Address.update({ is_default: false }, { where: { user_id } })
        return await Address.update({ is_default: true }, { where: { id } })
    }


}

module.exports = new AddressService() 