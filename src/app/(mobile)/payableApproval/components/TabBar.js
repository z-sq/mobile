'use client'

import PopoverWfm from '@/components/PopoverWfm'
import Tabs from '@/components/Tabs'

const defaultTabList = [
  { title: '基本信息', key: '1' },
  { title: '付款信息', key: '2' },
  { title: '审核意见', key: '3' }
]

export default function TabBar({ tabList = defaultTabList, handleTabChange }) {
  return (
    <>
      <div className="border-bottom-gray top-40px absolute left-0 z-[10] flex w-[100%] max-w-[100vm] items-center bg-white">
        <Tabs data={tabList} onChange={(key) => handleTabChange(key)} />
      </div>
    </>
  )
}
