const sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
        title : {
            type : DataTypes.STRING,
            allowNull : false
        },
        author : {
            type : DataTypes.INTEGER.UNSIGNED,
            allowNull : false
        }
    },{
        sequelize, 
        timestamps : true,
        underscored : false,
        paranoid : false,
        charset : "utf8",
        collate : "utf8_general_ci"
    });
    return Book;
}