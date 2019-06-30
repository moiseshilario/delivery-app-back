const { Product, Type, Size, Price } = require('../models')

class MenuController {
  async index (req, res) {
    const prices = await Price.findAll()

    const data = await Promise.all(
      prices.map(async price => {
        const type = await Type.findOne({ where: { id: price.type_id } })
        const size = await Size.findOne({ where: { id: price.size_id } })
        const product = await Product.findOne({
          where: { id: type.product_id }
        })

        const priceValue = price.price
        const typeName = type.name
        const sizeName = size.description
        const productName = product.name

        return { productName, typeName, sizeName, priceValue }
      })
    )

    return res.json(data)
  }
}

module.exports = new MenuController()
