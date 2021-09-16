const AdminJS = require('adminjs')
const Showreel = require('../../models/Showreel')
const uploadFeature = require('@adminjs/upload')
require('dotenv').config()

const region = process.env.AWS_REGION
const bucket = process.env.AWS_BUCKET
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
const accessKeyId = process.env.AWS_ACCESS_KEY_ID

const features = [
  uploadFeature({
    provider: {
      aws: { region, bucket, secretAccessKey, accessKeyId, expires: 0 },
    },
    properties: {
      filePath: 'uploadedImage.filePath',
      filename: 'uploadedImage.filename',
      file: 'uploadedImage',
      filesToDelete: 'uploadedImage.filesToDelete',
      key: 'uploadedImage.path',
      bucket: 'uploadedImage.folder',
      size: 'uploadedImage.size',
      mimeType: 'uploadedImage.mime',
    },
    validation: {
      mimeTypes: ['image/webp', 'image/png', 'image/jpg', 'image/jpeg'],
    },
  }),
  uploadFeature({
    provider: {
      aws: { region, bucket, secretAccessKey, accessKeyId, expires: 0 },
    },
    properties: {
      filePath: 'uploadedVideo.filePath',
      filename: 'uploadedVideo.filename',
      file: 'uploadedVideo',
      filesToDelete: 'uploadedVideo.filesToDelete',
      key: 'uploadedVideo.path',
      bucket: 'uploadedVideo.folder',
      size: 'uploadedVideo.size',
      mimeType: 'uploadedVideo.mime',
    },
    validation: {
      mimeTypes: ['video/webm', 'video/mp4', 'video/ogg'],
    },
    multiple: true,
  }),
]

/** @type {AdminJS.ResourceOtions} */
const options = {
  listProperties: ['uploadedVideo', 'uploadedImage', 'alt'],
  editProperties: ['uploadedVideo', 'uploadedImage', 'alt'],
  navigation: {
    icon: 'PlayFilled',
  },
  properties: {
    mimeType: { isVisible: true },
  },
}

module.exports = {
  options,
  resource: Showreel,
  features,
}
