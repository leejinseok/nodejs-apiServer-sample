const os = require('os');
const cluster = require('cluster');
const express = require('express');
const app = express();
const config = require('config');
const port = config.get('port');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  'test', // 데이터베이스 이름
  'root', // 유저 명
  '1111', // 비밀번호
  {
    'host': 'localhost', // 데이터베이스 호스트
    'dialect': 'mysql' // 사용할 데이터베이스 종류
  }
);

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

app.post('/members', (req, res, next) => {
  // Members.create({
  //   email: 'Practice of Sequelize.js',
  //   pwd: '123'
  // });
});

app.get('/', (req, res, next) => {
  res.send('Hello World');
});

if (cluster.isMaster) {
  os.cpus().forEach((cpu) => {
    cluster.fork();
  });

  cluster.on('exit', (worker, code, signal) => {
    if (code === 200) {
      cluster.fork();
    }
  });
} else {
  app.listen(port, () => {
    console.log(`Server is running on ${port}`);
  });
}
