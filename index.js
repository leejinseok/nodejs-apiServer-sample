'use strict';

const os = require('os');
const cluster = require('cluster');
const config = require('config');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const accessCrossDomain = require('./middleware/access-cross-domain');
const apiHeaderParser = require('./middleware/api-header-parser');
const errorHandler = require('./middleware/error-handler');
const api = require('./routes/api');
const models = require('./models');
const app = express();


app.disable('x-powered-by');
app.use(logger('tiny'));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false, limit: '1mb'}));
app.use(bodyParser.json());
app.use(accessCrossDomain);
app.use(apiHeaderParser);
app.use('/api', api);
app.use(errorHandler);
app.use((req, res) => {
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
