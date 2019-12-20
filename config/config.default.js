'use strict';
const path = require('path');

module.exports = appInfo => {
  const config = exports = {};

  config.cluster = {
    listen: {
      path: '',
      port: 7001,
      hostname: '0.0.0.0',
    }
  };
  // 安全配置
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    },
    domainWhiteList: ['http://localhost:3001']
  };
  config.cors = {
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1548425013167_8086';

  config.key = 'session'; // 承载 Session 的 Cookie 键值对名字
  config.maxAge = 86400000 // session最大有效时间

  // add your config here
  config.middleware = [ // 中间件列表
    'gzip'
  ];

  gzip: {
    threshold: 1024 // 小于 1k 的响应体不压缩
  }

  config.view = {
    mapping: {'.html': 'ejs'} //左边写成.html后缀，会自动渲染.html文件
  };

  exports.static = {
    prefix: '/public/',
    dir: path.join('appInfo.baseDir', 'app/public'),
    // dirs: [ dir1, dir2 ] or [ dir1, { prefix: '/static2', dir: dir2 } ],
    // support lazy load
    dynamic: true,
    preload: false,
    buffer: false,
    maxFiles: 1000,
  };

  return config;
};
