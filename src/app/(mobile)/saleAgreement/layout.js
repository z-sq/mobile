'use client'

import { Popup, Toast, Form, Modal } from 'antd-mobile'
import { observer } from 'mobx-react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

import Button from '@/components/Button'
import LabelInput from '@/components/LabelInput'
import Title from '@/components/Title'
import { typeMap, busTypeMap } from '@/config/configData'
import { workflowApi } from '@/request/apis/workflow'
import request from '@/utils/request'
import { useStores } from '@/utils/useStores'
import tabStore from '@/stores/tabStore'

const saleAgreementLayout = observer(({ children }) => {
  const [opinionValue, setOpinionValue] = useState('')

  const [disable, setDisable] = useState(false)
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState('')

  const [form] = Form.useForm()

  const router = useRouter()
  const {
    approveStore: { currentInfo, updateCurInfo }
  } = useStores()
  const {currentTabKey} =tabStore;
console.log(JSON.stringify(currentInfo),'currentInfo')
  const isForward = currentInfo ? currentInfo.difFlag === 'FORWARD' : false

  const searchParams = useSearchParams()
  const reqNo = searchParams.get('key')
  const pagCode = searchParams.get('pagCode')
  const state = searchParams.get('state')||'2'
  const purMetCode = searchParams.get('purMet')
  const chaFlag = searchParams.get('chaFlag')
  let title_item = 'title'
  if (chaFlag === 'Y') {
    //如果chaFlag 为Y 取用 title_Change 标题字段
    title_item = 'title_Change'
  }
  let title ='销售合同申请单审批'

  const handleInputChange = (val) => {
    setOpinionValue(val)
  }
  
  const goBack = () => {
    router.back()
  }
  const saveOpinion = () => {
    if (state === '2') {
      const values = form.getFieldsValue()
      updateCurInfo({ curOpinion: values.opinion })
    }
  }

  useEffect(() => {
    // if (!currentInfo) {
    //   router.push('/list')
    //   return
    // }
    // if (state !== '2' && currentInfo && currentInfo.opinion !== null) {
    //   // setOpinionValue(currentInfo.opinion)
    //   form.setFieldsValue({
    //     opinion: currentInfo.opinion
    //   })
    // } else if (currentTabKey === '7' && currentInfo && currentInfo.curOpinion) {
    //   form.setFieldsValue({
    //     opinion: currentInfo.curOpinion
    //   })
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentInfo])

  return (
    <div
      className="relative h-[100%] w-[100%] bg-white"
      style={{ height: 'calc(var(--vh, 1vh) * 100)' }}
    >
      <div className="h-40px absolute left-0 top-0 z-[99] w-[100%] overflow-hidden bg-white pt-[1px]">
        <Title
          onBack={goBack}
          title={title}
          rightIcon={'2'}
          callback={saveOpinion}
        />
      </div>
      {children}
      
      
      <Modal
        visible={visible}
        content={message}
        closeOnMaskClick={true}
        onClose={() => {
          setVisible(false)
        }}
        header="提示"
        bodyClassName="mask-with-header"
      />
    </div>
  )
})

export default saleAgreementLayout
