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


// 表格列的配置，还有个动态列，自查编码,列排序
const columns = [
  
  {
    title: '合同节点',
    dataIndex: 'IS_CONFORM',
    key: 'IS_CONFORM',
    sorter: {
      compare: (a, b) => a.IS_CONFORM - b.IS_CONFORM,
      multiple: 2
    }
  },
  {
    title: '合同节点说明',
    dataIndex: 'IS_CONFORM',
    key: 'IS_CONFORM',
    sorter: {
      compare: (a, b) => a.IS_CONFORM - b.IS_CONFORM,
      multiple: 2
    }
  },
  {
    title: '节点计划完成时间',
    dataIndex: 'REMARK',
    key: 'REMARK',
    sorter: {
      compare: (a, b) => a.REMARK - b.REMARK,
      multiple: 3
    }
  },
  {
    title: '回款类型',
    dataIndex: 'REMARK',
    key: 'REMARK',
    sorter: {
      compare: (a, b) => a.REMARK - b.REMARK,
      multiple: 3
    }
  },{
    title: '回款说明',
    dataIndex: 'REMARK',
    key: 'REMARK',
    sorter: {
      compare: (a, b) => a.REMARK - b.REMARK,
      multiple: 3
    }
  },{
    title: '计划回款金额',
    dataIndex: 'REMARK',
    key: 'REMARK',
    sorter: {
      compare: (a, b) => a.REMARK - b.REMARK,
      multiple: 3
    }
  },{
    title: '计划回款日期',
    dataIndex: 'REMARK',
    key: 'REMARK',
    sorter: {
      compare: (a, b) => a.REMARK - b.REMARK,
      multiple: 3
    }
  },
  {
    title: '责任人',
    dataIndex: 'REMARK',
    key: 'REMARK',
    sorter: {
      compare: (a, b) => a.REMARK - b.REMARK,
      multiple: 3
    }
  }
]

const PaymentPlan = () => {
  const [loading, setLoading] = useState(true)
  const [baseInfo, setBaseInfo] = useState({})
  const [data, setData] = useState([])
  const {
        approveStore: { currentInfo }
      } = useStores()
  const {COM_CODE,ORD_NO}=currentInfo

  const getBaseInfo = async () => {
    try {
      const result = await request(saleAgreementApi.getReturnInfo, 'GET', {
        params: JSON.stringify({ ORDER_NO: ORD_NO, COM_CODE: COM_CODE }),
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
        saleAgreementApi.getReturnTable,
        'GET',
        {
          params:JSON.stringify( { ORDER_NO: ORD_NO, COM_CODE: COM_CODE }),
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
                <BasicFormItem label="单位" text={baseInfo?.COM_NAME || ''} />
                <BasicFormItem label="编制部门" text={baseInfo?.DEP_NAME || ''} />
              </tr>
              <tr>
                <BasicFormItem label="编制人" text={baseInfo?.EDT_NAME || ''} />
                <BasicFormItem label="申请日期" text={baseInfo?.EDT_DATE || ''} />
              </tr>
              <tr>
                <BasicFormItem label="订单号" text={baseInfo?.purName || ''} />
                <BasicFormItem label="客户名称" text={baseInfo?.CUS_NAME || ''} />
              </tr>
              <tr>
                {/* 订单类型改名为合同类型 */}
                <BasicFormItem label="合同类型" text={baseInfo?.purName || ''} />
                <BasicFormItem label="合同名称" text={baseInfo?.finDate || ''} />
              </tr>
              <tr>
                <BasicFormItem label="合同分类" text={baseInfo?.purName || ''} />
                <BasicFormItem label="业务分类" text={baseInfo?.finDate || ''} />
              </tr>
              <tr>
                <BasicFormItem label="合同额" text={baseInfo?.ORD_TOT_AMT  || ''} />
                <BasicFormItem label="首付款" text={baseInfo?.finDate || ''} />
              </tr>
              <tr>
                <BasicFormItem label="币别" text={baseInfo?.CUR_NAME || ''} />
                <BasicFormItem label="计划回款总金额" text={baseInfo?.finDate || ''} />
              </tr>
              <tr>
              <BasicFormItem
                label="审批意见"
                text={baseInfo?.AUD_TEXT || ''}
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
