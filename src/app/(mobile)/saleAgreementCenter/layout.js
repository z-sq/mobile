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

const saleAgreementCenterLayout = observer(({ children }) => {
  const [opinionValue, setOpinionValue] = useState('')
  const [moreVisible, setMoreVisible] = useState(false)
  const [disable, setDisable] = useState(false)
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState('')

  const [form] = Form.useForm()

  const router = useRouter()
  const {
    approveStore: { currentInfo, updateCurInfo }
  } = useStores()
  const {currentTabKey} =tabStore;

  const isForward = currentInfo ? currentInfo.difFlag === 'FORWARD' : false

  const searchParams = useSearchParams()
  const reqNo = searchParams.get('key')
  const pagCode = searchParams.get('pagCode')
  const state = searchParams.get('state')
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

  const goBack = () => {
    router.back()
  }

  const saveOpinion = () => {
    if (currentTabKey === '7') {
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
      
      <div
        className="px-per4 absolute bottom-0 box-border w-[100%] bg-white"
        style={{ marginBottom: currentTabKey === '7' ? '1.5rem' : 0 }}
      >
        <div className="h-64px box-border w-[100%]">
          {/* <Form
            layout="horizontal"
            form={form}
            requiredMarkStyle={false}
            style={{
              '--border-bottom': 'none',
              '--border-inner': 'none',
              '--border-top': 'none'
            }}
          >
            <LabelInput
              label={isForward ? '评论 ' : '审核意见 '}
              value={opinionValue}
              onChange={handleInputChange}
              read={state !== '2'}
              form={form}
              valid={visible}
            />
          </Form> */}
        </div>


        {currentTabKey === '7' && !isForward ? (
          <div className="box-border flex w-full place-content-between items-center">
            <Button
              color="primary"
              fill="outline"
              style={{
                width: '30%'
              }}
              onClick={() => {
                onApprove(false)
              }}
              disabled={disable}
            >
              驳 回
            </Button>
            <Button
              color="primary"
              fill="solid"
              style={{
                width: '30%'
              }}
              onClick={() => {
                onApprove(true)
              }}
              disabled={disable}
            >
              通 过
            </Button>
            <Button
              color="primary"
              fill="outline"
              style={{
                width: '30%'
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
                  className={`border-bottom-gray flex h-[100%] h-[48px] w-[100%] items-center justify-center ${isForward ? 'hidden' : ''}`}
                  onClick={() => {
                    setMoreVisible(false)
                    saveOpinion()
                    router.push('/wfm/forward')
                  }}
                >
                  转发
                </div>
                <div
                  className="border-bottom-gray flex h-[100%] h-[48px] w-[100%] items-center justify-center"
                  onClick={() => {
                    setMoreVisible(false)
                    saveOpinion()
                    router.push('/wfm/transfer')
                  }}
                >
                  转办
                </div>
                <div
                  className="flex h-[100%] h-[48px] w-[100%] items-center justify-center"
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
        {currentTabKey === '7' && isForward ? (
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

export default saleAgreementCenterLayout
