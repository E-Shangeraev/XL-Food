const { Router } = require('express')
const CategoriesController = require('../controllers/Category')
const router = new Router()

router.get('/', CategoriesController.getAll)

module.exports = router
