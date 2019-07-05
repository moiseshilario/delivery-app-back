'use strict'
module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    'OrderItem',
    {
      order_id: DataTypes.INTEGER,
      price_id: DataTypes.INTEGER,
      price: DataTypes.FLOAT
    },
    {}
  )
  OrderItem.associate = function (models) {
    OrderItem.belongsTo(models.Order, {
      foreignKey: 'order_id'
    })

    OrderItem.belongsTo(models.Price, {
      foreignKey: 'price_id'
    })
  }
  return OrderItem
}
