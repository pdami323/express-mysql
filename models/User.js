const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            name : {
                type : Sequelize.STRING(20),
                allowNull : false,
                unique : true
            },
            age : {
                type : Sequelize.INTEGER.UNSIGNED,
                allowNull : false,
                unique : false,
            },
            married : {
                type : Sequelize.BOOLEAN,
                allowNull : false
            },
            company : {
                type : Sequelize.INTEGER.UNSIGNED,
                allowNull : true
            }
        },{
            sequelize,
            timestamps : true,      //createDt, updateDt 컬럼 추가 여부
            underscored : false,    //카멜케이스 여부
            modelName : "User",     //모델 이름
            tableName : "User",     //실제 테이블 이름
            paranoid : false,       //삭제할 때 실제로 삭제하지 않고 deleteAt 컬럼에 timestamp 값을 넣는다
            charset : "utf8",
            collate : "utf8_general_ci" //한글 저장
        });
    }

    //관계 설정
    static associate(db){
        db.User.belongsTo(db.Comment, {foreignKey : 'commenter', sourceKey : 'id'});
    }
}