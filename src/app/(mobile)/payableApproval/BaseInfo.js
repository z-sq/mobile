'use client'

import { useState, useEffect } from 'react'

import BasicFormItem from './components/BasicInformation/BasicFormItem'

import Loading from '@/components/Loading'
import request from '@/utils/request'
import { useStores } from '@/utils/useStores'
import { payApprovalApi } from '@/request/apis/payableApproval'
import { Popup, Toast, Form, Modal } from 'antd-mobile'
import { useSearchParams, useRouter } from 'next/navigation'

export default function BaseInfo({ style = {} }) {
  const router = useRouter()
  // const usercode =localStorage.getItem('acctCode')
  const [data, setData] = useState({})
  const [userCode,setUserCode]=useState()

  const {
    approveStore: { resetCurInfo, currentInfo }
  } = useStores()
  const getBaseInfo = async () => {
    try {
      const result = await request(payApprovalApi.getBaseInfo,
        'GET',
        {
          params:JSON.stringify( { COM_CODE:currentInfo.COM_CODE }),
          page: 1,
          start: 0,
          limit: 9999
        }
      )
      if (result && result.success) {
        const resData = result.data.find(
          (item) => item.ORD_NO == currentInfo.busKeyValue
        )
        if(!resData) {
          Toast.show({
            content: '该条数据异常'
          })
          // router.push('/list')
        }else{
          console.log('resData',resData);
        }
        setData(resData || {})
        resetCurInfo(resData)
      }
    } catch (err) {}
  }

  useEffect(()=>{
    if (typeof window!==undefined) {
      const usercode =localStorage.getItem('acctCode')
      if (usercode) {
        setUserCode(usercode)
      }
    }
  },[])
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
            <BasicFormItem label="申请单号" text={data?.PAY_ID || ''} />
            <BasicFormItem label="申请日期" text={data?.UPD_DATE || ''} />
          </tr>
          <tr>
            <BasicFormItem label="公司" text={data?.COM_NAME || ''} />
            <BasicFormItem label="申请部门" text={data?.DEP_NAME || ''} />
          </tr>
          <tr>
            <BasicFormItem label="申请人" text={data?.UPD_NAME || ''} />
            <BasicFormItem label="付款类型" text={data?.PAY_TYP_NAME || ''} />
          </tr>
          <tr>
            <BasicFormItem label="结算币别" text={data?.CUR_NAME || ''} />
            <BasicFormItem label="申请金额" text={data?.DEM_AMT || ''} />
          </tr>
          <tr>
            <BasicFormItem label="供应商" text={data?.VEN_NAME || ''} />
          </tr>

          <tr>
            <BasicFormItem
              label="付款说明"
              text={data?.EXA_REMAKES || ''}
              textColSpan={3}
            />
          </tr>
          
        </tbody>
      </table>
     )} 
    </div>
  )
}
