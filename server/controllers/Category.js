const CategoryModel = require('../models/Category')
const ApiError = require('../error/ApiError')

class CategoryController {
  async getAll(req, res, next) {
    try {
      const items = await CategoryModel.find().sort({ index: 1 })
      res.status(200).json(items)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
}

module.exports = new CategoryController()
