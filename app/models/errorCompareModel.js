/**
 * @author varnew
 * @date 2019/5/12
 * @desc: 错误比较
 * @params1: (Object) error
 * @params2: (Array) errorList
 * @use: new Compare().caught(error, errorList)
 */

const utils = require('../utils/utils.js')
class ErrorCompare {
  /**
   * @author varnew
   * @date 2019/5/12
   * @desc: 初始化对象
   * @params1: (Object) params
   * @params2: (Object) sourceData
   * @return: (Object)
  */
  initData (params, sourceData) {
    const data = {}
    Object.keys(params).forEach((key) => {
      data[key] = sourceData[key] || params[key]
    })
    return data
  }
  /**
   * @author varnew
   * @date 2019/5/12
   * @desc: 比较
   * @params1: (Object) compare
   * @params2: (Array) errorList
   * @return: (Boolean | Null)
  */
  compare (compare, errorList) {
    for (let i = 0; i < errorList.length; i++) {
      const same = errorList[i]
      let isInBaseList = true
      Object.keys(same).forEach((key, index) => {
        if (compare[key]) {
          if (compare[key] && same[key] && compare[key].toString() != same[key].toString()) {
            isInBaseList = false // 不符合
          }
        }
      })
      if (isInBaseList) {
        return same.typeId
      }
    }
    return null
  }
  /**
   * @author varnew
   * @date 2019/5/12
   * @desc: 执行时错误类型比较函数
   * @params1: (Object) error
   * @params2: (Array) errorList
   * @return: (Boolean | Null)
   */
  caught (error, errorList) {
    const data = {
      'url': '',
      'title': '',
      'name': '',
      'message': '',
      'fileName': '',
      'lineNumber': '',
      'columnNumber': '',
      'stacktrace': '',
      'type': '',
      'severity': ''
    }
    const compare = this.initData(data, error)
    return this.compare(compare, errorList)
  }
  /**
   * @author varnew
   * @date 2019/5/12
   * @desc: 执行时错误类型比较函数
   * @params1: (Object) error
   * @params2: (Array) errorList
   * @return: (Boolean | Null)
   */
  uncaught (error, errorList) {
    const data = {
      'url': '',
      'title': '',
      'name': '',
      'message': '',
      'fileName': '',
      'lineNumber': '',
      'columnNumber': '',
      'stacktrace': '',
      'type': '',
      'severity': ''
    }
    const compare = this.initData(data, error)
    return this.compare(compare, errorList)
  }
  /**
   * @author varnew
   * @date 2019/5/12
   * @desc: 资源加载错误类型比较函数
   * @params1: (Object) error
   * @params2: (Array) errorList
   * @return: (Boolean | Null)
   */
  resourceError (error, errorList) {
    const data = {
      'url': '',
      'title': '',
      'type': '',
      'target': {}
    }
    const compare = this.initData(data, error)
    return this.compare(compare, errorList)
  }
  /**
   * @author varnew
   * @date 2019/5/12
   * @desc: http请求类型比较函数
   * @params1: (Object) error
   * @params2: (Array) errorList
   * @return: (Boolean | Null)
   */
  httpError (error, errorList) {
    const data = {
      'url': '',
      'title': '',
      'type': '',
      'req': '',
      'res': {}
    }
    const compare = this.initData(data, error)
    return this.compare(compare, errorList)
  }
  /**
   * @author varnew
   * @date 2019/5/12
   * @desc: 执行时错误类型比较函数
   * @params1: (Object) error
   * @params2: (Array) errorList
   * @return: (Boolean | Null)
   */
  unhandledrejection (error, errorList) {
    const data = {
      'url': '',
      'title': '',
      'releaseStage': '',
      'name': '',
      'message': '',
      'type': ''
    }
    const compare = this.initData(data, error)
    return this.compare(compare, errorList)
  }
  /**
   * @author varnew
   * @date 2019/5/12
   * @desc: WebSockect连接错误比较函数
   * @params1: (Object) error
   * @params2: (Array) errorList
   * @return: (Boolean | Null)
   */
  websocketError (error, errorList) {
    const data = {
      'url': '',
      'title': '',
      'releaseStage': '',
      'type': '',
      'target': {}
    }
    const compare = this.initData(data, error)
    return this.compare(compare, errorList)
  }
}
module.exports = ErrorCompare;
