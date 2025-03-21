'use client'

import { Popup } from 'antd-mobile'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { BASE_PATH } from '@/config/app'
import request from '@/utils/request'

export default function Logout({}) {
  const router = useRouter()
  const [visible, setVisible] = useState(false)

  const logout = async () => {
    const token = window.localStorage.getItem('token')
    const acctCode = window.localStorage.getItem('acctCode')
    await request(
      '/base/logout/exit',
      'GET',
      { acctCode },
      {
        Authorization: token
      }
    )
    window.localStorage.removeItem('acctCode')
    window.localStorage.removeItem('token')
    document.cookie = 'path=/;'
    document.cookie = `token=; refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
    setVisible(false)
    router.push('/login')
  }

  return (
    <div className="px-1.5 py-0">
      <div
        className="h-16px w-16px bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${BASE_PATH}/images/menu.png')`,
          width: '24px',
          height: '22px'
        }}
        onClick={() => {
          setVisible(true)
        }}
      ></div>
      <Popup
        visible={visible}
        onMaskClick={() => {
          setVisible(false)
        }}
      >
        <div className="text-14px px-12px pb-24px">
          <div
            className="border-bottom-gray flex h-[100%] h-[48px] w-[100%] items-center justify-center text-[#D9001B]"
            onClick={logout}
          >
            退出登录
          </div>
          <div
            className="flex h-[100%] h-[48px] w-[100%] items-center justify-center"
            onClick={() => {
              setVisible(false)
            }}
          >
            取消
          </div>
        </div>
      </Popup>
    </div>
  )
}
