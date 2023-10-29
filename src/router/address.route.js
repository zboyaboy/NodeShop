//一.导入koa-router包
const Router = require('@koa/router')
const { auth } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/address.middleware')
const { create, findAll, update, remove, setDefault } = require('../controller/address.controller')

//二.实例化router对象
const router = new Router({ prefix: '/address' })

//三.编写路由规则
router.post('/', auth, validator({
    consignee: 'string',//收件人
    phone: { type: 'string', Format: /^1\d{10}$/ },//电话
    address: 'string'//地址
}), create)

router.get('/', auth, findAll)

//更新地址
router.put('/:id', auth,
    validator({
        consignee: 'string',//收件人
        phone: { type: 'string', Format: /^1\d{10}$/ },//电话
        address: 'string'//地址
    }), update
)

//删除地址
router.delete('/:id', auth, remove)

//设置默认地址
router.patch('/:id', auth, setDefault)

//四.导出router.对象
module.exports = router