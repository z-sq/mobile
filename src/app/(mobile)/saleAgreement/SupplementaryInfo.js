'use client'
import { observer } from 'mobx-react'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

import FiewViewer from './components/FileViewer'

import TableList from '@/components/TableList'
import { typeMap } from '@/config/configData'
import { replaceString } from '@/utils/method'
import request from '@/utils/request'
import { useStores } from '@/utils/useStores'
import { saleAgreementApi } from '@/request/apis/saleAgreement'

const defaultColumns = [
  {
    title: '辅助信息名称',
    dataIndex: 'ASS_NAME',
    key: 'ASS_NAME',
    sorter: {
      compare: (a, b) => a.ASS_NAME - b.ASS_NAME,
      multiple: 2
    },
    defaultSortOrder: 'ascend'
  },
  {
    title: '内容',
    dataIndex: 'ASS_DESC',
    key: 'ASS_DESC',
    sorter: {
      compare: (a, b) => a.ASS_DESC - b.ASS_DESC,
      multiple: 3
    }
  },
]

const SupplementaryInfo = observer(({ style = {} }) => {
  const [tableData, setTableData] = useState([])
  const [total, setMaterialTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [tableColumns, setTableColumns] = useState(defaultColumns)
  const [tableWidth, setTableWidth] = useState(null)
  const {
    approveStore: { currentInfo }
  } = useStores()
  console.log(JSON.stringify(currentInfo), 'currentInfo')

  const { COM_CODE, ORD_NO, CON_TEM_CODE } = currentInfo
  // 产品信息
  const getMaterialInfo = async (page = 1) => {
    try {
      const result = await request(saleAgreementApi.getSupplyInfo, 'GET', {
        params: JSON.stringify({
          ORDER_NO: ORD_NO,
          COM_CODE: COM_CODE,
          CON_TEM_CODE: CON_TEM_CODE
        }),
        ORDER_NO: ORD_NO,
        COM_CODE: COM_CODE,
        CON_TEM_CODE: CON_TEM_CODE,
        page: page,
        start: 0,
        limit: 200
      })
      if (result && result.success) {
        const data = result.data ? result.data || [] : []
        const total = result.data ? result.total || 0 : 0
        setTableData(data)
        setMaterialTotal(total)
      }
    } catch (err) {}
  }

  const loadMore = async () => {
    if (tableData.length >= total) {
      setHasMore(false)
      return
    }
    setPage(page + 1)
    const append = (await getMaterialInfo(page + 1)) || []
    setHasMore(tableData.length + append.length < total)
    setTableData((val) => [...val, ...append])
  }

  useEffect(() => {
    getMaterialInfo(1)
  }, [])

  return (
    <div className="text-12px px-10px py-10px h-[100%] w-full" style={style}>
      <div className="h-[100%]">
        <TableList
          columns={tableColumns}
          dataSource={tableData}
          orderColumn={true}
          width={tableWidth}
          loadMore={loadMore}
          hasMore={hasMore}
          threshold={100}
          infiniteScroll={true}
        />
      </div>
    </div>
  )
})
export default SupplementaryInfo
