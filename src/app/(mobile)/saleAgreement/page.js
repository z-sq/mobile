'use client'

import {
  PullToRefresh,
  Input,
  Toast,
  Ellipsis,
  Button
} from 'antd-mobile'
import { DownOutline } from 'antd-mobile-icons'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'

import BaseInfo from './BaseInfo'
import ProductInfo from './ProductInfo'
import SelfCheck from './SelfCheck'
import ContractBudget from './ContractBudget'
import PaymentPlan from './PaymentPlan'
import ReturnPlan from './ReturnPlan'
import ApproveOpinion from './ApproveOpinion'

import Loading from '@/components/Loading'
import Tabs from '@/components/Tabs'
import Title from '@/components/Title'
import { typeMap, busTypeMap } from '@/config/configData'
import request from '@/utils/request'
import { useStores } from '@/utils/useStores'

const defaultTabsMap = [
  { title: '基本信息', key: '1' },
  { title: '产品信息', key: '2' },
  { title: '自查表', key: '3' },
  { title: '合同预算', key: '4' },
  { title: '项目采购付款计划', key: '5' },
  { title: '回款计划', key: '6' },
  { title: '审核意见', key: '7' }
]

const AgreementPage = () => {
  const router = useRouter()
  const ref = useRef(null)
  const wrapper = useRef(null)

  const {
    approveStore: { resetCurInfo }
  } = useStores()
  const [activeKey, setActiveKey] = useState('1')
  const [visible, setVisible] = useState(false)
  const [curProc, setCurProc] = useState({})
  const [tabsMap, setTabsMap] = useState(defaultTabsMap)
  const token = window.localStorage.getItem('token')
  const usercode = window.localStorage.getItem('acctCode')

  const onExpand = () => {
    setVisible(!visible)
  }

  const onSelect = (procCode, procName) => {
    if (procCode === curProc.procCode || procCode === '00000') {
      setCurProc({
        ...curProc,
        procCode: '',
        procName: ''
      })
      getListData('')
      console.log('00000')
    } else {
      setCurProc({
        ...curProc,
        procCode: procCode,
        procName: procName
      })
      getListData(procCode)
      console.log(procCode,'procCode')
    }
    setVisible(false)
  }


  const getListData = async (procCode) => {
    let states = ''
    if (activeKey === '1') {
      states = '2'
    } else if (activeKey === '2') {
      states = '4,5'
    } else {
      states = '2,4,5'
    }
    try {
      setLoading(true)

      const result = await request(
        '/home/page/getWorkItem',
        'GET',
        {
          states,
          procCodes:
            procCode !== undefined
              ? procCode
              : curProc.procCode || '',
          limit: 20,
          page: 1,
          comCode: '01',
          usercode
        },
        {
          Authorization: token
        }
      )
      setLoading(false)
      if (result && result.success) {
        const data = result.data ? result.data : []
        const total = result.total !== null ? result.total : data.length
        if (activeKey === '1') {
          setUnread(total)
        }
        //先按照insStaDate降序排序，如果insStaDate相同，则按照insStatime降序排序
        data.sort(function (a, b) {
          return (
            new Date(`${b.insStaDate.replaceAll('/', '-')}T${b.insStaTime}`) -
            new Date(`${a.insStaDate.replaceAll('/', '-')}T${a.insStaTime}`)
          )
        })
        setData(data)
      } else {
        setData([])
      }
    } catch (err) {}
  }
// 和tab页签保持一致，根据不同的tab页签，切换不同的组件，基本信息用BaseInfo，根据名字一一对应
  const renderContent = (key) => {
    switch (key) {
      case '1':
        return <BaseInfo />
      case '2':
        return <ProductInfo />
      case '3':
        return <SelfCheck />
      case '4':
        return <ContractBudget />
      case '5':
        return <PaymentPlan />
      case '6':
        return <ReturnPlan />
      case '7':
        return <ApproveOpinion />
      default:
        return <BaseInfo />
    }
  }
  // 根据不同的tab页签，请求不同的数据，这里是根据activeKey来请求数据
  const handleChangeTabs = (key) => {
      setActiveKey(key)
      
  }



  useEffect(() => {
    getListData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeKey])


  return (
    <div className="relative  w-[100%] overflow-hidden bg-white flex flex-col h-screen">
      <div className="h-40px fixed left-0 top-0 z-[99] w-[100%] overflow-hidden bg-white pt-[1px]">
        <Title isShowBack={false} title={'销售合同申请单审批'} rightIcon="1" />
      </div>
      <div className="border-bottom-gray top-40px border-box fixed left-0 z-[10] flex w-[100%] bg-white">
        <Tabs
          data={tabsMap}
          activeKey={activeKey}
          onChange={(key) =>handleChangeTabs(key)}
        ></Tabs>
      </div>
        <div 
        className="flex-1 overflow-y-auto top-80px border-box pt-12px fixed left-0 z-[10] flex w-[100%] bg-white px-[12px]"
        style={{ height: 'calc(var(--vh, 1vh) * 100 - 7.5rem )' }}>
          {renderContent(activeKey)}
        </div>
        {/* 底部有两个按钮，一个是审批，一个是更多 */}
        <div className="bottom-0 fixed left-0 z-[10] w-[100%] flex items-center justify-between bg-white">
          <Button
            color='primary' fill='solid'
            className="flex-1"
            onClick={() => {
              // router.push('/approve')
            }}
          >
            审批
          </Button>
          <div className='w-4'></div>
          <Button
            color='primary' fill='outline'
            className="flex-1"
            onClick={() => {
              onExpand()
            }}
          >
            更多
          </Button>
        </div>
     
    </div>
  )
}

export default AgreementPage
