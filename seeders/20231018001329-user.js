'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t=>{
      return Promise.all([
        queryInterface.bulkInsert(
          'User',
          [
            {
              id : 1,
              name : "John",
              age : 20,
              married : false,
              company : 1, 
              commenter : 1,
              createdAt : new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
              updatedAt : new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
            },
            {
              id : 2,
              name : "Mike",
              age : 30,
              married : false,
              company : 2, 
              commenter : 2,
              createdAt : new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
              updatedAt : new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
            }
          ],{transaction : t}
        )
      ])
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t=>{
      return Promise.all([
        queryInterface.bulkDelete('User', null, {transaction : t})
      ])
    })
  }
};
