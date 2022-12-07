'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('Users', [{
        name: 'Qasem',
        lastName: 'Azimi',
        email: 's@g.com',
        phoneNumber: '00397898789',
        address: 'Qalai Shada',
        password: '123',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'AbdulKarim',
        lastName: 'Zahedi',
        email: 'a@z.com',
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
