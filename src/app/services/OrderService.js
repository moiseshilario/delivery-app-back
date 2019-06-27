const { Price, Order, OrderItem, sequelize } = require('../models')

class OrderService {
  async create (data) {
    const {
      user_id: user,
      order_items: orderItems,
      address,
      observation
    } = data

    let transaction

    try {
      // get transaction
      transaction = await sequelize.transaction()

      const order = await Order.create(
        { user_id: user, ...address, observation },
        { transaction }
      )

      const items = await Promise.all(
        orderItems.map(async orderItem => {
          const orderId = order.id
          const priceId = orderItem.price_id
          const { price } = await Price.findOne({
            where: { id: orderItem.price_id },
            transaction
          })
          return OrderItem.create(
            { order_id: orderId, price_id: priceId, price },
            { transaction }
          )
        })
      )

      // commit
      await transaction.commit()

      return { order, items }
    } catch (err) {
      // Rollback transaction if any errors were encountered
      if (err) await transaction.rollback()

      throw new Error('It was not possible to save order')
    }
  }
}

module.exports = new OrderService()
