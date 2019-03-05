const pm = require('pm2');
pm.connect(function(err) {
  if (err) {
    console.error(err);
    process.exit(2);
  }
  pm.start({
    "watch": ["./app"], // 开启 watch 模式，并监听 app 文件夹下的改动
    "ignore_watch": ["node_modules", "assets"], // 忽略监听的文件
    "watch_options": {
      "followSymlinks": false // 不允许符号链接
    },
    name: "lazyTime",
    script: "egg-bin dev", // APP 入口
    exec_mode: "fork_mode", // 开发模式下建议使用 fockModel（）、cluster_mode（集群）
    instances: 1, // 仅启用 1 个 CPU
    max_restarts: 5, // 最大重启次数
    max_memory_restart: "400M", // 当占用 400M 内存时重启 APP
    "error_file" : "./logs/pmTow_err.log",  // 错误日志路径
  }, function(err, apps) {
    pm.disconnect(); // Disconnects from PM2
    if (err) throw err
  });
});

