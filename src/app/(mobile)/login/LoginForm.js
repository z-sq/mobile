'use client'

import { Checkbox, Form, Input, Dialog } from 'antd-mobile'

import Button from '@/components/Button'
import { loginApi } from '@/request/apis/login'
import request from '@/utils/request'
import './login.module.css'

export default function LoginForm({
  onSetPwdClick,
  form,
  onComCodeChange,
  handleLogin,
  rememberPwd,
  setRememberPwd,
  getValidaRule
}) {
  const queryCompany = async (acctcode) => {
    const result = await request(loginApi.queryCompany, 'GET', {
      acctcode
    })
    if (result && result.success) {
      const res = result.data || []
      if (res && res.length) {
        const data = res[0]
        form.setFieldsValue({
          companyName: data.companyName
        })
        onComCodeChange({
          companyName: data.companyName,
          companyCode: data.companyCode
        })
        getValidaRule()
      }
    }
  }

  const handleBlur = () => {
    const values = form.getFieldsValue()
    if (values.acctCode !== undefined) {
      queryCompany(values.acctCode)
    }
  }

  const onClick = () => {
    // Dialog.alert({
    //   content: '功能正在开发中',
    //   closeOnMaskClick: true
    // })
    // return
    const values = form.getFieldsValue()
    if (values && values.acctCode) {
      onSetPwdClick(values)
    } else {
      // 提示：‘请先输入账号’
      Dialog.alert({
        content: '请先输入账号',
        closeOnMaskClick: true
      })
    }
  }

  const onSubmit = () => {
    const values = form.getFieldsValue()
    form.validateFields().then((e) => {
      handleLogin(values)
    })
  }

  return (
    <div className="w-[100%]">
      <div className="w-[100%]">
        <Form
          layout="horizontal"
          mode="card"
          form={form}
          style={{
            '--prefix-width': '3.5rem'
          }}
        >
          <Form.Item label="公司" name="companyName">
            {/* <div className="flex" onClick={() => setVisible(true)}>
              <div>请选择公司</div>
              <DownOutline />
            </div> */}
            {/* <CompanyField columns={columns} /> */}
            {/* <CompanyList list={companyList} /> */}
            <Input placeholder="" readOnly />
          </Form.Item>
          <Form.Item
            label="账号"
            name="acctCode"
            validateTrigger="onBlur"
            rules={[{ required: true, message: '请输入账号！' }]}
          >
            <Input placeholder="请输入账号" clearable onBlur={handleBlur} />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            validateTrigger="onBlur"
            rules={[{ required: true, message: '请输入密码！' }]}
          >
            <Input placeholder="请输入密码" clearable type={'password'} />
          </Form.Item>
        </Form>
      </div>
      <div className="mt-20px h-40px flex w-[100%] items-center justify-between">
        <Button
          // block
          color="primary"
          // size="large"
          onClick={onSubmit}
          style={{
            width: '100%'
          }}
        >
          立即登录
        </Button>
      </div>
      <div className="mt-32px flex w-[100%] items-center justify-between">
        <div onClick={() => onClick()}>修改密码</div>
        <Checkbox
          checked={rememberPwd}
          onChange={(val) => setRememberPwd(val)}
          style={{
            '--icon-size': '0.875rem',
            '--font-size': '0.875rem'
          }}
        >
          记住密码
        </Checkbox>
      </div>
      {/* <div className="text-14px absolute z-[100] max-h-[50px] w-[100%] bg-white">
        <div className="bg-white">
          {companyList.map((item, index) => {
            return (
              <div key={index}>
                <Ellipsis
                  direction="end"
                  content={item.companyName}
                  style={{
                    fontSize: '14px'
                  }}
                />
              </div>
            )
          })}
        </div>
      </div> */}
    </div>
  )
}
