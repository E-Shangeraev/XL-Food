const PromocodeModel = require('../models/Promocode')
const ApiError = require('../error/ApiError')

class CartController {
  async checkPromocode(req, res, next) {
    try {
      const codeIsValid = await PromocodeModel.findOne({
        promocode: req.body.promocode.trim(),
        'isValid.yes': true,
      })
      if (codeIsValid) {
        return res.status(201).send(true)
      }
      return res.status(404).send(false)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
}

module.exports = new CartController()
