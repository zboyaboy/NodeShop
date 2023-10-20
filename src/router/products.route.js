const Router = require('@koa/router')
const { auth, hadAdminPermission } = require('../middleware/auth.middleware')
const { upload } = require('../controller/products.controller')


const router = new Router({ prefix: '/products' })

router.post('/upload', auth, hadAdminPermission, upload)

module.exports = router