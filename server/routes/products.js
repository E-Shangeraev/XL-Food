const { Router } = require('express')
const ProductsController = require('../controllers/Product')
const router = new Router()

router.get('/', ProductsController.getAll)

module.exports = router
