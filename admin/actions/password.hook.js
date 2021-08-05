const AdminBro = require('admin-bro')
const argon2 = require('argon2')

/** @type {AdminBro.Before} */
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

/** @type {AdminBro.After<AdminBro.ActionResponse>}*/
const after = async res => {
  if (res.record && res.record.errors && res.record.errors.encryptedPassword) {
    res.record.errors.password = res.record.errors.encryptedPassword
  }
  return res
}

module.exports = { after, before }
