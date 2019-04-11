'use strcit';

module.exports = (err, req, res, next) => {
  console.error('[Error]', err.stack);
  res.status(500).send(err);
};