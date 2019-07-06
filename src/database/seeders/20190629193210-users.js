'use strict'
const bcrypt = require('bcryptjs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = await bcrypt.hash('1234', 8)
    return queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Admin user',
          email: 'a@a.com',
          password_hash: password,
          admin: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Light Yagami',
          email: 'u@u.com',
          password_hash: password,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Darth Vader',
          email: 'u2@u2.com',
          password_hash: password,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Walter White',
          email: 'u3@u3.com',
          password_hash: password,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {})
  }
}
