'use client'

import { Picker } from 'antd-mobile'
import { DownFill } from 'antd-mobile-icons'
import { useState, useEffect } from 'react'

import RecentComp from './RecentComp'

import { workflowApi } from '@/request/apis/workflow'
import request from '@/utils/request'

const DepartMentComp = ({
  data = [],
  selected = [],
  selectChange,
  selectAllChange,
  hasSelectAll,
  selectedOrg,
  setSelectedOrg,
  type,
  singleSelectChange,
  style = {}
}) => {
  const [orgList, setOrgList] = useState([])
  const [comColumn, setComColumn] = useState([])
  const [orgColumn, setOrgColumn] = useState([])
  const [curComCode, setCurComCode] = useState('')
  const [curOrgName, setCurOrgName] = useState('')
  const [visible, setVisible] = useState(false)

  const onSelectComChange = (value) => {
    setSelectedOrg(value)
    const data = orgColumn.find((item) => item.value === value[1])
    if (data) {
      setCurOrgName(data.label)
    }
  }

  const onSelect = (value) => {
    value[0] !== curComCode && setCurComCode(value[0])
  }

  const updateOrg = (comCode) => {
    const orgData = orgList[comCode]
    let orgColumn = []
    if (orgData && orgData.length) {
      orgColumn = orgData.map((item) => {
        return {
          label: item.ORGNAME,
          value: item.ORGCODE
        }
      })
    }
    setOrgColumn(orgColumn)
  }

  const getOrgList = async () => {
    try {
      const result = await request(workflowApi.getOrg, 'GET')
      if (result && result.success) {
        const data = result.data ? result.data : {}
        setOrgList(data)
        const keys = Object.keys(data)
        const comColumn = []
        let orgColumn = []
        if (keys.length > 0) {
          keys.forEach((item) => {
            if (data[item] && data[item].length) {
              const orgData = data[item]
              comColumn.push({
                label: orgData[0].COMNAME,
                value: orgData[0].COMCODE
              })
            }
          })
        }
        if (comColumn.length) {
          orgColumn = data[comColumn[0].value].map((item) => {
            return {
              label: item.ORGNAME,
              value: item.ORGCODE
            }
          })
        }
        setComColumn(comColumn)
        setOrgColumn(orgColumn)
      }
    } catch (err) { }
  }

  useEffect(() => {
    getOrgList()
  }, [])

  useEffect(() => {
    updateOrg(curComCode)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curComCode])

  return (
    <div style={style}>
      <div className="h-40px px-16px border-bottom-gray">
        <div
          className="flex h-full w-fit items-center"
          onClick={() => setVisible(true)}
        >
          <div>{curOrgName ? curOrgName : '选择'}</div>
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
        columns={[comColumn, orgColumn]}
        visible={visible}
        onClose={() => {
          setVisible(false)
        }}
        onCancel={() => {
          // 清空已选项的值
          setCurComCode('')
          setCurOrgName('')
          setSelectedOrg('')
          setVisible(false)
        }}
        value={selectedOrg}
        onConfirm={(value) => onSelectComChange(value)}
        onSelect={(value) => onSelect(value)}
      />
    </div>
  )
}

export default DepartMentComp
