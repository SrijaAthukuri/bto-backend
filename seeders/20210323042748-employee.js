'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Employees',[{
      empId: 'asrija',
      name: 'Srija',
      emailId: 'athukuri.srija@blackrock.com',
      workstation:'W05',
      team: 'Black',
      createdAt: new Date(),
      updatedAt:new Date()
    },
    {
      empId: 'vmounika',
      name: 'Mounika',
      emailId: 'mounika.vellalacheruvu@blackrock.com',
      workstation:'W07',
      team: 'Black',
      createdAt: new Date(),
      updatedAt:new Date()
    },
    {
      empId: 'kuday',
      name: 'Uday',
      emailId: 'uday.kota@blackrock.com',
      workstation:'W09',
      team: 'Rock',
      createdAt: new Date(),
      updatedAt:new Date()
    },
    {
      empId: 'aishan',
      name: 'Ishan',
      emailId: 'arora.ishan@blackrock.com',
      workstation:'W11',
      team: 'Black',
      createdAt: new Date(),
      updatedAt:new Date()
    },
    {
      empId: 'rutuja',
      name: 'Rutuja',
      emailId: 'rutuja.patil@blackrock.com',
      workstation:'w95',
      team: 'Rock',
      createdAt: new Date(),
      updatedAt:new Date()
    },
  ],{});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Employees', null, {});
  }
};
