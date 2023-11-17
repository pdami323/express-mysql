'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    return queryInterface.sequelize.transaction(t=>{
      return Promise.all([
        queryInterface.addColumn('User', 'address', {
          type : Sequelize.STRING,
          allowNull : true
        }, {transaction : t})
      ])
    })
  },

  async down (queryInterface, Sequelize) {
  
    return queryInterface.sequelize.transaction(t=>{
      return Promise.all([
        queryInterface.removeColumn('User', 'address', {transaction : t})
      ]);
    });

    // raw 쿼리
    // var sql = "alter table nodejs.User drop column address";
    // return queryInterface.sequelize.query(sql, {
    //   type : Sequelize.QueryTypes.RAW
    // });
  }
};
