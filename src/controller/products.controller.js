const path = require('path')
const { publicProductsError, invalidProductsIDError } = require('../constant/error.type')
const { createProducts, updateProducts, removeProducts } = require('../service/products.service')

class ProductsController {
    async upload(ctx, next) {
        const { file } = ctx.request.files
        //console.log(file)
        if (file) {
            const fileTypes = ['image/jpeg', 'image/png']
            if (!fileTypes.includes(file.mimetype)) {
                return ctx.app.emit('error', unSupportedFileType, ctx)
            }
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

    async update(ctx) {
        try {
            const res = await updateProducts(ctx.params.id, ctx.request.body)
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
    async remove(ctx) {
        const res = await removeProducts(ctx.params.id)
        //console.log(res)
        ctx.body = {
            code: 0,
            message: '删除商品成功',
            result: ''
        }
    }
}
module.exports = new ProductsController()