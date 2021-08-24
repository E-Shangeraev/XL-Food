const ProductModel = require('../models/Product')
const ApiError = require('../error/ApiError')

class ProductController {
  async getAll(req, res, next) {
    try {
      const items = await ProductModel.find().populate('category').exec()
      res.status(200).json(items)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
}

module.exports = new ProductController()
