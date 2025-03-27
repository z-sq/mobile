'use client'

import { useState, useEffect } from 'react'

import BasicFormItem from './components/BasicInformation/BasicFormItem'

import Loading from '@/components/Loading'
import request from '@/utils/request'
import { useStores } from '@/utils/useStores'

import { centerDataInfo } from './mockData'
export default function BaseInfo({ style = {} }) {
  const usercode = window.localStorage.getItem('acctCode')
  const [data, setData] = useState(centerDataInfo)
  const {
    approveStore: { resetCurInfo }
  } = useStores()
  const getBaseInfo = async () => {
    try {
      const result = await request(
        `/business/om/auto/bzs_om2120/query/om2100hform`,
        'GET',
        {
          params:JSON.stringify( { usercode:usercode }),
          page: 1,
          start: 0,
          limit: 9999
        }
      )
      if (result && result.success) {
        const resData=result.data[0]
        setData(resData || {})
        resetCurInfo(resData)
      }
    } catch (err) {}
  }

  useEffect(() => {
    getBaseInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className="text-12px px-10px py-10px h-[100%] overflow-y-auto"
      style={style}
    >
      {!data ? (
        <Loading />
      ) : (
      <table className="w-full">
        <tbody>
          <tr>
            <BasicFormItem label="单位" text={data.COM_NAME || ''} />
            <BasicFormItem label="合同号" text={data.ORD_NO || ''} />
          </tr>
          <tr>
            <BasicFormItem label="申请日期" text={data.SIG_DATE || ''} />
            <BasicFormItem label="业务部门" text={data.DEP_NAME || ''} />
          </tr>
          <tr>
            <BasicFormItem label="销售员" text={data.SAL_PER_NAME || ''} />
            <BasicFormItem label="合同名称" text={data.ORD_NAME || ''} />
          </tr>
          <tr>
            <BasicFormItem label="合同类型" text={data.ORD_TYP_NAME || ''} />
            <BasicFormItem label="合同分类" text={data.CON_CLS_NAME || ''} />
          </tr>
          <tr>
            <BasicFormItem label="业务分类" text={data.BUS_CLS_NAME || ''} />
            <BasicFormItem label="币别名称" text={data.CUR_NAME || ''} />
          </tr>
          <tr>
            <BasicFormItem label="客户名称" text={data.CUS_NAME || ''} />
            <BasicFormItem label="客户级别" text={data.LEV_NAME || ''} />
          </tr>
          <tr>
            <BasicFormItem label="执行地区" text={data.CIT_NAME || ''} />
            <BasicFormItem label="信息来源" text={data.SOU_NAME || ''} />
          </tr>
          <tr>
            <BasicFormItem label="签约方式" text={data.SHI_EXP_FLAG || ''} />
            <BasicFormItem label="开始日期" text={data.BZS_VAL_DATE || ''} />
          </tr>
          <tr>
            <BasicFormItem label="结束日期" text={data.BZS_INV_DATE || ''} />
            <BasicFormItem label="合同额" text={data.ORD_TOT_AMT || ''} />
          </tr>
          <tr>
            <BasicFormItem label="税金" text={data.TAX_TOT_AMT || ''} />
            <BasicFormItem label="不含税金额" text={data.AMT || ''} />
          </tr>
          <tr>
            <BasicFormItem label="SM" text={data.BZS_SM_FLAG || ''} />
            <BasicFormItem
              label="是否电子签章"
              text={data.BZS_OA_DZQ_FLAG || ''}
            />
          </tr>
          <tr>
            <BasicFormItem label="首付款" text={data.PRE_RET_AMT || ''} />
            <BasicFormItem
              label="首付款比例(%)"
              text={data.PRE_RET_RATE || ''}
            />
          </tr>
          <tr>
            <BasicFormItem label="是否含运费" text={data.SHI_EXP_FLAG || ''} />
            <BasicFormItem label="是否终止" text={data.ORD_STATUS || ''} />
          </tr>

          <tr>
            <BasicFormItem
              label="变更原因"
              text={data.MOD_REASON || ''}
              textColSpan={3}
            />
          </tr>
          
        </tbody>
      </table>
     )} 
    </div>
  )
}
