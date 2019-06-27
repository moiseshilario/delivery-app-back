const { Product, Type, Image } = require('../models')
const ProductService = require('../services/ProductService')

class ProductController {
  async index (req, res) {
    const types = await Product.findAll()

    return res.json(types)
  }

  async show (req, res) {
    const types = await Type.findAll({
      where: { product_id: req.params.id },
      include: {
        model: Image,
        as: 'images',
        attributes: ['file', 'ratio']
      },
      attributes: ['id', 'name']
    })

    return res.json(types)
  }

  async store (req, res) {
    try {
      const { file } = req
      const { name } = req.body
      const product = await ProductService.create({ name, file })

      return res.json(product)
    } catch (e) {
      return res.status(e.status || 500).json({ error: e.message })
    }
  }

  async update (req, res) {
    try {
      const { body, file } = req
      const image = file ? file.filename : null
      const updatedProduct = await ProductService.update(
        req.params.id,
        { ...body, image },
        {
          new: true
        }
      )

      return res.json(updatedProduct)
    } catch (e) {
      return res.status(e.status || 500).json({ error: e.message })
    }
  }
}

module.exports = new ProductController()
