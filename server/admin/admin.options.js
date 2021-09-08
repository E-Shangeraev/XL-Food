require('dotenv').config()
const { default: AdminJS } = require('adminjs')
const AdminJSMongoose = require('@adminjs/mongoose')

const { Admin, Products, Categories, Promocode } = require('./resourceOptions')

AdminJS.registerAdapter(AdminJSMongoose)

/** @type {import('adminjs').AdminJSOptions} */
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
        Categories: 'Категории товаров',
      },
      buttons: {
        filter: 'Фильтр',
        save: 'Сохранить',
      },
      resources: {
        Products: {
          properties: {
            uploadedFile: 'Изображение',
            category: 'Категория товара',
            name: 'Название',
            weight: 'Вес',
            composition: 'Состав',
            cost: 'Стоимость',
            isDrink: 'Напиток',
          },
        },
        Categories: {
          properties: {
            index: 'Порядковый номер',
            name: 'Название категории',
          },
        },
        Promocode: {
          properties: {
            promocode: 'Промокод',
            isValid: 'Действителен',
            'isValid.yes': 'Да',
            'isValid.no': 'Нет',
          },
        },
      },
    },
  },
  resources: [Admin, Products, Categories, Promocode],
  branding: {
    companyName: 'XL Food',
    logo: '',
    softwareBrothers: false,
  },
}

module.exports = options
