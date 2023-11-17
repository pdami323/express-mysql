'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t=>{
      let data = [];
      for(let i =0 ;i<10;i++){
        let obj = {
          id : i+1,
          title : "book" + (i+1),
          author : 1,
          createdAt : new Date(),
          updatedAt : new Date()
        }
        data.push(obj);
      }
      return Promise.all([
        queryInterface.bulkInsert(
          'Books', data,
          {transaction : t}
        )
      ])
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t=>{
      return Promise.all([
        queryInterface.bulkDelete('Books', null, {transaction : t})
      ])
    })
  }
};
