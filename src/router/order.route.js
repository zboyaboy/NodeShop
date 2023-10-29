//一.导入koa-router包
const Router = require('@koa/router')
const { auth } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/order.middleware')
const { create, findAll, update } = require('../controller/order.controller')

//二.实例化router对象
const router = new Router({ prefix: '/orders' })

//三.编写路由规则
//3.1添加订单
router.post('/', auth, validator({
    address_id: 'int',
    products_info: 'string',
    total: 'string',
}), create)

//3.2获取订单
router.get('/', auth, findAll)

//3.3更新订单状态
router.patch('/:id', auth, validator({ status: 'number' }), update)

module.exports = router