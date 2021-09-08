const { Router } = require('express')
const Mail = require('../controllers/Mail')
const router = Router()

router.post('/', Mail.send)

module.exports = router
