// 一个基本的React组件，接受一个data对象，一个style对象，一个onClick函数，返回一个div元素。
import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import { useRouter } from 'next/navigation'

import { saleAgreementApi } from '@/request/apis/saleAgre'
import request from '@/utils/request'

import SectionTitle from './components/SectionTitle'
import Dash from './components/Dash'




import BasicFormItem from './components/BasicInformation/BasicFormItem'
import FiewViewer from './components/FileViewer'

import Loading from '@/components/Loading'
import TableList from '@/components/TableList'
import { BASE_PATH } from '@/config/app'
import { addCommas } from '@/utils/method'
import { useStores } from '@/utils/useStores'
// 自查表基础信息
const mockdata =  {
    CON_DATE: '2025/02/13',
    UPD_CODE: 'lhy',
    SAL_NAME: '李浩宇',
    DEP_NAME: '客户服务部',
    UPD_NAME: '李浩宇',
    ROWNUM_: '1',
    UU_ID: 'nullnullnull'
  }
// 对应的label名称：业务部门、销售员、录入人
const FIELD_LABEL = {
  DEP_NAME: '业务部门',
  SAL_NAME: '销售员',
  UPD_NAME: '录入人'
}
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
    title: '合同条款审查项',
    dataIndex: 'CONFORM_ITEM',
    key: 'CONFORM_ITEM',
    sorter: {
      compare: (a, b) => a.CONFORM_ITEM - b.CONFORM_ITEM,
      multiple: 1
    }
  },
  {
    title: '是否符合',
    dataIndex: 'IS_CONFORM',
    key: 'IS_CONFORM',
    sorter: {
      compare: (a, b) => a.IS_CONFORM - b.IS_CONFORM,
      multiple: 2
    }
  },
  {
    title: '备注信息',
    dataIndex: 'REMARK',
    key: 'REMARK',
    sorter: {
      compare: (a, b) => a.REMARK - b.REMARK,
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
  const [data, setData] = useState(tableData)

  const {
    approveStore: { currentInfo }
  } = useStores()
  const {COM_CODE,ORD_NO}=currentInfo
  console.log(COM_CODE,ORD_NO,'currentInfo')
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
        params: JSON.stringify({ ORDER_NO: ORD_NO, COM_CODE: COM_CODE }),
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
          params: JSON.stringify({ ORDER_NO: ORD_NO, COM_CODE: COM_CODE }),
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
                <BasicFormItem label="业务部门" text={baseInfo?.DEP_NAME || ''} />
                <BasicFormItem label="销售员" text={baseInfo?.SAL_NAME || ''} />
              </tr>
              <tr>
                <BasicFormItem label="录入人" text={baseInfo?.UPD_NAME || ''} />
                <BasicFormItem label="申请日期" text={baseInfo?.CON_DATE || ''} />
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
export default SelfCheck
