/**
 * @author varnew
 * @date 2019/5/12
 * @desc: 用户行为
 * @params: 用户行为信息
 */
const utils = require('../utils/utils.js')
class ErrorBreadcrumbs {
  constructor(sourceInfo) {
    const base = {
      id: null,          // '用户行为记录唯一id'
      baseId: '',      // '错误唯一id'
      time: '',        // '错误发生时间戳'
      page: '',        // '错误发生当前页面对象，包括titlr、url两个信息'
      detail: '',      // '错误在控制台输出的详细信息对象'
      type: '',        // '错误类型'
      elapsedTime: '', // '请求使用时间，仅当错误为网络请求时有该参数；
    }
    sourceInfo.page = this.jsonToString(sourceInfo.page)
    sourceInfo.detail = this.jsonToString(sourceInfo.detail)
    // 遍历设置属性值
    Object.keys(base).forEach((key) => {
      this[key] = sourceInfo[key] || base[key]
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
module.exports = ErrorBreadcrumbs;
