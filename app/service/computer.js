const Service = require('egg').Service;
const os = require('os');

class ComputerService extends Service {
  async getInfo() {
    const info = {
      freemem: os.freemem()/1024/1024, // 空闲内存，单位M
      totalmem: os.totalmem()/1024/1024 // 系统总内存，单位M
    }
    return info;
  };
}

module.exports = ComputerService;

/*
*@desc:逻辑处理器
*@do:
      1、接收来自控制器的参数
      2、查询数据
      3、返回数据
*
*/
