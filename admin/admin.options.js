const { default: AdminBro } = require('admin-bro')
const AdminBroMongoose = require('@admin-bro/mongoose')
const uploadFeature = require('@admin-bro/upload')
require('dotenv').config()

const { Admin } = require('./resourceOptions')
// const NewsOptions = require('./resourceOptions')
// const News = require('../models/News')

const region = process.env.AWSRegion
const bucket = process.env.AWSBucket
const secretAccessKey = process.env.AWSSecretAccessKey
const accessKeyId = process.env.AWSAccessKeyID

const features = [
  uploadFeature({
    provider: {
      aws: { region, bucket, secretAccessKey, accessKeyId, expires: 0 },
    },
    properties: {
      filename: 'uploadedFile.filename',
      file: 'uploadedFile',
      key: 'uploadedFile.path',
      bucket: 'uploadedFile.folder',
      size: 'uploadedFile.size',
      mimeType: 'mimeType',
    },
    validation: {
      mimeTypes: ['image/png', 'image/jpg', 'image/jpeg'],
    },
  }),
]

AdminBro.registerAdapter(AdminBroMongoose)

/** @type {import('admin-bro').AdminBroOptions} */
const options = {
  locale: {
    language: 'rus',
    translations: {
      actions: {
        new: 'Добавить',
        edit: 'Редактировать',
        show: 'Подробнее',
        delete: 'Удалить',
        list: 'Записи',
        search: 'Искать',
        addNewItem: 'Добавить',
      },
      labels: {
        Admin: 'Администраторы',
        Products: 'Продукты',
      },
      buttons: {
        filter: 'Фильтр',
        save: 'Сохранить',
      },
      resources: {
        // News: {
        //   properties: {
        //     uploadedFile: 'Изображение',
        //     title: 'Заголовок',
        //     text: 'Текст',
        //     date: 'Дата публикации',
        //   },
        // },
      },
    },
  },
  resources: [
    Admin,
    // { resource: News, options: NewsOptions, features },
  ],
  branding: {
    companyName: 'XL Food',
    logo: '',
    softwareBrothers: false,
  },
}

module.exports = options
