// ==== Imports ====
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const { default: AdminJS } = require('adminjs')
const options = require('./admin/admin.options')
require('dotenv').config()

const app = express()

// ==== Routes ====
const { buildAdminRouter } = require('./routes')

// ==== Admin options ====
const admin = new AdminJS(options)
const adminRouter = buildAdminRouter(admin)

// ==== Middlewares ====
app.use(express.json({ extended: true }))

// ==== API ====
app.use(admin.options.rootPath, adminRouter)
// app.use('/api/products', productsRouter)

// ==== App Start On Production ====
if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

// ==== App Start ====
const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI

const start = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    app.listen(PORT, () => console.log(`App has been started on port ${PORT}`))
  } catch (err) {
    console.log('Server error', err.message)
    process.exit(1)
  }
}
start()
