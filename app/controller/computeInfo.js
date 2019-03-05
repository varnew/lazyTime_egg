'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async getComputer() {
    const info = await this.ctx.service.computer.getInfo()
    this.ctx.body = {
      code: 200,
      data: info,
      values: null
    }
  }
}

module.exports = HomeController;
