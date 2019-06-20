const { Size } = require('../models')
const SizeService = require('../services/SizeService')

class SizeController {
  async index (req, res) {
    const types = await Size.findAll()

    return res.json(types)
  }

  async store (req, res) {
    try {
      const size = await SizeService.create(req.body)

      return res.json(size)
    } catch (e) {
      return res.status(e.status || 500).json({ error: e.message })
    }
  }
}

module.exports = new SizeController()
