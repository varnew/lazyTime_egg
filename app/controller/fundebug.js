'use strict';

const Controller = require('egg').Controller;

class FundebugController extends Controller {
  async handleError() {
    const response = await this.ctx.service.fundebug.handleError()
    this.ctx.body = response
  }
  async getError() {
    const response = await this.ctx.service.fundebug.getError()
    this.ctx.body = response
  }
  async getErrors() {
    const response = await this.ctx.service.fundebug.getErrors()
    this.ctx.body = response
  }
  async getErrorByTypeId() {
    const response = await this.ctx.service.fundebug.getErrorByTypeId()
    this.ctx.body = response
  }
}

module.exports = FundebugController;
