'use strict';

const express = require('express');
const router = express.Router();

router.get('*', (req, res, next) => {  
  const renderFileName = req.path === '/' ?  'index' : req.path.substr(1);
  const renderData = {
    version: '1.0.0',
    style: [
      `/public/admin/style/${renderFileName}.css`
    ],
    js: [
      `/public/admin/js/${renderFileName}.js`
    ]
  };

  res.render(`admin/${renderFileName}`, renderData);
});

module.exports = router;