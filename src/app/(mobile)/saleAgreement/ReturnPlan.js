// 一个基本的React组件，接受一个data对象，一个style对象，一个onClick函数，返回一个div元素。
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { saleAgreementApi } from '@/request/apis/saleAgreement'
import request from '@/utils/request'

import SectionTitle from './components/SectionTitle'
import Dash from './components/Dash'
import BasicFormItem from './components/BasicInformation/BasicFormItem'

import Loading from '@/components/Loading'
import TableList from '@/components/TableList'
import { useStores } from '@/utils/useStores'


// 表格列的配置，还有个动态列，自查编码,列排序
const columns = [
  
  {
    title: '回款节点',
    dataIndex: 'PJT_NOD_NAME',
    key: 'PJT_NOD_NAME',
    sorter: {
      compare: (a, b) => a.PJT_NOD_NAME - b.PJT_NOD_NAME,
      multiple: 2
    }
  },
  {
    title: '合同节点说明',
    dataIndex: 'PJT_NOD_NOTE',
    key: 'PJT_NOD_NOTE',
    sorter: {
      compare: (a, b) => a.PJT_NOD_NOTE - b.PJT_NOD_NOTE,
      multiple: 2
    }
  },
  {
    title: '节点计划完成时间',
    dataIndex: 'ACT_DATE',
    key: 'ACT_DATE',
    sorter: {
      compare: (a, b) => a.ACT_DATE - b.ACT_DATE,
      multiple: 3
    }
  },
  {
    title: '回款类型',
    dataIndex: 'PMT_TYP_NAME',
    key: 'PMT_TYP_NAME',
    sorter: {
      compare: (a, b) => a.PMT_TYP_NAME - b.PMT_TYP_NAME,
      multiple: 3
    }
  },{
    title: '回款计划',
    dataIndex: 'PMT_NOTE',
    key: 'PMT_NOTE',
    sorter: {
      compare: (a, b) => a.PMT_NOTE - b.PMT_NOTE,
      multiple: 3
    }
  },{
    title: '计划回款金额',
    dataIndex: 'AMT',
    key: 'AMT',
    sorter: {
      compare: (a, b) => a.AMT - b.AMT,
      multiple: 3
    }
  },{
    title: '计划回款日期',
    dataIndex: 'PLA_DATE',
    key: 'PLA_DATE',
    sorter: {
      compare: (a, b) => a.PLA_DATE - b.PLA_DATE,
      multiple: 3
    }
  },
  {
    title: '责任人',
    dataIndex: 'RES_NAME',
    key: 'RES_NAME',
    sorter: {
      compare: (a, b) => a.RES_NAME - b.RES_NAME,
      multiple: 3
    }
  },
  {
    title: '纪要',
    dataIndex: 'NOTE',
    key: 'NOTE',
    sorter: {
      compare: (a, b) => a.NOTE - b.NOTE,
      multiple: 3
    }
  }
]

const PaymentPlan = () => {
  const [loading, setLoading] = useState(true)
  const [baseInfo, setBaseInfo] = useState({})
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [total,setTotal]=useState(0)
  const [tableWidth, setTableWidth] = useState(1200)

  const {
        approveStore: { currentInfo }
      } = useStores()
  // const {COM_CODE,ORD_NO}=currentInfo

  const getBaseInfo = async () => {
    try {
      const result = await request(saleAgreementApi.getReturnInfo, 'GET', {
        params: JSON.stringify({ ORD_NO: currentInfo.ORD_NO, COM_CODE: currentInfo.COM_CODE }),
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
  const getDetailInfo = async (page=1) => {
    try {
      const result = await request(
        saleAgreementApi.getReturnTable,
        'GET',
        {
          params:JSON.stringify( { ORD_NO: currentInfo.ORD_NO, COM_CODE: currentInfo.COM_CODE }),
          ORD_NO: currentInfo.ORD_NO, 
          COM_CODE: currentInfo.COM_CODE,
          page: page,
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
  const loadMore = async () => {
    if (data.length >= total) {
      setHasMore(false)
      return
    }
    setPage(page + 1)
    const append = (await getDetailInfo(page + 1)) || []
    setHasMore(data.length + append.length < total)
    setData((val) => [...val, ...append])
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
          <SectionTitle className="text-12px" title='基本信息'/>
          <Dash className='my-2 border-dashed'/>
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
          <SectionTitle className="text-12px mt-10px" title='明细信息'/>
          <Dash className='my-2 border-dashed'/>
          <div className="text-12px mt-10px w-full">
            <TableList
              columns={columns}
              dataSource={data}
              orderColumn={true}
              loadMore={loadMore}
              hasMore={hasMore}
              width={tableWidth}
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
