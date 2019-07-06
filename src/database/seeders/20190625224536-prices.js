'use strict'
const { Type, Size } = require('../../app/models')

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

    const pizzaSizes = [
      { description: 'Pequena', basePrice: 10.5 },
      { description: 'Média', basePrice: 20.9 },
      { description: 'Grande', basePrice: 30.5 },
      { description: 'Gigante', basePrice: 40.9 }
    ]

    const buildPriceData = pizzaSize => {
      return Promise.all(
        pizzaTypes.map(async pizzaType => {
          const type = await Type.findOne({ where: { name: pizzaType } })
          const size = await Size.findOne({
            where: { description: pizzaSize.description }
          })

          return {
            type_id: type.id,
            size_id: size.id,
            price: pizzaSize.basePrice + Math.floor(Math.random() * 9.0 + 1),
            created_at: new Date(),
            updated_at: new Date()
          }
        })
      )
    }

    const smallPizzaPrices = await buildPriceData(pizzaSizes[0])
    const mediumPizzaPrices = await buildPriceData(pizzaSizes[1])
    const largePizzaPrices = await buildPriceData(pizzaSizes[2])
    const xlargePizzaPrices = await buildPriceData(pizzaSizes[3])

    const drink = await Type.findOne({ where: { name: 'Coca-Cola' } })
    const drinkSize = await Size.findOne({
      where: { description: 'Lata 300ml' }
    })
    const drink2 = await Type.findOne({ where: { name: 'Fanta' } })
    const drink2Size = await Size.findOne({
      where: { description: 'Lata 300ml' }
    })

    return queryInterface.bulkInsert(
      'prices',
      [
        ...smallPizzaPrices,
        ...mediumPizzaPrices,
        ...largePizzaPrices,
        ...xlargePizzaPrices,
        {
          price: 5,
          type_id: drink.id,
          size_id: drinkSize.id,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          price: 5,
          type_id: drink2.id,
          size_id: drink2Size.id,
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
