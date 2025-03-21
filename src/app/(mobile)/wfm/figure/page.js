'use client'

import { useState, useEffect } from 'react'

import BpmnViewerComponent from './BpmnViewer'

import Title from '@/components/Title'

const WfmFigurePage = () => {
  return (
    <main className="">
      <div className="flex items-center">
        <div className="h-40px fixed left-0 top-0 z-[99] w-full overflow-hidden bg-white">
          <Title title="流程图" />
        </div>
        <div className="mt-64px w-full">
          <BpmnViewerComponent />
        </div>
      </div>
    </main>
  )
}

export default WfmFigurePage
