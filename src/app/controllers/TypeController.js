const { Type, Price, Size } = require('../models')
const TypeService = require('../services/TypeService')

class TypeController {
  async index (req, res) {
    const types = await Type.findAll()

    return res.json(types)
  }

  async show (req, res) {
    const type = await Type.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'name']
    })
    const prices = await Price.findAll({
      where: { type_id: req.params.id },
      include: [
        {
          model: Size,
          attributes: ['id', 'description'],
          as: 'size'
        }
      ],
      attributes: ['id', 'price']
    })

    return res.json({ type, prices })
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
