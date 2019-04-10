'use strict';

const DEFAULT_GROUP_NO = 1;

module.exports =  async (req, res, next) => {
  if(req.method === 'OPTIONS') return next();  // CORS 목적의 request 인 경우 무시.

  const device = req.header('X-W-Device');
  const country = req.header('X-W-Country');
  const group = req.header('X-W-Group');
  const cookie = req.header('cookie');

  const deviceMap = parseElement(device) || {};
  const countryMap = parseElement(country) || {};
  const groupMap = parseElement(group) || {};
  const cookieMap = parseElement(cookie) || {};

  req.apiHeader = {
    'device': {
      'name': deviceMap.n,
      'osName': deviceMap.o,
      'osVersion': deviceMap.v,
      'resolution': deviceMap.r,
      'uuid': deviceMap.u,
      'adid': deviceMap.a,
      'windowType': deviceMap.wt || 'ETC',
      'windowVersion': deviceMap.wv,
      'pcstamp': cookieMap.pcstamp,
      'abTestGroup': cookieMap.tg
    },
    'country': {
      'locale': countryMap.c,
      'lang': countryMap.l,
    },
    'group': {
      'default': groupMap.d,
      'current': groupMap.c || DEFAULT_GROUP_NO,
      'landing': cookieMap.landing > 3 ? DEFAULT_GROUP_NO : cookieMap.landing,
      'select': cookieMap.select
    }
  };

  // 버전 비교를 쉽게 할 수 있도록 windowVersion 을 정수형으로 변경, windowVersion 정보가 없을 경우 0
  // @see https://docs.google.com/document/d/1FjinHGtur8-xhwY46q78DKyQ4nXnpy3U_ujkZg7Mfw0/edit
  if(req.apiHeader.device.windowVersion) {
    const [major, minor, patch] = req.apiHeader.device.windowVersion.split('.');
    req.apiHeader.device.windowVersionNumber = (major*1000000)+(minor*1000)+(patch ? parseInt(patch) : 0);
  } else {
    req.apiHeader.device.windowVersionNumber = 0;
  }

  next();
};

function parseElement(elementString) {
  if(!elementString) return null;

  const result = {};
  const regex = /([a-zA-Z0-9]+)=([a-zA-Z0-9.\-\s]+)/g;
  const clientRes = elementString.match(regex);
  if(!clientRes) return null;

  clientRes.forEach(function(v) {
    const kv = (v + '').split('=');
    result[kv[0]] = kv[1];
  });

  return result;
}