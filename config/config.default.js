'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // 安全配置
  config.security = {
    csrf: {
      enable: true,
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

  config.mysql = {
    enable: true,
    package: 'egg-mysql',
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
    client: { // 配置
      host: '193.112.72.172',
      port: '3306',
      user: 'root',
      password: 'varnew19960101',
      database: 'template'
    }
  }

  return config;
};
