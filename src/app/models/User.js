const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')

module.exports = (sequelize, DataType) => {
  const User = sequelize.define(
    'User',
    {
      name: DataType.STRING,
      email: DataType.STRING,
      password: DataType.VIRTUAL,
      password_hash: DataType.STRING,
      admin: DataType.BOOLEAN
    },
    {
      hooks: {
        beforeSave: async user => {
          if (user.password) {
            user.password_hash = await bcrypt.hash(user.password, 8)
          }
        }
      }
    }
  )

  User.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.password_hash)
  }

  User.prototype.generateToken = function () {
    const { id } = this
    return jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.ttl
    })
  }

  return User
}
