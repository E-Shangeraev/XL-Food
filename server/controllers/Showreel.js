const ShowreelModel = require('../models/Showreel')
const ApiError = require('../error/ApiError')

class ShowreelController {
  async getOne(req, res, next) {
    try {
      const items = await ShowreelModel.findOne()
      res.status(200).json(items)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
}

module.exports = new ShowreelController()
