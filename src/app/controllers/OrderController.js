const { Order, OrderItem, User } = require('../models')
const OrderService = require('../services/OrderService')

class OrderController {
  async index (req, res) {
    const orders = await Order.findAll({
      where: { confirmed: true },
      include: { model: User, as: 'user' }
    })

    const fullOrders = await Promise.all(
      orders.map(async order => {
        const orderItems = await OrderService.getOrderItems(order.id)
        return { order, orderItems }
      })
    )

    return res.json(fullOrders)
  }

  async store (req, res) {
    try {
      const order = await OrderService.create(req.body)

      return res.json(order)
    } catch (e) {
      return res.status(e.status || 500).json({ error: e.message })
    }
  }

  async update (req, res) {
    try {
      const { body } = req
      const updatedProduct = await OrderService.update(req.params.id, body)

      return res.json(updatedProduct)
    } catch (e) {
      return res.status(e.status || 500).json({ error: e.message })
    }
  }

  async addItem (req, res) {
    try {
      const { body } = req
      const item = await OrderService.createItem(req.params.id, body)
      return res.json(item)
    } catch (e) {
      return res.status(e.status || 500).json({ error: e.message })
    }
  }

  async removeItem (req, res) {
    try {
      // TODO UPDATE TOTAL INSIDE ORDER => req.param.orderId
      const item = await OrderItem.destroy({ where: { id: req.params.itemId } })
      return res.json(item)
    } catch (e) {
      return res.status(e.status || 500).json({ error: e.message })
    }
  }

  async listOrderItems (req, res) {
    try {
      const orderItems = await OrderService.getOrderItems(req.params.id)
      return res.json(orderItems)
    } catch (e) {
      return res.status(e.status || 500).json({ error: e.message })
    }
  }

  async confirmOrder (req, res) {
    try {
      const order = await OrderService.confirmOrder(req.params.id, req.body)
      return res.json(order)
    } catch (e) {
      return res.status(e.status || 500).json({ error: e.message })
    }
  }
}

module.exports = new OrderController()
