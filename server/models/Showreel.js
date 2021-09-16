const { Schema, model } = require('mongoose')

const ShowreelSchema = new Schema({
  uploadedVideo: JSON,
  uploadedImage: JSON,
  alt: { type: String, required: true },
})

const ShowreelModel = model('Showreel', ShowreelSchema)

module.exports = ShowreelModel
