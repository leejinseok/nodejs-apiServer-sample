const express = require('express');
const router = express.Router();

router.use('/v1.0', require('./v1'));

module.exports = router;
