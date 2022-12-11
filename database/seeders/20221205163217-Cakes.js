'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /*
    await queryInterface.bulkInsert('Cakes', [{
      name:'Chocolate Cake', 
      description: ' a cake flavored with melted chocolate, cocoa powder, or both', 
      location:'Milano, Italia',
      price:'300',
      imageUrl:'',
      UserId: '1',
      createdAt: new Date(),
      updatedAt: new Date()
     }], {});
  */ 
  },

  async down (queryInterface, Sequelize) {
    //  await queryInterface.bulkDelete('Cakes', null, {});
  }
};
