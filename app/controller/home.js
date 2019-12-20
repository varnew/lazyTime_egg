'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    let title = "我是首页"; //向模板传入数据
    await this.ctx.render('index',{
      title: title
    });
  }
}

module.exports = HomeController;
