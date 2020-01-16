'use strict';

const Controller = require('egg').Controller;

class BaccController extends Controller {
  async getBacc() {
    const response = await this.ctx.service.bacc.getBacc()
    this.ctx.body = response
  }
  async getBaccOption() {
    const response = await this.ctx.service.bacc.getBaccOption()
    this.ctx.body = response
  }
  async addBaccOption() {
    const response = await this.ctx.service.bacc.addBaccOption()
    this.ctx.body = response
  }
}

module.exports = BaccController;
