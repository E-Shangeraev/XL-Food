const AdminJS = require('adminjs')

/** @type {AdminJS.ResourceOtions} */
const options = {
  listProperties: ['title', 'text', 'date', 'uploadedFile'],
  editProperties: ['title', 'text', 'date', 'uploadedFile'],
  navigation: {
    icon: 'Bullhorn',
  },
  parent: {
    name: 'Администрирование',
    icon: 'UserAdmin',
  },
  properties: {
    mimeType: { isVisible: true },
  },
}

module.exports = options
