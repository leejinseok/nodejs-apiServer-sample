const os = require('os');
const cluster = require('cluster');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const config = require('config');
const port = config.get('port');
const Members = require('./models/Members');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.post('/members', (req, res, next) => {
  console.log(req.body);
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
