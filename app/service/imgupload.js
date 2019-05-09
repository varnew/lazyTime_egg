const Service = require('egg').Service;
const request = require('request');
let qiniu = require('qiniu');
qiniu.conf.ACCESS_KEY = 'kY-F1ItHbFZ3br2gmVQ08L7pW9OOFxW016elAclK';
qiniu.conf.SECRET_KEY = 'PbPCWUeSP2fopwaWzBdKTQKthtPiUEW2QUBf0dHN';
//要上传的空间
bucket = 'geetion';
class ImgUploadService extends Service {
  /**
   * @author varnew
   * @date 2019/2/25
   * @dest:
   * @params:
   */
  async upload() {
    const form = this.ctx.request.body;
    var key='1.jpg';
    const uploadToken = this.uptoken(bucket, key);
    var config = new qiniu.conf.Config();
    // 空间对应的机房
    config.zone = qiniu.zone.Zone_z0;
    //要上传文件的本地路径
    // var localFile = "./1.jpg";
    // const readableStream = form
    let readableStream = request(url);
    var formUploader = new qiniu.form_up.FormUploader(config);
    var putExtra = new qiniu.form_up.PutExtra();
    // 文件上传
    formUploader.putStream(uploadToken, key, readableStream, putExtra, function(respErr, respBody, respInfo) {
      if (respErr) {
        throw respErr;
      }
      if (respInfo.statusCode == 200) {
        console.log(respBody);
      } else {
        console.log(respInfo.statusCode);
        console.log(respBody);
      }
    });
  }
  //构建上传策略函数
  uptoken(bucket, key) {
    var putPolicy = new qiniu.rs.PutPolicy({scope: bucket+":"+key});
    return putPolicy.uploadToken();
  }
}

module.exports = ImgUploadService;

/*
*@desc:逻辑处理器
*@do:
*
*/
