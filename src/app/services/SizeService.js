const { Size } = require('../models')
const AlreadyExistsError = require('../errors/AlreadyExistsError')

class SizeService {
  async create (data) {
    const { size_desc: size } = data

    if (await Size.findOne({ where: { size_desc: size } })) {
      throw new AlreadyExistsError('Size')
    }

    return Size.create(data)
  }
}

module.exports = new SizeService()
