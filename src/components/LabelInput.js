import { Input, TextArea, Form } from 'antd-mobile'
import React from 'react'
import { useState, useEffect } from 'react'

import styles from './LabelInput.module.css'

const LabeledInput = ({
  label,
  value,
  onChange,
  read = false,
  form,
  valid
}) => {
  const [isInput, setIsInput] = useState(null)

  const check = (_, value) => {
    if (!value) {
      setIsInput(false)
      return Promise.reject(new Error('请输入审核意见'))
    }
    return Promise.resolve()
  }

  const handleChange = (value) => {
    onChange(value)
    if (value && value.length > 0) {
      setIsInput(true)
    }
  }

  useEffect(() => {
    if (isInput === true) {
      form.validateFields().then((e) => {})
    }
  }, [isInput])

  useEffect(() => {
    const inputElement = document.getElementById('labelInput')
    // 监听输入框失去焦点事件
    inputElement.addEventListener('blur', () => {
      // 将页面滚动回原始位置
      window.scrollTo(0, 0)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className={styles.inputWrapper}>
      <Form.Item
        name="opinion"
        label={label}
        layout="horizontal"
        rules={[{ validator: check }]}
        validateTrigger="onSubmit"
        className={valid ? styles['form-item-valid'] : ''}
      >
        {!read ? (
          <Input
            id="labelInput"
            placeholder=""
            readOnly={read}
            clearable
            // value={value}
            onChange={(val) => {
              handleChange(val)
            }}
            className="flex-1"
            style={{
              '--font-size': '0.75rem',
              paddingLeft: '0.25rem'
            }}
          />
        ) : (
          <TextArea
            id="labelInput"
            placeholder=""
            readOnly={read}
            clearable
            // value={value}
            // onChange={(val) => {
            //   onChange(val)
            // }}
            className="flex-1"
            style={{
              '--font-size': '0.75rem',
              paddingLeft: '0.25rem'
            }}
          />
        )}
      </Form.Item>
    </div>
  )
}

export default LabeledInput
