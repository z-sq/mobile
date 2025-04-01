// 销售合同的API接口
import request from '@/utils/request'
import { useStores } from '@/utils/useStores'

/**
 * 销售合同接口
 * @type {saleAgreementApi}
 */
export const payApprovalApi = {
  getBaseInfo:'/business/ap/auto/ap2521/query/ap2521h',
  getTable1:'/business/ap/auto/ap2521/query/ap2521dd',
  getTable2: '/business/ap/auto/ap2521/query/ap2521d',
 
}