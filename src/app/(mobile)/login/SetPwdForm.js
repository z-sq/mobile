'use client'

import { Form, Input } from 'antd-mobile'
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons'
import { useState } from 'react'

import Button from '@/components/Button'

import './login.module.css'

const PwtForm = ({
  form,
  validaRule,
  handleLogin,
  setSetPwd,
  loginFormValue
}) => {
  const [disable, setDisable] = useState(true)
  const [visiblePassword, setVisiblePassword] = useState(false)
  const [visibleNewPass, setVisibleNewPass] = useState(false)
  const [visibleConfirmPass, setVisibleConfirmPass] = useState(false)

  const onBack = () => {
    setSetPwd(false)
  }

  const onConfirm = () => {
    const values = form.getFieldsValue()
    form.validateFields().then((e) => {
      const params = {
        ...loginFormValue,
        ...values
      }
      handleLogin(params)
    })
  }

  const checkPassword = (_, value) => {
    handleBlur()
    if (!value) {
      setDisable(true)
      return Promise.reject(new Error('请输入原始密码！'))
    }
    return Promise.resolve()
  }

  const checkNewPass = (_, value) => {
    handleBlur()
    if (!value) {
      setDisable(true)
      return Promise.reject(new Error('请输入新密码！'))
    }
    if (validaRule.minLenthFlag === 'Y' && validaRule.minLenth) {
      if (value.length < validaRule.minLenth) {
        return Promise.reject(new Error('密码最小长度为' + validaRule.minLenth))
      }
    }
    if (validaRule.passwordFmtFlag === 'Y') {
      if (validaRule.passwordFmt === '01') {
        var regex = /^(?=.*[a-zA-Z])(?=.*\d).+$/
        if (!regex.test(value)) {
          return Promise.reject(new Error('用户修改密码规则应为：数字+字母'))
        }
      }
      if (validaRule.passwordFmt === '02') {
        var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/
        if (!regex.test(value)) {
          return Promise.reject(
            new Error('用户修改密码规则应为：数字+字母大小写')
          )
        }
      }
      if (validaRule.passwordFmt === '03') {
        var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/
        if (!regex.test(value)) {
          return Promise.reject(
            new Error('用户修改密码规则应为：数字+字母大小写+特殊字符')
          )
        }
      }
    }
    return Promise.resolve()
  }

  const checkConfirmPass = (_, value) => {
    if (!value) {
      setDisable(true)
      return Promise.reject(new Error('请确认密码！'))
    }
    const values = form.getFieldsValue()
    const { newPass, confirmPass } = values
    if (newPass && confirmPass && newPass !== confirmPass) {
      setDisable(true)
      return Promise.reject(new Error('两次输入密码不一致！'))
    }
    setDisable(false)
    return Promise.resolve()
  }

  const handleBlur = () => {
    const values = form.getFieldsValue()
    const { password, newPass, confirmPass } = values
    if (newPass && confirmPass && password && newPass === confirmPass) {
      setDisable(false)
    } else {
      setDisable(true)
    }
  }

  const onBlur = () => {
    const values = form.getFieldsValue()
    values.confirmPass && form.validateFields(['confirmPass'])
  }

  return (
    <div className="w-[100%]">
      <div className="h-32px mb-16px flex w-[100%] items-center justify-center font-semibold text-[#2896FF]">
        修改密码
      </div>
      <div className="w-[100%]">
        <Form
          layout="horizontal"
          mode="card"
          form={form}
          style={{
            '--prefix-width': '5rem'
          }}
        >
          <Form.Item
            label="原始密码"
            name="password"
            validateTrigger="onBlur"
            rules={[
              // { required: true, message: '请输入原始密码！' },
              { validator: checkPassword }
            ]}
            extra={
              <div className="">
                {!visiblePassword ? (
                  <EyeInvisibleOutline
                    onClick={() => setVisiblePassword(true)}
                  />
                ) : (
                  <EyeOutline onClick={() => setVisiblePassword(false)} />
                )}
              </div>
            }
          >
            <Input
              placeholder="请输入原始密码"
              clearable
              type={visiblePassword ? 'text' : 'password'}
            />
          </Form.Item>
          <Form.Item
            label="新密码"
            name="newPass"
            validateTrigger="onBlur"
            rules={[{ validator: checkNewPass }]}
            extra={
              <div className="">
                {!visibleNewPass ? (
                  <EyeInvisibleOutline
                    onClick={() => setVisibleNewPass(true)}
                  />
                ) : (
                  <EyeOutline onClick={() => setVisibleNewPass(false)} />
                )}
              </div>
            }
          >
            <Input
              placeholder="请输入新密码"
              clearable
              onBlur={onBlur}
              type={visibleNewPass ? 'text' : 'password'}
            />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="confirmPass"
            validateTrigger="onBlur"
            rules={[{ validator: checkConfirmPass }]}
            extra={
              <div className="">
                {!visibleConfirmPass ? (
                  <EyeInvisibleOutline
                    onClick={() => setVisibleConfirmPass(true)}
                  />
                ) : (
                  <EyeOutline onClick={() => setVisibleConfirmPass(false)} />
                )}
              </div>
            }
          >
            <Input
              placeholder="请确认密码"
              clearable
              type={visibleConfirmPass ? 'text' : 'password'}
            />
          </Form.Item>
        </Form>
      </div>
      <div className="mt-20px h-40px flex w-[100%] items-center justify-between">
        <Button
          color="primary"
          onClick={onBack}
          style={{
            width: '4rem'
          }}
        >
          返回
        </Button>
        <div></div>
        <Button
          color="primary"
          onClick={onConfirm}
          style={{
            width: '4rem'
          }}
          // disabled={disable}
        >
          确认
        </Button>
      </div>
    </div>
  )
}

export default PwtForm
