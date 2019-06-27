const { Product } = require('../models')
const AlreadyExistsError = require('../errors/AlreadyExistsError')

class ProductService {
  async create (data) {
    const {
      name,
      file: { filename }
    } = data

    if (await Product.findOne({ where: { name } })) {
      throw new AlreadyExistsError('Product')
    }

    return Product.create({ name, image: filename })
  }

  async update (id, newData) {
    return Product.update(newData, { where: { id }, returning: true })
  }
}

module.exports = new ProductService()
