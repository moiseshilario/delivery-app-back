module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      product_name: DataTypes.STRING
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
