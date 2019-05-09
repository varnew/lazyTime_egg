'use strict';

const Controller = require('egg').Controller;

class ImgUploadController extends Controller {
  async uploadImg() {
    const response = await this.ctx.service.imgupload.upload()
    this.ctx.body = response
  }
}

module.exports = ImgUploadController;
