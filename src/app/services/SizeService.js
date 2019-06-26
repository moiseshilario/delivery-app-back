const { Size } = require('../models')
const AlreadyExistsError = require('../errors/AlreadyExistsError')

class SizeService {
  async create (data) {
    const { description } = data

    if (await Size.findOne({ where: { description } })) {
      throw new AlreadyExistsError('Size')
    }

    return Size.create(data)
  }
}

module.exports = new SizeService()
