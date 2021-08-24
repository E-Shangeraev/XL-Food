const AdminJS = require('adminjs')
const argon2 = require('argon2')

/** @type {AdminJS.Before} */
const before = async req => {
  if (req.method === 'post') {
    const { password, ...other } = req.payload

    if (password) {
      const encryptedPassword = await argon2.hash(password)

      return {
        ...req,
        payload: {
          ...other,
          encryptedPassword,
        },
      }
    }
  }
  return req
}

/** @type {AdminJS.After<AdminJS.ActionResponse>}*/
const after = async res => {
  if (res.record && res.record.errors && res.record.errors.encryptedPassword) {
    res.record.errors.password = res.record.errors.encryptedPassword
  }
  return res
}

module.exports = { after, before }
