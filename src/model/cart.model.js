//1.导入sequelize的连接
const { DataTypes } = require('sequelize')
const seq = require('../db/seq')
const Products = require('../model/products.model')
//2.定义Cart模型
const Cart = seq.define('carts', {
    products_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '商品的ID'
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '用户的ID'
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment: '用户的ID'
    },
    selected: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: '是否选中'
    }
})

//3.同步数据
//Cart.sync({ force: true })

Cart.belongsTo(Products, {
    foreignKey: 'products_id',
    as: 'products_info'
})

//4.导出Cart模型
module.exports = Cart