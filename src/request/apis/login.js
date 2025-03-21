/**
 * @typedef {Object} loginApi
 * @property {string} queryCompany - 根据账号编码获取公司号 GET
 * @property {string} getvalidarule - 获取登录校验规则 GET
 * @property {string} login - 登录 POST
 * @property {string} setpwd - 修改密码 PUT
 * @property {string} genKey - 生成密钥 POST
 * @property {string} getKey - 获取密钥 POST
 * @property {string} changeAccountStatus - 锁定账户 GET
 */

/**
 * 登录接口
 * @type {loginApi}
 */
export const loginApi = {
  queryCompany: '/business/sys/sys0000/rsacct/queryCompany',
  getvalidarule: '/business/sys/params/getvalidarule',
  login: '/gateway/authorization-server/oauth/token',
  setpwd: '/gateway/business/sys/sys0010/acct/setpwd',
  genKey: '/base/crypto/gen-key',
  getKey: '/base/crypto/get-key',
  changeAccountStatus: '/business/sys/sys0010/acct/setStatus'
}
