'use client'

import { observer } from 'mobx-react'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import ApprovaTool from '@/components/ApprovaTool'
import ApprovalOpinion from '../components/ApprovalOpinion'
import TabBar from '../components/TabBar'

import Title from '@/components/Title'

import BasicInformation from './components/BasicInformation'
import ProductInfo from './components/ProductInfo'
import PurchasePaymentPlan from './components/PurchasePaymentPlan/PurchasePaymentPlan'

import request from '@/utils/request'
import { useStores } from '@/utils/useStores'

const defaultTabList = [
  { key: '1', title: '基本信息' },
  { key: '2', title: '物料信息' },
  { key: '3', title: '采购付款计划' },
  { key: '4', title: '审核意见' }
]

const BidPage = observer(() => {
  const [activeKey, setActiveKey] = useState('1')
  const [baseInfo, setBaseInfo] = useState('')
  const [approvalInfo, setApprovalInfo] = useState([])
  const [productData, setProductData] = useState([])

  const router = useRouter()

  const {
    approveStore: { currentInfo }
  } = useStores()

  const state = currentInfo.state

  const getBaseInfo = async () => {
    try {
      const result = await request(
        '/business/pm/auto/bzs_pm2120/query/pm2120hform',
        'GET',
        {
          params: JSON.stringify({ usercode: 'lhy' }),
          page: 1,
          start: 0,
          limit: 200
        }
      )
      if (result?.success) {
        const baseInfo = result.data.find(
          (item) => item.ORD_NO == currentInfo.busKeyValue
        )
        setBaseInfo(baseInfo || {})
      } else {
        // 错误提示
      }
    } catch (err) {}
  }

  const getProductInfo = async () => {
    try {
      const result = await request(
        '/business/pm/auto/bzs_pm2120/query/tabdehead',
        'GET',
        {
          params: JSON.stringify(currentInfo),
          ...currentInfo,
          page: 1,
          start: 0,
          limit: 200
        }
      )
      if (result?.success) {
        const data = result.data || []
        setProductData(data)
      } else {
        // 错误提示
      }
    } catch (err) {}
  }

  const getWfmApproveInfo = async () => {
    try {
      const { busKey, busKeyValue, procCode, procVersion, uuid:uuId } = currentInfo
      const result = await request(
        '/mbs/tp/manual/tp2100/getWfmApproveInfo',
        'GET',
        {
          busKey,
          busKeyValue,
          procCode,
          procVersion,
          uuId
        }
      )
      // if (result&& result.success) {
      //   setApprovalInfo(result.data || [])
      // }
    } catch (err) {}
  }

  useEffect(() => {
    if (!currentInfo) {
      return
    }
    getBaseInfo()
    getProductInfo()
    // getWfmApproveInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentInfo])

  return (
    <>
      <div className="h-40px absolute left-0 top-0 z-[99] w-[100%] overflow-hidden bg-white pt-[1px]">
        <Title
          onBack={()=>router.back()}
          title={currentInfo.procName}
          rightIcon={'2'}
        />
      </div>
      <TabBar setActiveKey={setActiveKey} tabList={defaultTabList} />
      <div
        className="pt-80px pb-160px absolute box-border w-full overflow-hidden"
        style={{
          height: 'calc(var(--vh, 1vh) * 100)',
          paddingBottom: state === '2' ? '10rem' : '5rem'
        }}
      >
        <div className="relative box-border h-[100%] w-full">
          {activeKey === '1' && <BasicInformation data={baseInfo} />}
          {activeKey === '2' && <ProductInfo data={productData} />}
          {activeKey === '3' && <PurchasePaymentPlan apiParams={baseInfo} />}
          {activeKey === '4' && <ApprovalOpinion data={approvalInfo} />}
        </div>
      </div>

      {activeKey !=='3' && <ApprovaTool />}
      
    </>
  )
})

export default BidPage
