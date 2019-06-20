module.exports = (sequelize, DataTypes) => {
  const Size = sequelize.define(
    'Size',
    {
      size_desc: DataTypes.STRING
    },
    {}
  )
  Size.associate = function (models) {
    // associations can be defined here
    Size.belongsToMany(models.Type, {
      through: models.Price,
      foreignKey: 'size_id',
      as: 'size'
    })
  }
  return Size
}
