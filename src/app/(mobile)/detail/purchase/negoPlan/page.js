'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

import BasicFormItem from '../../components/BasicInformation/BasicFormItem'
import FiewViewer from '../../components/FileViewer'

import Loading from '@/components/Loading'
import { typeMap } from '@/config/configData'
import { addCommas } from '@/utils/method'
import request from '@/utils/request'

export default function BasicInformation({ style = {} }) {
  const searchParams = useSearchParams()
  const busKeyValue = searchParams.get('key')
  const pagCode = searchParams.get('pagCode')
  const wfType = typeMap[pagCode].pagCode
  const busKey = typeMap[pagCode].busKey

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
        getAtta(params)
      }
    } catch (err) { }
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
              <BasicFormItem label="申请部门" text={data.depName || ''} />
              <BasicFormItem label="申请人" text={data.perName || ''} />
            </tr>
            <tr>
              <BasicFormItem label="采购名称" text={data.purTitle || ''} />
              <BasicFormItem label="项目名称" text={data.proName || ''} />
            </tr>
            <tr>
              <BasicFormItem label="采购内容" text={data.purName || ''} />
              <BasicFormItem
                label={`预算金额${data.curName ? '（' + data.curName + '）' : ''}`}
                text={addCommas(data.bugAmt)}
              />
            </tr>
            <tr>
              <BasicFormItem label="采购方式" text={data.purMetName || ''} />
              <BasicFormItem
                label="采购方式选择依据"
                text={data.purSelName || ''}
              />
            </tr>
            <tr>
              <BasicFormItem label="邀请方式" text={data.invMetName || ''} />
              <BasicFormItem
                label="谈判开始时间"
                text={`${data.opeBidDate || ''} ${data.opeBidTime || ''}` || ''}
              />
            </tr>
            <tr>
              <BasicFormItem label="交货日期" text={data.delDate || ''} />
              <BasicFormItem label="履约地点" text={data.perPlace || ''} />
            </tr>
            <tr>
              <BasicFormItem label="付款方式" text={data.payMetName || ''} />
              <BasicFormItem label="结算方式" text={data.bilTypName || ''} />
            </tr>
            <tr>
              <BasicFormItem label="付款方式描述" textColSpan={3} text={data.othPayMet || ''} />
            </tr>
            <tr>
              <BasicFormItem label="资格审查" text={data.quaExaName || ''} />
              <BasicFormItem label="评审方式" text={data.judMetName || ''} />
            </tr>
            <tr>
              <BasicFormItem label="签约类型" text={data.conName || ''} />
              <BasicFormItem
                label="接受联合体"
                text={data.accConFlag === 'Y' ? '是' : '否'}
              />
            </tr>
            <tr>
              <BasicFormItem label="谈判文件金额" text={data.bidFeeAmt || ''} />
              <BasicFormItem
                label="谈判文件获取时间"
                text={`${data.acqDate || ''} ${data.acqTime || ''}` || ''}
              />
            </tr>
            <tr>
              <BasicFormItem
                label="谈判文件获取截止时间"
                text={`${data.acqEndDate || ''} ${data.acqEndTime || ''}` || ''}
              />
              <BasicFormItem
                label="响应截止时间"
                text={`${data.bidEndDate || ''} ${data.bidEndTime || ''}` || ''}
              />
            </tr>
            <tr>
              <BasicFormItem label="完成日期" text={data.finDate || ''} />
              <BasicFormItem label="委托代理机构" text={data.autAge || ''} />
            </tr>
            <tr>
              <BasicFormItem
                label="备注"
                text={data.remarks || ''}
                textColSpan={3}
              />
            </tr>
            {data.chaFlag === 'Y' ? (
              <tr>
                <BasicFormItem
                  label="变更原因"
                  text={data.chaCause || ''}
                  textColSpan={3}
                />
              </tr>
            ) : null}
            <tr>
              <BasicFormItem
                label="附件"
                text={() => {
                  return attaDataList.map((atta, index) => (
                    <FiewViewer key={index} className="pr-4" file={atta} />
                  ))
                }}
                textColSpan={3}
              />
            </tr>
          </tbody>
        </table>
      )}
    </div>
  )
}
