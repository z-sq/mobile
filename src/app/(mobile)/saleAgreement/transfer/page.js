'use client'

import { useState, useEffect } from 'react'

import Transfer from '../components/Transfer'

import Title from '@/components/Title'

const WfmTransferPage = () => {
  return (
    <main className="flex items-center">
      <div className="h-40px fixed left-0 top-0 z-[99] w-full overflow-hidden bg-white">
        <Title title="请选择转办接收人" />
      </div>
      <Transfer type="transfer" />
    </main>
  )
}

export default WfmTransferPage
