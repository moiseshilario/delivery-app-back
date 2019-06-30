'use strict'
const { Type } = require('../../app/models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const pizzaTypes = [
      'Calabresa',
      'Frango Frito',
      'Marguerita',
      'Palmito',
      'Portuguesa',
      'Vegetariana'
    ]

    const buildImageData = (ratio = 1) => {
      return Promise.all(
        pizzaTypes.map(async pizzaType => {
          const type = await Type.findOne({ where: { name: pizzaType } })
          const imageSuffix = ratio === 1 ? '' : `@${ratio}x`
          const filename = pizzaType.toLowerCase().replace(' ', '-')

          return {
            type_id: type.id,
            file: `${filename}${imageSuffix}.png`,
            ratio,
            created_at: new Date(),
            updated_at: new Date()
          }
        })
      )
    }

    const pizzas1x = await buildImageData()
    const pizzas2x = await buildImageData(2)
    const pizzas3x = await buildImageData(3)

    const drinkType = await Type.findOne({ where: { name: 'Coca-Cola' } })

    return queryInterface.bulkInsert(
      'images',
      [
        ...pizzas1x,
        ...pizzas2x,
        ...pizzas3x,
        {
          type_id: drinkType.id,
          file: `coca-cola.png`,
          ratio: 1,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('images', null, {})
  }
}
