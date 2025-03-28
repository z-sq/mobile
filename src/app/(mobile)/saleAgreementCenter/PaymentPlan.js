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
    dataIndex: 'PAY_NUM',
    key: 'PAY_NUM',
    sorter: {
      compare: (a, b) => a.PAY_NUM - b.PAY_NUM,
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
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [total,setTotal]=useState(0)

  const {
        approveStore: { currentInfo }
      } = useStores()
    const {COM_CODE,ORD_NO,CUR_CODE,CUR_NAME}=currentInfo

  const getBaseInfo = async () => {
    try {
      const result = await request(saleAgreementApi.getPayPlanBase, 'GET', {
        params: JSON.stringify({ ORD_NO: ORD_NO, COM_CODE: COM_CODE }),
        page: 1,
        start: 0,
        limit: 25
      })
      if (result && result.success) {
        setBaseInfo(result.data[0])
      }
    } catch (err) {
      console.log(err)
    }finally{
        setLoading(false)
    }
  }
  const getDetailInfo = async (page=1) => {
    try {
      const result = await request(
        saleAgreementApi.getPayPlanTable,
        'GET',
        {
          params: JSON.stringify({  
            COM_CODE,
            ORD_NO,
            CUR_CODE,
            CUR_NAME, 
          }),
          COM_CODE,
          ORD_NO,
          CUR_CODE,
          CUR_NAME,
          page: page,
          start: 0,
          limit: 100
        }
      )
      if (result && result.success) {
        const resData=result.data||[]
        setData(resData)
        setTotal(result.total)
        return resData
      }
    } catch (err) {
      console.log(err)
    }finally{
        setLoading(false)
    }
  }
  const loadMore = async () => {
    if (data.length >= total) {
      setHasMore(false)
      return
    }
    setPage(page + 1)
    const append = (await getDetailInfo(page + 1)) || []
    setHasMore(data.length + append.length < total)
    const newData=[...data,...append]
    setData(newData)
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
                <BasicFormItem label="合同号" text={baseInfo?.ORD_NO || ''} />
                <BasicFormItem label="合同名称" text={baseInfo?.ORD_NAME || ''} />
              </tr>
              <tr>
                <BasicFormItem label="客户名称" text={baseInfo?.CUS_NAME || ''} />
                <BasicFormItem label="币别" text={baseInfo?.CUR_NAME || ''} />
              </tr>
              <tr>
                <BasicFormItem label="合同额" text={baseInfo?.ORD_TOT_AMT || ''} />
                <BasicFormItem label="采购预算金额" text={baseInfo?.PURC_BUD_AMT || ''} />
              </tr>
              <tr>
                <BasicFormItem label="计划付款总金额" text={baseInfo?.PAY_TOT_AMT || ''} />
                <BasicFormItem label="" text={''} />
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
              loadMore={loadMore}
              hasMore={hasMore}
              infiniteScroll={true}
            />
          </div>
        </>
      )}
    </div>
  </>
  )
}
export default PaymentPlan
