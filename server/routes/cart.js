const { Router } = require('express')
const CartController = require('../controllers/Cart')
const router = new Router()

router.post('/check_promocode', CartController.checkPromocode)

module.exports = router
