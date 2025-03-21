import { Toast, Dialog } from 'antd-mobile'

import { BASE_PATH, API_DOMAIN } from '@/config/app'

const BASE_URL = API_DOMAIN

let isLogoutShow = false

const jsonToUrlEncoded = (json) => {
  const formData = new URLSearchParams()
  for (let key in json) {
    formData.append(key, json[key])
  }
  return formData.toString()
}

const request = async (
  url,
  method = 'GET',
  data = null,
  headers = null,
  formData,
  isJSON = true
) => {
  const config = {
    method,
    credentials: 'include',
    // credentials: true,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Credentials': 'true'
    }
  }

  if (headers) {
    config.headers = {
      ...config.headers,
      ...headers
    }
  }

  if (data) {
    if (method.toUpperCase() === 'GET') {
      const queryString = Object.keys(data)
        .map(
          (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join('&')
      url = url + '?' + queryString
    } else {
      if (formData) {
        config.body = jsonToUrlEncoded(data)
      } else {
        config.body = JSON.stringify(data)
      }
    }
  }

  try {
    const response = await fetch(`${BASE_URL}${url}`, config)
    const textData = await response.text()
    if (!textData) {
      Toast.show({
        content: '请求失败'
      })
      return false
    }
    if (isJSON && textData) {
      const result = JSON.parse(textData)
      if (!response.ok) {
        if (
          (result.code === '020003' ||
            result.mesg === '身份认证信息过期, 请重新登录') &&
          !isLogoutShow
        ) {
          isLogoutShow = true
          Dialog.show({
            content: result.mesg,
            closeOnMaskClick: false,
            actions: [
              {
                key: 'close',
                text: '确定',
                onClick: () => {
                  console.log(123)
                  window.location.href = BASE_PATH + '/login'
                  isLogoutShow = false
                }
              }
            ]
          })
        } else if (
          result.code !== '020003' &&
          result.code !== '040082' &&
          result.mesg !== '身份认证信息过期, 请重新登录'
        ) {
          Toast.show({
            content: result.mesg || response.statusText
          })
        }
        return result
      }
      if (!result.success && !result.access_token) {
        Toast.show({
          content: result.mesg || '请求失败'
        })
        return result
      }
      return result
    } else {
      return textData
    }
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}

export default request
