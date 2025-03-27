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
/**
 * 销售合同接口
 * @type {saleAgreementApi}
 */
export const saleAgreementApi = {
  getCompany: '/business/om/auto/bzs_om2121/query/om2100hform',
  getTable: '/business/om/auto/bzs_om2121/query/tabdehead',
  getCheckDetail: '/business/om/auto/om_qd_cx/query/pm2100qdform',
  getCheckTableDetail: '/business/om/auto/om_qd_cx/query/tabqddetail',
  getBillhead:'/business/om/auto/om_ys_sp/query/billhead',
  getBillmgrid:'/business/om/auto/om_ys_sp/query/billmgrid',
  getPayPlanBase:'/business/om/auto/om_cgfk_sp/query/headformpanel',
  getPayPlanTable:'/business/om/auto/om_cgfk_sp/query/detailgridpanel'
}