const AdminJS = require('adminjs')
const Category = require('../../models/Category')

/** @type {AdminJS.ResourceOtions} */
const options = {
  listProperties: ['index', 'name'],
  editProperties: ['index', 'name'],
  navigation: {
    icon: 'Category',
  },
  properties: {
    mimeType: { isVisible: true },
  },
}

module.exports = {
  options,
  resource: Category,
}
