const Sequelize = require('sequelize');

module.exports = class company extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            name : {
                type : Sequelize.STRING(30),
                allowNull : false
            },
            desc : {
                type : Sequelize.STRING(50),
                allowNull : true
            }
        }, {
            sequelize, 
            timestamps : true,
            underscored : false,
            modelName : "Company",
            tableName : "Company",
            paranoid : false,
            charset : "utf8",
            collate : "utf8_general_ci"
        });
    }
    
}