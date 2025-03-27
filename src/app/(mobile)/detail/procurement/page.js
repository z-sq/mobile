'use client'

import { observer } from 'mobx-react'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

import ApprovalOpinion from '../components/ApprovalOpinion'
import TabBar from '../components/TabBar'

import BasicInformation from './BasicInformation'
import ProductInfo from './ProductInfo'

import request from '@/utils/request'
import { useStores } from '@/utils/useStores'

const defaultTabList = [
  { key: '1', title: '基本信息' },
  { key: '2', title: '产品信息' },
  { key: '3', title: '审核意见' }
]

const BidPage = observer(() => {
  const [activeKey, setActiveKey] = useState('1')
  const [baseInfo, setBaseInfo] = useState('')
  const [approvalInfo, setApprovalInfo] = useState([])
  const [productData, setProductData] = useState([])

  const {
    approveStore: { currentInfo }
  } = useStores()

  const searchParams = useSearchParams()
  const bilNo = searchParams.get('key')
  const procCode = searchParams.get('type')
  const procVersion = searchParams.get('procVersion')
  const state = searchParams.get('state')

  const getBaseInfo = async () => {
    try {
      const result = await request(
        '/business/pm/auto/bzs_pm2120/query/pm2120hform',
        'GET',
        {
          params: JSON.stringify({"usercode":"lhy"}),
          page: 1,
          start: 0,
          limit: 200
        }
      )
      if (result && result.success) {
        const baseInfo = result.data.find(item=>item.UU_ID == '2ee9fafed3db4b318305d541d247de7d');
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
      if (result && result.success) {
        const data = result.data || []
        setProductData(data)
      } else {
        // 错误提示
      }
    } catch (err) {}
  }

  const getWfmApproveInfo = async () => {
    try {
      const result = await request(
        '/mbs/tp/manual/tp2100/getWfmApproveInfo',
        'GET',
        {
          busKey,
          busKeyValue,
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

  useEffect(() => {
    if (!currentInfo) {
      return
    }
    // getBaseInfo()
    // getProductInfo()
    // getWfmApproveInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentInfo])

  return (
    <>
      <TabBar setActiveKey={setActiveKey} tabList={defaultTabList} />
      <div
        className="pt-80px pb-160px absolute box-border w-full overflow-hidden"
        style={{
          height: 'calc(var(--vh, 1vh) * 100)',
          paddingBottom: state === '2' ? '10rem' : '5rem'
        }}
      >
        <div className="relative box-border h-[100%] w-full">
          {activeKey === '1' && (
            <BasicInformation data={baseInfo} />
          )}
          {activeKey === '2' && <ProductInfo data={productData} />}
          {activeKey === '3' && <ApprovalOpinion data={approvalInfo} />}
        </div>
      </div>
    </>
  )
})

export default BidPage
