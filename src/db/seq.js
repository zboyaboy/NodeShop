const { Sequelize } = require('sequelize');
const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PWD, MYSQL_DB } = require('../config/config.default');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
    host: MYSQL_HOST,
    dialect: 'mysql'/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});
// sequelize.authenticate()
//     .then(() => {
//         console.log('成功了')
//     })
//     .catch(err => {
//         console.log('失败了')
//     })
module.exports = sequelize  