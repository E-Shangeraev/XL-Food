const CategoryModel = require('../models/Category')

class Category {
  async getItems(req, res) {
    try {
      const items = await CategoryModel.find().sort({ index: 1 })
      res.status(200).json(items)
    } catch (error) {
      res.status(500).json({
        message: error.message,
      })
    }
  }
}

module.exports = new Category()
