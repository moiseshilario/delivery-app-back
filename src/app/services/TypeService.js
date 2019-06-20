const { Type } = require('../models')
const { AlreadyExistsError } = require('../errors/AlreadyExistsError')

class TypeService {
  async create (data) {
    const { type_name: type } = data

    if (await Type.findOne({ where: { type_name: type } })) {
      throw new AlreadyExistsError('Type')
    }

    return Type.create(data)
  }
}

module.exports = new TypeService()
