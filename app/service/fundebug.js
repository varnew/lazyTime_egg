const Service = require('egg').Service;

class FundebugService extends Service {
  /**
   * @author varnew
   * @date 2019/2/25
   * @dest: 写入错误信息
   * @params: 错误信息体
  */
  async handleError() {
    const form = this.ctx.request.body;
    form.ip = this.getIp(this.ctx.request)
    form.metaData = JSON.stringify(form.metaData)
    form.breadcrumbId = form.performanceId = this.randomRangeId(20)
    form.redo = JSON.stringify(form.redo)
    form.target = JSON.stringify(form.target)
    const breadcrumbs = form.breadcrumbs
    const performance = form.performance.navigation[0] || null
    if (performance) {
      performance.serverTiming = performance.serverTiming.toString()
      performance.baseId = form.performanceId
    }
    breadcrumbs.map((item) => {
      item.baseid = form.breadcrumbId
      item.detail = JSON.stringify(item.detail)
      item.page = JSON.stringify(item.page)
    })
    delete form.breadcrumbs
    delete form.performance
    try {
      await this.app.mysql.insert('fundebug_base', form);
      for (let i = 0; i < breadcrumbs.length; i++) {
        await this.app.mysql.insert('fundebug_breadcrumbs', breadcrumbs[i]);
      }
      if (performance) {
        await this.app.mysql.insert('fundebug_performance', performance);
      }
      return {
        code: 200,
        message: '错误记录成功'
      }
    } catch (e) {
      console.log(e)
      return {
        code: 500,
        message: '数据库插入错误'
      };
    }

  }
  /**
   * @author varnew
   * @date 2019/2/25
   * @dest: 获取单个错误信息
   * @params: 错误信息id
  */
  async getError() {
    const id = this.getQueryStringByName('id', this.ctx.request.req.url)
    try {
      const errorData = await this.app.mysql.get('fundebug_base', { id: id });
      let returnDate = {}
      if (errorData) {
        errorData.metaData = JSON.parse(errorData.metaData)
        errorData.redo = JSON.parse(errorData.redo)
        errorData.target = JSON.parse(errorData.target)
        errorData.breadcrumbs = await this.app.mysql.select('fundebug_breadcrumbs', {
          where: {
            baseId: errorData.breadcrumbId
          }
        })
        errorData.breadcrumbs.map((item) => {
          item.page = JSON.parse(item.page)
          item.detail = JSON.parse(item.detail)
        })
        const navigation = await this.app.mysql.select('fundebug_performance', {
          where: {
            baseId: errorData.performanceId
          }
        })
        errorData.performance = {
          navigation: [...navigation]
        }
        returnDate = {
          code: 200,
          message: '查询成功',
          data: errorData
        }
      } else {
        returnDate = {
          code: 404,
          message: '找不到该记录'
        }
      }
      return returnDate
    } catch (e) {
      console.log(e)
      return {
        code: 500,
        message: '数据库读取错误'
      };
    }

  }
  /**
   * @author varnew
   * @date 2019/2/26
   * @dest: 获取错误列表
   * @params: page,size
  */
  async getErrors() {
    const params = {
      page: this.getQueryStringByName('page', this.ctx.request.req.url),
      size: this.getQueryStringByName('size', this.ctx.request.req.url)
    }
    try {
      // const errorList = await this.app.mysql.select('fundebug_base');
      const errorList = await this.app.mysql.query(`select * from fundebug_base order by time desc limit ${(params.page - 1) * params.size},${params.size}`);
      errorList.map((item) => {
        item.target = JSON.parse(item.target)
      })
      return {
        code: 200,
        data: errorList,
        message: '查询成功'
      }
    } catch (e) {
      console.log(e)
      return {
        code: 500,
        message: '数据库读取错误'
      };
    }

  }
  /**
   * @author varnew
   * @date 2019/2/25
   * @dest: 生成id(唯一)
   * @params: id长度
  */
  randomRangeId(num){
    let id = ''
    let charStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < num; i++) {
      const index = Math.round(Math.random() * (charStr.length - 1));
      id += charStr.substring(index,index + 1);
    }
    return id
  }
  /**
   * @author varnew
   * @date 2019/2/26
   * @dest: 获取queryString参数
   * @params: 参数名
  */
  getQueryStringByName (name, queryString) {
    var result = queryString.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
    if(result === null || result.length < 1){
      return '';
    }
    return result[1];
  }
  /**
   * @author varnew
   * @date 2019/3/1
   * @desc: 获取用户ip
  */
  getIp (req) {
    let ip = req.headers['x-real-ip'] || // 判断是否有反向代理 IP
             req.headers['x-forwarded-for'] || // 判断 connection 的远程 IP
             req.socket.remoteAddress || // 判断后端的 socket 的 IP
             '';
    if (ip.split(',').length > 0) {
      ip = ip.split(',')[0];
    }
    return ip;
  }
}

module.exports = FundebugService;

/*
*@desc:逻辑处理器
*@do:
      1、接收来自控制器的参数
      2、查询数据
      3、返回数据
*
*/
