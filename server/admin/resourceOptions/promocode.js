const AdminJS = require('adminjs')
const Promocode = require('../../models/Promocode')

/** @type {AdminJS.ResourceOtions} */
const options = {
  listProperties: ['promocode', 'isValid'],
  editProperties: ['promocode', 'isValid'],
  navigation: {
    icon: 'Percentage',
  },
  properties: {
    mimeType: { isVisible: true },
  },
}

module.exports = {
  options,
  resource: Promocode,
}
