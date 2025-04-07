'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

import BasicFormItem from './components/BasicFormItem'

import Loading from '@/components/Loading'
import { typeMap } from '@/config/configData'
import { addCommas, replaceString } from '@/utils/method'
import request from '@/utils/request'
import { useStores } from '@/utils/useStores'

export default function BasicInformation({ style = {} }) {
  const searchParams = useSearchParams()
  const busKeyValue = searchParams.get('key')
  const pagCode = searchParams.get('pagCode')
  const wfType = typeMap[pagCode]?.pagCode
  const busKey = typeMap[pagCode]?.busKey

  const [data, setData] = useState('')
  const [attaDataList, setAttaDataList] = useState([])
  const {
    approveStore: { currentInfo, updateCurInfo }
  } = useStores()
console.log(JSON.stringify(currentInfo),'currentInfo')
  const getBaseInfo = async (params = {}) => {
    const result = await request(
      `/business/inv/auto/bzs_inv21141/query/uppanel`,
      'GET',
      // {"COM_CODE":"01","REQ_NO":"2025032500009","COM_NAME":"北京机械工业自动化研究所有限公司软件分公司","UPD_CODE":"lhy","UPD_NAME":"李浩宇"}
      {params:JSON.stringify( {
        COM_CODE: currentInfo.COM_CODE||'01',
        REQ_NO:currentInfo.REQ_NO||'2025032500009',
        COM_NAME:currentInfo.COM_NAME||'北京机械工业自动化研究所有限公司软件分公司',
        UPD_CODE:currentInfo.UPD_CODE||'lhy',
        UPD_NAME:currentInfo.UPD_NAME||"李浩宇"
      }),
      page: 1,
      start: 0,
      limit: 9999
    }
    )
    if (result && result.success) {
      setData(result.data[0] || {})
    }
  }

  // const getBaseInfo = async () => {
  //   try {
  //     const result = await request(
  //       `/business/mas/tp/manual/${wfType}/getBaseInfo`,
  //       'GET',
  //       {
  //         [busKey]: busKeyValue
  //       }
  //     )
  //     if (result && result.success) {
  //       setData(result.data[0] || {})
  //       const data = result.data || {}
  //       const params = {
  //         comCode: data.comCode
  //       }
  //       // getAtta(params)
  //     }
  //   } catch (err) {}
  // }

  useEffect(() => {
    getBaseInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className="text-12px px-10px py-10px h-[100%] overflow-y-auto"
      style={style}
    >
      {/* {!data ? (
        <Loading />
      ) : ( */}
        <table className="w-full">
          <tbody>
            <tr>
              <BasicFormItem label="申请单号" text={data.REQ_NO || ''} />
              <BasicFormItem label="公司" text={data.COM_NAME || ''} />
            </tr>
            <tr>
              <BasicFormItem label="申请日期" text={data.REQ_DATE || ''} />
              <BasicFormItem label="业务部门" text={data.DEP_NAME || ''} />
            </tr>
            <tr>
              <BasicFormItem label="业务人员" text={data.REQ_PER_NAME || ''} />
              <BasicFormItem label="业务类型" text={data.BUS_NAME || ''} />
            </tr>
            <tr>
              <BasicFormItem label="申请单名称" text={data.REQ_NAME || ''} />
              <BasicFormItem label="工作令" text={data.WOR_NAME || ''} />
            </tr>
            <tr>
              <BasicFormItem label="项目号" text={data.TRA_ORD_NO || ''} />
              <BasicFormItem label="" text={ ''} />
            </tr>
            <tr>
              <BasicFormItem
                label="备注"
                text={data.REMARKS || ''}
                textColSpan={3}
              />
            </tr>
          </tbody>
        </table>
      {/* )} */}
    </div>
  )
}
