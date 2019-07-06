'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'sizes',
      [
        {
          description: 'Pequena',
          image: 'pizza-pequena.png',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          description: 'Média',
          image: 'pizza-media.png',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          description: 'Grande',
          image: 'pizza-grande.png',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          description: 'Gigante',
          image: 'pizza-gigante.png',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          description: 'Lata 300ml',
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
