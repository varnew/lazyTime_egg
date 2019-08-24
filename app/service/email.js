const Service = require('egg').Service;
const email = require('emailjs');

class EmailService extends Service {
  /**
   * @author varnew
   * @date 2019/5/9
   * @dest: 发送邮件通知
   */
  async sendEmail(data) {
    // data: {
    //   to: ''
    //   subject: '',
    //   text: ''
    // }
    const server = email.server.connect({
      user: "varnew@163.com", // 开启POP3/SMTP服务的邮箱
      password: "wxl19960101", // 授权码填在这里
      host: "smtp.163.com", // 这里以QQ邮箱为例
      ssl: true, // 开启SSL
    })
    var message = {
      from: "<varnew@163.com>", // 发送方邮件地址 <varnew@163.com>
      to: data.to || "861461335@qq.com", // 接受方邮件地址，多个接收方用英文逗号分隔即可 861461335@qq.com
      subject: data.subject,
      text: data.text,
    }
    server.send(message, (err, message) => {
      console.log(err || message)
    })
  }
}

module.exports = EmailService;

/*
*@desc:邮件通知服务
*@detai: https://juejin.im/entry/5c0d15fa51882512d44510ba
*@use:
*
  try {
    this.ctx.service.email.sendEmail()
  } catch (e) {
    console.log('email')
    console.log(e)
  }
*/
