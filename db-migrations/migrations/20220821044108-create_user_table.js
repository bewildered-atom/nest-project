'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4
      },
      email: {
        allowNull: false,
        unqiue: true,
        type: Sequelize.DataTypes.STRING(255)
      },
      profileImg: {
        allowNull: false,
        type: Sequelize.DataTypes.TEXT
      },
      password: {
        allowNull: false,
        type: Sequelize.DataTypes.TEXT
      },
      created_at: {
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: Sequelize.fn('NOW')
      },
      updated_at: {
        allowNull: true,
        type: 'TIMESTAMP'
      },
      is_deleted: {
        allowNull: false,
        type: Sequelize.DataTypes.SMALLINT,
        defaultValue: 0
      }
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};
