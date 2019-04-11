'use strict';

/**
 * 로그인 정보
 */
exports.session = (req, res, next) => {
  try {
    const name = req.body.name.sdf;
  } catch (error) {
    return next(error);
  }

  res.json({
    id: 'admin',
    permission: 99
  });
};
