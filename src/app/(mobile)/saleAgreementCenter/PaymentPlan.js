// 一个基本的React组件，接受一个data对象，一个style对象，一个onClick函数，返回一个div元素。
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { saleAgreementApi } from '@/request/apis/saleAgre'
import request from '@/utils/request'

import BasicFormItem from './components/BasicInformation/BasicFormItem'

import Loading from '@/components/Loading'
import TableList from '@/components/TableList'
import { BASE_PATH } from '@/config/app'
import { addCommas } from '@/utils/method'
import { useStores } from '@/utils/useStores'

// 表格数据：合同条款审查项、是否符合、备注信息。还有个动态列，自查编码
const tableData = [
  {
    REMARK: null,
    IS_CONFORM: null,
    CONFORM_ITEM: null,
    ROWNUM_: '1',
    UU_ID: null
  }
]
// 表格列的配置，还有个动态列，自查编码,列排序
const columns = [
  
  {
    title: '付款日期',
    dataIndex: 'IS_CONFORM',
    key: 'IS_CONFORM',
    sorter: {
      compare: (a, b) => a.IS_CONFORM - b.IS_CONFORM,
      multiple: 2
    }
  },
  {
    title: '付款金额',
    dataIndex: 'IS_CONFORM',
    key: 'IS_CONFORM',
    sorter: {
      compare: (a, b) => a.IS_CONFORM - b.IS_CONFORM,
      multiple: 2
    }
  },
  {
    title: '备注',
    dataIndex: 'REMARK',
    key: 'REMARK',
    sorter: {
      compare: (a, b) => a.REMARK - b.REMARK,
      multiple: 3
    }
  },
]

const PaymentPlan = () => {
  const [loading, setLoading] = useState(true)
  const [baseInfo, setBaseInfo] = useState({})
  const [data, setData] = useState(tableData)
  // 根据接口返回的参数，重写formatFieldVal
  const formatFieldVal = (field, val) => {
    if (val === undefined || val === null || val === '') {
      return '-'
    }
    if (field === 'IS_CONFORM') {
      return val === 'Y' ? '是' : '否'
    }
    return val
  }
  const getBaseInfo = async () => {
    try {
      const result = await request(saleAgreementApi.getCheckDetail, 'GET', {
        _dc: 1742895269636,
        params: { ORDER_NO: 'OM2025021300002', COM_CODE: '01' },
        page: 1,
        start: 0,
        limit: 25
      })
      if (result && result.success) {
        setBaseInfo(result.data[0])
        console.log('result', result)
      }
    } catch (err) {
      console.log(err)
    }finally{
        setLoading(false)
    }
  }
  const getDetailInfo = async () => {
    try {
      const result = await request(
        saleAgreementApi.getCheckTableDetail,
        'GET',
        {
          _dc: 1742895269633,
          params: { ORDER_NO: 'OM2025021300002', COM_CODE: '01' },
          page: 1,
          start: 0,
          limit: 100
        }
      )
      if (result && result.success) {
        setData(result.data)
        console.log('result', result)
      }
    } catch (err) {
      console.log(err)
    }finally{
        setLoading(false)
    }
  }
  useEffect(() => {
    setLoading(true)
    getBaseInfo()
    getDetailInfo()
  }, [])
  return (
  <>
   <div className="text-12px px-10px py-10px h-[100%] overflow-y-auto">
      {!data ? (
        <Loading />
      ) : (
        <>
         <div className="text-12px mt-16px">
           基本信息
          </div>
          <table className="w-full">
            <tbody>
              <tr>
                <BasicFormItem label="单位" text={data.purTitle || ''} />
                <BasicFormItem label="编制部门" text={data.proName || ''} />
              </tr>
              <tr>
                <BasicFormItem label="编制人" text={data.purName || ''} />
                <BasicFormItem label="申请日期" text={data.finDate || ''} />
              </tr>
              
              <tr>
                <BasicFormItem label="合同号" text={data.purName || ''} />
                <BasicFormItem label="合同名称" text={data.finDate || ''} />
              </tr>
              <tr>
                <BasicFormItem label="客户名称" text={data.finDate || ''} />
                <BasicFormItem label="币别" text={data.purName || ''} />
              </tr>
              <tr>
                <BasicFormItem label="合同额" text={data.purName || ''} />
                <BasicFormItem label="采购预算金额" text={data.finDate || ''} />
              </tr>
              <tr>
                <BasicFormItem label="计划付款总金额" text={data.finDate || ''} />
                <BasicFormItem label="" text={''} />
              </tr>
              <tr>
              <BasicFormItem
                label="审批意见"
                text={data.remarks || ''}
                textColSpan={3}
              />
            </tr>
            </tbody>
          </table>
          <div className="text-12px mt-16px">
           明细信息
          </div>
          <div className="text-12px mt-10px w-full">
            <TableList
              columns={columns}
              dataSource={data}
              orderColumn={true}
            />
          </div>
        </>
      )}
    </div>
  </>
  )
}
export default PaymentPlan
