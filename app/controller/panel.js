'use strict';

const Controller = require('egg').Controller;

const addRule = {
  name: { type: 'string', required: false },
  desc: { type: 'string', required: false },
  url: { type: 'string', required: false }
}
class PanelController extends Controller {
  async addPanel() {
    this.ctx.validate(addRule, this.ctx.request.query)
    await this.ctx.service.panel.add()
    this.ctx.body = {
      code: 200,
      data: {
        type: 'success'
      },
      message: '操作成功'
    }
  }
}

module.exports = PanelController;
