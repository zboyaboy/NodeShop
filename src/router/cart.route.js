//1.导入Kor-router
const Router = require('@koa/router')
//2.实例化router对象
const router = new Router({ prefix: '/carts' })
const { auth } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/cart.middleware')
const { add, findAll, update, remove, selectAll, unselectAll, getTotal } = require('../controller/cart.controller')

//3.编写路由规则

//3.1添加购物车
router.post('/', auth, validator({ products_id: 'number' }), add)

//3.2获取购物车列表
router.get('/', auth, findAll)

//3.3更新购物车
router.patch('/:id', auth, validator({
    number: { type: 'number', required: false },
    selected: { type: 'bool', required: false },
}), update)

//3.4删除购物车
router.delete('/', auth, validator({
    ids: { type: 'array' }
}),
    remove)

//3.5全选
router.post('/selectAll', auth, selectAll)

//3.6全不选
router.post('/unselectAll', auth, unselectAll)

//3.7获取商品总数量接口
router.get('/total', auth, getTotal)

//4.导出router对象
module.exports = router