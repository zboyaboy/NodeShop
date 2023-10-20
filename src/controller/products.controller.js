const path = require('path')


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
}
module.exports = new ProductsController()