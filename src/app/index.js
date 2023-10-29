const path = require('path')

const Koa = require('koa');
const { koaBody } = require('koa-body')
const cors = require('koa-cors');   // 解决跨域
const koaStatic = require('koa-static')
const parameter = require('koa-parameter');

const app = new Koa();
const ErrorHandler = require('./errorHandler')

const router = require('../router')

app.use(koaBody({
    multipart: true,
    formidable: {//在option里的相对路径，不是相对当前的路径。是相对于Process.cwd()的相对路径        
        uploadDir: path.join(__dirname, '../upload'),
        keepExtensions: true
    },
    parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE']
}))
app.use(koaStatic(path.join(__dirname, '../upload')))
app.use(parameter(app))
app.use(cors())
    .use(router.routes())
    .use(router.allowedMethods());

app.on('error', ErrorHandler)

module.exports = app; 