// 销售合同的API接口
import request from '@/utils/request'
import { useStores } from '@/utils/useStores'
// /business/om/auto/bzs_om2121/query/om2100hform 公司基本信息
// /business/om/auto/bzs_om2121/query/tabdehead 表格信息接口
// /business/om/auto/om_qd_cx/query/pm2100qdform 自查表基本信息 Get
// /business/om/auto/om_qd_cx/query/tabqddetail 自查表表格信息 Get
// /business/om/auto/om_ys_sp/query/billhead 合同预算基础信息 Get
// /business/om/auto/om_ys_sp/query/billmgrid 合同预算表格 Get
// /business/om/auto/om_cgfk_sp/query/headformpanel 项目采购付款计划 基础信息
// 回款计划 /business/om/auto/om_hk_sp/query/billform
// 回款计划表格 
// 销售-辅助信息 /business/om/auto/om_fz_cx/query/tabfzdetail
// /business/om/auto/om2102/query/pm2102qdform 审批页面基础信息
// /business/om/auto/om2102/query/tabqddetail 审批页面表格信息
// /business/om/auto/om2102/crud合同中心审批确认


/**
 * 销售合同接口
 * @type {saleAgreementApi}
 */
export const saleAgreementApi = {
  getBaseInfo:'/business/om/auto/bzs_om2121/query/om2100hform',
  getProInfo:'/business/om/auto/bzs_om2121/query/tabdehead',
  getCompany: '/business/om/auto/bzs_om2121/query/om2100hform',
  getTable: '/business/om/auto/bzs_om2121/query/tabdehead',
  getCheckDetail: '/business/om/auto/om_qd_cx/query/pm2100qdform',
  getCheckTableDetail: '/business/om/auto/om_qd_cx/query/tabqddetail',
  getBillhead:'/business/om/auto/om_ys_cx/query/billhead',
  getBillmgrid:'/business/om/auto/om_ys_cx/query/billmgrid',
  getPayPlanBase:'/business/om/auto/om_cgfk_cx/query/headformpanel',
  getPayPlanTable:'/business/om/auto/om_cgfk_cx/query/detailgridpanel',
  getReturnInfo:'/business/om/auto/om_hk_cx/query/billform',
  getReturnTable:'/business/om/auto/om_hk_cx/query/billmgrid',
  getSupplyInfo:'/business/om/auto/om_fz_cx/query/tabfzdetail',
  getApproveBase:'/business/om/auto/om2102/query/pm2102qdform',
  getApproveTable:'/business/om/auto/om2102/query/tabqddetail',
  getApproveSubmit:'/business/om/auto/om2102/crud'
}