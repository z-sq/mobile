'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

import BasicFormItem from '../../components/BasicInformation/BasicFormItem'
import FiewViewer from '../../components/FileViewer'

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
              <BasicFormItem label="申请日期" text={data.reqDate || ''} />
              <BasicFormItem label="项目名称" text={data.proName || ''} />
            </tr>
            <tr>
              <BasicFormItem label="业务分类" text={data.busClsName || ''} />
              <BasicFormItem
                label={`预算金额${data.curName ? '（' + data.curName + '）' : ''}`}
                text={addCommas(data.bugAmt)}
              />
            </tr>
            <tr>
              <BasicFormItem label="采购内容" text={data.purName || ''} />
              <BasicFormItem label="邀请方式" text={data.invMetName || ''} />
            </tr>
            <tr>
              <BasicFormItem label="采购方式" text={data.purMetName || ''} />
              <BasicFormItem label="委托代理机构" text={data.autAge || ''} />
            </tr>
            <tr>
              <BasicFormItem label="组织方式" text={data.orgMetName || ''} />
              <BasicFormItem label="完成日期" text={data.finDate || ''} />
            </tr>
            <tr>
              <BasicFormItem label="资格审查" text={data.quaExaName || ''} />
              <BasicFormItem label="履约地点" text={data.perPlace || ''} />
            </tr>
            <tr>
              <BasicFormItem label="签约类型" text={data.conName || ''} />
              <BasicFormItem label="" text="" />
            </tr>
            <tr>
              <BasicFormItem
                label="采购方式选择依据"
                text={data.purSelName || ''}
                textColSpan={3}
              />
            </tr>
            <tr>
              <BasicFormItem
                label="合规性说明"
                text={data.rulExeCause || ''}
                textColSpan={3}
              />
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
                label="采购申请附件"
                text={() => {
                  return attaDataList.map((atta, index) => (
                    <FiewViewer key={index} className="pr-4" file={atta} />
                  ))
                }}
              />
              <BasicFormItem
                label="合规性附件"
                text={() => {
                  let atta = []
                  if (data.rulFilInfo && data.rulFilInfo.length) {
                    atta = data.rulFilInfo
                  }
                  return atta.map((atta, index) => {
                    atta.attPath = replaceString(
                      atta.attPath,
                      '/usr/attachment',
                      ''
                    )
                    return (
                      <FiewViewer
                        key={index}
                        className="pr-4"
                        file={atta}
                        name="filName"
                        urlName="attPath"
                      />
                    )
                  })
                }}
              />
            </tr>
          </tbody>
        </table>
      )}
    </div>
  )
}
