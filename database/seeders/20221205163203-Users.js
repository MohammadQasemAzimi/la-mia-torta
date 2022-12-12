'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('Users', [
      {
        name: 'AbdulKarim',
        lastName: 'Zahedi',
        email: 'z@a.com',
        phoneNumber: '00397898788',
        address: 'Qalai Shada 2',
        password: '123',
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
  },
  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Users', null, {});
  }
};
