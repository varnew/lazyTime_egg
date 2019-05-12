/**
 * @author varnew
 * @date 2019/5/6
 * @desc: 生成随机字符串12位
 * @return (String)
 */
function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * @author varnew
 * @date 2019/5/11
 * @desc: 随机生成指定位数的id,默认16位
 * @params1: (Number) num
 * @return: (String)
*/
function randomRangeId(num = 16){
  let id = ''
  let charStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < num; i++) {
    const index = Math.round(Math.random() * (charStr.length - 1));
    id += charStr.substring(index,index + 1);
  }
  return id
}

/**
 * @author varnew
 * @date 2019/5/12
 * @desc: 根据名称获取query参数值
 * @params1: (String) name
 * @params2: (string) queryString
 * @return: (String)
*/
function getQueryStringByName (name, queryString) {
  let result = queryString.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
  if(result === null || result.length < 1){
    return '';
  }
  return result[1];
}

const utils = {
  createUniqueString,
  randomRangeId,
  getQueryStringByName
}
module.exports = utils
