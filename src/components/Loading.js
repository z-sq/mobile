import { SpinLoading } from 'antd-mobile'
import React from 'react'

const Loading = ({ style = {} }) => {
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center"
      style={{ fontSize: 16, ...style }}
    >
      <SpinLoading />
      <span className="text-14px mt-16px">加载中</span>
    </div>
  )
}

export default Loading
