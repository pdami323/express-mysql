const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            comment : {
                type : Sequelize.STRING(30),
                allowNull : false
            }
        }, {
            sequelize,
            timestamps : true,
            modelName : 'Comment',
            tableName : 'Comment',
            paranoid : false,
            charset : 'utf8',
            collate : 'utf8_general_ci'
        });
    }

    static associate(db){
        db.Comment.hasOne(db.User, {foreignKey : 'commenter', sourceKey : 'id'});
    }
}