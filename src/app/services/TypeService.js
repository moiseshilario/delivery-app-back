const { Type } = require('../models')
const { AlreadyExistsError } = require('../errors/AlreadyExistsError')

class TypeService {
  async create (data) {
    const { name } = data

    if (await Type.findOne({ where: { name } })) {
      throw new AlreadyExistsError('Type')
    }

    return Type.create(data)
  }
}

module.exports = new TypeService()
