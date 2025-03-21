'use client'

import { observer } from 'mobx-react'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

import ApprovalOpinion from '../components/ApprovalOpinion'
import TabBar from '../components/TabBar'

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

const BidPage = observer(() => {
  const [activeKey, setActiveKey] = useState('1')
  const [baseInfo, setBaseInfo] = useState('')
  const [approvalInfo, setApprovalInfo] = useState([])
  const [supplierData, setSupplierData] = useState([])
  const [attaDataList, setAttaDataList] = useState([])

  const {
    approveStore: { currentInfo }
  } = useStores()

  const searchParams = useSearchParams()
  const bilNo = searchParams.get('key')
  const procCode = searchParams.get('type')
  const pagCode = searchParams.get('pagCode')
  const procVersion = searchParams.get('procVersion')
  const state = searchParams.get('state')
  const purMet = searchParams.get('purMet')

  const getAtta = async (params = {}) => {
    const result = await request(
      `/business/mas/tp/manual/tp2300/getAttaFileInfo`,
      'GET',
      {
        busValue: bilNo,
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
        '/business/mas/tp/manual/tp2300/getBaseInfo',
        'GET',
        {
          bilNo
        }
      )
      if (result && result.success) {
        setBaseInfo(result.data || {})
        const data = result.data || {}
        const params = {
          comCode: data.comCode
        }
        getAtta(params)
      } else {
        // 错误提示
      }
    } catch (err) {}
  }

  const getVendorInfo = async () => {
    try {
      const result = await request(
        '/business/mas/tp/manual/tp2300/getVendorInfo',
        'GET',
        {
          bilNo
        }
      )
      if (result && result.success) {
        const data = result.data || []
        setSupplierData(data)
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
    getBaseInfo()
    getVendorInfo()
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
          paddingBottom: state === '2' ? '10rem' : '5rem'
        }}
      >
        <div className="relative box-border h-[100%] w-full">
          {activeKey === '1' && (
            <BasicInformation
              data={baseInfo}
              procCode={procCode}
              pagCode={pagCode}
              supplierData={supplierData}
              state={state}
              purMet={purMet}
              attaDataList={attaDataList}
            />
          )}
          {activeKey === '2' && <ApprovalOpinion data={approvalInfo} />}
        </div>
      </div>
    </>
  )
})

export default BidPage
