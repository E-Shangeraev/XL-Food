const { Router } = require('express')
const ShowreelController = require('../controllers/Showreel')
const router = new Router()

router.get('/', ShowreelController.getOne)

module.exports = router
