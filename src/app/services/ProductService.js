const { Product } = require('../models')
const AlreadyExistsError = require('../errors/AlreadyExistsError')

class ProductService {
  async create (data) {
    const { product_name: product } = data

    if (await Product.findOne({ where: { product_name: product } })) {
      throw new AlreadyExistsError('Product')
    }

    return Product.create(data)
  }
}

module.exports = new ProductService()
