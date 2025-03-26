'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

import BasicFormItem from './components/BasicInformation/BasicFormItem'
import FiewViewer from './components/FileViewer'

import Loading from '@/components/Loading'
import { typeMap } from '@/config/configData'
import { addCommas } from '@/utils/method'
import request from '@/utils/request'

import {centerDataInfo,attrData} from './mockData'
export default function BaseInfo({ style = {} }) {
  const searchParams = useSearchParams()
  const busKeyValue = searchParams.get('key')||'P1090524080033'
  const pagCode = searchParams.get('pagCode')||'tp2514'
  const wfType = typeMap[pagCode].pagCode||'tp2800'
  const busKey = typeMap[pagCode].busKey||'bilNo'

  const [data, setData] = useState(centerDataInfo)
  const [attaDataList, setAttaDataList] = useState(attrData)

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
        getAtta(params)
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
              <BasicFormItem label="单位" text={data.depName || ''} />
              <BasicFormItem label="合同号" text={data.perName || ''} />
            </tr>
            <tr>
              <BasicFormItem label="申请日期" text={data.purTitle || ''} />
              <BasicFormItem label="业务部门" text={data.proName || ''} />
            </tr>
            <tr>
              <BasicFormItem label="销售员" text={data.purTitle || ''} />
              <BasicFormItem label="合同名称" text={data.proName || ''} />
            </tr>
            <tr>
              <BasicFormItem label="合同类型" text={data.purTitle || ''} />
              <BasicFormItem label="合同分类" text={data.proName || ''} />
            </tr>
            <tr>
              <BasicFormItem label="业务分类" text={data.purTitle || ''} />
              <BasicFormItem label="币别名称" text={data.proName || ''} />
            </tr>
            <tr>
              <BasicFormItem label="客户名称" text={data.purTitle || ''} />
              <BasicFormItem label="客户级别" text={data.proName || ''} />
            </tr>
            <tr>
              <BasicFormItem label="执行地区" text={data.purTitle || ''} />
              <BasicFormItem label="信息来源" text={data.proName || ''} />
            </tr>
            <tr>
              <BasicFormItem label="签约方式" text={data.purTitle || ''} />
              <BasicFormItem label="开始日期" text={data.proName || ''} />
            </tr>
            <tr>
              <BasicFormItem label="结束日期" text={data.purTitle || ''} />
              <BasicFormItem label="合同额" text={data.proName || ''} />
            </tr>



            <tr>
              <BasicFormItem label="税金" text={data.purTitle || ''} />
              <BasicFormItem label="不含税金额" text={data.proName || ''} />
            </tr>
            <tr>
              <BasicFormItem label="SM" text={data.purTitle || ''} />
              <BasicFormItem label="是否电子签章" text={data.proName || ''} />
            </tr>
            <tr>
              <BasicFormItem label="首付款" text={data.purTitle || ''} />
              <BasicFormItem label="首付款比例(%)" text={data.proName || ''} />
            </tr>
            <tr>
              <BasicFormItem label="是否含运费" text={data.purTitle || ''} />
              <BasicFormItem label="是否终止" text={data.proName || ''} />
            </tr>
            
            <tr>
              <BasicFormItem
                label="变更原因"
                text={data.remarks || ''}
                textColSpan={3}
              />
            </tr>
            {/* <tr>
              <BasicFormItem
                label="附件"
                text={() => {
                  return attaDataList.map((atta, index) => (
                    <FiewViewer key={index} className="pr-4" file={atta} />
                  ))
                }}
                textColSpan={3}
              />
            </tr> */}
          </tbody>
        </table>
      {/* )} */}
    </div>
  )
}
