const { Price, Size } = require('../models')

class TypeController {
  async listPrices (req, res) {
    const prices = await Price.findAll({
      where: { type_id: req.params.id },
      include: [
        {
          model: Size,
          attributes: ['id', 'description', 'image'],
          as: 'size'
        }
      ],
      attributes: ['id', 'price']
    })

    return res.json(prices)
  }
}

module.exports = new TypeController()
