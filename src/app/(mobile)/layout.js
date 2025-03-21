'use client'

import 'antd-mobile/es/global'
import { ConfigProvider } from 'antd-mobile'
import { Suspense, useEffect } from 'react'

export default function RootLayout({ children }) {
  const initAppVh = () => {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
    window.addEventListener('resize', () => {
      let vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    })
  }

  useEffect(() => {
    initAppVh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Suspense fallback={<>Loading...</>}>
        <ConfigProvider>
          <div style={{ height: 'calc(var(--vh, 1vh) * 100)', width: '100vm' }}>
            {children}
          </div>
        </ConfigProvider>
      </Suspense>
    </>
  )
}
