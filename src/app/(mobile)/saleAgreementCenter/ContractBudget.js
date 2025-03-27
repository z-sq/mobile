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
    "BUD_FUN_CODE": "01",
    "CUR_CODE": "RMB",
    "CUR_NAME": "人民币",
    "BUD_PAR_CODE": "z14",
    "PJT_BUD_NO": null,
    "AMT": "0",
    "ORD_NO": "OM2025021300002",
    "UU_ID": "e290a07642fe4e4cba568f9a2ba4e304",
    "ROWNUM_": "1",
    "COM_CODE": "01",
    "BUD_PAR_NAME": "直接费用-设备费",
    "NOTE": null,
    "BUD_FUN_NAME": "国拨",
    "UPD_CODE": null,
    "BUD_PJT_NAME": "购置设备费",
    "UPD_NAME": null,
    "UPD_DATE": null,
    "BUD_PJT_CODE": "z1401"
},
]
// 表格列的配置，还有个动态列，自查编码,列排序
const columns = [
  {
    title: '预算项目大类',
    dataIndex: 'BUD_PAR_NAME',
    key: 'BUD_PAR_NAME',
    sorter: {
      compare: (a, b) => a.BUD_PAR_NAME - b.BUD_PAR_NAME,
      multiple: 1
    }
  },
  {
    title: '预算项目类别',
    dataIndex: 'BUD_PJT_NAME',
    key: 'BUD_PJT_NAME',
    sorter: {
      compare: (a, b) => a.BUD_PJT_NAME - b.BUD_PJT_NAME,
      multiple: 2
    }
  },
  {
    title: '预算资金类别',
    dataIndex: 'BUD_FUN_NAME',
    key: 'BUD_FUN_NAME',
    sorter: {
      compare: (a, b) => a.BUD_FUN_NAME - b.BUD_FUN_NAME,
      multiple: 3
    }
  },
  {
    title: '预算金额',
    dataIndex: 'AMT',
    key: 'AMT',
    sorter: {
      compare: (a, b) => a.AMT - b.AMT,
      multiple: 4
    }
  },
  {
    title: '备注',
    dataIndex: 'NOTE',
    key: 'NOTE',
    sorter: {
      compare: (a, b) => a.NOTE - b.NOTE,
      multiple: 5
    }
  },
]

const ContractBudget = () => {
  const [loading, setLoading] = useState(true)
  const [baseInfo, setBaseInfo] = useState({})
  const [data, setData] = useState([])
  const {
      approveStore: { currentInfo }
    } = useStores()
    const {COM_CODE,ORD_NO}=currentInfo
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
      const result = await request(saleAgreementApi.getBillhead, 'GET', {
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
        saleAgreementApi.getBillmgrid,
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
                <BasicFormItem label="单位" text={baseInfo.COM_NAME || ''} />
                <BasicFormItem label="编制部门" text={baseInfo.DEP_NAME || ''} />
              </tr>
              <tr>
                <BasicFormItem label="编制人" text={baseInfo.AUD_NAME || ''} />
                <BasicFormItem label="申请日期" text={baseInfo.EDT_DATE || ''} />
              </tr>
              <tr>
                <BasicFormItem label="订单号" text={baseInfo.ORD_NO || ''} />
                <BasicFormItem label="客户名称" text={baseInfo.CUSTOMER_NAME || ''} />
              </tr>
              <tr>
                <BasicFormItem label="合同名称" text={baseInfo.PROJECT_NAME || ''} />
                <BasicFormItem label="牵头单位" text={baseInfo.finDate || ''} />
              </tr>
              <tr>
                <BasicFormItem label="合同类型" text={baseInfo.HEAD_TYPE_NAME || ''} />
                <BasicFormItem label="合同分类" text={baseInfo.CON_CLS_NAME || ''} />
              </tr>
              <tr>
                <BasicFormItem label="业务分类" text={baseInfo.BUS_CLS_NAME || ''} />
                <BasicFormItem label="组织形式（纵向）" text={baseInfo.ORG_FORM || ''} />
              </tr>
              <tr>
                <BasicFormItem label="币别" text={baseInfo.CUR_NAME || ''} />
                <BasicFormItem label="销售合同额" text={baseInfo.ORD_TOT_AMT || ''} />
              </tr>
              <tr>
                <BasicFormItem label="首付款" text={baseInfo.PRE_RET_AMT || ''} />
                <BasicFormItem label="预算总金额" text={baseInfo.BUD_TOT_AMT || ''} />
              </tr>
              <tr>
                <BasicFormItem label="利润率" text={baseInfo.PRO_RATE || ''} />
                <BasicFormItem label="" text={''} />
              </tr>
              <tr>
              <BasicFormItem
                label="审批意见"
                text={baseInfo.AUD_TEXT || ''}
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
export default ContractBudget
