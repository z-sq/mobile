'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

import BasicFormItem from './components/BasicFormItem'

import Loading from '@/components/Loading'
import { typeMap } from '@/config/configData'
import { addCommas, replaceString } from '@/utils/method'
import request from '@/utils/request'

export default function BasicInformation({ style = {} }) {
  const searchParams = useSearchParams()
  const busKeyValue = searchParams.get('key')
  const pagCode = searchParams.get('pagCode')
  const wfType = typeMap[pagCode]?.pagCode
  const busKey = typeMap[pagCode]?.busKey

  const [data, setData] = useState('')
  const [attaDataList, setAttaDataList] = useState([])

  const getAtta = async (params = {}) => {
    const result = await request(
      `/business/mas/tp/manual/${wfType}/getAttaFileInfo`,
      'GET',
      {
        busValue: busKeyValue,
        ...params
      }
    )
    if (result && result.success) {
      setAttaDataList(result.data || [])
    }
  }

  const getBaseInfo = async () => {
    try {
      const result = await request(
        `/business/mas/tp/manual/${wfType}/getBaseInfo`,
        'GET',
        {
          [busKey]: busKeyValue
        }
      )
      if (result && result.success) {
        setData(result.data || {})
        const data = result.data || {}
        const params = {
          comCode: data.comCode
        }
        // getAtta(params)
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
      {/* {!data ? (
        <Loading />
      ) : ( */}
        <table className="w-full">
          <tbody>
            <tr>
              <BasicFormItem label="申请单号" text={data.depName || ''} />
              <BasicFormItem label="公司" text={data.perName || ''} />
            </tr>
            <tr>
              <BasicFormItem label="申请日期" text={data.reqDate || ''} />
              <BasicFormItem label="业务部门" text={data.proName || ''} />
            </tr>
            <tr>
              <BasicFormItem label="业务人员" text={data.busClsName || ''} />
              <BasicFormItem label="业务类型" text={data.busClsName || ''} />
            </tr>
            <tr>
              <BasicFormItem label="申请单名称" text={data.purName || ''} />
              <BasicFormItem label="工作令" text={data.invMetName || ''} />
            </tr>
            <tr>
              <BasicFormItem label="项目号" text={data.purMetName || ''} />
              <BasicFormItem label="" text={ ''} />
            </tr>
            <tr>
              <BasicFormItem
                label="备注"
                text={data.purSelName || ''}
                textColSpan={3}
              />
            </tr>
          </tbody>
        </table>
      {/* )} */}
    </div>
  )
}
