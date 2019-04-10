'use strict';

const os = require('os');
const cluster = require('cluster');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const app = express();
const config = require('config');
const api = require('./routes/api');
const admin = require('./routes/admin');
const accessCrossDomain = require('./middleware/access-cross-domain');
const apiHeaderParser = require('./middleware/api-header-parser');
const errorHandler = require('./middleware/error-handler');
const models = require('./models');

app.disable('x-powered-by');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('tiny'));
app.use(bodyParser.urlencoded({extended: false, limit: '1mb'}));
app.use(bodyParser.json());
app.use(accessCrossDomain);
app.use(apiHeaderParser);
app.use('/admin', admin);
app.use('/api', api);
app.use(errorHandler);
app.use((req, res, next) => {
  res.status(404).send('404 Not Found!');
});

if (cluster.isMaster) {
  os.cpus().forEach(() => {
    cluster.fork();
  });

  cluster.on('exit', (worker, code, signal) => {
    if (code === 200) {
      cluster.fork();
    }
  });
} else {
  const port = config.get('port');
  app.listen(port, () => {
    console.log(`Server is running on ${port}`);
  });
}
