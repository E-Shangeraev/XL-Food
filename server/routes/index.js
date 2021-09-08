const Router = require('express')
const categoriesRouter = require('./categories')
const productsRouter = require('./products')
const cartRouter = require('./cart')
const mailRouter = require('./mail')

const router = new Router()

router.use('/categories', categoriesRouter)
router.use('/products', productsRouter)
router.use('/cart', cartRouter)
router.use('/mail', mailRouter)

module.exports = router
