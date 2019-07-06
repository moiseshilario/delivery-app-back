module.exports = (sequelize, DataTypes) => {
  const Size = sequelize.define(
    'Size',
    {
      description: DataTypes.STRING,
      image: DataTypes.STRING
    },
    {}
  )
  Size.associate = function (models) {
    // associations can be defined here
    Size.belongsToMany(models.Type, {
      through: models.Price,
      foreignKey: 'size_id'
    })
  }
  return Size
}
