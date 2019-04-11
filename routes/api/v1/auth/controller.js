'use strict';

/**
 * 로그인 정보
 */
module.exports.session = (req, res, next) => {
  res.json({
    id: 'admin',
    permission: 99
  });
};
