const egg = require('egg');

const workers = Number(process.argv[2] || require('os').cpus().length);
egg.startCluster({
  workers,
  baseDir: __dirname,
});

/**
 * @desc: 使用该文件可通过pm2启动egg
 * @play: pm2 start start.js
 * @author: varnew@绵阳
 * */
