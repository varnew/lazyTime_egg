const Subscription = require('egg').Subscription;

class Bacc extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '10s', // 1 分钟间隔
      type: 'all' // 指定所有的 worker 都需要执行
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    // 获取baccpro列表
    const res = await this.ctx.service.bacc.getBacc()
    const list = res.data.data.data.overviewBySymbols
    let bacc = {}
    // 找到bacc
    list.map((item) => {
      if (item.symbol === 'baccusdt') {
        bacc = item
      }
    })
    // 判断发送条件
    if (parseFloat(bacc.close) > 0.4500) {
      const params = {
        to: '',
        subject: '价格升高',
        text: '可以卖出'
      }
      this.ctx.service.email.sendEmail(params)
    }
  }
}

module.exports = Bacc;
