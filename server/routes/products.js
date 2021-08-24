const { Router } = require('express')
const ProductsController = require('../controllers/Product')
const router = new Router()

router.get('/:index', ProductsController.getItems)

module.exports = router
