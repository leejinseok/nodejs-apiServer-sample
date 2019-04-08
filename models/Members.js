const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  'test', // 데이터베이스 이름
  'root', // 유저 명
  '1111', // 비밀번호
  {
    'host': 'localhost', // 데이터베이스 호스트
    'dialect': 'mysql' // 사용할 데이터베이스 종류
  });

const Members = sequelize.define('Members', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  pwd: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Members;