module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      description: DataTypes.STRING,
      preparation_time: DataTypes.INTEGER
    },
    {}
  )
  Product.associate = function (models) {
    // associations can be defined here
    Product.hasMany(models.Type, {
      foreignKey: 'product_id',
      as: 'product'
    })
  }
  return Product
}
