const { User, Order } = require('../models')
const AlreadyExistsError = require('../errors/AlreadyExistsError')

class UserService {
  async create (data) {
    const { email } = data

    if (await User.findOne({ where: { email } })) {
      throw new AlreadyExistsError('User')
    }

    return User.create(data)
  }

  getOpenCart (userId) {
    return Order.findOrCreate({
      where: {
        user_id: userId,
        confirmed: false
      },
      defaults: { user_id: userId, confirmed: false }
    })
  }
}

module.exports = new UserService()
