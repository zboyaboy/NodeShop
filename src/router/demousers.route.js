const Router = require('@koa/router')
const { userValidator, verifyUser, cryptPassword, verifyLogin } = require('../middleware/user.middleware')
const { auth } = require('../middleware/auth.middleware')
const { register, login, changePassword } = require('../controller/user.controller')

const router = new Router({ prefix: '/api/v1' })

//GET /users/
router.get('/', (ctx, next) => {
    ctx.body = 'hello users'
    console.log('111')
})


//登录接口
router.post('/auth/login', userValidator, verifyLogin, cryptPassword, login)

//获取登录用户信息
router.get('/users/me', (ctx) => {
    ctx.body = {
        code: "00000",
        data: {
            userId: 2,
            nickname: "系统管理员",
            avatar:
                "https://oss.youlai.tech/youlai-boot/2023/05/16/811270ef31f548af9cffc026dfc3777b.gif",
            roles: ["ADMIN"],
            perms: [
                "sys:menu:delete",
                "sys:dept:edit",
                "sys:dict_type:add",
                "sys:dict:edit",
                "sys:dict:delete",
                "sys:dict_type:edit",
                "sys:menu:add",
                "sys:user:add",
                "sys:role:edit",
                "sys:dept:delete",
                "sys:user:edit",
                "sys:user:delete",
                "sys:user:reset_pwd",
                "sys:dept:add",
                "sys:role:delete",
                "sys:dict_type:delete",
                "sys:menu:edit",
                "sys:dict:add",
                "sys:role:add",
            ],
        },
        msg: "一切ok",
    }
})
router.get('/menus/routes', (ctx) => {
    ctx.body = {
        code: "00000",
        data: [
            {
                path: "/system",
                component: "Layout",
                redirect: "/system/user",
                meta: {
                    title: "系统管理",
                    icon: "system",
                    hidden: false,
                    roles: ["ADMIN"],
                    keepAlive: true,
                },
                children: [
                    {
                        path: "user",
                        component: "system/user/index",
                        name: "User",
                        meta: {
                            title: "用户管理",
                            icon: "user",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true,
                        },
                    },
                    {
                        path: "role",
                        component: "system/role/index",
                        name: "Role",
                        meta: {
                            title: "角色管理",
                            icon: "role",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true,
                        },
                    },
                    {
                        path: "menu",
                        component: "system/menu/index",
                        name: "Menu",
                        meta: {
                            title: "菜单管理",
                            icon: "menu",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true,
                        },
                    },
                    {
                        path: "dept",
                        component: "system/dept/index",
                        name: "Dept",
                        meta: {
                            title: "部门管理",
                            icon: "tree",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true,
                        },
                    },
                    {
                        path: "dict",
                        component: "system/dict/index",
                        name: "DictType",
                        meta: {
                            title: "字典管理",
                            icon: "dict",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true,
                        },
                    },
                ],
            },

            {
                path: "/api",
                component: "Layout",
                meta: {
                    title: "接口",
                    icon: "api",
                    hidden: false,
                    roles: ["ADMIN"],
                    keepAlive: true,
                },
                children: [
                    {
                        path: "apidoc",
                        component: "demo/api-doc",
                        name: "Apidoc",
                        meta: {
                            title: "接口文档",
                            icon: "api",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: false,
                        },
                    },
                ],
            },
            {
                path: "/external-link",
                component: "Layout",
                redirect: "noredirect",
                meta: {
                    title: "外部链接",
                    icon: "link",
                    hidden: false,
                    roles: ["ADMIN"],
                    keepAlive: true,
                },
                children: [
                    {
                        path: "https://juejin.cn/post/7228990409909108793",
                        meta: {
                            title: "document",
                            icon: "document",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true,
                        },
                    },
                ],
            },
            {
                path: "/multi-level",
                component: "Layout",
                redirect: "/multi-level/multi-level1",
                meta: {
                    title: "多级菜单",
                    icon: "multi_level",
                    hidden: false,
                    roles: ["ADMIN"],
                    keepAlive: true,
                },
                children: [
                    {
                        path: "multi-level1",
                        component: "demo/multi-level/level1",
                        redirect: "/multi-level/multi-level2",
                        meta: {
                            title: "菜单一级",
                            icon: "",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true,
                        },
                        children: [
                            {
                                path: "multi-level2",
                                component: "demo/multi-level/children/level2",
                                redirect: "/multi-level/multi-level2/multi-level3-1",
                                meta: {
                                    title: "菜单二级",
                                    icon: "",
                                    hidden: false,
                                    roles: ["ADMIN"],
                                    keepAlive: true,
                                },
                                children: [
                                    {
                                        path: "multi-level3-1",
                                        component: "demo/multi-level/children/children/level3-1",
                                        name: "MultiLevel31",
                                        meta: {
                                            title: "菜单三级-1",
                                            icon: "",
                                            hidden: false,
                                            roles: ["ADMIN"],
                                            keepAlive: true,
                                        },
                                    },
                                    {
                                        path: "multi-level3-2",
                                        component: "demo/multi-level/children/children/level3-2",
                                        name: "MultiLevel32",
                                        meta: {
                                            title: "菜单三级-2",
                                            icon: "",
                                            hidden: false,
                                            roles: ["ADMIN"],
                                            keepAlive: true,
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                path: "/component",
                component: "Layout",
                meta: {
                    title: "组件封装",
                    icon: "menu",
                    hidden: false,
                    roles: ["ADMIN"],
                    keepAlive: true,
                },
                children: [
                    {
                        path: "wang-editor",
                        component: "demo/wang-editor",
                        name: "wang-editor",
                        meta: {
                            title: "富文本编辑器",
                            icon: "",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true,
                        },
                    },
                    {
                        path: "upload",
                        component: "demo/upload",
                        name: "upload",
                        meta: {
                            title: "图片上传",
                            icon: "",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true,
                        },
                    },
                    {
                        path: "icon-selector",
                        component: "demo/icon-selector",
                        name: "icon-selector",
                        meta: {
                            title: "图标选择器",
                            icon: "",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true,
                        },
                    },
                    {
                        path: "dict-demo",
                        component: "demo/dict",
                        name: "DictDemo",
                        meta: {
                            title: "字典组件",
                            icon: "",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true,
                        },
                    },
                    {
                        path: "taginput",
                        component: "demo/taginput",
                        name: "taginput",
                        meta: {
                            title: "标签输入框",
                            icon: "",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true,
                        },
                    },
                    {
                        path: "signature",
                        component: "demo/signature",
                        name: "signature",
                        meta: {
                            title: "签名",
                            icon: "",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true,
                        },
                    },
                    {
                        path: "table",
                        component: "demo/table",
                        name: "Table",
                        meta: {
                            title: "表格",
                            icon: "",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true,
                        },
                    },
                ],
            },
            {
                path: "/table",
                component: "Layout",
                meta: {
                    title: "Table",
                    icon: "table",
                    hidden: false,
                    roles: ["ADMIN"],
                    keepAlive: true,
                },
                children: [
                    {
                        path: "dynamic-table",
                        component: "demo/table/dynamic-table/index",
                        name: "DynamicTable",
                        meta: {
                            title: "动态Table",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true,
                        },
                    },
                    {
                        path: "drag-table",
                        component: "demo/table/drag-table",
                        name: "DragTable",
                        meta: {
                            title: "拖拽Table",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true,
                        },
                    },
                    {
                        path: "complex-table",
                        component: "demo/table/complex-table",
                        name: "ComplexTable",
                        meta: {
                            title: "综合Table",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true,
                        },
                    },
                ],
            },
            {
                path: "/function",
                component: "Layout",
                meta: {
                    title: "功能演示",
                    icon: "menu",
                    hidden: false,
                    roles: ["ADMIN"],
                    keepAlive: true,
                },
                children: [
                    {
                        path: "permission",
                        component: "demo/permission/page",
                        name: "Permission",
                        meta: {
                            title: "Permission",
                            icon: "",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true,
                        },
                    },
                    {
                        path: "icon-demo",
                        component: "demo/icons",
                        name: "Icons",
                        meta: {
                            title: "图标",
                            icon: "",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true,
                        },
                    },
                    {
                        path: "websocket",
                        component: "demo/websocket",
                        name: "Websocket",
                        meta: {
                            title: "Websocket",
                            icon: "",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true,
                        },
                    },
                    {
                        path: "other",
                        component: "demo/other",
                        meta: {
                            title: "敬请期待...",
                            icon: "",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true,
                        },
                    },
                ],
            },
        ],
        msg: "一切ok",
    }
})
router.get('/auth/captcha', (ctx) => {
    ctx.body = {
        code: "00000",
        data: {
            verifyCodeKey: "534b8ef2b0a24121bec76391ddd159f9",
            verifyCodeBase64:
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAAkCAIAAADNSmkJAAAFKUlEQVR4Xu2ZXUwcVRiGV70wMWo08V5NvPXCrDbFaGpMaZW2hqQxaoiJTRsaMBCNSYtpa2JTKiFSelFa+Q/QZcMWqEhBlh+htbEpZhMrBQrlJ0hBywLLyrJ0WZbje3bqOvPNLHPWrDvdOE9ONmfe78zkzMs335wzWJhJQrBQweS/wTQ6QWgYHdoIOcecOe05O+t2WkutO+p2ZF3Ksg/YV9ZW6FATYajR3nveg60H9327r3O8c35lHgp+r05dPdJzBL73TPSQ8SaCKIxGLsPlop+K0JHrEkPuoT31e5qGmmjARACF0agYyGVNlyVm/pzZXrN9fHGcBkz0UBid+31u93i3XFFT80vN8cvHqWqih8Lo1NpUqS5vwh3vnd223VQ10UNh9NbyrcFQUK6oCawHUipSqGqiB83oBf+CXFGDMp1mS6OqiR4Ko7FexkpOrqhpHGw82nOUqiZ6KIzGrkRuorW0dJMmOy+hOCfYGzb2RBFv6HRO0gEJw/U7y+pgL1bwmTxexN6sZ31TdEwEhdG+gA+7EqyXpUO1uZH20cWL8hMTRt1N9tBXzCJrOIRoCPJpSO2RAp4HmtCdIfZ+2JWgEBN9LbR28seTGU0Zue1tMLp+YIAMSADzfvbkKX4/eb28j4YODiGin3heqmIlLja5hAUCu+nmGY3JWKvpMAlqNGgebsauBOvlqSX+JEx7p7EbTLen53XlzfmWUioqXikrc68Y8N2juJ/fyVsNChGHEE//rBANYWaZz+TRQqpLaBgNsPfDrgSpbS21YtV87IdjrlkX9JZbt5DOma2t9ITo5F+5glN22WwL/n+yDv00mw06orKxOqQ5+J04hhViwzAXETIcJDVm8uxZqktoGx2Nj9t43Wgaul/ERQiGQvtbWnDWgZYW9CXlQFjZ/7ciyHNn+Z2MexTimIeLz59TiIln0M1e+IbPpOAaDUnEYPTi6iqKxpbycs/qKo1tCslfKcffPn9enuMiPPY1vxO/ckeFQ4h46cdGqUWoidE/y54q5tPY5WDrGzQqIXot4BgchEE57e00IMCw2/1qZSVO/7SjA78o9INzcxsbrL+fnTnDDh9mmZn8F30oG1Hm+nABv5mQMopDS/h1HxtqTzWbABMe9sxpPoe9zezeOo1GELqWhPS8t46M0IAYHbdvR1aHbaOjbjfLz2eFhez6dba4yAfgF30o0BFVE8+Mjh/wFxPI+I5mAEHU6Ls+38vhTFwOBGhMDF8gkFpbC5ffsdv/uBs6dIj19dExEtARVXv9YNbop8NFY3aZ6gRRo+tu3IBHnzmdNCBMXldXJKPfL74WzWUJRE+coDUknqsOdZXQbAJYwluVTbOZI3Qt8GFzMwxyjo3RgBiN4fr+elXVpZGRLWXl6PdOTtJBSlBDUK/lnIrjOlrtqWYTQDJaF6FrTXu9sOa1ysrVoM5HVE1GFxZQcyJ/p+xzv6K/rbr6N6+XDpUBl0tKFIrbz78qWB6YnWFMCBld4XLBms+7df75ook/GNzb0GCV7U1Qfz9p64TyQWNjYD3qe9rj4SMJtQP3MyjSDPzWIRHPjH7X4YAvfXoPuyZf9Pbi3PcuXIh4mp3NllYC6XY79C+jl2o8PBipxjnBttn4MgMNnWgfcRJGPI2OL8hTj3LloIlmRicvBhiNykvecpqoa3RSY4DRcLAwyicuOepVR1JjgNFYHWONHL04czTX0UmNAUYD7Pr+xc4wqTHGaBb2OtZvHUmNYUazcA2J6etdUmOk0f8rTKMTxF91RG0D1SwYGwAAAABJRU5ErkJggg==",
        },
        msg: "一切ok",
    }
})
router.delete('/auth/logout', (ctx) => {
    ctx.body = {

        code: "00000",
        data: {},
        msg: "string",

    }
})
module.exports = router