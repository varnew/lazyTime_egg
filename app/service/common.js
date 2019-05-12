const Service = require('egg').Service;
const EmailService = require('./email');
const utils = require('../utils/utils')

class CommonService extends Service {
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

module.exports = CommonService;

/*
*@desc:公共服务
*/
