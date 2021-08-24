const { Schema, model } = require('mongoose')

const CategorySchema = new Schema({
  index: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
})

const CategoryModel = model('Categories', CategorySchema)

module.exports = CategoryModel
