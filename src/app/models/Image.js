'use strict'
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    'Image',
    {
      type_id: DataTypes.INTEGER,
      file: DataTypes.STRING,
      ratio: DataTypes.INTEGER
    },
    {}
  )
  Image.associate = function (models) {
    // associations can be defined here
  }
  return Image
}
