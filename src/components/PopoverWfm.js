'use client'

import { Popover, Modal, Toast } from 'antd-mobile'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { BASE_PATH } from '@/config/app'
import './PopoverWfm.css'

const actions = [
  { key: '1', text: '流程图', route: '/wfm/figure' }
  // { key: '2', text: '流程状态', route: '' }
]

export default function PopoverWfm({
  image = `url('${BASE_PATH}/images/popover.png')`,
  styles = {},
  callback
}) {
  const router = useRouter()
  const [visible, setVisible] = useState(false)

  const handleVisibleChange = (visible) => {
    setVisible(visible)
  }

  const handleSelectChange = (node) => {
    if (node.route) {
      callback && callback()
      router.push(node.route)
    } else {
      Toast.show({
        content: '功能正在开发中'
      })
    }
  }

  return (
    <div>
      {visible && (
        <Modal
          visible={visible}
          onClose={() => handleVisibleChange(false)}
          maskClosable
          bodyStyle={{ display: 'none' }}
        />
      )}
      <Popover.Menu
        onVisibleChange={handleVisibleChange}
        actions={actions}
        placement="bottom-start"
        trigger="click"
        onAction={(node) => handleSelectChange(node)}
        style={{
          '--arrow-size': '4px'
        }}
      >
        <div className="px-1.5 py-0">
          <div
            className="h-16px w-16px bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: image, ...styles }}
          />
        </div>
      </Popover.Menu>
    </div>
  )
}
