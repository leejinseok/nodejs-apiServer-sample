'use strcit';

const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/session', controller.session);

module.exports = router;