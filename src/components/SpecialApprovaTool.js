'use client'

import { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { Popup, Toast, Form, Modal } from 'antd-mobile'
import Button from '@/components/Button'
import request from '@/utils/request'

const SpecialApprovaTool = observer(({ passApi, rejectApi, apiParams }) => {
  const [disable, setDisable] = useState(false)
  const [visible, setVisible] = useState(false)

  const onSubmit = async (url) => {
    setDisable(true)
    try {
      const result = await request(
        url,
        'POST',
        {
          ...apiParams
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
  return (
    <>
      <div
        className="px-per4 absolute bottom-0 box-border w-[100%] bg-white"
      >
        <div className="box-border flex w-full items-center justify-between gap-4">
          <Button
            className="flex-1"
            color="primary"
            fill="outline"
            onClick={()=>onSubmit(passApi)}
            disabled={disable}
          >
            驳 回
          </Button>
          <Button
            className="flex-1"
            color="primary"
            fill="solid"
            onClick={()=>onSubmit(rejectApi)}
            disabled={disable}
          >
            通 过
          </Button>
        </div>
      </div>
    </>
  )
})

export default SpecialApprovaTool
