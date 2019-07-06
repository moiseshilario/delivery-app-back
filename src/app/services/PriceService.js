const { Price, Type, Size } = require('../models')

class PriceService {
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

    // Sequelize bug: it returns the same object, but saves correctly on database
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
