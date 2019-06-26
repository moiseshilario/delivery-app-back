const { Order } = require('../models')
const OrderService = require('../services/OrderService')

class OrderController {
  async index (req, res) {
    const types = await Order.findAll()

    return res.json(types)
  }

  async store (req, res) {
    try {
      const order = await OrderService.create(req.body)

      return res.json(order)
    } catch (e) {
      return res.status(e.status || 500).json({ error: e.message })
    }
  }
}

module.exports = new OrderController()
