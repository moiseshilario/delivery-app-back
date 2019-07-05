const { Order, OrderItem, Price, Size, Type, Product } = require('../models')
const OrderService = require('../services/OrderService')

class OrderController {
  async index (req, res) {
    const orders = await Order.findAll()

    return res.json(orders)
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
      const items = await OrderItem.findAll({
        where: { order_id: req.params.id }
      })

      const cartItems = await Promise.all(
        items.map(async item => {
          const price = await Price.findOne({
            where: { id: item.price_id },
            include: [
              {
                model: Type,
                as: 'type',
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [
                  {
                    model: Product,
                    as: 'product',
                    attributes: ['id', 'name']
                  }
                ]
              },
              {
                model: Size,
                as: 'size',
                attributes: { exclude: ['createdAt', 'updatedAt'] }
              }
            ],
            attributes: ['id', 'price']
          })
          return {
            id: item.id,
            order_id: item.order_id,
            price: price.price,
            price_id: price.id,
            size: price.size,
            type: price.type
          }
        })
      )
      return res.json(cartItems)
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
