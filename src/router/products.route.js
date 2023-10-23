const Router = require('@koa/router')
const { auth, hadAdminPermission } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/products.middleware')
const { upload, create, update, remove, paranoid, unparanoid, findAll } = require('../controller/products.controller')


const router = new Router({ prefix: '/products' })

//商品图片上传接口
router.post('/upload', auth, hadAdminPermission, upload)

//发布商品接口
router.post('/', auth, hadAdminPermission, validator, create)

//修改商品接口
router.put('/:id', auth, hadAdminPermission, validator, update)

//硬删除接口
router.delete('/:id', auth, hadAdminPermission, remove)

//标记删除接口
router.post('/:id/off', auth, hadAdminPermission, paranoid)

//标记恢复删除接口
router.post('/:id/on', auth, hadAdminPermission, unparanoid)

//获取商品列表接口
router.get('/', findAll)

module.exports = router