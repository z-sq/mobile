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
  const busKeyValue = searchParams.get('key')
  const procCode = searchParams.get('type')
  const pagCode = searchParams.get('pagCode')
  const procVersion = searchParams.get('procVersion')
  const state = searchParams.get('state')

  const wfType = typeMap[pagCode]?.pagCode
  const busKey = typeMap[pagCode]?.busKey

  const getMaterialInfo = async (page) => {
    try {
      const result = await request(
        `/business/mas/tp/manual/${wfType}/getItemInfo`,
        'GET',
        {
          [busKey]: busKeyValue,
          page,
          limit: 20
        }
      )
      if (result && result.success) {
        const data = result.data ? result.data.records || [] : []
        const total = result.data ? result.data.total || 0 : 0
        setMaterialInfo(data)
        setMaterialTotal(total)
      }
    } catch (err) {}
  }

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

  const getWfmApproveInfo = async () => {
    try {
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
        return <ProductInfo />
      case '3':
        return <SelfCheck />
      case '4':
        return <ContractBudget />
      case '5':
        return <PaymentPlan />
      case '6':
        return <ReturnPlan />
      case '7':
        return <ApproveOpinion />
      default:
        return <BaseInfo />
    }
  }

  return (
    <>
      <TabBar setActiveKey={setActiveKey} />
      <div
        className="pt-80px pb-160px absolute box-border w-full overflow-hidden"
        style={{
          height: 'calc(var(--vh, 1vh) * 100)',
          paddingBottom: state === '2' ? '9rem' : '5rem'
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
          {activeKey === '2' && (
            <MaterialInformation data={materialInfo} total={materialTotal} />
          )}
          {activeKey === '3' && <SupplierInformation data={supplierInfo} />}
          {activeKey === '4' && <ApprovalOpinion data={approvalInfo} />}
        </div>
      </div>
    </>
  )
})

export default saleAgreementCenter
