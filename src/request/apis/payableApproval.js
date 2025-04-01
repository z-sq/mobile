// 销售合同的API接口
import request from '@/utils/request'
import { useStores } from '@/utils/useStores'

/**
 * 销售合同接口
 * @type {saleAgreementApi}
 */
export const payApprovalApi = {
  getBaseInfo:'/business/om/auto/bzs_om2120/query/om2100hform',
  getProInfo: '/business/om/auto/bzs_om2120/query/tabdehead',
 
}