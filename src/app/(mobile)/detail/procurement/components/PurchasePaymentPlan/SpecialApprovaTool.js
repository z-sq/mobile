'use client'

import { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { Popup, Toast, Form, Modal } from 'antd-mobile'
import Button from '@/components/Button'
import request from '@/utils/request'

const SpecialApprovaTool = observer(({ data }) => {
  const [disable, setDisable] = useState(false)

  const onSubmit = async (flag) => {
    if(!flag && !data.AUD_TEXT) {
      Toast.show({
        content: '请输入驳回原因'
      })
      return null
    }
    setDisable(true)
    try {
      const result = await request(
        '/business/pm/auto/pm_cgfk_sp/crud',
        'POST',
        {
          pagCode: 'pm_cgfk_sp',
          funCode: 'Save',
          panels: [
            {
              gridCode: 'headPanel',
              panelData: {
                newRecords: { recordData: [] },
                deleteRecords: { recordData: [] },
                updateRecords: {
                  modifieds: [
                    {
                      AUD_TEXT: data.AUD_TEXT,
                      PASS_FLAG: flag ? 'Y': 'N',
                      UU_ID: data.UU_ID,
                      UPD_CODE: data.UPD_CODE,
                      UPD_NAME: data.UPD_NAME
                    }
                  ],
                  recordData: [data]
                }
              },
              relationData: {
                downPanel: [
                  { upField: 'COM_CODE', downField: 'COM_CODE' },
                  { upField: 'ORD_NO', downField: 'ORD_NO' },
                  { upField: 'CON_NO', downField: 'CON_NO' }
                ]
              }
            }
          ],
          lanType: 'ch',
          wfmParams: []
        }
      )
      if (result && result.success) {
        Toast.show({
          content: result.mesg
        })
        // router.push('/list')
      }
      setDisable(false)
    } catch (err) {
      setDisable(false)
    }
  }
  return (
    <>
      <div className="px-per4 absolute bottom-0 box-border w-[100%] bg-white">
        <div className="box-border flex w-full items-center justify-between gap-4">
          <Button
            className="flex-1"
            color="primary"
            fill="outline"
            onClick={() => onSubmit(false)}
            disabled={disable}
          >
            驳 回
          </Button>
          <Button
            className="flex-1"
            color="primary"
            fill="solid"
            onClick={() => onSubmit(true)}
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
