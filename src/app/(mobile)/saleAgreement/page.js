'use client'

import { observer } from 'mobx-react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Popup, Toast, Form, Modal } from 'antd-mobile'

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
import SupplementaryInfo from './SupplementaryInfo'

import Button from '@/components/Button'
import { typeMap } from '@/config/configData'
import request from '@/utils/request'
import { useStores } from '@/utils/useStores'
import tabStore from '@/stores/tabStore'

const SaleAgreement = observer(({ children }) => {
  const [activeKey, setActiveKey] = useState('1')
  const [materialInfo, setMaterialInfo] = useState([])
  const [materialTotal, setMaterialTotal] = useState(0)
  const [supplierInfo, setSupplierInfo] = useState([])
  const [approvalInfo, setApprovalInfo] = useState([])
  const [disable, setDisable] = useState(false)
  const [moreVisible, setMoreVisible] = useState(false)

  const [form] = Form.useForm()
  const router = useRouter()

  const {
    approveStore: { currentInfo, updateCurInfo }
  } = useStores()
  const isForward = currentInfo ? currentInfo.difFlag === 'FORWARD' : false
  const searchParams = useSearchParams()
  const busKeyValue = searchParams.get('key')||'R1092125020026'
  const procCode = searchParams.get('type')
  const pagCode = searchParams.get('pagCode')
  const procVersion = searchParams.get('procVersion')
  const state = searchParams.get('state')||'2'

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
      case '8':
        return <SupplementaryInfo/>
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


  const onSubmit = async (wfmParams) => {
    setDisable(true)
    try {
      const result = await request(
        '/business/wfm/wfmEngine/doWfmPost',
        'POST',
        {
          pagCode: '',
          wfmParams: [wfmParams],
          funCode: null,
          buzParams: {
            RED_NO: reqNo
          }
        }
      )
      if (result && result.success) {
        Toast.show({
          content: result.mesg
        })
        router.push('/list')
      }
      setDisable(false)
    } catch (err) {
      setDisable(false)
    }
  }

  const onApprove = async (flag) => {
    if (!currentInfo) return

    const values = form.getFieldsValue()
    let wfmParams = { ...currentInfo, opinion: values.opinion }
    if (flag) {
      wfmParams.opinionFlag = '1'
      onSubmit(wfmParams)
    } else {
      wfmParams.opinionFlag = '2'
      if (!values.opinion) {
        setMessage('请输入审核意见！')
        setVisible(true)
        return
      }
      onSubmit(wfmParams)
    }
  }

  const onCommit = async () => {
    if (!currentInfo) return
    const values = form.getFieldsValue()
    if (!values.opinion) {
      setMessage('请输入评论！')
      setVisible(true)
      return
    }
    if (values.opinion.length > 50) {
      setMessage('评论字数限制50！')
      setVisible(true)
      return
    }
    setDisable(true)
    try {
      const result = await request(
        `${workflowApi.forwardSubmit}?forCode=${currentInfo.uuid}&opinion=${values.opinion}`,
        'POST'
      )
      if (result && result.success) {
        Toast.show({
          content: result.mesg
        })
        router.push('/list')
      }
      setDisable(false)
    } catch (err) {
      setDisable(false)
    }
  }


  const saveOpinion = () => {
    if (state === '2') {
      const values = form.getFieldsValue()
      updateCurInfo({ curOpinion: values.opinion })
    }
  }

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
      <div
        className="px-per4 absolute bottom-0 box-border w-[100%] bg-white"
        style={{ marginBottom: state === '2' ? '1.5rem' : 0 }}
      >

        {state === '2' && !isForward ? (
          <div className="box-border flex w-full justify-between">
            <Button
              color="primary"
              fill="solid"
              style={{
                width: '50%'
              }}
             
              onClick={() => {
                onApprove(true)
                router.push('/saleAgreement/approve')
              }}
              disabled={disable}
            >
              审 批
            </Button>
            <div  className='mx-2'/>
            <Button
              color="primary"
              fill="outline"
              style={{
                width: '50%'
              }}
              onClick={() => {
                setMoreVisible(true)
              }}
              disabled={disable}
            >
              更 多
            </Button>
            <Popup
              visible={moreVisible}
              onMaskClick={() => {
                setMoreVisible(false)
              }}
            >
              <div className="text-14px px-12px pb-24px">
                <div
                  className={`border-bottom-gray flex h-[48px] w-[100%] items-center justify-center ${isForward ? 'hidden' : ''}`}
                  onClick={() => {
                    setMoreVisible(false)
                    saveOpinion()
                    router.push('/saleAgreement/forward')
                  }}
                >
                  转发
                </div>
                <div
                  className="border-bottom-gray flex h-[48px] w-[100%] items-center justify-center"
                  onClick={() => {
                    setMoreVisible(false)
                    saveOpinion()
                    router.push('/saleAgreement/transfer')
                  }}
                >
                  转办
                </div>
                <div
                  className="flex h-[48px] w-[100%] items-center justify-center"
                  onClick={() => {
                    setMoreVisible(false)
                  }}
                >
                  取消
                </div>
              </div>
            </Popup>
          </div>
        ) : null}
        {state === '2' && isForward ? (
          <div className="box-border flex w-full place-content-center items-center">
            <Button
              color="primary"
              fill="solid"
              style={{
                width: '30%'
              }}
              onClick={() => {
                onCommit()
              }}
              disabled={disable}
            >
              评 论
            </Button>
          </div>
        ) : null}
      </div>
    </>
  )
})

export default SaleAgreement
