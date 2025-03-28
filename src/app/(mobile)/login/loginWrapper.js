'use client'

import { Form, Toast } from 'antd-mobile'
import CryptoJS from 'crypto-js'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

import LoginForm from './LoginForm'
import SetPwtForm from './SetPwdForm'

import { loginApi } from '@/request/apis/login'
import request from '@/utils/request'

const LoginWrapper = () => {
  const router = useRouter()
  const [form] = Form.useForm()
  const [setPwdForm] = Form.useForm()

  const [setPwd, setSetPwd] = useState(false)
  const [loginFormValue, setLoginFormValue] = useState({})
  const [rememberPwd, setRememberPwd] = useState(false)
  const [loginKey, setLoginKey] = useState([])
  const [companyInfo, setCompanyInfo] = useState(null)
  const [validaRule, setValidaRule] = useState({})

  //   const getCompany = async () => {
  //     const result = await request(
  //       '/gateway/business/sys/sys0000/company/all',
  //       'GET'
  //     )
  //     if (result && result.success) {
  //       const res = result.data || []
  //       setCompanyList(res)
  //     }
  //   }

  const changeStatus = () => {}

  const onSetPwdClick = (values) => {
    setSetPwd(true)
    setLoginFormValue({
      ...companyInfo,
      ...values
    })
  }

  const getKey = async (userInfo, companyCode, bid) => {
    if (!userInfo) userInfo = {}
    const acctCode = userInfo.username
    const url =
      loginApi.getKey +
      '?bid=' +
      bid +
      '&companyCode=' +
      companyCode +
      '&acctCode=' +
      acctCode
    const result = await request(url, 'POST')
    if (result && result.success) {
      const res = result.data || []
      if (res && res.length) {
        setLoginKey(res)
        const bid = res[2] || ''
        window.localStorage.setItem('bid', bid)
      }
    }
  }

  const getValidaRule = async () => {
    if (!companyInfo || !companyInfo.companyCode) return
    const result = await request(loginApi.getvalidarule, 'GET', {
      companyCode: companyInfo.companyCode
    })
    if (result && result.success) {
      const res = result.data || {}
      setValidaRule(res)
    }
  }

  const onComCodeChange = (values = {}) => {
    const preComCode = companyInfo ? companyInfo.companyCode : ''
    if (values.companyCode !== preComCode) {
      setCompanyInfo({
        companyName: values.companyName,
        companyCode: values.companyCode
      })
    }
  }

  const crypto = (value, key, iv) => {
    var key = CryptoJS.enc.Utf8.parse(key)
    var iv = CryptoJS.enc.Utf8.parse(iv)
    var encrypted = CryptoJS.AES.encrypt(value, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      keySize: 256
    })
    var ciphertext = encrypted.toString()
    return ciphertext
  }

  const decrypted = (value, key, iv) => {
    var key = CryptoJS.enc.Utf8.parse(key)
    var iv = CryptoJS.enc.Utf8.parse(iv)
    var decrypted = CryptoJS.AES.decrypt(value, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      keySize: 256
    })
    var plaintext = decrypted.toString(CryptoJS.enc.Utf8)
    return plaintext
  }

  const login = async (params) => {
    const response = await request(
      loginApi.login,
      'POST',
      params,
      {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic dGVzdF9jbGllbnQ6dGVzdF9zZWNyZXQ='
      },
      true
    )
    let message = response.mesg
    if (response && response !== 'Unauthorized' && response.access_token) {
      let errCount = 0
      window.localStorage.setItem('errCount', errCount)
      return response
    }
    if (response.code === '040082' && validaRule.maxErrorFlag === 'Y') {
      const maxError = validaRule.maxError || 0
      if (maxError > 0) {
        let errCount = window.localStorage.getItem('errCount') || 0
        const num = maxError - errCount
        if (num <= 0) {
          const result = await request(loginApi.changeAccountStatus, 'GET', {
            companyCode: companyInfo.companyCode,
            acctCode: params.acctCode
          })
          if (result && result.success) {
            errCount = 0
            window.localStorage.setItem('errCount', errCount)
          }
          message = message + '! 用户已被锁定!'
          Toast.show({
            content: message
          })
          return false
        } else {
          message = message + '! 再输错' + num + '次用户将被锁定!'
        }
        errCount++
        window.localStorage.setItem('errCount', errCount)
      }
    }
    Toast.show({
      content: message
    })
    return false
  }

  const changePwd = async (params, access_token) => {
    const response = await request(
      loginApi.setpwd,
      'PUT',
      params,
      {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: access_token
      },
      false
    )
    if (response && response.success) {
      Toast.show({
        content: response.mesg || '修改成功'
      })
      return true
    }
    return false
  }

  const handleLogin = async (values, isChangePwd = false) => {
    let key = ''
    let iv = ''
    let bid = ''
    if (loginKey && loginKey.length) {
      key = loginKey[0]
      iv = loginKey[1]
      bid = loginKey[2]
    }
    let userInfo = {}
    const user = window.localStorage.getItem('userInfo')
    if (user && user !== 'null') {
      userInfo = JSON.parse(user)
    }
    if (
      key &&
      key.length &&
      iv &&
      iv.length &&
      userInfo &&
      userInfo.password &&
      userInfo.password === values.password
    ) {
      values.password = decrypted(userInfo.password, key, iv)
    }

    const result = await request(
      loginApi.genKey,
      'POST',
      {
        // companyCode: companyInfo.companyCode, test
        companyCode:'01',
        acctCode: values.acctCode,
        bid: bid
      },
      {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      true
    )
    if (result && result.success) {
      const data = result.data || []
      if (data && data.length) {
        const params = {
          //   ...values,
          grant_type: 'user_code',
          // companyCode: companyInfo.companyCode, test
          companyCode:'01',
          acctCode: values.acctCode,
          password: values.password,
          bid: bid
        }
        let key = data[0]
        let iv = data[1] ? data[1] : ''
        let res_bid = data[2] ? data[2] : ''
        if (bid !== res_bid) {
          window.localStorage.setItem('bid', res_bid)
        }
        params.password = crypto(params.password, key, iv)
        params.bid = res_bid
        const response = await login(params)
        if (response) {
          if (isChangePwd) {
            values.newPass = crypto(values.newPass, key, iv)
            values.confirmPass = crypto(values.confirmPass, key, iv)
            const res = await changePwd(
              { ...values, ...params },
              response.access_token
            )
            if (!res) return
          }
          window.localStorage.setItem('token', response.access_token)
          document.cookie = `token=${response.access_token}; path=/;`
          document.cookie = `sysCode=om; path=/;`
          document.cookie = `menuCode=bzs_om2120; path=/;`
          document.cookie=`refresh_token=${response.access_token}; path=/;`
          if (rememberPwd) {
            window.localStorage.setItem(
              'userInfo',
              JSON.stringify({
                username: params.acctCode,
                password: isChangePwd ? values.newPass : params.password
              })
            )
          } else {
            window.localStorage.setItem('userInfo', null)
          }
          window.localStorage.setItem('companyName', values.companyName)
          window.localStorage.setItem('companyCode', params.companyCode)
          window.localStorage.setItem('acctCode', params.acctCode)
          window.localStorage.setItem('depCode', response.dep_code)
          router.push('/list')
        }
      }
    }
  }

  const handleChangePwd = (params) => {
    handleLogin(params, true)
  }

  useEffect(() => {
    const userInfo = window.localStorage.getItem('userInfo')
    let user = {}
    const bid = window.localStorage.getItem('bid') || ''
    const companyCode = window.localStorage.getItem('companyCode') || ''
    const companyName = window.localStorage.getItem('companyName') || ''
    setCompanyInfo({ companyCode, companyName })
    form.setFieldsValue({
      companyName: companyName
    })
    if (userInfo && userInfo !== 'null') {
      setRememberPwd(true)
      user = JSON.parse(userInfo)
      form.setFieldsValue({
        companyName: companyName,
        acctCode: user.username,
        password: user.password
      })
    }
    getKey(user, companyCode, bid)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    getValidaRule()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyInfo])

  return (
    <>
      {!setPwd ? (
        <LoginForm
          onSetPwdClick={onSetPwdClick}
          form={form}
          onComCodeChange={onComCodeChange}
          handleLogin={handleLogin}
          rememberPwd={rememberPwd}
          setRememberPwd={setRememberPwd}
          getValidaRule={getValidaRule}
        />
      ) : (
        <SetPwtForm
          form={setPwdForm}
          validaRule={validaRule}
          handleLogin={handleChangePwd}
          setSetPwd={setSetPwd}
          loginFormValue={loginFormValue}
        />
      )}
    </>
  )
}

export default LoginWrapper
