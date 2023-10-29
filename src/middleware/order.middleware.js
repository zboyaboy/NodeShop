const { orderFormatError } = require('../constant/error.type')

const validator = (rules) => {
    return async (ctx, next) => {
        try {
            ctx.verifyParams(rules)
        } catch (error) {
            console.error(error)
            orderFormatError.result = error
            return ctx.app.emit('error', orderFormatError, ctx)
        }
        await next()
    }
}
module.exports = { validator }