const Service = require('egg').Service;
const ErrorBase = require('../models/errorBaseModel');
const ErrorBreadcrumbs = require('../models/errorBreadcrumbsModel');
const ErrorPerformance = require('../models/errorPerformanceModel');
const ErrorCompare = require('../models/errorCompareModel');
const utils = require('../utils/utils')

class FundebugService extends Service {
  /**
   * @author varnew
   * @date 2019/2/25
   * @dest: 写入错误信息
   * @params: 错误信息体
  */
  async handleError() {
    const form = this.ctx.request.body;
    const baseList = await this.getBaseList()
    const compare = new ErrorCompare()
    form.typeId = compare[form.type](form, baseList) || utils.randomRangeId()
    form.ip = this.ctx.service.common.getIp(this.ctx.request)
    const baseInfo = new ErrorBase(form)
    const breadcrumbs = this.buildBreadcrumbs(form.breadcrumbs, baseInfo.id)
    const performance = form.performance.navigation[0] ? new ErrorPerformance(form.performance.navigation[0], baseInfo.id) : null
    try {
      await this.app.mysql.insert('fundebug_base', baseInfo);
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
        message: e
      };
    }

  }
  /**
   * @author varnew
   * @date 2019/3/17
   * @desc: 获取base表进行对比
   * @params:
  */
  async getBaseList() {
    try {
      const errorList = await this.app.mysql.query(`select any_value(url), any_value(title), any_value(releaseStage), any_value(metaData), any_value(name), any_value(message), any_value(stacktrace), any_value(type), any_value(severity), any_value(target) from fundebug_base group by typeId;`);
      errorList.map((item) => {
        item.target = item.target ? JSON.parse(item.target) : ''
        item.metaData = item.metaData ? JSON.parse(item.metaData) : ''
      })
      return errorList
    } catch (e) {
      return { code: 500, message: '数据库错误' }
    }
  }
  /**
   * @author varnew
   * @date 2019/2/25
   * @dest: 获取单个错误信息
   * @params: 错误信息id
  */
  async getError() {
    const id = utils.getQueryStringByName('id', this.ctx.request.req.url)
    try {
      const errorData = await this.app.mysql.get('fundebug_base', { id: id });
      let returnDate = {}
      if (errorData) {
        errorData.metaData = errorData.metaData ? JSON.parse(errorData.metaData): ''
        errorData.redo = errorData.redo ? JSON.parse(errorData.redo): ''
        errorData.target = errorData.target ? JSON.parse(errorData.target): ''
        errorData.breadcrumbs = await this.app.mysql.select('fundebug_breadcrumbs', {
          where: {
            baseId: errorData.id
          }
        })
        errorData.breadcrumbs.map((item) => {
          item.page = item.page && JSON.parse(item.page) || ''
          item.detail = item.detail &&  JSON.parse(item.detail) || ''
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
      page: utils.getQueryStringByName('page', this.ctx.request.req.url),
      size: utils.getQueryStringByName('size', this.ctx.request.req.url)
    }
    try {
      const totalSize = await this.app.mysql.query('select count(*) as totalSize from fundebug_base')
      const errorList = await this.app.mysql.query(`select * from fundebug_base order by time desc limit ${(params.page - 1) * params.size},${params.size}`);
      errorList.map((item) => {
        item.target = item.target ? JSON.parse(item.target): ''
      })
      return {
        code: 200,
        data: errorList,
        totalSize: totalSize[0].totalSize,
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
   * @date 2019/2/26
   * @dest: 获取简单错误列表
   * @params: page,size
  */
  async getErrorByTypeId() {
    const params = {
      typeId: utils.getQueryStringByName('typeId', this.ctx.request.req.url)
    }
    try {
      const errorList = await this.app.mysql.query(`SELECT * FROM fundebug_base WHERE typeId='${params.typeId}' order by time desc`);
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
   * @date 2019/4/2
   * @desc: 统计各类型的条数
  */
  async getCounts () {
    const data = {}
    const count = {
      js: 0,
      http: 0,
      source: 0
    }
    try {
      count.js = await this.app.mysql.query(`SELECT count(*) FROM fundebug_base WHERE type != 'resourceError' && type != 'httpError'`);
      count.http = await this.app.mysql.query(`SELECT count(*) FROM fundebug_base WHERE type = 'httpError'`);
      count.source = await this.app.mysql.query(`SELECT count(*) FROM fundebug_base WHERE type = 'resourceError'`);
      return {
        code: 200,
        data: {
          js: count.js[0]['count(*)'],
          http: count.http[0]['count(*)'],
          source: count.source[0]['count(*)']
        }
      }
    } catch (e) {
      console.log(e)
      data.code = 500
      data.message = e.toString()
      return data
    }
  }
  /**
   * @author varnew
   * @date 2019/5/11
   * @desc: 生成用户行为对象
   * @params1: （Array: 用户行为对象数组） breadcrumbs
   * @params2: （String: 错误唯一id） baseId
   * @return: (Array: 用户行为对象数组)
   */
  buildBreadcrumbs(list, baseId) {
    const bdbList = []
    list.map((item) => {
      item.baseId = baseId
      item = new ErrorBreadcrumbs(item)
      bdbList.push(item)
    })
    return bdbList
  }
}

module.exports = FundebugService;

/*
*@desc:逻辑处理器
*/
