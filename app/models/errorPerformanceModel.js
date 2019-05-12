/**
 * @author varnew
 * @date 2019/5/12
 * @desc: 性能
 * @params: 性能信息
 */
const utils = require('../utils/utils.js')
class Performance {
  constructor(sourceInfo) {
    const base = {
      id: null, // '唯一id'
      baseId: '', // '错误关联id',
      name: '', // '当前浏览器url',
      entryType: '', // '资源类型',
      startTime: '', // '开始时间',
      duration: '', // '加载时间',
      initiatorType: '', // '谁发起的请求',
      workerStart: '', // '如果当前上下文是”worker”，则 workerStart 属性返回开始获取资源的时间，否则返回0',
      nextHopProtocol: '', // '请求资源的网络协议',
      redirectStart: '', // '返回第一个HTTP跳转开始时的Unix毫秒时间戳。如果没有跳转，或者不是同一个域名内部的跳转，则返回值为0。',
      redirectEnd: '', // '返回最后一个HTTP跳转结束时（即跳转回应的最后一个字节接受完成时）的Unix毫秒时间戳。如果没有跳转，或者不是同一个域名内部的跳转，则返回值为0。',
      fetchStart: '', // '返回浏览器准备使用HTTP请求读取文档时的Unix毫秒时间戳。该事件在网页查询本地缓存之前发生。',
      domainLookupStart: '', // '返回域名查询开始时的Unix毫秒时间戳。如果使用持久连接，或者信息是从本地缓存获取的，则返回值等同于fetchStart属性的值。',
      domainLookupEnd: '', // '返回域名查询结束时的Unix毫秒时间戳。如果使用持久连接，或者信息是从本地缓存获取的，则返回值等同于fetchStart属性的值。',
      connectStart: '', // '返回HTTP请求开始向服务器发送时的Unix毫秒时间戳。如果使用持久连接（persistent connection），则返回值等同于fetchStart属性的值。',
      connectEnd: '', // '返回浏览器与服务器之间的连接建立时的Unix毫秒时间戳。如果建立的是持久连接，则返回值等同于fetchStart属性的值。连接建立指的是所有握手和认证过程全部结束。',
      secureConnectionStart: '', // '返回浏览器与服务器开始安全链接的握手时的Unix毫秒时间戳。如果当前网页不要求安全连接，则返回0。',
      requestStart: '', // '返回浏览器向服务器发出HTTP请求时（或开始读取本地缓存时）的Unix毫秒时间戳。',
      responseStart: '', // '返回浏览器从服务器收到（或从本地缓存读取）第一个字节时的Unix毫秒时间戳。',
      responseEnd: '', // '返回浏览器从服务器收到（或从本地缓存读取）最后一个字节时（如果在此之前HTTP连接已经关闭，则返回关闭时）的Unix毫秒时间戳。',
      transferSize: '', // '表示资源的大小（以八位字节为单位），该大小包括响应头字段和响应有效内容主体（Payload Body）',
      encodedBodySize: '', // '表示从HTTP网络或缓存中接收到的有效内容主体（Payload Body）的大小（在删除所有应用内容编码之前）',
      decodedBodySize: '', // '表示从HTTP网络或缓存中接收到的消息主体（Message Body）的大小（在删除所有应用内容编码之后）',
      serverTiming: '', // '一个请求周期内，服务器在响应过程中，每个步骤的耗时情况',
      unloadEventStart: '', // '前一个网页（与当前页面同域）unload 的时间戳，如果无前一个网页 unload 或者前一个网页与当前页面不同域，则值为 0',
      unloadEventEnd: '', // '如果前一个网页与当前网页属于同一个域名，则返回前一个网页unload事件的回调函数结束时的Unix毫秒时间戳。如果没有前一个网页，或者之前的网页跳转不是在同一个域名内，则返回值为0。',
      domInteractive: '', // '返回当前网页DOM结构结束解析、开始加载内嵌资源时（即Document.readyState属性变为interactive、相应的readystatechange事件触发时）的Unix毫秒时间戳。',
      domContentLoadedEventStart: '', // '返回当前网页DOMContentLoaded事件发生时（即DOM结构解析完毕、所有脚本开始运行时）的Unix毫秒时间戳。',
      domContentLoadedEventEnd: '', // '返回当前网页所有需要执行的脚本执行完成时的Unix毫秒时间戳。',
      domComplete: '', // '返回当前网页DOM结构生成时（即Document.readyState属性变为complete，以及相应的readystatechange事件发生时）的Unix毫秒时间戳。',
      loadEventStart: '', // '返回当前网页load事件的回调函数开始时的Unix毫秒时间戳。如果该事件还没有发生，返回0。',
      loadEventEnd: '', // '返回当前网页load事件的回调函数运行结束时的Unix毫秒时间戳。如果该事件还没有发生，返回0。',
      type: '', // '标志页面导航类型',
      redirectCount: '', // '表示到达最终页面前，重定向的次数，但是这个接口有同源策略限制，即仅能检测同源的重定向'
    }
    sourceInfo.serverTiming = sourceInfo.serverTiming ? sourceInfo.serverTiming.toString() : ''
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
module.exports = Performance;
