const Service = require('egg').Service;

class PanelService extends Service {
  async add() {
    const form = this.ctx.request.body;
    await this.app.mysql.insert('panel', form);
    return;
  }
}

module.exports = PanelService;

/*
*@desc:逻辑处理器
*@do:
      1、接收来自控制器的参数
      2、查询数据
      3、返回数据
*
*/
