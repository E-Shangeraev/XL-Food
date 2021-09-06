const { Types, Schema, model } = require('mongoose')

const ProductShema = new Schema({
  uploadedFile: JSON,
  category: { type: Types.ObjectId, ref: 'Categories' },
  categoryIndex: { type: Number, virtuals: true },
  name: { type: String, required: true },
  weight: { type: Number, required: false },
  composition: { type: String, required: false },
  cost: { type: Number, required: true },
})

ProductShema.virtual('category_index', {
  ref: 'Categories',
  localField: 'categoryIndex',
  foreignField: 'index',
  options: { sort: { index: 1 }, limit: 10 },
})

const ProductModel = model('Products', ProductShema)

module.exports = ProductModel
