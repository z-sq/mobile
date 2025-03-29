'use client'

import { Popup, TextArea, Modal, Toast } from 'antd-mobile'
import { observer } from 'mobx-react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
// border-b-[#e5e7eb]
const SectionTitle = ({ title, className }) => {
  return (
    <div className="section-title w-full">
      <div className="section-title-text flex items-center">
        <div className="w-1 h-4 bg-blue mr-2"></div>
        <span className={`'text-base font-medium text-gray' ${className}`}>{title}</span>
      </div>
    </div>
  )
}

export default SectionTitle
