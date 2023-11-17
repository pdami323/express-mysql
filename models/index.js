const {Sequelize} = require('sequelize');

//클래스 불러오기
const user = require('./User');
const comment = require('./Comment');
const company = require('./Company');
const book = require('./Book');

//실행환경 설정
const env = process.env.NODE_ENV || "development";
//데이터베이스 연결 설정
const config = require(__dirname + '/../config/config.json')[env]; //__dirname : 현재 폴더 경로

const db = {};

//MySQL 연결객체 생성
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

//연결객체를 나중에 재사용하기 위해 db.sequelize에 넣어둔다.
db.sequelize = sequelize;

//모델클래스를 넣음
db.User = user;
db.Comment = comment;
db.Company = company;
db.Book = book(sequelize, Sequelize);

//모델을 초기화하여 DB와 연결하고 테이블을 생성하거나 설정하는 역할
user.init(sequelize);
comment.init(sequelize);
company.init(sequelize);

//테이블 간 관계 연결
user.associate(db);
comment.associate(db);

//객체를 모듈로 내보내기
module.exports = db;
