# 一、项目的初始化
##  1、npm初始化
```shell
npm init -y
```

生成package.json

## 2、git初始化
```shell
git init
git add .
git commit -m '1-项目初始化'
```
生成.git隐藏文件夹，新建'.gitignore'文件忽略本地仓库
## 3、创建Readme文件


# 二、 搭建项目
## 1、安装koa框架
```shell
npm install koa
```
## 2、编写最基本的app
./src/app.js
```node
const Koa = require('koa')
const app = new Koa()

app.use((ctx, next) => {
    ctx.body = 'hello!'
})
app.listen(3000, () => {
    console.log('server is running on http://locahost:3000')
})
```
node ./src/app.js

git提交代码
git add .

# 三、 项目的基本优化
## 1、自动重新服务
```shell
npm install nodemon
```
package.json文件中
scripts段中添加
```js
"scripts": {
    "dev": "nodemon ./src/app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```
## 2、全局变量存储Dotenv
```shell
npm install dotenv
```

./src/app.js
```js
const { APP_PORT } = require('./config/config.default')
```

./src/config/config.default.js
```js
const dotenv = require('dotenv')
dotenv.config()
module.exports = process.env
```

./.env
```
APP_PORT=3030
```
更新后的app.js
```js
const Koa = require('koa')
const { APP_PORT } = require('./config/config.default')
const app = new Koa()
app.use((ctx, next) => {
    ctx.body = 'hello!'
})
app.listen(APP_PORT, () => {
    console.log('server is running on http://locahost:' + APP_PORT + '.')
})
```
# 四、添加路由
路由：根据不同的URL，调用对应的处理函数。
```shell
npm install @koa/router
```
步骤：
1、导入包
2、实例化对象
3、编写路由
4、注册中间件

```js
const Koa = require('koa');
const Router = require('@koa/router');
const { APP_PORT } = require('./config/config.default');
const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
    ctx.body = 'hello index';
})

router.get('/pp', (ctx, next) => {
    ctx.body = 'hello p';
})

app.use(router.routes())
    .use(router.allowedMethods());

app.listen(APP_PORT, () => {
    console.log('server is running on http://localhost:' + APP_PORT + '.')
})
```

代码优化
./src/app.js
```js
const Koa = require('koa');
const { APP_PORT } = require('./config/config.default');
const userRouter = require('./router/route')
const app = new Koa();


app.use(userRouter.routes())
    .use(userRouter.allowedMethods());

app.listen(APP_PORT, () => {
    console.log('server is running on http://localhost:' + APP_PORT + '.')
})
```
./src/router/route.js
```js
const Router = require('@koa/router')
const router = new Router({ prefix: '/users' })

//GET /users/
router.get('/', (ctx, next) => {
    ctx.body = 'hello users'
})

module.exports = router
```

# 五、目录结构优化
## 1、 将HTTP服务和业务逻辑代码拆分

新增./src/app/index.js
```js
const Koa = require('koa');
const userRouter = require('../router/route')
const app = new Koa();
app.use(userRouter.routes())
    .use(userRouter.allowedMethods());

module.exports = app;
```
优化./src/app.js=>.src/main.js
```js
const { APP_PORT } = require('./config/config.default');
const app = require('./app');

app.listen(APP_PORT, () => {
    console.log('server is running on http://localhost:' + APP_PORT + '.')
})
```
## 2、路由和控制器拆分
路由：解析URL，分布给控制器对应的方法
./router/user.route.js
```js
const Router = require('@koa/router')

const { register, login } = require('../controller/user.controller')

const router = new Router({ prefix: '/users' })

//GET /users/
router.get('/', (ctx, next) => {
    ctx.body = 'hello users'
})

//注册接口
router.post('/register', register)

//登录接口
router.post('/login', login)

module.exports = router
```
./controller/user.controller.js
```js
class UserController {
    async register(ctx, next) {
        console.log('注册')
        ctx.body = '用户注册成功'
    }
    async login(ctx, next) {
        console.log('登录')
        ctx.body = '用户登录成功'
    }
}
module.exports = new UserController()
```
# 六、解析body
## 1、安装
```shell
npm install koa-body
```
## 2、改写app
./app/index.js
```js
const Koa = require('koa');
const { koaBody } = require('koa-body')
const userRouter = require('../router/user.route')
const app = new Koa();

app.use(koaBody())
    .use(userRouter.routes())
    .use(userRouter.allowedMethods());

module.exports = app;
```
## 3、获取请求数据
./controller/controller.js
```js
class UserController {
    async register(ctx, next) {
        console.log('注册' + ctx.request.body)
        ctx.body = ctx.request.body
    }
    async login(ctx, next) {
        console.log('登录' + ctx.request.body)
        ctx.body = ctx.request.body
    }
}
module.exports = new UserController()
```
## 4、拆分service层
./service/user.service.js
```js
class UserService {
    async createUser(username, password) {
        //写入数据库操作
        return '注册用户写入数据库成功'
    }
    async loginUser(username, password) {
        //写入数据库操作
        return '登录成功'
    }
}
module.exports = new UserService()
```

引用service
./controller/user.controller.js
```js
const { createUser, loginUser } = require('../service/user.service');

class UserController {
    async register(ctx, next) {
        console.log('注册' + ctx.request.body)
        ctx.body = ctx.request.body
        //1、获取数据
        const { username, password } = ctx.request.body
        //2、操作数据库
        const res = await createUser(username, password)
        //3、返回结果
        console.log(res)
    }
    async login(ctx, next) {
        console.log('登录' + ctx.request.body)
        ctx.body = ctx.request.body
        //1、获取数据
        const { username, password } = ctx.request.body
        //2、操作数据库
        const res = await loginUser(username, password)
        //3、返回结果
        console.log(res)
    }
}
module.exports = new UserController()
```

# 七、数据库操作
	  sequelize ORM数据库工具
	  ORM：对象关系映射
- 数据表映射	  
- 数据表中的数据行（记录）对应一个对象
- 数据表字段对应对象的属性
- 数据表的操作对应对象的方法
## 1、安装sequelize
```shell
npm install sequelize
```
## 2、安装mysql2
```shell
npm install mysql2
```
新建./db/seq.js
```js
const { Sequelize } = require('sequelize');
const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PWD, MYSQL_DB } = require('../config/config.default');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
    host: MYSQL_HOST,
    dialect: 'mysql'/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});
sequelize.authenticate()
    .then(() => {
        console.log('成功了')
    })
    .catch(err => {
        console.log('失败了')
    })
module.exports = sequelize
```
## 3、使用环境变量
```
APP_PORT = 8000
MYSQL_HOST = localhost
MYSQL_PORT = 3306
MYSQL_USER = root
MYSQL_PWD = z123456
MYSQL_DB = mydb
```


# 八、创建User模型
## 1、新建数据模型
`./model/user.model.js`
```js
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
```
# 九、添加用户入库
## 1、通过控制器进行逻辑服务访问
`../controller/user.controller`
```js
const { createUser, loginUser } = require('../service/user.service');

class UserController {
    async register(ctx, next) {
        //1、获取数据
        const { username, password } = ctx.request.body
        //2、操作数据库
        const res = await createUser(username, password)
        //3、返回结果
        ctx.body = {
            code: 0,
            message: '用户注册成功',
            result: {
                id: res.id,
                username: res.username
            }
        }
        console.log(res)
    }
    async login(ctx, next) {
        console.log('登录' + ctx.request.body)
        ctx.body = ctx.request.body
        //1、获取数据
        const { username, password } = ctx.request.body
        //2、操作数据库
        const res = await loginUser(username, password)
        //3、返回结果
        console.log(res)
    }
}
module.exports = new UserController()
```
## 2、通过服务层对数据库进行访问操作
`../service/user.service`
```js
const User = require('../model/user.model')

class UserService {
    async createUser(username, password) {
        // 创建一个新用户
        const res = await User.create({ username: username, password: password });
        //console.log(res);
        //写入数据库操作
        return res.dataValues
    }
    async loginUser(username, password) {
        //写入数据库操作
        return '登录成功'
    }
}
module.exports = new UserService()
```
# 十、错误处理
## 1、对用户注册逻辑进行校验
`../controller/user.controller.js`
```js
const { createUser, loginUser, getUserInfo } = require('../service/user.service');

async register(ctx, next) {
	//1、获取数据
	const { username, password } = ctx.request.body

	//验证
	if (!username || !password) {
		console.error('用户名或密码为空', ctx.request.body)
		ctx.status = 400
		ctx.body = {
			code: '10001',
			message: '用户名或密码为空',
			result: ''
		}
		return
	}

	if (getUserInfo({ username })) {
		ctx.status = 409
		ctx.body = {
			code: '10002',
			message: '用户名已经存在',
			result: ''
		}
		return
	}

	//2、操作数据库
	const res = await createUser(username, password)
	//3、返回结果
	ctx.body = {
		code: 0,
		message: '用户注册成功',
		result: {
			id: res.id,
			username: res.username
		}
	}
	console.log(res)
}
```
`../service/user.service`
```js
async getUserInfo({ id, username, password, role }) {
        const whereOpt = {}
        id && Object.assign(whereOpt, { id })
        username && Object.assign(whereOpt, { username })
        password && Object.assign(whereOpt, { password })
        role && Object.assign(whereOpt, { role })

        const res = await User.findOne({
            attributes: ['id', 'username', 'password', 'role'],
            where: whereOpt
        })

        return res ? (await res).dataValues : null
    }
```
# 十一、拆分中间件
## 1、新建中间件文件
`./src/middleWare/user.middleware.js`
```js
const { getUserInfo } = require('../service/user.service')
const { userFormateError, userAlreadyExisted } = require('../constant/error.type')

const userValidator = async (ctx, next) => {
    const { username, password } = ctx.request.body
    //验证
    if (!username || !password) {
        console.error('用户名或密码为空', ctx.request.body)
        ctx.app.emit('error', userFormateError, ctx)
        return
    }
    await next();
}

const verifyUser = async (ctx, next) => {
    const { username } = ctx.request.body
    if (getUserInfo({ username })) {
        ctx.app.emit('error', userAlreadyExisted, ctx)
        return
    }
    await next();
}

module.exports = {
    userValidator,
    verifyUser
}
```
`./src/router/user.router.js`
```js
const { userValidator, verifyUser } = require('../middleware/user.middleware')

//注册接口加入验证
router.post('/register', userValidator, verifyUser, register)
```
## 2、抽象错误信息层统一错误处理
`./src/constant/error.type.js`
```js
module.exports = {
    userFormateError: {
        code: '10001',
        message: '用户名或密码为空',
        result: ''
    },
    userAlreadyExisted: {
        code: '10002',
        message: '用户名已经存在',
        result: ''
    }

}
```
## 3、添加全局消息
`./src/app/index.js`
```js
const Koa = require('koa');
const { koaBody } = require('koa-body')
const userRouter = require('../router/user.route')
const app = new Koa();
const ErrorHandler = require('./errorHandler')

app.use(koaBody())
    .use(userRouter.routes())
    .use(userRouter.allowedMethods());

app.on('error', ErrorHandler)

module.exports = app;
```
## 4、错误消息处理函数
`./src/app/errorHandler.js`
```js
module.exports = (err, ctx) => {
    let status = 500
    switch (err.code) {
        case '10001':
            status = 400
            break
        case '10002':
            status = 409
            break
        default:
            status = 500
    }
    ctx.status = status
    ctx.body = err
}
```
## 5、emit触发异常
`./src/controller/user.controller.js`
```js
const { getUserInfo } = require('../service/user.service')
const { userFormateError, userAlreadyExisted } = require('../constant/error.type')

const userValidator = async (ctx, next) => {
    const { username, password } = ctx.request.body
    //验证
    if (!username || !password) {
        console.error('用户名或密码为空', ctx.request.body)
        ctx.app.emit('error', userFormateError, ctx)
        return
    }
    await next();
}

const verifyUser = async (ctx, next) => {
    const { username } = ctx.request.body
    if (getUserInfo({ username })) {
        ctx.app.emit('error', userAlreadyExisted, ctx)
        return
    }
    await next();
}

module.exports = {
    userValidator,
    verifyUser
}
```
## 6、优化异常处理

### 1）、添加异常捕获
`./src/controller/user.controller.js`
```js
 async register(ctx, next) {
        //1、获取数据
        const { username, password } = ctx.request.body
        //2、操作数据库
        //增加异常捕获
        try {
            const res = await createUser(username1, password)
            //3、返回结果
            ctx.body = {
                code: 0,
                message: '用户注册成功',
                result: {
                    id: res.id,
                    username: res.username
                }
            }
            console.log(res)
        }
        catch (err) {
            console.log(err)
            ctx.app.emit('error', userRegisterError, ctx)
        }
    }
```
### 2）、添加错误类型
`./src/constant/error.type.js`
```js
    userRegisterError: {
        code: '10003',
        message: '用户注册失败',
        result: ''
    }
```
### 3）、添加错误代码
`./src/app/errorHandler.js`
```js
case '10003':
            status = 404
            break
```
### 4）、添加引用
`./src/controller/user.controller.js`
```js
const { userRegisterError } = require('../constant/error.type')
```
### 5）、middleware添加异常处理
`./src/middleware/user.middleware.js`
```js
const verifyUser = async (ctx, next) => {
    const { username } = ctx.request.body
    try {
        const res = await getUserInfo({ username })
        console.error('error:用户名已经存在', { username })
        ctx.app.emit('error', userAlreadyExisted, ctx)
        return
    } catch (err) {
        console.error('error:用户注册异常', err)
        ctx.app.emit('error', userRegisterError, ctx)
    }
    await next();
}
```
# 十二、加密用户密码
将密码保存到数据库前，要对密码进行加密处理
加盐加密（加盐可以理解为私钥）
加密（salt+密码）= 密文
## 1、安装组件
```shell
npm install bcryptjs
```
## 2、加密password字段
`./src/controllor/user.controllor.js`
```js
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);
const hashPassword = bcrypt.hashSync(password, salt);

//修改
const res = await createUser(username, hashPassword)
```
## 3、抽离为中间件，解耦register业务逻辑
`./src/middleware/user.middleware.js`
```js
const bcrypt = require('bcryptjs');

const cryptPassword = async (ctx, next) => {
    const { password } = ctx.request.body
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    ctx.request.body.password = hashPassword
    await next();
}

module.exports = {
    userValidator,
    verifyUser,
    cryptPassword
}
```
# 十三、用户登录
## 1、添加路由引用
`./src/router/user.router.js`
```js
const { userValidator, verifyUser, cryptPassword, verifyLogin } = require('../middleware/user.middleware')

//登录接口
router.post('/login', userValidator, verifyLogin, login)
```
## 2、添加中间件处理函数
`./src/middleware/user.middleware.js`
```js
const verifyLogin = async (ctx, next) => {
    const { username, password } = ctx.request.body

    try {
        const res = await getUserInfo({ username })
        //判断登录用户名是否存在
        if (!res) {
            console.error('error:用户名不存在', { username })
            ctx.app.emit('error', userDoesNotExisted, ctx)
            return
        }
        //判断登录用户密码是否正确
        if (!bcrypt.compareSync(password, res.password)) {
            console.error('error:密码错误', { username })
            ctx.app.emit('error', invalidPasswordError, ctx)
            return
        }
    } catch (err) {
        console.error('error:用户登录异常', err)
        ctx.app.emit('error', userLoginError, ctx)
        return
    }
    await next();
}
```
## 3、注册错误类型
`./src/constant/error.type.js`
```js
    userDoesNotExisted: {
        code: '10004',
        message: '用户名不存在',
        result: ''
    },
    userLoginError: {
        code: '10005',
        message: '用户登录异常',
        result: ''
    },
```

# 十四、用户的认证

用户登录成功以后，给用户颁发一个令牌(token)，所有后端页面的访问都需要有令牌的验证。

jwt:jsonwebtoken

- header:头部
- playload:载荷
- signature:签名

## 1、安装JWT

```she
npm install jsonwebtoken
```

## 2、登录逻辑代码

`./src/controllor/user.controllor.js`

```js
var jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config.default');

async login(ctx, next) {
        //1、获取数据
        const { username, password } = ctx.request.body
        //获取用户信息（在token的playload中，记录id，username，role）

        try {
            //返回结果对象中，剔除password字段
            const { password, ...res } = await getUserInfo({ username })
            console.log(res)
            ctx.body = {
                code: 0,
                message: '用户登录成功',
                result: {
                    id: res.id,
                    username: res.username,
                    token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' })
                }
            }
        } catch (err) {
            console.error('用户登录失败', err)
        }
    }
```

`.env`

```
JWT_SECRET = aaaa
```

# 十五、用户认证校验

## 1、Postman 数据模拟认证请求

`用户登录Test页面中`

```js
pm.test("Successful POST request", function () {
    const res = pm.response.json()
    pm.collectionVariables.set("token",res.result.token);
});
```

`商城Authorization`

```js
type Bearer Token

{{token}}
```

`variables中查看田间的token变量`

## 2、添加用户认证校验

`./src/middleware/user.middleware.js`

```js
var jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config.default');


const auth = async (ctx, next) => {
    const { authorization } = ctx.request.header
    const token = authorization.replace('Bearer ', '')
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        ctx.state.user = decoded
    }
    catch (err) {
        switch (err.name) {
            case 'TokenExpiredError':
                console.error('token过期了', err)
                return ctx.app.emit('error', tokenExpiredError, ctx)
                break
            case 'JsonWebTokenError':
                console.error('无效的Token', err)
                return ctx.app.emit('error', jsonWebTokenError, ctx)
                break
        }

    }
    await next();
}
```

## 3、添加错误类型

`./src/constant/error.type.js`

```js
 tokenExpiredError: {
        code: '10101',
        message: 'token超时',
        result: ''
    },
    jsonWebTokenError: {
        code: '10102',
        message: '无效的Token',
        result: ''
    }
```

# 十六、修改密码

## 1、添加修改密码路由

`./src/router/user.router.js`

```js
//修改登录密码
router.patch('/', auth, (ctx, next) => {
    console.log(ctx.state.user)
    ctx.body = '登录密码修改成功'
})
```

## 2、加密passowrd字段

`./src/router/user.router.js`

```js
//修改登录密码
router.patch('/', auth,cryptPassword, (ctx, next) => {
    console.log(ctx.state.user)
    ctx.body = '登录密码修改成功'
})
```

## 3、修改路由文件

`./src/router/user.router.js`

```js
const { register, login, changePassword } = require('../controller/user.controller')

//修改登录密码
router.patch('/', auth, cryptPassword, changePassword)
```

## 4、修改控制器

`./src/controllor/user.controllor.js`

```js
async changePassword(ctx, next) {
        //1、获取数据
        const id = ctx.state.user.id
        const password = ctx.request.body.password

        console.log(id, password)
        //2、操作数据库
        //增加异常捕获
        try {
            if (await updateById({ id, password })) {
                //3、返回结果
                ctx.body = {
                    code: 1,
                    message: '用户密码修改成功',
                    result: {
                    }
                }
            } else {
                //3、返回结果
                ctx.body = {
                    code: 0,
                    message: '用户密码修改失败',
                    result: {
                    }
                }
            }
        }
        catch (err) {
            console.error(err)
            ctx.app.emit('error', changePasswordError, ctx)
        }
    }
```

## 5、更新数据库

`./scr/service/user.service.js`

```js
async updateById({ id, username, password, role }) {
        const whereOpt = { id }
        const newUser = {}
        username && Object.assign(newUser, { username })
        password && Object.assign(newUser, { password })
        role && Object.assign(newUser, { role })

        // 创建一个新用户
        const res = await User.update(newUser, { where: whereOpt })
        console.log(res.dataValues)
        return res[0] > 0 ? true : false
    }
```

# 十七、添加商品模块

## 1、新建商品路由

`./src/router/products.route.js`

```js
const Router = require('@koa/router')
const { upload } = require('../controller/products.controller')

const router = new Router({ prefix: '/products' })

router.post('/upload', upload)
```

## 2、添加控制器

`./src/router/products.controller.js`

```js
const { createUser, loginUser, getUserInfo, updateById } = require('../service/user.service');
const { userRegisterError, changePasswordError } = require('../constant/error.type')

class ProductsController {
    async upload(ctx, next) {
        ctx.body = '商品上传成功'
    }
}
module.exports = new ProductsController()
```

## 3、引入路由

`./src/router/products.route.js`

```js
const Router = require('@koa/router')
const { upload } = require('../controller/products.controller')

const router = new Router({ prefix: '/products' })

router.post('/upload', upload)

module.exports = router
```



`./src/app/index.js`

```js
const productsRouter = require('../router/products.route')

app.use(koaBody())
    .use(cors())
    .use(userRouter.routes())
    `.use(productsRouter.routes())`
    .use(userRouter.allowedMethods());
```

## 4、自动加载路由文件

`./src/router/index.js`

```js
const fs = require('fs')

const Router = require('@koa/router')
const router = new Router()

fs.readdirSync(__dirname).forEach(file => {
    if (file !== 'index.js') {
        let r = require('./' + file)
        router.use(r.routes())
    }
})

module.exports = router
```

`./src/app/index.js`

```js
const router = require('../router')

app.use(koaBody())
    .use(cors())
    .use(router.routes())
    .use(router.allowedMethods());
```

## 5、判断用户是否具有管理员权限

`./src/middleware/user.middleware.js`

```js
const hadAdminPermission = async (ctx, next) => {
    const { role } = ctx.state.user
    if (!role) {
        console.error('该用户没有管理员权限')
        return ctx.app.emit('error', hasAdminPermission, ctx)
    }
    await next();
}

module.exports = {
    userValidator,
    verifyUser,
    cryptPassword,
    verifyLogin,
    auth,
    hadAdminPermission
}
```

`./src/constant/error.type.js`

```js
  hasAdminPermission: {
        code: '10103',
        message: '没有管理员权限',
        resut: ''
    }
```

`./src/router/products.route.js`

```js
const { auth, hadAdminPermission } = require('../middleware/user.middleware')

router.post('/upload', auth, hadAdminPermission, upload)
```

## 6、分离auth中间件

`./src/middleware/auth.middleware.js`

```js
const { tokenExpiredError, jsonWebTokenError, hasAdminPermission } = require('../constant/error.type')
var jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config.default');

const auth = async (ctx, next) => {
    const { authorization } = ctx.request.header
    const token = authorization.replace('Bearer ', '')
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        ctx.state.user = decoded
    }
    catch (err) {
        switch (err.name) {
            case 'TokenExpiredError':
                console.error('token过期了', err)
                return ctx.app.emit('error', tokenExpiredError, ctx)
                break
            case 'JsonWebTokenError':
                console.error('无效的Token', err)
                return ctx.app.emit('error', jsonWebTokenError, ctx)
                break
        }

    }
    await next();
}

const hadAdminPermission = async (ctx, next) => {
    const { role } = ctx.state.user
    if (!role) {
        console.error('该用户没有管理员权限')
        return ctx.app.emit('error', hasAdminPermission, ctx)
    }
    await next();
}

module.exports = {
    auth,
    hadAdminPermission
}
```

`./src/router/user.router.js`

```js
const { auth } = require('../middleware/auth.middleware')
```

`./src/router/products.router.js`

```js
const { auth, hadAdminPermission } = require('../middleware/auth.middleware')
```

## 7、添加上传逻辑

`./src/app/index.js`

```js
const path = require('path')

app.use(koaBody({
    multipart: true,
    formidable: {//在option里的相对路径，不是相对当前的路径。是相对于Process.cwd()的相对路径        
        uploadDir: path.join(__dirname, '../upload'),
        keepExtensions: true
    }
}))
    .use(cors())
    .use(router.routes())
    .use(router.allowedMethods());
```



`./src/controllor/products.controllor.js`

```js
const path = require('path')
const { fileUploadError } = require('../constant/error.type')

class ProductsController {
    async upload(ctx, next) {
        const { file } = ctx.request.files
        console.log(file.filepath)
        console.log(path.basename(file.filepath))
        if (file) {
            ctx.body = {
                code: 0,
                message: '商品图片上传成功',
                result: {
                    products_img: path.basename(file.filepath)
                }
            }
        } else {
            return ctx.app.emit('error', fileUploadError, ctx)
        }
    }
}
module.exports = new ProductsController()
```

`./src/constant/error.type.js`

```js
fileUploadError: {
        code: '10201',
        message: '商品图片上传失败',
        result: ''
    }
```

## 8、添加图片静态回显

```shell
npm i koa-static
```

`./src/app/index.js`

```js
const koaStatic = require('koa-static')

app.use(koaStatic(path.join(__dirname, '../upload')))
```

## 9、上传文件类型过滤

`./src/controllor/products.controllor.js`

```js
const { fileUploadError, unSupportedFileType } = require('../constant/error.type')

const fileTypes = ['image/jpeg', 'image/png']
            if (!fileTypes.includes(file.mimetype)) {
                return ctx.app.emit('error', unSupportedFileType, ctx)
            }
```

`./src/constant/error.type.js`

```js
unSupportedFileType: {
        code: '10202',
        message: '不支持的上传文件格式',
        result: ''
    }
```

# 十八、校验中间件

## 1、安装

```shell
npm install koa-parameter
```

## 2、引用组件

`./src/app/index.js`

```js
const parameter = require('koa-parameter');

app.use(parameter(app))
```

## 3、调用验证

`./src/middleware/products.middleware.js`

```js
const { productsFormatError } = require('../constant/error.type')

const validator = async (ctx, next) => {
    try {
        ctx.verifyParams({
            products_name: { type: 'string', required: true },
            products_price: { type: 'number', required: true },
            products_num: { type: 'number', required: true },
            products_img: { type: 'string', requited: true }
        })
    } catch (error) {
        console.error(error)
        productsFormatError.result = error
        return ctx.app.emit('error', productsFormatError, ctx)
    }
    await next()
}

module.exports = { validator }
```

`./src/constant/error.type`

```js
    productsFormatError: {
        code: '10203',
        messsage: '商品参数错误',
        result: ''
    }
```

# 十九、发布商品信息

## 1、路由中间件

`./src/router/products.router.js`

```js
router.post('/', auth, hadAdminPermission, validator, create)
```

## 2、实现控制器create函数

`./src/controller/products.controller.js`

```js
const { createProducts } = require('../service/products.service')
async create(ctx) {
        try {
            const { createdAt, updatedAt, ...res } = await createProducts(ctx.request.body)
            ctx.body = {
                code: 0,
                message: '发布商品成功',
                result: res,
            }
        }
        catch (error) {
            console.error(error)
            return ctx.app.emit('error', publicProductsError, ctx)
        }
    }
```

## 3、实现服务层createProducts函数

`./src/service/products.service.js`

```js
const Products = require('../model/products.model')

async createProducts(products) {
        // 创建一个新用户
        const res = await Products.create(products);
        //console.log(res);
        //写入数据库操作
        return res.dataValues
    }
module.exports = new ProductsService()
```

## 4、建立数据模型同步数据库

`./src/model/products.model.js`

```js
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

//Products.sync({ force: true })

module.exports = Products
```

## 5、错误

`./src/constant/error.type.js`

```js
publicProductsError: {
        code: '10204',
        message: '发布商品错误',
        result: ''
    }
```

# 二十、修改用户信息

## 1、添加路由

`./src/router/products.router.js`

```js
const { upload, create, update } = require('../controller/products.controller')

router.put('/:id', auth, hadAdminPermission, validator, update)
```

## 2、控制层

`./src/controller/products.controller.js

```js
async update(ctx) {
        try {
            const res = await updateProducts(ctx.params.id, ctx.request.body)
            console.log(ctx.params)
            if (res) {
                ctx.body = {
                    code: 0,
                    message: '修改商品成功',
                    result: ''
                }
            }
            else {
                return ctx.app.emit('error', invalidProductsIDError, ctx)
            }
        }
        catch (error) {
            console.error(error)
            return ctx.app.emit('error', updateProductsError, ctx)
        }
    }
```

## 3、服务层

`./src/service/products.service.js`

```js
async updateProducts(id, products) {
        // 更新一个用户
        const res = await Products.update(products, { where: { id } });
        console.log(res[0]);
        //写入数据库操作
        return res[0] > 0 ? true : false
    }
```



## 4、错误

`./src/constant/error.type.js`

```js
publicProductsError: {
        code: '10204',
        message: '发布商品错误',
        result: ''
    }
```

# 21、硬删除商品信息

## 1、添加路由

`./src/router/products.router.js`

```js
//修改登录密码
router.patch('/', auth, cryptPassword, changePassword)
```

## 2、控制层

`./src/controller/products.controller.js`

```js
async remove(ctx) {
        const res = await removeProducts(ctx.params.id)
        //console.log(res)
        ctx.body = {
            code: 0,
            message: '删除商品成功',
            result: ''
        }
    }
```

## 3、服务层

`./src/service/products.service.js`

```js
async removeProducts(id) {
        const res = await Products.destroy({ where: { id } })
        return res[0] > 0 ? true : false
    }
```

# 22、标记删除商品信息

## 1、添加路由

`./src/router/products.router.js`

```js
//标记删除接口
router.post('/:id/off', auth, hadAdminPermission, paranoid)

//标记恢复删除接口
router.post('/:id/on', auth, hadAdminPermission, unparanoid)
```

## 2、控制层

`./src/controller/products.controller.js`

```js
async paranoid(ctx) {
        const res = await paranoidProducts(ctx.params.id)
        if (res) {
            ctx.body = {
                code: 0,
                message: '下架商品成功',
                result: ''
            }
        }
        else {
            return ctx.app.emit('error', invalidProductsIDError, ctx)
        }
    }
    async unparanoid(ctx) {
        const res = await unparanoidProducts(ctx.params.id)
        if (res) {
            ctx.body = {
                code: 0,
                message: '上架商品成功',
                result: ''
            }
        }
        else {
            return ctx.app.emit('error', invalidProductsIDError, ctx)
        }
    }
```

## 3、服务层

`./src/service/products.service.js`

```js
async paranoidProducts(id) {
        const res = await Products.destroy({ where: { id } })
        console.log(res)
        return res > 0 ? true : false
    }
    async unparanoidProducts(id) {
        const res = await Products.restore({ where: { id } })
        console.log(res)
        return res > 0 ? true : false
    }
```

# 23、获取商品列表信息

## 1、添加路由

`./src/router/products.router.js`

```js
//获取商品列表接口
router.get('/', findAll)
```

## 2、控制层

`./src/controller/products.controller.js`

```js
    async findAll(ctx) {
        //解析PageNum和PageSize
        const { PageNum = 1, PageSize = 10 } = ctx.request.query
        //调用数据处理的相关方法
        const res = await findProducts(PageNum, PageSize)
        //返回结果
        ctx.body = {
            code: 0,
            message: '获取商品列表成功',
            result: res
        }
    }
```

## 3、服务层

`./src/service/products.service.js`

```js
    async findProducts(PageNum, PageSize) {
        //获取商品总数
        const count = await Products.count()
        //获取分页的具体数据
        const offset = (PageNum - 1) * PageSize
        const rows = await Products.findAll({ offset: offset, limit: PageSize * 1 })
        return rows
    }
```

## 4、服务层代码优化

```js
    async findProducts(PageNum, PageSize) {
        // //获取商品总数
        // const count = await Products.count()
        // //获取分页的具体数据
        // const offset = (PageNum - 1) * PageSize
        // const rows = await Products.findAll({ offset: offset, limit: PageSize * 1 })

        const offset = (PageNum - 1) * PageSize
        const { count, rows } = await Products.findAndCountAll({ offset: offset, limit: PageSize * 1 })
        return {
            PageNum,
            PageSize,
            total: count,
            result: rows
        }
    }
```

