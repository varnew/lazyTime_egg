module.exports = app => {
  // 开始前执行
  app.beforeStart(async () => {
  });
  // 准备好执行
  app.ready(async () => {
    // 执行定时任务
    await app.runSchedule('bacc');
  });
  // 关闭前执行
  app.beforeClose(async () => {
  });
};
