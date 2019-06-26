const { Product } = require('../models')
const AlreadyExistsError = require('../errors/AlreadyExistsError')

class ProductService {
  async create (data) {
    const { name } = data

    if (await Product.findOne({ where: { name } })) {
      throw new AlreadyExistsError('Product')
    }

    return Product.create(data)
  }
}

module.exports = new ProductService()
