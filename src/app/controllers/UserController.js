const { User } = require('../models')
const UserService = require('../services/UserService')

class UserController {
  async index (req, res) {
    const users = await User.findAll()

    return res.json(users)
  }

  async store (req, res) {
    try {
      const user = await UserService.create(req.body)

      return res.json(user)
    } catch (e) {
      return res.status(e.status || 500).json({ error: e.message })
    }
  }
}

module.exports = new UserController()
