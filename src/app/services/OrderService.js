const {
  Price,
  Order,
  OrderItem,
  Type,
  Size,
  Product,
  sequelize
} = require('../models')

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

  async createItem (orderId, item) {
    const order = await OrderItem.create({
      order_id: orderId,
      price_id: item.price.id,
      price: item.price.price
    })

    const price = await Price.findOne({
      where: { id: order.price_id },
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
      id: order.id,
      order_id: item.order_id,
      price: price.price,
      price_id: price.id,
      size: price.size,
      type: price.type
    }
  }

  confirmOrder (orderId, data) {
    const { address, ...rest } = data
    const normalizedData = { ...address, ...rest, confirmed: true }

    return Order.update(normalizedData, {
      where: { id: orderId },
      returning: true
    })
  }

  async getOrderItems (orderId) {
    try {
      const items = await OrderItem.findAll({
        where: { order_id: orderId }
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
      return cartItems
    } catch (e) {
      throw new Error('Error retrieving items')
    }
  }
}

module.exports = new OrderService()
