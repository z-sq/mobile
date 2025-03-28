'use client'

import PopoverWfm from '@/components/PopoverWfm'
import Tabs from '@/components/Tabs'

const defaultTabList = [
  { title: '基本信息', key: '1' },
  { title: '产品信息', key: '2' },
  { title: '自查表', key: '3' },
  { title: '合同预算', key: '4' },
  { title: '项目采购付款计划', key: '5' },
  { title: '回款计划', key: '6' },
  { title: '审计意见', key: '7' },
  {title:'辅助信息',key:'8'}
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
