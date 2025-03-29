// 一个基本的React组件，接受一个data对象，一个style对象，一个onClick函数，返回一个div元素。
import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import { useRouter } from 'next/navigation'

import { saleAgreementApi } from '@/request/apis/saleAgre'
import request from '@/utils/request'

import SectionTitle from './components/SectionTitle'
import Dash from './components/Dash'
import BasicFormItem from './components/BasicInformation/BasicFormItem'

import Loading from '@/components/Loading'
import TableList from '@/components/TableList'
import { BASE_PATH } from '@/config/app'
import { addCommas } from '@/utils/method'
import { useStores } from '@/utils/useStores'

const columns = [
  {
    title: '合同条款审查项',
    dataIndex: 'EXA_TER_NAME',
    key: 'EXA_TER_NAME',
    sorter: {
      compare: (a, b) => a.EXA_TER_NAME - b.EXA_TER_NAME,
      multiple: 1
    }
  },
  {
    title: '是否符合',
    dataIndex: 'FIT_FLAG',
    key: 'FIT_FLAG',
    sorter: {
      compare: (a, b) => a.FIT_FLAG - b.FIT_FLAG,
      multiple: 2
    },
    render:(txt)=>(txt==='Y'?'是':'否')
  },
  {
    title: '备注信息',
    dataIndex: 'REMARKS',
    key: 'REMARKS',
    sorter: {
      compare: (a, b) => a.REMARKS - b.REMARKS,
      multiple: 3
    }
  },
  {
    title: '自查编码',
    dataIndex: 'UU_ID',
    key: 'UU_ID',
    sorter: {
      compare: (a, b) => a.UU_ID - b.UU_ID,
      multiple: 4
    }
  }
]

const SelfCheck = () => {
  const [loading, setLoading] = useState(true)
  const [baseInfo, setBaseInfo] = useState({})
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [total, setTotal] = useState(0)

  const {
    approveStore: { currentInfo }
  } = useStores()
  // const { COM_CODE, ORD_NO } = currentInfo
  
  const getBaseInfo = async () => {
    try {
      const result = await request(saleAgreementApi.getCheckDetail, 'GET', {
        params: JSON.stringify({ ORDER_NO: currentInfo.ORD_NO, COM_CODE: currentInfo.COM_CODE }),
        page: 1,
        start: 0,
        limit: 100
      })
      if (result && result.success) {
        setBaseInfo(result.data[0])
        console.log('result', result)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }
  const getDetailInfo = async (page=1) => {
    try {
      const result = await request(
        saleAgreementApi.getCheckTableDetail,
        'GET',
        {
          params: JSON.stringify({ ORDER_NO: currentInfo.ORD_NO, COM_CODE: currentInfo.COM_CODE }),
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
        {!data ? (
          <Loading />
        ) : (
          <>
            <SectionTitle className="text-12px" title='基本信息'/>
            <Dash className='my-2 border-dashed'/>
            <table className="w-full">
              <tbody>
                <tr>
                  <BasicFormItem
                    label="业务部门"
                    text={baseInfo?.DEP_NAME || ''}
                  />
                  <BasicFormItem
                    label="销售员"
                    text={baseInfo?.SAL_NAME || ''}
                  />
                </tr>
                <tr>
                  <BasicFormItem
                    label="录入人"
                    text={baseInfo?.UPD_NAME || ''}
                  />
                  <BasicFormItem
                    label="申请日期"
                    text={baseInfo?.CON_DATE || ''}
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
                infiniteScroll={true}
              />
            </div>
          </>
        )}
      </div>
    </>
  )
}
export default SelfCheck
