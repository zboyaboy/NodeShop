const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

const Products = seq.define('products', {
    products_name: {
        type: DataTypes.STRING,
        allowNull: false,
        commit: '商品名称'
    },
    products_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        commit: '商品价格'
    },
    products_num: {
        type: DataTypes.INTEGER,
        allowNull: false,
        commit: '商品库存'
    },
    products_img: {
        type: DataTypes.STRING,
        allowNull: false,
        commit: '商品图片的URL地址'
    }
})

Products.sync({ force: true })

module.exports = Products