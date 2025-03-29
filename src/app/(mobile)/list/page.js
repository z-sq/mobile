'use client'

import {
  PullToRefresh,
  InfiniteScroll,
  Input,
  Toast,
  Ellipsis
} from 'antd-mobile'
import { DownOutline } from 'antd-mobile-icons'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'

import Card from './Card'

import Loading from '@/components/Loading'
import Tabs from '@/components/Tabs'
import Title from '@/components/Title'
import { typeMap, busTypeMap } from '@/config/configData'
import request from '@/utils/request'
import { useStores } from '@/utils/useStores'

const defaultTabsMap = [
  { title: '未审核', key: '1' },
  { title: '已审核', key: '2' },
  { title: '全部', key: '3' }
]

const MenuPage = () => {
  const router = useRouter()
  const ref = useRef(null)
  const wrapper = useRef(null)

  const {
    approveStore: { resetCurInfo }
  } = useStores()

  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [unRead, setUnread] = useState(null)
  const [activeKey, setActiveKey] = useState('1')
  const [curPage, setCurPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [visible, setVisible] = useState(false)
  const [curProc, setCurProc] = useState({})
  const [procList, setProcList] = useState([])
  const [tabsMap, setTabsMap] = useState(defaultTabsMap)

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
      getListData('', 1)
    } else {
      setCurProc({
        ...curProc,
        procCode: procCode,
        procName: procName
      })
      getListData(procCode, 1)
    }
    setVisible(false)
  }

  function getDetailPageUrl(procCode) {
    const arr = [
      {
        url: '/detail/procurement',
        procCode: '1666771987585',
        procName: '事业部采购合同审批流程'
      },
      {
        url: null,
        procCode: '1737524017091',
        procName: '仓库借用审批（单个节点）'
      },
      {
        url: null,
        procCode: '1737457304519',
        procName: '仓库借用审批（多个节点）'
      },
      {
        url: null,
        procCode: '1722523436220',
        procName: '计划领用审批'
      },
      {
        url: '/saleAgreement',
        procCode: '1724919928665',
        procName: '销售合同审批临时测试'
      },
      {
        url: '/saleAgreementCenter',
        procCode: '1669622397937',
        procName: '销售合同审批流程'
      }
    ]
    const found = arr.find(item=>item.procCode ==procCode);
    if(found?.url){
      return found.url
    } else {
      return null
    }
  }
  //列表点击事件
  const onClick = (data = {}) => {
    const pageUrl = getDetailPageUrl(data.procCode);
    if (!pageUrl) {
      Toast.show({
        content: '功能正在开发中'
      })
      return
    }
    if (data.procCode) {
      resetCurInfo(data)
      router.push(pageUrl)
    }
  }
  //先做一个这个列表跳转到销售合同申请审批的功能
  const onClickDemo = (data = {}) => {
    // router.push('./saleAgreement')
    router.push('./saleAgreementCenter')
  }
  // const getData = async (page) => {
  //   try {
  //     const result = await request(
  //       '/business/mas/tp/manual/tp2000/getWorkItem',
  //       'GET',
  //       {
  //         reqNo: '1002',
  //         page: page,
  //         limit: 20,
  //         state: activeKey,
  //       }
  //     )
  //     if (result && result.success) {
  //       const data = result.data ? result.data.records || [] : []
  //       return data
  //     } else {
  //       // 错误提示
  //     }
  //   } catch (err) {}
  // }

  const getListData = async (procCode, page = 1) => {
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
      const token = window.localStorage.getItem('token')
      const usercode = window.localStorage.getItem('acctCode')

      const result = await request(
        '/home/page/getWorkItem',
        'GET',
        {
          states,
          procCodes: procCode !== undefined ? procCode : curProc.procCode || '',
          limit: 20,
          page: page,
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
        const totalA = result.total ? result.total : data.length
        if (activeKey === '1') {
          setUnread(totalA)
        }
        //先按照insStaDate降序排序，如果insStaDate相同，则按照insStatime降序排序
        data.sort(function (a, b) {
          return (
            new Date(`${b.insStaDate.replaceAll('/', '-')}T${b.insStaTime}`) -
            new Date(`${a.insStaDate.replaceAll('/', '-')}T${a.insStaTime}`)
          )
        })
        setData(data)
        setTotal(totalA)
        return data
      } else {
        setData([])
      }
    } catch (err) {
    } finally {
      setLoading(false)
    }
  }

  const loadMore = async () => {
    const dataLen = data.length
    if (dataLen >= total) {
      setHasMore(false)
      return
    }
    const append = (await getListData(curProc.procCode, curPage + 1)) || []
    if (dataLen + append.length < total) {
      setHasMore(true)
      setCurPage(curPage + 1)
    } else {
      setHasMore(false)
    }
    const newData = [...data, ...append]
    setData(newData)
  }

  const getProcDef = async () => {
    try {
      const token = window.localStorage.getItem('token')
      const usercode = window.localStorage.getItem('acctCode')
      const result = await request(
        '/home/page/getProcDef',
        'GET',
        {
          comCode: '01',
          usercode
        },
        {
          Authorization: token
        }
      )
      if (result && result.success) {
        const data = result.data ? result.data : []
        data.unshift({ procCode: '00000', procName: '空' })
        setProcList(data)
      }
    } catch (err) {}
  }

  useEffect(() => {
    getProcDef()

    // 点击页面其他位置时隐藏下拉菜单
    const handleClickOutside = (event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !wrapper.current.contains(event.target)
      ) {
        setVisible(false)
      }
    }
    // 添加事件监听器
    document.addEventListener('mousedown', handleClickOutside)

    // 组件卸载时移除事件监听器
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
// 切页等于重置
const resetState=()=>{
  setCurPage(1)
  setData([])
  setHasMore(true)
}
  useEffect(() => {
    resetState()
    getListData(curProc.procCode, 1)
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeKey])

  useEffect(() => {
    let data = tabsMap
    data[0].title = `未审核(${unRead === null ? ' ' : unRead})`
    setTabsMap([...data])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unRead])

  return (
    <div className="relative h-[100%] w-[100%] overflow-hidden bg-white">
      <div className="h-40px fixed left-0 top-0 z-[99] w-[100%] overflow-hidden bg-white pt-[1px]">
        <Title isShowBack={false} title={'采购电子商务平台'} rightIcon="1" />
      </div>
      <div className="border-bottom-gray top-40px border-box fixed left-0 z-[10] flex w-[100%] bg-white">
        <Tabs
          data={tabsMap}
          activeKey={activeKey}
          onChange={(key) => setActiveKey(key)}
        ></Tabs>
      </div>
      <div className="top-80px border-box pt-12px fixed left-0 z-[10] flex w-[100%] bg-white px-[12px]">
        <div className="border-bor-gray text-12px flex h-[40px] w-[100%] items-center border border-solid">
          <div className="border-r-solid border-r-bor-gray text-14px h-40px flex w-[80px] items-center justify-center border-r">
            流程类型
          </div>
          <div
            className="px-16px flex h-[100%] flex-1 items-center"
            onClick={() => onExpand()}
            ref={wrapper}
          >
            <Input
              id="labelInput"
              placeholder=""
              readOnly
              className="flex-1"
              style={{
                '--font-size': '0.875rem'
              }}
              value={curProc.procName}
            />
            <div
              className="h-20px w-20px right-20px top-24px absolute flex items-center justify-center transition-transform"
              style={{ transform: visible ? 'rotate(-180deg)' : 'rotate(0)' }}
            >
              <DownOutline />
            </div>
          </div>
        </div>
        <div
          ref={ref}
          className="border-bor-gray absolute left-[92px] top-[51px] overflow-y-scroll border border-solid bg-white"
          style={{
            width: 'calc(100% - 104px)',
            visibility: visible ? 'visible' : 'hidden',
            maxHeight: '50vh'
          }}
        >
          <div className="">
            {procList.map((item, index) => {
              return (
                <div
                  key={index}
                  className="px-16px py-8px flex items-center"
                  onClick={() => onSelect(item.procCode, item.procName)}
                  style={{
                    backgroundColor:
                      curProc.procCode === item.procCode ? '#DFE8F6' : ''
                  }}
                >
                  <Ellipsis
                    direction="end"
                    content={item.procName}
                    style={{
                      fontSize: '0.875rem'
                    }}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div
        className="top-136px relative overflow-y-auto"
        style={{ height: 'calc(var(--vh, 1vh) * 100 - 8.5rem )' }}
      >
        <div>
          {/* {loading ? (
            <div className="mt-160px">
              <Loading />
            </div>
          ) : ( */}
            <PullToRefresh
              onRefresh={() => {
                getListData()
                // setCurPage(1)
              }}
            >
              {data.length ? (
                <>
                  {data.map((item, index) => (
                    <Card
                      key={index}
                      data={item}
                      onClick={onClick}
                      // onClick={onClickDemo}
                    />
                  ))}
                  <InfiniteScroll
                    loadMore={loadMore}
                    hasMore={hasMore}
                  ></InfiniteScroll>
                </>
              ) : (
                <div></div>
              )}
            </PullToRefresh>
          {/* )} */}
        </div>
      </div>
    </div>
  )
}

export default MenuPage
