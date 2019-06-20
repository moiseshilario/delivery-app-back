const { Price } = require('../models')
const AlreadyExistsError = require('../errors/AlreadyExistsError')

class PriceService {
  async create (data) {
    const { size_id: size, type_id: type } = data

    if (await Price.findOne({ where: { size_id: size, type_id: type } })) {
      throw new AlreadyExistsError('Price for this type and size')
    }

    return Price.create(data)
  }
}

module.exports = new PriceService()
