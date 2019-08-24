'use strict';

const Controller = require('egg').Controller;

class BaccController extends Controller {
  async getBacc() {
    const response = await this.ctx.service.bacc.getBacc()
    this.ctx.body = response
  }
}

module.exports = BaccController;
