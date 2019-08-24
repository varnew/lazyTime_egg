const Service = require('egg').Service;
const bodyParser = require('body-parser');

class BaccService extends Service {
  async getBacc() {
    try {
      const params = {"query":"{overviewBySymbols(symbols: [\"btcusdt\",\"eosusdt\",\"htusdt\",\"ethusdt\",\"dateth\",\"bchusdt\",\"bchbtc\",\"etcusdt\",\"xrpusdt\",\"xemusdt\",\"ltcusdt\",\"neousdt\",\"eoseth\",\"omgeth\",\"ctxceth\",\"itceth\",\"iosteth\",\"gnxeth\",\"btmeth\",\"onteth\",\"qtumeth\",\"datxeth\",\"blzeth\",\"neobtc\",\"blzbtc\",\"storjbtc\",\"btmbtc\",\"ethbtc\",\"xrpbtc\",\"eosbtc\",\"ltcbtc\",\"ontusdt\",\"etcbtc\",\"xembtc\",\"qtumbtc\",\"qtumusdt\",\"waneth\",\"dashusdt\",\"bixeth\",\"hiteth\",\"elaeth\",\"acteth\",\"boxeth\",\"abteth\",\"dtaeth\",\"elfeth\",\"hteth\",\"htbtc\",\"bsvbtc\",\"iicbtc\",\"hptusdt\",\"baccusdt\"]) {symbol high low open close rate amount vol estimate {high low open close btc}},qoutes {code text weight}}"}
      const data = await this.ctx.curl('https://www.baccpro.com/-/x/g', {
        method: 'POST',
        dataType: 'json',
        headers: {
          'Content-Type': 'application/json'
        },
        data: params
      });
      return {
        code: 200,
        data,
        message: '获取成功'
      }
    } catch (e) {
      console.log(e)
      return {
        code: 500,
        message: e
      };
    }

  }
}

module.exports = BaccService;

/*
*@desc:逻辑处理器
*/
