const { User } = require('../models')
const AlreadyExistsError = require('../errors/AlreadyExistsError')

class UserService {
  async create (data) {
    const { email } = data

    if (await User.findOne({ where: { email } })) {
      throw new AlreadyExistsError('User')
    }

    return User.create(data)
  }
}

module.exports = new UserService()
