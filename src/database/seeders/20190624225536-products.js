'use strict'
const { Product } = require('../../app/models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkInsert(
      'products',
      [
        {
          name: 'pizza',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'bebida',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'massa',
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    )

    const product = await Product.findOne({ where: { name: 'pizza' } })

    return queryInterface.bulkInsert(
      'types',
      [
        {
          product_id: product.id,
          name: 'Calabresa',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          product_id: product.id,
          name: '4 quejos',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          product_id: product.id,
          name: 'Merguerita',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          product_id: product.id,
          name: 'Portuguesa',
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null, {})
    await queryInterface.bulkDelete('types', null, {})
  }
}