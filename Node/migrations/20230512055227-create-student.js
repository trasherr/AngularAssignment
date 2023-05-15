'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      rollno: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      teacherId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'teachers', key: 'id' }
      },
      dob: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      score: {
        allowNull: false,

        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Students');
  }
};