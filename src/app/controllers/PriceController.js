const { Price } = require('../models')
const PriceService = require('../services/PriceService')

class PriceController {
  async index (req, res) {
    const types = await Price.findAll()

    return res.json(types)
  }

  async store (req, res) {
    try {
      const price = await PriceService.create(req.body)

      return res.json(price)
    } catch (e) {
      return res.status(e.status || 500).json({ error: e.message })
    }
  }
}

module.exports = new PriceController()
