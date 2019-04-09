'use strict';

const os = require('os');
const cluster = require('cluster');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const config = require('config');
const port = config.get('port');
const api = require('./routes/api');
const models = require('./models');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  res.send('Hello, nodejs api server sample');
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
