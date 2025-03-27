'use client'

import { observer } from 'mobx-react'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

import ApprovalOpinion from './components/ApprovalOpinion'
import MaterialInformation from './components/MaterialInformation'
import SupplierInformation from './components/SupplierInformation'
import TabBar from './components/TabBar'

// 引入页面所有的tab页签组件
import BaseInfo from './BaseInfo'
import ProductInfo from './ProductInfo'
import SelfCheck from './SelfCheck'
import ContractBudget from './ContractBudget'
import PaymentPlan from './PaymentPlan'
import ReturnPlan from './ReturnPlan'
import ApproveOpinion from './ApproveOpinion'

import { typeMap } from '@/config/configData'
import request from '@/utils/request'
import { useStores } from '@/utils/useStores'
import tabStore from '@/stores/tabStore'

const saleAgreementCenter = observer(({ children }) => {
  const [activeKey, setActiveKey] = useState('1')
  const [materialInfo, setMaterialInfo] = useState([])
  const [materialTotal, setMaterialTotal] = useState(0)
  const [supplierInfo, setSupplierInfo] = useState([])
  const [approvalInfo, setApprovalInfo] = useState([])

  const {
    approveStore: { currentInfo }
  } = useStores()

  const searchParams = useSearchParams()
  const busKeyValue = searchParams.get('key')||'R1092125020026'
  const procCode = searchParams.get('type')
  const pagCode = searchParams.get('pagCode')
  const procVersion = searchParams.get('procVersion')
  const state = searchParams.get('state')

  const wfType = typeMap[pagCode]?.pagCode||'tp2100'
  const busKey = typeMap[pagCode]?.busKey||'reqNo'

  const getVendorInfo = async () => {
    try {
      const result = await request(
        `/business/mas/tp/manual/${wfType}/getVendorInfo`,
        'GET',
        {
          [busKey]: busKeyValue
        }
      )
      if (result && result.success) {
        const data = result.data || []
        const vendorData = data.map((item, index) => {
          if (item.supImpName !== null) {
            item.supClsNameNew =
              (item.supClsName || '') + '（' + item.supImpName + '）'
          } else {
            item.supClsNameNew = item.supClsName || ''
          }
          return item
        })
        setSupplierInfo(vendorData)
      }
    } catch (err) {}
  }
// 审核意见
  const getWfmApproveInfo = async () => {
    console.log(222)
    // /business/mas/tp/manual/tp2800/getWfmApproveInfo
    try {
      console.log(333,busKeyValue,wfType,busKey)
      const result = await request(
        `/business/mas/tp/manual/${wfType}/getWfmApproveInfo`,
        'GET',
        {
          [busKey]: busKeyValue,
          procCode,
          procVersion,
          uuId: currentInfo.uuid
        }
      )
      console.log(444)
      if (result && result.success) {
        const data = result.data || []
        setApprovalInfo(data)
      }
    } catch (err) {}
  }
  const renderContent = (key) => {
    switch (key) {
      case '1':
        return <BaseInfo />
      case '2':
        return <ProductInfo data={materialInfo} total={materialTotal} />
      case '3':
        return <SelfCheck />
      case '4':
        return <ContractBudget />
      case '5':
        return <PaymentPlan />
      case '6':
        return <ReturnPlan />
      case '7':
        return <ApproveOpinion  data={approvalInfo} />
      default:
        return <BaseInfo />
    }
  }
  const handleGetTabChange=(key)=>{
    setActiveKey(key)
    tabStore.setCurrentTabKey(key)
    console.log(1,key,'11223344')
    if (key==='7') {
      getWfmApproveInfo()
    }
  }
  useEffect(() => {
    // if (!currentInfo) {
    //   return
    // }
    getVendorInfo()
    getWfmApproveInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <TabBar handleTabChange={handleGetTabChange} />
      <div
        className="pt-80px pb-160px absolute box-border w-full overflow-hidden"
        style={{
          height: 'calc(var(--vh, 1vh) * 100)',
          paddingBottom: activeKey === '7' ? '9rem' : '5rem'
        }}
      >
        <div className="relative box-border h-[100%] w-full">
          <div
            className="h-[100%] w-full"
            style={{
              position: 'absolute'
            }}
          >
           {renderContent(activeKey)}
          </div>
        </div>
      </div>
    </>
  )
})

export default saleAgreementCenter
