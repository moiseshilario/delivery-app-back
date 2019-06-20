const { Type } = require('../models')
const TypeService = require('../services/TypeService')

class TypeController {
  async index (req, res) {
    const types = await Type.findAll()

    return res.json(types)
  }

  async store (req, res) {
    try {
      const type = await TypeService.create(req.body)

      return res.json(type)
    } catch (e) {
      return res.status(e.status || 500).json({ error: e.message })
    }
  }
}

module.exports = new TypeController()
