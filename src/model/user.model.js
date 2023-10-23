const { DataType, DataTypes } = require('sequelize')
const seq = require('../db/seq')

//创建模型
const User = seq.define('user', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: '唯一用户名'
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: '密码'
    },
    role: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
        comment: '是不是管理员，默认是0不同用户，1是管理员'
    }
}, {
    timestamps: true
})
//强制同步数据库
//User.sync({ force: true })

module.exports = User