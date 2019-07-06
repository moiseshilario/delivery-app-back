const { Product, Size, Type, sequelize } = require('../models')
const PriceService = require('./PriceService')

class ProductService {
  async upsert (data) {
    const {
      id,
      name,
      image,
      description,
      preparation_time,
      sizes: sizesData,
      types: typesData,
      prices: pricesData
    } = data

    let transaction

    try {
      transaction = await sequelize.transaction()

      const [product] = await Product.upsert(
        { ...(!!id && { id: id }), name, image, description, preparation_time },
        { returning: true, transaction }
      )

      const types = await Promise.all(
        typesData.map(async typeData => {
          const [type] = await Type.upsert(
            { ...typeData, product_id: product.id },
            {
              returning: true,
              transaction
            }
          )
          return type
        })
      )

      const sizes = await Promise.all(
        sizesData.map(async sizeData => {
          const [size] = await Size.upsert(sizeData, {
            returning: true,
            transaction
          })
          return size
        })
      )

      const prices = await Promise.all(
        pricesData.map(async priceData => {
          const price = await PriceService.upsert(priceData, transaction)
          return price
        })
      )

      // commit
      await transaction.commit()

      return { product, sizes, types, prices }
    } catch (err) {
      // Rollback transaction if any errors were encountered
      if (err) await transaction.rollback()

      console.log('=================== ERROR ================')
      console.log(err)
      console.log('=================== END ERROR ================')

      throw new Error('ERROR saving product')
    }
  }

  async update (id, newData) {
    return Product.update(newData, { where: { id }, returning: true })
  }
}

module.exports = new ProductService()
