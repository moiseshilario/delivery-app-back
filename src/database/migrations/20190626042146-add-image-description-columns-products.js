'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('products', 'image', Sequelize.STRING, {
          transaction: t
        }),
        queryInterface.addColumn('products', 'description', Sequelize.STRING, {
          transaction: t
        }),
        queryInterface.addColumn(
          'products',
          'preparation_time',
          Sequelize.INTEGER,
          {
            transaction: t
          }
        )
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('products', 'image', Sequelize.STRING, {
          transaction: t
        }),
        queryInterface.removeColumn(
          'products',
          'description',
          Sequelize.STRING,
          {
            transaction: t
          }
        ),
        queryInterface.removeColumn(
          'products',
          'preparation_time',
          Sequelize.INTEGER,
          {
            transaction: t
          }
        )
      ])
    })
  }
}
