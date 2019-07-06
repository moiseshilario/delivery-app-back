const { User, Order, OrderItem } = require('../models')
const UserService = require('../services/UserService')

class UserController {
  async index (req, res) {
    const users = await User.findAll()

    return res.json(users)
  }

  async getOpenCart (req, res) {
    const [cart] = await UserService.getOpenCart(req.params.id)
    return res.json(cart)
  }

  async listOrders (req, res) {
    const orders = await Order.findAll({
      where: { user_id: req.params.id, confirmed: true },
      include: {
        model: OrderItem,
        as: 'orderItems'
      }
    })

    return res.json(orders)
  }

  async store (req, res) {
    try {
      const user = await UserService.create(req.body)

      return res.json(user)
    } catch (e) {
      return res.status(e.status || 500).json({ error: e.message })
    }
  }
}

module.exports = new UserController()
