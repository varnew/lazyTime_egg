/**
 * @author varnew
 * @date 2019/5/11
 * @desc: 错误基础信息类
 * @params: 错误信息
*/
const utils = require('../utils/utils.js')
class ErrorBaseModel {
  constructor(sourceInfo) {
    const data = {
      id: this.buildUniqueId(), // '错误唯一id',
      notifierVersion: '', // '错误脚本版本',
      userAgent: '', // '用户浏览器信息',
      locale: '', // '当前html标签lang属性的值，用于代表网页所处国际环境。',
      url: '', // '错误发生时，当前页面的url',
      title: '', // '当前网页的title',
      appVersion: '', // 'web版本，用于标记当前网页的版本号，即开发者自定义的网页版本号。',
      apiKey: '', // '密钥，用于标记错误应用归属。',
      releaseStage: '', // null,
      metaData: '', // '网络请求参数',
      name: '', // '错误名称',
      time: '', // '错误发生时间戳',
      message: '', // '错误描述信息',
      stacktrace: '', // '错误具体内容',
      type: '', // '错误类型',
      severity: '', // '错误严重程度',
      breadcrumbId: this.buildUniqueId(), // '用户行为id',
      redo: '', // '场景重现',
      performanceId: this.buildUniqueId(), // '性能信息id',
      target: '', // null,
      status: '', // 错误当前处理状态,
      ip: '', // '用户ip地址',
      typeId: '', // 标记同一个错误，用于识别重复的错误，
    }
    sourceInfo.metaData = this.jsonToString(data.metaData)
    sourceInfo.redo = this.jsonToString(sourceInfo.redo)
    sourceInfo.target = this.jsonToString(sourceInfo.target)
    // 遍历设置属性值
    Object.keys(data).forEach((key) => {
      this[key] = sourceInfo[key] || data[key]
    })
  }
  jsonToString (obj) {
    let string = ''
    if (obj) {
      string = JSON.stringify(obj)
    }
    return string
  }
  buildUniqueId () {
    return utils.randomRangeId(16)
  }
}
module.exports = ErrorBaseModel;
