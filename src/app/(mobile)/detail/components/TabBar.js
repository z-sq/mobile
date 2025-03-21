'use client'

import PopoverWfm from '@/components/PopoverWfm'
import Tabs from '@/components/Tabs'

const defaultTabList = [
  { key: '1', title: '基本信息' },
  { key: '2', title: '物料信息' },
  { key: '3', title: '供应商信息' },
  { key: '4', title: '审核意见' }
]

export default function TabBar({ tabList = defaultTabList, setActiveKey }) {
  return (
    <>
      <div className="border-bottom-gray top-40px absolute left-0 z-[10] flex w-[100%] max-w-[100vm] items-center bg-white">
        <Tabs data={tabList} onChange={(key) => setActiveKey(key)} />
        {/* <PopoverWfm /> */}
      </div>
    </>
  )
}
