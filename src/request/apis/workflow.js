/**
 * @typedef {Object} workflowApi
 * @property {string} getGraph - 获取流程图 GET
 * @property {string} getCompany - 转发、转办获取单位 GET
 * @property {string} getOrg - 转发、转办获取部门 GET
 * @property {string} getFowardParticipant - 获取流程转发参与者搜索 GET
 * @property {string} getTraParticipant - 获取流程转办参与者搜索 GET
 * @property {string} workitemForward - 转发提交 POST
 * @property {string} workitemTransfer - 转办提交 POST
 * @property {string} forwardSubmit - 转发项发表评论 POST
 */

/**
 * 工作流接口
 * @type {workflowApi}
 */
export const workflowApi = {
  getGraph: '/business/wfm/draw_graph/bpmn',
  getCompany: '/business/wfm/ins-manage-mas/getForCom',
  getOrg: '/business/wfm/ins-manage-mas/getForDep',
  getFowardParticipant: '/business/wfm/ins-manage-mas/getFowardParticipant',
  getTraParticipant: '/business/wfm/ins-manage-mas/getTransParticipant',
  workitemForward: '/business/wfm/ins-manage/workitem-forward',
  workitemTransfer: '/business/wfm/ins-manage/workitem-transfer',
  forwardSubmit: '/business/wfm/ins-manage-mas/forward-submit'
}
