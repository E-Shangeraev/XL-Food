const { Types, Schema, model } = require('mongoose')

const ProductShema = new Schema({
  uploadedFile: JSON,
  category: { type: Types.ObjectId, ref: 'Categories' },
  name: { type: String, required: true },
  weight: { type: Number, required: false },
  composition: { type: String, required: false },
  cost: { type: Number, required: true },
})

const ProductModel = model('Products', ProductShema)

module.exports = ProductModel
