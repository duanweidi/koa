const jwt = require('jsonwebtoken')
const serect = 'token'

module.exports = (userinfo) => { //创建token并导出
  const token = jwt.sign({
    user: userinfo.user,
    id: userinfo.id
  }, serect, {expiresIn: '1h'});
  return token;
};