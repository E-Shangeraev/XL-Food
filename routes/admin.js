const { default: AdminJS } = require('adminjs')
const { buildAuthenticatedRouter } = require('@adminjs/express')
const express = require('express')
const argon2 = require('argon2')
const MongoStore = require('connect-mongo')

const { Admin } = require('../models/Admin')

/**
 * @param {AdminJS} admin
 * @return {express.Router} router
 */
const buildAdminRouter = admin => {
  const router = buildAuthenticatedRouter(
    admin,
    {
      cookieName: 'adminjs',
      cookiePassword: 'superlongandcomplicatedname',
      authenticate: async (login, password) => {
        const user = await Admin.findOne({ login })

        if (user && (await argon2.verify(user.encryptedPassword, password))) {
          return user
        }
        return false
      },
    },
    null,
    {
      resave: false,
      saveUninitialized: true,
      store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    },
  )
  return router
}

module.exports = buildAdminRouter
