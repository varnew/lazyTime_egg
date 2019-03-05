'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const tem = await this.ctx.service.article.list()
    this.ctx.body = {
      code: 200,
      data: tem,
      values: null
    }
  }
}

module.exports = HomeController;
