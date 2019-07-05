'use strict'
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'Order',
    {
      user_id: DataTypes.INTEGER,
      cep: DataTypes.STRING,
      street: DataTypes.STRING,
      district: DataTypes.STRING,
      number: DataTypes.STRING,
      observation: DataTypes.STRING,
      confirmed: DataTypes.BOOLEAN,
      total: DataTypes.FLOAT
    },
    {}
  )
  Order.associate = function (models) {
    // associations can be defined here
    Order.hasMany(models.OrderItem, {
      foreignKey: 'order_id',
      as: 'orderItems'
    })

    Order.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    })
  }
  return Order
}
