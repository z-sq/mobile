'use client'

import { Tabs } from 'antd-mobile'
import './index.css'

export default function TabsComp({
  data = [],
  onChange,
  className = '',
  ...props
}) {
  return (
    <Tabs
      className={`h-40px border-box flex-1 overflow-hidden ${className}`}
      style={{
        '--title-font-size': '0.75rem',
        '--active-title-color': '#005BAC',
        '--active-line-color': '#005BAC',
        '--active-line-height': '3px',
        fontWeight: '600',
        border: 'none'
      }}
      onChange={(key) => {
        onChange(key)
      }}
      {...props}
    >
      {data.map((item) => (
        <Tabs.Tab title={item.title} key={item.key} />
      ))}
    </Tabs>
  )
}
