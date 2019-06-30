'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'sizes',
      [
        {
          description: 'pequena',
          image: 'pizza-pequena.png',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          description: 'media',
          image: 'pizza-media.png',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          description: 'grande',
          image: 'pizza-grande.png',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          description: 'gigante',
          image: 'pizza-gigante.png',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          description: 'lata 300ml',
          image: 'coca-cola-lata.png',
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
