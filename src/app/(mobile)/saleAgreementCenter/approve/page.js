'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { saleAgreementApi } from '@/request/apis/saleAgre'
import request from '@/utils/request'

import BasicFormItem from '../components/BasicInformation/BasicFormItem'

import Loading from '@/components/Loading'
import TableList from '@/components/TableList'
import { BASE_PATH } from '@/config/app'
import { addCommas } from '@/utils/method'
import { useStores } from '@/utils/useStores'

// 表格数据：合同条款审查项、是否符合、备注信息。还有个动态列，自查编码
// 表格列的配置，还有个动态列，自查编码,列排序
const columns = [
  {
    title: '销售合同审核大类编码',
    dataIndex: 'AUD_PAR_CODE',
    key: 'AUD_PAR_CODE',
    sorter: {
      compare: (a, b) => a.AUD_PAR_CODE - b.AUD_PAR_CODE,
      multiple: 1
    }
  },
  {
    title: '销售合同审核大类名称',
    dataIndex: 'AUD_PAR_NAME',
    key: 'AUD_PAR_NAME',
    sorter: {
      compare: (a, b) => a.AUD_PAR_NAME - b.AUD_PAR_NAME,
      multiple: 2
    }
  },
  {
    title: '销售合同审核项简称',
    dataIndex: 'AUD_CHI_ABBR',
    key: 'AUD_CHI_ABBR',
    sorter: {
      compare: (a, b) => a.AUD_CHI_ABBR - b.AUD_CHI_ABBR,
      multiple: 3
    }
  },
  {
    title: '待审核人名称',
    dataIndex: 'PLA_AUD_NAME',
    key: 'PLA_AUD_NAME',
    sorter: {
      compare: (a, b) => a.PLA_AUD_NAME - b.PLA_AUD_NAME,
      multiple: 4
    }
  },
  {
    title: '审核结论',
    dataIndex: 'OPI_FLAG',
    key: 'OPI_FLAG',
    sorter: {
      compare: (a, b) => a.OPI_FLAG - b.OPI_FLAG,
      multiple: 4
    }
  },
  {
    title: '上次审核意见',
    dataIndex: 'LAST_OPINION',
    key: 'LAST_OPINION',
    sorter: {
      compare: (a, b) => a.LAST_OPINION - b.LAST_OPINION,
      multiple: 4
    }
  },
  {
    title: '审核意见',
    dataIndex: 'OPI_FLAG',
    key: 'OPI_FLAG',
    sorter: {
      compare: (a, b) => a.OPI_FLAG - b.OPI_FLAG,
      multiple: 4
    }
  },
  {
    title: '审核人名称',
    dataIndex: 'AUD_NAME',
    key: 'AUD_NAME',
    sorter: {
      compare: (a, b) => a.AUD_NAME - b.AUD_NAME,
      multiple: 4
    }
  },
  {
    title: '审核日期',
    dataIndex: 'AUD_DATE',
    key: 'AUD_DATE',
    sorter: {
      compare: (a, b) => a.AUD_DATE - b.AUD_DATE,
      multiple: 5
    }
  }
]

const ApprovePage = () => {
  const [loading, setLoading] = useState(true)
  const [baseInfo, setBaseInfo] = useState({})
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [total, setTotal] = useState(0)

  const {
    approveStore: { currentInfo }
  } = useStores()
  const { COM_CODE, ORD_NO,PAGE_CODE } = currentInfo
console.log(COM_CODE, ORD_NO,PAGE_CODE,'COM_CODE, ORD_NO,PAGE_CODE')
  const getBaseInfo = async () => {
    try {
      const result = await request(saleAgreementApi.getApproveBase, 'GET', {
        params: JSON.stringify({ ORDER_NO: ORD_NO, COM_CODE: COM_CODE,PAGE_CODE:PAGE_CODE }),
        page: 1,
        start: 0,
        limit: 25
      })
      if (result && result.success) {
        setBaseInfo(result.data[0])
        console.log('result11111', result)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }
  const getDetailInfo = async (page = 1) => {
    try {
      const result = await request(saleAgreementApi.getApproveTable, 'GET', {
        params: JSON.stringify({ ORDER_NO: ORD_NO, COM_CODE: COM_CODE,PAGE_CODE:PAGE_CODE }),
        page: page,
        start: 0,
        limit: 100
      })
      if (result && result.success) {
        setData(result.data)
        console.log('result', result)
      }
    } catch (err) {
      console.log(err)
    } finally {
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
        {loading ===true? (
          <Loading />
        ) : (
          <>
            <div className="text-12px mt-16px">基本信息</div>
            <table className="w-full">
              <tbody>
                <tr>
                  <BasicFormItem label="申请单位名称" text={baseInfo?.COM_NAME || ''} />
                  <BasicFormItem
                    label="申请部门名称"
                    text={baseInfo?.DEP_NAME || ''}
                  />
                </tr>
                <tr>
                  <BasicFormItem
                    label="申请人名称"
                    text={baseInfo?.AUD_NAME || ''}
                  />
                  <BasicFormItem
                    label="申请日期"
                    text={baseInfo?.EDT_DATE || ''}
                  />
                </tr>
                <tr>
                  <BasicFormItem
                    label="客户名称"
                    text={baseInfo?.CUSTOMER_NAME || ''}
                  />
                   <BasicFormItem
                    label="合同类型"
                    text={baseInfo?.CON_CLS_NAME || ''}
                  />
                </tr>
                <tr>
                  <BasicFormItem
                    label="合同分类"
                    text={baseInfo?.CON_CLS_NAME || ''}
                  />
                  <BasicFormItem
                    label="销售合同额"
                    text={baseInfo?.ORD_TOT_AMT || ''}
                  />
                </tr>
{/*                 
                <tr>
                  <BasicFormItem
                    label="审批意见"
                    text={baseInfo?.AUD_TEXT || ''}
                    textColSpan={3}
                  />
                </tr> */}
              </tbody>
            </table>
            <div className="text-12px mt-16px">明细信息</div>
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
export default ApprovePage
