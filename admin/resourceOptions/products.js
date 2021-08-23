const AdminJS = require('adminjs')
const Product = require('../../models/Product')
const features = require('../features')

/** @type {AdminJS.ResourceOtions} */
const options = {
  listProperties: ['uploadedFile', 'category', 'name', 'composition', 'cost'],
  editProperties: [
    'uploadedFile',
    'category',
    'name',
    'weight',
    'composition',
    'cost',
  ],
  navigation: {
    icon: 'NoodleBowl',
  },
  parent: {
    name: 'Администрирование',
    icon: 'UserAdmin',
  },
  properties: {
    mimeType: { isVisible: true },
    composition: { type: 'textarea' },
  },
}

module.exports = {
  options,
  resource: Product,
  features,
}
