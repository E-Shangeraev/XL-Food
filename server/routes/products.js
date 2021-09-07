const { Router } = require('express')
const ProductsController = require('../controllers/Product')
const router = new Router()

router.get('/', ProductsController.getAll)
router.get('/recommended', ProductsController.getRecommended)

module.exports = router
