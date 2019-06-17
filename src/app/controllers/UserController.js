const { User } = require('../models')

class UserController {
  async store (req, res) {
    const { email } = req.body

    if (await User.findOne({ where: { email } })) {
      return res.status(400).json({ error: 'User already exists' })
    }

    const user = await User.create(req.body)

    return res.json(user)
  }
}

module.exports = new UserController()
