const { productsFormatError } = require('../constant/error.type')

const validator = async (ctx, next) => {
    try {
        ctx.verifyParams({
            products_name: { type: 'string', required: true },
            products_price: { type: 'number', required: true },
            products_num: { type: 'number', required: true },
            products_img: { type: 'string', requited: true }
        })
    } catch (error) {
        console.error(error)
        productsFormatError.result = error
        return ctx.app.emit('error', productsFormatError, ctx)
    }
    await next()
}

module.exports = { validator }