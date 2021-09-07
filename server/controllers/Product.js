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
  async getRecommended(req, res, next) {
    function randomInt(min, max) {
      const rand = min - 0.5 + Math.random() * (max - min + 1)
      return Math.round(rand)
    }

    function randomProduct(productsArray) {
      const max = productsArray.length - 1
      const min = 0
      const random = randomInt(min, max)

      return productsArray[random]
    }

    try {
      ProductModel.find()
        .populate('category')
        .exec(function (err, products) {
          const { count } = req.query
          const snacks = randomProduct(
            products.filter(
              p => p.category.name === 'Закуски' && !p.name.match(/^соус/gi),
            ),
          )
          const salads = randomProduct(
            products.filter(p => p.category.name === 'Салаты'),
          )
          const other = randomProduct(
            products.filter(p => {
              if (p.category.name === 'Разное') {
                if (count <= 3 && p.isDrink) {
                  return true
                }
                if (count > 3) {
                  return true
                }
              }
              return false
            }),
          )

          res.status(200).json([snacks, salads, other])
        })
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
}

module.exports = new ProductController()
