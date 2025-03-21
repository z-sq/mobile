'use client'

import { observer } from 'mobx-react'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

import ApprovalOpinion from '../../components/ApprovalOpinion'
import TabBar from '../../components/TabBar'

import BasicInformation from './BasicInformation'

import request from '@/utils/request'
import { useStores } from '@/utils/useStores'

const defaultTabList = [
  { key: '1', title: '成交信息' },
  { key: '2', title: '审核意见' }
]

const tabList = [
  { key: '1', title: '中标信息' },
  { key: '2', title: '审核意见' }
]

const BidDetailPage = observer(() => {
  const [activeKey, setActiveKey] = useState('1')
  const [supplierData, setSupplierData] = useState('')
  const [approvalInfo, setApprovalInfo] = useState([])
  const [materialInfo, setMaterialInfo] = useState(null)
  const [materialTotal, setMaterialTotal] = useState(0)

  const {
    approveStore: { currentInfo }
  } = useStores()

  const searchParams = useSearchParams()
  const procCode = searchParams.get('type')
  const pagCode = searchParams.get('pagCode')
  const bilNo = searchParams.get('key')
  const taxRegNo = searchParams.get('taxRegNo')
  const state = searchParams.get('state')

  const getMaterialInfo = async (page) => {
    try {
      const result = await request(
        '/business/mas/tp/manual/tp2300/getItemInfo',
        'GET',
        {
          bilNo,
          taxRegNo,
          page,
          limit: 20
        }
      )
      if (result && result.success) {
        const data = result.data ? result.data.records || [] : []
        const total = result.data ? result.data.total || 0 : 0
        setMaterialInfo(data)
        setMaterialTotal(total)
      } else {
        // 错误提示
      }
    } catch (err) {}
  }

  const getWfmApproveInfo = async () => {
    try {
      const result = await request(
        '/business/mas/tp/manual/tp2300/getWfmApproveInfo',
        'GET',
        {
          bilNo,
          procCode,
          procVersion: currentInfo.procVersion,
          uuId: currentInfo.uuid
        }
      )
      if (result && result.success) {
        const data = result.data || []
        setApprovalInfo(data)
      }
    } catch (err) {}
  }

  const getVendorInfo = async () => {
    try {
      const result = await request(
        '/business/mas/tp/manual/tp2300/getVendorInfo',
        'GET',
        {
          bilNo,
          taxRegNo
        }
      )
      if (result && result.success) {
        const data = result.data || []
        if (data.length > 0) {
          setSupplierData(data[0])
        }
      } else {
        // 错误提示
      }
    } catch (err) {}
  }

  useEffect(() => {
    if (!currentInfo) {
      return
    }
    getVendorInfo()
    getMaterialInfo(1)
    getWfmApproveInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentInfo])

  return (
    <>
      <TabBar
        setActiveKey={setActiveKey}
        tabList={pagCode === 'tp2032' ? tabList : defaultTabList}
      />
      <div
        className="pt-80px pb-160px absolute box-border w-full overflow-hidden"
        style={{
          height: 'calc(var(--vh, 1vh) * 100)',
          paddingBottom: state === '2' ? '9rem' : '5rem'
        }}
      >
        <div className="relative box-border h-[100%] w-full">
          {activeKey === '1' && (
            <BasicInformation
              data={supplierData}
              bilNo={bilNo}
              tableData={materialInfo}
              tableTotal={materialTotal}
              taxRegNo={taxRegNo}
            />
          )}
          {activeKey === '2' && <ApprovalOpinion data={approvalInfo} />}
        </div>
      </div>
    </>
  )
})

export default BidDetailPage
