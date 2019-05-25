'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // router.get('/', controller.home.index);
  // router.get('/computer', controller.computeInfo.getComputer);
  // router.post('/panel/add', controller.panel.addPanel);
  // router.redirect('/', '/home/index', 302); // 内部重定向，内部重定向写在controller中
  // restful风格
  router.get('home', '/', controller.home.index);
  router.get('computeInfo', '/computer', controller.computeInfo.getComputer);
  router.post('panel', '/panel/add', controller.panel.addPanel);
  router.post('fundebug', '/fundebug', controller.fundebug.handleError);
  router.get('fundebug', '/fundebug/get', controller.fundebug.getError);
  router.get('fundebug', '/fundebug/getErrors', controller.fundebug.getErrors);
  router.get('fundebug', '/fundebug/getErrorByTypeId', controller.fundebug.getErrorByTypeId);
  router.get('fundebug', '/fundebug/counts', controller.fundebug.getCounts);
};
