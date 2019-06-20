module.exports = (sequelize, DataTypes) => {
  const Price = sequelize.define(
    'Price',
    {
      type_id: DataTypes.INTEGER,
      size_id: DataTypes.INTEGER,
      price: DataTypes.STRING
    },
    {}
  )
  Price.associate = function (models) {
    // associations can be defined here
    Price.hasMany(models.Size, {
      foreignKey: 'size_id'
    })
    Price.hasMany(models.Type, {
      foreignKey: 'type_id'
    })
  }
  return Price
}
