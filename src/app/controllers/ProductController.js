const { Product } = require('../models')
const ProductService = require('../services/ProductService')

class ProductController {
  async index (req, res) {
    const types = await Product.findAll()

    return res.json(types)
  }

  async store (req, res) {
    try {
      const product = await ProductService.create(req.body)

      return res.json(product)
    } catch (e) {
      return res.status(e.status || 500).json({ error: e.message })
    }
  }
}

module.exports = new ProductController()
