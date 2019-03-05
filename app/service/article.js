const Service = require('egg').Service;

class ArticleService extends Service {
  async list() {
    const user = await this.app.mysql.get('temBase', { id: 1 });
    // const user = await this.app.mysql.query('select * from temBase','');
    return user;
  }
}

module.exports = ArticleService;

/*
*@desc:逻辑处理器
*@do:
      1、接收来自控制器的参数
      2、查询数据
      3、返回数据
*
*/
