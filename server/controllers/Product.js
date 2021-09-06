const ProductModel = require('../models/Product')
const ApiError = require('../error/ApiError')

class ProductController {
  async getAll(req, res, next) {
    try {
      const items = await ProductModel.aggregate([
        {
          $lookup: {
            'from': 'categories',
            'localField': 'category',
            'foreignField': '_id',
            'as': 'category',
          },
        },
        { $unwind: { path: '$category', preserveNullAndEmptyArrays: true } },
        { $sort: { 'category.index': 1 } },
      ])

      res.status(200).json(items)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
}

module.exports = new ProductController()
