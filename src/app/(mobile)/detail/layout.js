'use client'

import { observer } from 'mobx-react'
import { useRouter } from 'next/navigation'

import Title from '@/components/Title'


const ApprovalPage = observer(({ children }) => {

  const router = useRouter()

  return (
    <div
      className="relative h-[100%] w-[100%] bg-white"
      style={{ height: 'calc(var(--vh, 1vh) * 100)' }}
    >
      {children}
    </div>
  )
})

export default ApprovalPage
