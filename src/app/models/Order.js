'use strict'
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'Order',
    {
      type_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      street: DataTypes.STRING,
      district: DataTypes.STRING,
      number: DataTypes.STRING,
      observation: DataTypes.STRING
    },
    {}
  )
  Order.associate = function (models) {
    // associations can be defined here
    Order.hasMany(models.OrderItem, {
      foreignKey: 'order_id'
    })
  }
  return Order
}
