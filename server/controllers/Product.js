const ProductModel = require('../models/Product')

class ProductController {
  async getAll(req, res) {
    try {
      let items = await ProductModel.find().populate('category').exec()
      res.status(200).json(items)
    } catch (error) {
      res.status(500).json({
        message: error.message,
      })
    }
  }
}

module.exports = new ProductController()
