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
    // associations can be defined here
  }
  return OrderItem
}
