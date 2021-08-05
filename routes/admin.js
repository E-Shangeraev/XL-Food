const { default: AdminBro } = require('admin-bro')
const { buildAuthenticatedRouter } = require('@admin-bro/express')
const express = require('express')
const argon2 = require('argon2')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const { Admin } = require('../models/Admin')

/**
 * @param {AdminBro} admin
 * @return {express.Router} router
 */
const buildAdminRouter = admin => {
  const router = buildAuthenticatedRouter(
    admin,
    {
      cookieName: 'admin-bro',
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
