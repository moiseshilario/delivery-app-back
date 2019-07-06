const { Price, Type, Size } = require('../models')
const AlreadyExistsError = require('../errors/AlreadyExistsError')

class PriceService {
  async create (data) {
    const { size_id: size, type_id: type } = data

    if (await Price.findOne({ where: { size_id: size, type_id: type } })) {
      throw new AlreadyExistsError('Price for this type and size')
    }

    return Price.create(data)
  }

  async upsert (priceData, transaction) {
    const { id, type: typeData, size: sizeData, price: value } = priceData

    const type = await Type.findOne({
      where: { name: typeData },
      transaction
    })

    const size = await Size.findOne({
      where: { description: sizeData },
      transaction
    })

    const [price] = await Price.upsert(
      {
        ...(!!id && { id }),
        price: value,
        type_id: type.id,
        size_id: size.id
      },
      { returning: true, transaction }
    )

    return price
  }
}

module.exports = new PriceService()
