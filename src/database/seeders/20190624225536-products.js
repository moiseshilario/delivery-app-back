'use strict'
const { Product } = require('../../app/models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkInsert(
      'products',
      [
        {
          name: 'Pizzas',
          description:
            'Mais de 50 sabores de pizza em até 4 tamanhos diferentes de fome.',
          preparation_time: 30,
          image: 'pizzas.png',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Massas',
          description:
            'Mais de 50 sabores de pizza em até 4 tamanhos diferentes de fome.',
          preparation_time: 25,
          image: 'massas.png',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Calzones',
          description:
            'Calzones super recheados com mais de 50 sabores diferentes.',
          preparation_time: 15,
          image: 'calzones.png',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Bebidas não-alcóolicas',
          description: 'Refrigerantes, sucos, chá gelado, energéticos e água.',
          preparation_time: 5,
          image: 'bebidas-nao-alcoolicas.png',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Bebidas alcóolicas',
          description: 'Cervejas artesanais, vinhos e destilados.',
          preparation_time: 5,
          image: 'bebidas-alcoolicas.png',
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    )

    const pizza = await Product.findOne({ where: { name: 'Pizzas' } })
    const bebida = await Product.findOne({
      where: { name: 'Bebidas não-alcóolicas' }
    })

    return queryInterface.bulkInsert(
      'types',
      [
        {
          product_id: pizza.id,
          name: 'Calabresa',
          image: 'calabresa.png',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          product_id: pizza.id,
          name: 'Frango Frito',
          image: 'frango-frito.png',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          product_id: pizza.id,
          name: 'Marguerita',
          image: 'marguerita.png',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          product_id: pizza.id,
          name: 'Palmito',
          image: 'palmito.png',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          product_id: pizza.id,
          name: 'Portuguesa',
          image: 'portuguesa.png',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          product_id: pizza.id,
          name: 'Vegetariana',
          image: 'vegetariana.png',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          product_id: bebida.id,
          name: 'Coca-Cola',
          image: 'coca-cola.png',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          product_id: bebida.id,
          name: 'Fanta',
          image: 'fanta.png',
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
