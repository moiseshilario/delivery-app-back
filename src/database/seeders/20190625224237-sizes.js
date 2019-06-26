'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'sizes',
      [
        {
          description: 'pequena',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          description: 'media',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          description: 'grande',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          description: 'gigante',
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('sizes', null, {})
  }
}
