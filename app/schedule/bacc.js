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
    // 获取当前价格列表
    const baccRes = await this.ctx.service.bacc.getBacc()
    const currentList = baccRes.overviewBySymbols
    // 获取数据库币种买卖配置列表
    const optionRes = await this.ctx.service.bacc.getBaccOption()
    const optionList = optionRes.data
    // 找出需要进行比较的币种,并比较然后组织成文本输出
    const sendList = []
    for (let i = 0; i < currentList.length ; i++) {
      const currentItem = currentList[i]
      for (let j = 0; j < optionList.length; j++) {
        const optionItem = optionList[j]
        if (currentItem.symbol === optionItem.name) {
          const currentPrice = parseFloat(currentItem.close);
          const buyPrice = parseFloat(optionItem.buyPrice);
          const sellPrice = parseFloat(optionItem.sellPrice);
          let str = '';
          if (currentPrice <= buyPrice) {
            str = `可以买入${optionItem.name}, 当前价格${currentItem.close},设置买入价格${buyPrice}个usdt`;
          }
          if (currentPrice >= sellPrice) {
            str = `可以卖出${optionItem.name}, 当前价格${currentItem.close},设置卖出价格${sellPrice}个usdt`;
            sendList.push(str);
          }
        }
      }

    }
    // 有消息时发送邮件
    if (sendList.length > 0) {
      const params = {
        to: '',
        str: ''
      }
      sendList.forEach((item) => {
        params.str += item + ';';
      })
      this.ctx.service.email.sendEmail(params)
    }
  }
}

module.exports = Bacc;
