const { tokenExpiredError, jsonWebTokenError, hasAdminPermission } = require('../constant/error.type')
var jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config.default');

const auth = async (ctx, next) => {
    const { authorization } = ctx.request.header
    const token = authorization.replace('Bearer ', '')
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        ctx.state.user = decoded
    }

    catch (err) {
        switch (err.name) {
            case 'TokenExpiredError':
                console.error('token过期了', err)
                return ctx.app.emit('error', tokenExpiredError, ctx)
                break
            case 'JsonWebTokenError':
                console.error('无效的Token', err)
                return ctx.app.emit('error', jsonWebTokenError, ctx)
                break
        }
    }
    await next();
}

const hadAdminPermission = async (ctx, next) => {
    const { role } = ctx.state.user
    if (!role) {
        console.error('该用户没有管理员权限')
        return ctx.app.emit('error', hasAdminPermission, ctx)
    }
    else {
        //console.error('该用户具有管理员权限')
        //return ctx.app.emit('error', hasAdminPermission, ctx)
    }
    await next();
}

module.exports = {
    auth,
    hadAdminPermission
}