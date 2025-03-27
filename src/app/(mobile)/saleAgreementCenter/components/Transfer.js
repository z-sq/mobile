'use client'

import { Popup, TextArea, Modal, Toast } from 'antd-mobile'
import { observer } from 'mobx-react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

import CompanyComp from './CompanyComp'
import DepartMentComp from './DepartMentComp'
import RecentComp from './RecentComp'

import Button from '@/components/Button'
import SearchInput from '@/components/SearchBar'
import Tabs from '@/components/Tabs'
import { workflowApi } from '@/request/apis/workflow'
import request from '@/utils/request'
import { useStores } from '@/utils/useStores'
// import ProPartComp from './ProPartComp'

const tabsMap = {
  forward: [
    { title: '流程参与人', key: '1' },
    { title: '最近', key: '2' },
    { title: '单位', key: '3' },
    { title: '部门', key: '4' }
  ],
  transfer: [
    { title: '流程参与人', key: '1' },
    { title: '最近', key: '2' },
    { title: '全部', key: '5' }
  ]
}

// const partTypeMap = [
//   { title: '全部', key: 'A', param: 'A' },
//   { title: '未提交', key: 'N', param: 'N' },
//   { title: '已提交', key: 'Y', param: 'Y' }
// ]

const busTypeMap = {
  forward: '转发',
  transfer: '转办'
}

const Transfer = observer(({ type }) => {
  const [keyWord, setKeyWord] = useState('')
  const [activeKey, setActiveKey] = useState('1')
  const [selected, setSelected] = useState([])

  const [participantsData, setParticipantsData] = useState([])
  const [recentData, setRecentData] = useState([])
  const [companyData, setCompanyData] = useState([])
  const [departmentData, setDepartmentData] = useState([])
  const [allData, setAllData] = useState([])

  const [companyList, setCompanyList] = useState([])

  // const [selectedParType, setSelectedParType] = useState('A')
  const [selectedCom, setSelectedCom] = useState({})
  const [selectedOrg, setSelectedOrg] = useState([])
  const [visible, setVisible] = useState(false)
  const [opinion, setOpinion] = useState('')
  const [modalVisible, setModalVisible] = useState(false)

  const [searchData, setSearchData] = useState([])

  const searchUrl =
    type === 'forward'
      ? workflowApi.getFowardParticipant
      : workflowApi.getTraParticipant
  const submitUrl =
    type === 'forward'
      ? workflowApi.workitemForward
      : workflowApi.workitemTransfer

  const {
    approveStore: { currentInfo }
  } = useStores()

  const router = useRouter()

  // 单选选中或取消
  const singleSelectChange = (data) => {
    if (
      selected.find(
        (item) => item.actCode === data.actCode && item.comCode === data.comCode
      )
    ) {
      setSelected([])
    } else {
      setSelected([data])
    }
  }

  // 多选选中或取消
  const selectChange = (data) => {
    const element = selected.find(
      (item) => item.actCode === data.actCode && item.comCode === data.comCode
    )
    if (element) {
      const list = selected.filter(
        (item) => item.actCode !== data.actCode || item.comCode !== data.comCode
      )
      setSelected([...list])
    } else {
      setSelected([...selected, data])
    }
  }

  // 全选：selectedData[acctCode]：选项列表；flag: true 全选，false 全不选
  const selectAllChange = (selectedData, flag) => {
    if (!flag) {
      const data = selected.filter(
        (item) =>
          !selectedData.find(
            (i) => i.actCode === item.actCode && i.comCode === item.comCode
          )
      )
      setSelected([...data])
    } else {
      const data = []
      selectedData.forEach((item) => {
        if (
          !selected.find(
            (i) => i.actCode === item.actCode && i.comCode === item.comCode
          )
        ) {
          data.push(item)
        }
      })
      setSelected([...selected, ...data])
    }
  }

  // 判断某组数据是否全部选中
  const hasSelectAll = (selected, list) => {
    let data = []
    data = list.filter(
      (item) =>
        !selected.find(
          (i) => i.actCode === item.actCode && i.comCode === item.comCode
        )
    )
    return !data.length && list.length ? true : false
  }

  const getData = async (recent, searchValues = {}) => {
    const actCode = window.localStorage.getItem('acctCode')
    const comCode = window.localStorage.getItem('companyCode')
    const orgCode = window.localStorage.getItem('depCode')
    const params = {
      actCode,
      comCode,
      orgCode,
      proCode: currentInfo.procCode,
      proVersion: currentInfo.procVersion,
      proInsCode: currentInfo.procInstCode,
      likeParams: keyWord,
      recent
    }
    const searchParams = {}
    if (searchValues.COM_CODE) {
      searchParams.COM_CODE = searchValues.COM_CODE
    }
    if (searchValues.DEP_CODE) {
      searchParams.DEP_CODE = searchValues.DEP_CODE
    }
    params.params = JSON.stringify(searchParams)
    const result = await request(searchUrl, 'GET', params)
    if (result && result.success) {
      const res = result.data ? result.data : []
      const data = res.map((item) => {
        return {
          actCode: item.ACTCODE,
          actName: item.ACTNAME,
          comCode: item.COMCODE,
          comName: item.COMNAME,
          orgCode: item.ORGCODE,
          orgName: item.ORGNAME,
          posCode: item.POSCODE
        }
      })
      return data
    } else {
      return []
    }
  }

  const getProPartData = async () => {
    const result = await getData('1')
    setParticipantsData(result)
  }

  const getRecentData = async () => {
    const result = await getData('2')
    setRecentData(result)
  }

  const getAllData = async () => {
    const result = await getData('', {})
    setAllData(result)
  }

  const getCompanyData = async () => {
    let params = {}
    if (selectedCom.comCode) {
      params = {
        COM_CODE: selectedCom.comCode
      }
    }
    const result = await getData('', params)
    setCompanyData(result)
  }

  const getDepartmentData = async () => {
    let params = {}
    if (selectedOrg && selectedOrg.length) {
      params = {
        COM_CODE: selectedOrg[0],
        DEP_CODE: selectedOrg[1]
      }
    }
    const result = await getData('', params)
    setDepartmentData(result)
  }

  const onSearch = async () => {
    const result = await getData('')
    setSearchData(result)
    setActiveKey('0')
  }

  const onTabChange = (key) => {
    setActiveKey(key)
    setKeyWord('')
  }

  const onClear = () => {
    setSelected([])
  }

  const onClick = () => {
    if (!selected.length) {
      setModalVisible(true)
      return
    }
    setVisible(true)
  }

  const onSubmit = async () => {
    let params = {
      proInsCode: currentInfo.procInstCode,
      nodInsCode: currentInfo.nodeInstCode,
      worCode: currentInfo.workItemCode,
      procCode: currentInfo.procCode,
      procVersion: currentInfo.procVersion,
      opinion
    }
    let result = {}
    if (type === 'forward') {
      params.actList = selected
    } else if (type === 'transfer') {
      const selectedData = selected[0]
      params = {
        ...params,
        ...selectedData
      }
    }
    result = await request(submitUrl, 'POST', params)
    if (result && result.success) {
      Toast.show({
        content: result.mesg
      })
      router.push('/list')
    }
  }

  const getCompanyList = async () => {
    try {
      const result = await request(workflowApi.getCompany, 'GET')
      if (result && result.success) {
        const data = result.data ? result.data : []
        const companyList = data.map((item) => {
          return {
            label: item.COMNAME,
            value: item.COMCODE
          }
        })
        setCompanyList(companyList)
      }
    } catch (err) { }
  }

  useEffect(() => {
    getProPartData()
    getRecentData()
    getCompanyList()
    getAllData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentInfo])

  useEffect(() => {
    getCompanyData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCom])

  useEffect(() => {
    getDepartmentData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOrg])

  return (
    <>
      <div
        className="top-40px relative box-border w-full"
        style={{ height: 'calc(var(--vh, 1vh) * 100 - 7.5rem)' }}
      >
        <div className="px-8px h-40px border-bottom-gray flex items-center">
          <SearchInput
            placeholder={
              type === 'forward' ? '请输入单位/部门/人员' : '请输入人员'
            }
            setKeyWord={setKeyWord}
            onSearch={onSearch}
            className="h-28px"
            value={keyWord}
          />
        </div>
        <div>
          <div className="border-bottom-gray">
            <Tabs
              data={tabsMap[type]}
              setActiveKey={setActiveKey}
              wrapperClassName="h-40px"
              className="h-24px"
              activeKey={activeKey}
              onChange={(key) => onTabChange(key)}
            ></Tabs>
          </div>
          <div className="relative box-border w-[100%]">
            {activeKey === '1' && (
              // <ProPartComp
              //   data={participantsData}
              //   selected={selected}
              //   selectChange={selectChange}
              //   selectAllChange={selectAllChange}
              //   hasSelectAll={hasSelectAll}
              //   selectedParType={selectedParType}
              //   setSelectedParType={setSelectedParType}
              //   partTypeMap={partTypeMap}
              //   type={type}
              //   singleSelectChange={singleSelectChange}
              // />
              <RecentComp
                data={participantsData}
                selected={selected}
                selectChange={selectChange}
                selectAllChange={selectAllChange}
                hasSelectAll={hasSelectAll}
                type={type}
                singleSelectChange={singleSelectChange}
              />
            )}
            {activeKey === '2' && (
              <RecentComp
                data={recentData}
                selected={selected}
                selectChange={selectChange}
                selectAllChange={selectAllChange}
                hasSelectAll={hasSelectAll}
                type={type}
                singleSelectChange={singleSelectChange}
              />
            )}
            {activeKey === '3' && (
              <CompanyComp
                data={companyData}
                selected={selected}
                selectChange={selectChange}
                selectAllChange={selectAllChange}
                hasSelectAll={hasSelectAll}
                selectedCom={selectedCom}
                setSelectedCom={setSelectedCom}
                type={type}
                singleSelectChange={singleSelectChange}
                companyList={companyList}
              />
            )}
            <DepartMentComp
              data={departmentData}
              selected={selected}
              selectChange={selectChange}
              selectAllChange={selectAllChange}
              hasSelectAll={hasSelectAll}
              selectedOrg={selectedOrg}
              setSelectedOrg={setSelectedOrg}
              type={type}
              singleSelectChange={singleSelectChange}
              style={{
                visibility: activeKey === '4' ? 'visible' : 'hidden',
                height: activeKey === '4' ? 'auto' : '0',
                overflow: 'hidden'
              }}
            />
            {activeKey === '5' && (
              <RecentComp
                data={allData}
                selected={selected}
                selectChange={selectChange}
                selectAllChange={selectAllChange}
                hasSelectAll={hasSelectAll}
                type={type}
                singleSelectChange={singleSelectChange}
              />
            )}
            <RecentComp
              data={searchData}
              selected={selected}
              selectChange={selectChange}
              selectAllChange={selectAllChange}
              hasSelectAll={hasSelectAll}
              type={type}
              singleSelectChange={singleSelectChange}
              searchResult={true}
              style={{ display: activeKey === '0' ? 'block' : 'none' }}
            />
          </div>
        </div>
      </div>
      <div className="h-80px border-top-gray pb-24px px-16px pt-12px fixed bottom-0 flex w-[100%] place-content-between items-center bg-[#fff]">
        <div>{`已选(${selected.length})`}</div>
        <div>
          <Button color="primary" fill="outline" onClick={onClear}>
            清 除
          </Button>
          <Button
            color="primary"
            fill="solid"
            onClick={onClick}
            style={{ marginLeft: '1rem' }}
          >
            确 定
          </Button>
        </div>
      </div>
      <Popup
        visible={visible}
        onMaskClick={() => {
          setVisible(false)
        }}
        onClose={() => {
          setVisible(false)
        }}
        bodyStyle={{ height: '35vh' }}
      >
        <div className="px-32px py-16px relative box-border flex h-[100%] w-[100%] flex-col">
          <div className="h-16px">{`${busTypeMap[type]}留言：`}</div>
          <div className="border-bor-gray1 mb-16px mt-8px flex-1 border border-solid">
            <TextArea
              placeholder="请输入..."
              value={opinion}
              onChange={(val) => {
                setOpinion(val)
              }}
              autoSize={{ minRows: 3 }}
              style={{
                '--font-size': '0.75rem',
                padding: '0.25rem',
                height: '100%'
              }}
              maxLength={30}
              showCount
            />
          </div>
          <div className="h-40px flex place-content-between items-center">
            <Button
              color="primary"
              fill="outline"
              onClick={() => {
                setVisible(false)
                setOpinion('')
              }}
            >
              取 消
            </Button>
            <Button
              color="primary"
              fill="solid"
              onClick={onSubmit}
              style={{ marginLeft: '1rem' }}
            >
              {type === 'forward' ? '转 发' : '转 办'}
            </Button>
          </div>
        </div>
      </Popup>
      <Modal
        visible={modalVisible}
        content={`请选择${busTypeMap[type]}人`}
        closeOnMaskClick={true}
        onClose={() => {
          setModalVisible(false)
        }}
        header="提示"
        bodyClassName="mask-with-header"
      />
    </>
  )
})

export default Transfer
