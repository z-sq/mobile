'use client'

import { Picker } from 'antd-mobile'
import { DownFill } from 'antd-mobile-icons'
import { useState, useEffect } from 'react'

import RecentComp from './RecentComp'

import { workflowApi } from '@/request/apis/workflow'
import request from '@/utils/request'

const CompanyComp = ({
  data = [],
  selected = [],
  selectChange,
  selectAllChange,
  hasSelectAll,
  selectedCom,
  setSelectedCom,
  type,
  singleSelectChange,
  companyList
}) => {
  const [visible, setVisible] = useState(false)

  const onSelectComChange = (value) => {
    const data = companyList.find((item) => item.value === value[0])
    setSelectedCom({
      ...selectedCom,
      comCode: data.value,
      comName: data.label
    })
  }

  return (
    <>
      <div className="h-40px px-16px border-bottom-gray">
        <div
          className="flex h-full w-fit items-center"
          onClick={() => setVisible(true)}
        >
          <div>{selectedCom.comName ? selectedCom.comName : '选择'}</div>
          <div className="h-12px w-12px ml-4px mt-n4px">
            <DownFill />
          </div>
        </div>
      </div>
      <RecentComp
        data={data}
        selected={selected}
        selectChange={selectChange}
        selectAllChange={selectAllChange}
        hasSelectAll={hasSelectAll}
        hasSelectBar={true}
        type={type}
        singleSelectChange={singleSelectChange}
      />
      <Picker
        columns={[companyList]}
        visible={visible}
        onClose={() => {
          setVisible(false)
        }}
        onCancel={() => {
          // 清空已选项的值
          setSelectedCom({
            ...selectedCom,
            comCode: '',
            comName: ''
          })
          setVisible(false)
        }}
        value={[selectedCom.comCode]}
        onConfirm={(value) => onSelectComChange(value)}
      />
    </>
  )
}

export default CompanyComp
