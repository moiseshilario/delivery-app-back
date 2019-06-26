module.exports = (sequelize, DataTypes) => {
  const Price = sequelize.define(
    'Price',
    {
      type_id: DataTypes.INTEGER,
      size_id: DataTypes.INTEGER,
      price: DataTypes.FLOAT
    },
    {}
  )
  Price.associate = function (models) {
    // associations can be defined here
    Price.belongsTo(models.Size, {
      foreignKey: 'size_id',
      constraints: false
    })
    Price.belongsTo(models.Type, {
      foreignKey: 'type_id',
      constraints: false
    })
  }
  return Price
}
