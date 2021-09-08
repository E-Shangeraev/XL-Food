const MailService = require('../services/Mail')

class Mail {
  async send(req, res) {
    try {
      const info = MailService.sendMail(req.body)
      console.log('Message sent: %s', info.messageId)
      res.status(200).json({ message: 'ok' })
    } catch (err) {
      res.status(400)
      throw err
    }
  }
}

module.exports = new Mail()
