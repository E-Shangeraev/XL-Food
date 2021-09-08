const { Schema, model } = require('mongoose')

const PromocodeShema = new Schema({
  promocode: { type: String, required: true },
  isValid: {
    type: {
      yes: { type: Boolean, default: true },
      no: { type: Boolean },
    },
    required: true,
  },
})

const PromocodeModel = model('Promocode', PromocodeShema)

module.exports = PromocodeModel
