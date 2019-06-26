'use strict'
const { Type, Size } = require('../../app/models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const size1 = await Size.findOne({ where: { description: 'pequena' } })
    const type1 = await Type.findOne({ where: { name: 'Calabresa' } })
    const size2 = await Size.findOne({ where: { description: 'media' } })
    const size3 = await Size.findOne({ where: { description: 'grande' } })
    const size4 = await Size.findOne({ where: { description: 'gigante' } })

    return queryInterface.bulkInsert(
      'prices',
      [
        {
          price: 14.9,
          type_id: type1.id,
          size_id: size1.id,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          price: 22.9,
          type_id: type1.id,
          size_id: size2.id,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          price: 35.9,
          type_id: type1.id,
          size_id: size3.id,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          price: 40.9,
          type_id: type1.id,
          size_id: size4.id,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('prices', null, {})
  }
}
