const ProductModel = require('../models/Product')

class ProductController {
  async getItems(req, res) {
    try {
      const { index } = req.params
      const items = await ProductModel.find().populate({
        path: 'category',
        match: {
          [`category.index`]: index,
        },
        populate: [{ path: 'category.index' }, { path: 'category.name' }],
      })
      res.status(200).json(items)
    } catch (error) {
      res.status(500).json({
        message: error.message,
      })
    }
  }
}

module.exports = new ProductController()
