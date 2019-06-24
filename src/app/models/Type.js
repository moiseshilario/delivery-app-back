module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define(
    'Type',
    {
      type_name: DataTypes.STRING,
      product_id: DataTypes.INTEGER
    },
    {}
  )
  Type.associate = function (models) {
    // associations can be defined here
    Type.belongsTo(models.Product, {
      foreignKey: 'product_id'
    })

    Type.belongsToMany(models.Size, {
      through: models.Price,
      foreignKey: 'type_id',
      as: 'type'
    })

    Type.hasMany(models.Image, {
      foreignKey: 'type_id'
    })
  }
  return Type
}
