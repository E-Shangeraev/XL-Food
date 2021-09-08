const nodemailer = require('nodemailer')
require('dotenv').config()

class Mail {
  async sendMail(body) {
    console.log(body)
    if (!Object.keys(body).length) {
      throw new Error('Отсутствует тело запроса')
    }
    const mailBody = this.createMailBody(body)
    const mailOption = this.createMailOption(mailBody, 'XLfood — новый заказ')
    const mailTransport = this.createMailTransport()

    return await mailTransport.sendMail(mailOption)
  }
  createMailOption(data, subject) {
    const mailOption = {
      from: `<${process.env.MAIL_LOGIN}>`,
      to: 'eldar@mygang.ru',
      subject: subject,
      html: data,
    }

    return mailOption
  }
  createMailTransport() {
    const transporter = nodemailer.createTransport({
      host: 'smtp.yandex.ru',
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_LOGIN,
        pass: process.env.MAIL_PASSWORD,
      },
    })

    return transporter
  }
  createMailBody(body) {
    return `
    <!DOCTYPE html>
    <html lang="ru">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </head>
      <body
        style="
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
          margin: 0;
          padding: 0;
          line-height: 100%;
          color: #ffffff;
          width: 100% !important;
          font-family: 'Noto Sans', arial, sans-serif !important;
        "
      >
        <div
          class="mail"
          style="
            width: 100%;
            margin: 0 auto;
            background-position: top;
            background-size: cover;
            background-repeat: no-repeat;
          "
        >
          <div class="wrapper" style="margin: 0 auto; max-width: 850px">
            <div
              class="header"
              style="
                position: relative;
                width: 100%;
                background-color: #e9d735;
                border-bottom: 1px solid #888;
                box-sizing: border-box;
                padding: 20px;
              "
            >
              <div
                class="header__left"
                style="width: 100%; text-align: center; margin-bottom: 30px"
              >
                <a
                  href="http://xlfood.ru"
                  target="_blank"
                  class="logo"
                  style="display: inline-block; width: fit-content; height: 100%"
                >
                  <img
                    src="http://xlfood.ru/logo.png"
                    alt="Логотип XLfood"
                    style="
                      outline: none;
                      text-decoration: none;
                      border: none;
                      -ms-interpolation-mode: bicubic;
                      margin: 0;
                      padding: 0;
                      display: block;
                      width: 70px;
                      height: auto;
                      max-width: 100% !important;
                    "
                  />
                </a>
              </div>
              <div class="header__right" style="width: 100%; text-align: center">
                <h2
                  class="title"
                  style="margin: 0; font-size: 26px; line-height: 100%; color: #000"
                >
                  XLfood
                </h2>
                <p style="margin: 15px 0; color: #000">
                  Новый заказ
                  <a
                    href="http://xlfood.ru"
                    target="_blank"
                    style="color: #000"
                    >xlfood.ru</a
                  >
                </p>
              </div>
            </div>
            <div
              class="body"
              style="padding: 20px; color: #000; background-color: #f1f1f1"
            >
              <ul
                class="body__list"
                style="padding: 0; margin: 0; list-style: none"
              >
                <li style="padding: 25px 0; font-size: 14px">
                  <b
                    style="
                      display: inline-block;
                      width: 130px;
                      border-right: 1px solid #adadad;
                    "
                    >Тип:</b
                  >
                  <span style="padding-left: 15px">${body.delivery}</span>
                </li>
                <li style="padding: 25px 0; font-size: 14px">
                  <b
                    style="
                      display: inline-block;
                      width: 130px;
                      border-right: 1px solid #adadad;
                    "
                    >Имя:</b
                  >
                  <span style="padding-left: 15px">${body.name}</span>
                </li>
                <li style="padding: 25px 0; font-size: 14px">
                  <b
                    style="
                      display: inline-block;
                      width: 130px;
                      border-right: 1px solid #adadad;
                    "
                    >Телефон:</b
                  >
                  <a href="tel:${body.phone}" style="padding-left: 15px"
                    >${body.phone}</a
                  >
                </li>
                ${
                  body.address
                    ? `
                  <li style="padding: 25px 0; font-size: 14px">
                    <b
                      style="
                        display: inline-block;
                        width: 130px;
                        border-right: 1px solid #adadad;
                      "
                      >Адрес доставки:</b
                    >
                    <span style="padding-left: 15px">${body.address}</span>
                  </li>
                  <li style="padding: 25px 0; font-size: 14px">
                    <b
                      style="
                        display: inline-block;
                        width: 130px;
                        border-right: 1px solid #adadad;
                      "
                      >Кв/офис:</b
                    >
                    <span style="padding-left: 15px">${body.apartment}</span>
                  </li>
                `
                    : ''
                }
                ${
                  body.entranceCode
                    ? `
                  <li style="padding: 25px 0; font-size: 14px">
                    <b
                      style="
                        display: inline-block;
                        width: 130px;
                        border-right: 1px solid #adadad;
                      "
                      >Домофон:</b
                    >
                    <span style="padding-left: 15px">${body.entranceCode}</span>
                  </li>
                `
                    : ''
                }
                ${
                  body.entrance
                    ? `
                  <li style="padding: 25px 0; font-size: 14px">
                    <b
                      style="
                        display: inline-block;
                        width: 130px;
                        border-right: 1px solid #adadad;
                      "
                      >Подъезд:</b
                    >
                    <span style="padding-left: 15px">${body.entrance}</span>
                  </li>
                `
                    : ''
                }
                ${
                  body.floor
                    ? `
                  <li style="padding: 25px 0; font-size: 14px">
                    <b
                      style="
                        display: inline-block;
                        width: 130px;
                        border-right: 1px solid #adadad;
                      "
                      >Этаж:</b
                    >
                    <span style="padding-left: 15px">${body.floor}</span>
                  </li>
                `
                    : ''
                }
                ${
                  body.comment
                    ? `
                    <li style="padding: 25px 0; font-size: 14px">
                      <b
                        style="
                          display: inline-block;
                          width: 130px;
                          border-right: 1px solid #adadad;
                        "
                        >Комментарий:</b
                      >
                      <span style="padding-left: 15px">${body.comment}</span>
                    </li>`
                    : ''
                }
                ${
                  body.promocode
                    ? `
                    <li style="padding: 25px 0; font-size: 14px">
                      <b
                        style="
                          display: inline-block;
                          width: 130px;
                          border-right: 1px solid #adadad;
                        "
                        >Промокод:</b
                      >
                      <span style="padding-left: 15px">${body.promocode}</span>
                    </li>`
                    : ''
                }

                ${
                  body.time === 'Ближайшее время'
                    ? `
                    <li style="padding: 25px 0; font-size: 14px">
                      <b
                        style="
                          display: inline-block;
                          width: 130px;
                          border-right: 1px solid #adadad;
                        "
                        >Время:</b
                      >
                      <span style="padding-left: 15px">${body.time}</span>
                    </li>`
                    : `
                    <li style="padding: 25px 0; font-size: 14px">
                      <b
                        style="
                          display: inline-block;
                          width: 130px;
                          border-right: 1px solid #adadad;
                        "
                        >День:</b
                      >
                      <span style="padding-left: 15px">${body.day}</span>
                    </li>
                    <li style="padding: 25px 0; font-size: 14px">
                      <b
                        style="
                          display: inline-block;
                          width: 130px;
                          border-right: 1px solid #adadad;
                        "
                        >Время:</b
                      >
                      <span style="padding-left: 15px">${body.specificTime}</span>
                    </li>`
                }

                <li style="padding: 25px 0; font-size: 14px">
                  <b
                    style="
                      display: inline-block;
                      width: 130px;
                      border-right: 1px solid #adadad;
                    "
                    >Оплата:</b
                  >
                  <span style="padding-left: 15px">${body.payment}</span>
                </li>
                <li style="padding: 25px 0; font-size: 14px">
                  <b
                    style="
                      display: inline-block;
                      width: 130px;
                    "
                    >Заказ:</b>
                  <ul>
                    ${Object.values(body.order.items)
                      .map(
                        item =>
                          `
                      <li style="padding: 25px 0; font-size: 14px">
                        <b
                          style="
                            display: inline-block;
                            width: 130px;
                            border-right: 1px solid #adadad;
                          "
                          >${item.name}:</b>
                          <span style="padding-left: 15px">${item.count} шт</span>
                      </li>
                      `,
                      )
                      .toString()
                      .replace(/,/g, '')}
                  </ul>
                </li>
                <li style="padding: 25px 0; font-size: 14px">
                  <b
                    style="
                      display: inline-block;
                      width: 130px;
                      border-right: 1px solid #adadad;
                    "
                    >Стоимость заказа:</b
                  >
                  <span style="padding-left: 15px">${body.order.totalPrice.toLocaleString(
                    'ru-RU',
                  )} ₽</span>
                </li>
                ${
                  body.order.promoCodeIsValid
                    ? `
                <li style="padding: 25px 0; font-size: 14px">
                  <b
                    style="
                      display: inline-block;
                      width: 130px;
                      border-right: 1px solid #adadad;
                    "
                    >Со скидкой:</b
                  >
                  <span style="padding-left: 15px">${body.order.totalPriceWithDiscount.toLocaleString(
                    'ru-RU',
                  )} ₽</span>
                </li>
                `
                    : ''
                }
              </ul>
            </div>
            <div
              class="footer"
              style="
                padding: 20px;
                font-size: 12px;
                background-color: #e9d735;
                border-top: 1px solid #888;
              "
            >
              <span style="color: #000">Разработано компанией </span>
              <a
                href="http://mygang.ru"
                target="_blank"
                style="text-decoration: none; color: #000"
                >Gang</a
              >
            </div>
          </div>
        </div>
      </body>
    </html>
    `
  }
}

module.exports = new Mail()
