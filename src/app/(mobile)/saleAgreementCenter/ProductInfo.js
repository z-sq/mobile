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

const defaultColumns =
[
    {
        title: '序号',
        dataIndex: 'SEQ_NO',
        key: 'SEQ_NO',
        sorter: {
            compare: (a, b) => a.SEQ_NO - b.SEQ_NO,
            multiple: 1,
        },
        defaultSortOrder: 'ascend',
    },
    {
        title: '产品编码',
        dataIndex: 'ITE_CODE',
        key: 'ITE_CODE',
        sorter:{
            compare: (a, b) => a.ITE_CODE - b.ITE_CODE,
            multiple: 2,
        },
        defaultSortOrder: 'ascend',
    },
    {
        title: '产品名称',
        dataIndex: 'ITE_NAME',
        key: 'ITE_NAME',
        sorter:{
            compare: (a, b) => a.ITE_NAME - b.ITE_NAME,
            multiple: 3,
        }
    },
    {
        title: '规格',
        dataIndex: 'ITE_NORM',
        key: 'ITE_NORM',
        sorter:{
            compare: (a, b) => a.ITE_NORM - b.ITE_NORM,
            multiple: 4,
        }
    },
    {
        title: '型号',
        dataIndex: 'ITE_MODEL',
        key: 'ITE_MODEL',
        sorter:{
            compare: (a, b) => a.ITE_MODEL - b.ITE_MODEL,
            multiple: 5,
        }
    },
    {
        title: '数量',
        dataIndex: 'REQ_QTY',
        key: 'REQ_QTY',
        sorter:{
            compare: (a, b) => a.REQ_QTY - b.REQ_QTY,
            multiple: 6,
        }
    },
    {
        title: '销售计量单位',
        dataIndex: 'OM_UNI_NAME',
        key: 'OM_UNI_NAME',
        sorter:{
            compare: (a, b) => a.OM_UNI_NAME - b.OM_UNI_NAME,
            multiple: 7,
        }
    },
    {
        title: '不含税单价',
        dataIndex: 'PRICE',
        key: 'PRICE',
        sorter:{
            compare: (a, b) => a.PRICE - b.PRICE,
            multiple: 8,
        }
    },
    {
        title: '不含税金额',
        dataIndex: 'AMT',
        key: 'AMT',
        sorter:{
            compare: (a, b) => a.AMT - b.AMT,
            multiple: 9,
        }
    },
    {
        title: '税率',
        dataIndex: 'TAX_RATE',
        key: 'TAX_RATE',
        sorter:{
            compare: (a, b) => a.TAX_RATE - b.TAX_RATE,
            multiple: 10,
        }
    },{
        title: '税金',
        dataIndex: 'TAX_AMT',
        key: 'TAX_AMT',
        sorter:{
            compare: (a, b) => a.TAX_AMT - b.TAX_AMT,
            multiple: 11,
        }
    },
    {
        title: '含税单价',
        dataIndex: 'TAX_PRICE',
        key: 'TAX_PRICE',
        sorter:{
            compare: (a, b) => a.TAX_PRICE - b.TAX_PRICE,
            multiple: 12,
        }
    },{
        title: '总金额',
        dataIndex: 'ORD_AMT',
        key: 'ORD_AMT',
        sorter:{
            compare: (a, b) => a.ORD_AMT - b.ORD_AMT,
            multiple: 13,
        }
    },
    {
        title: '交货日期',
        dataIndex: 'DEL_DATE',
        key: 'DEL_DATE',
        sorter:{
            compare: (a, b) => a.DEL_DATE - b.DEL_DATE,
            multiple: 14,
        }
    },
    {
        title: '保质期（月）',
        dataIndex: 'WAR_PERIOD',
        key: 'WAR_PERIOD',
        sorter:{
            compare: (a, b) => a.WAR_PERIOD - b.WAR_PERIOD,
            multiple: 15,
        }
    },
    {
        title: '首台套',
        dataIndex: 'FSP_NAME',
        key: 'FSP_NAME',
        sorter:{
            compare: (a, b) => a.FSP_NAME - b.FSP_NAME,
            multiple: 16,
        }
    }]

const otherColumns = [
  {
    title: '物料名称',
    dataIndex: 'matName',
    key: 'matName',
    fixed: true,
    width: '80px'
  },
  {
    title: '规格',
    dataIndex: 'matNorm',
    key: 'matNorm',
    width: '80px'
  },
  {
    title: '型号',
    dataIndex: 'matModel',
    key: 'matModel',
    width: '80px'
  },
  {
    title: '图号',
    dataIndex: 'draNo',
    key: 'draNo',
    width: '80px'
  },
  {
    title: '材料',
    dataIndex: 'material',
    key: 'material',
    width: '80px'
  },
  {
    title: '品牌/厂家',
    dataIndex: 'factory',
    key: 'factory',
    width: '80px'
  },
  {
    title: '数量',
    dataIndex: 'qty',
    key: 'qty',
    width: '80px'
  },
  {
    title: '预算金额',
    dataIndex: 'bugAmt',
    key: 'bugAmt',
    width: '80px'
  },
  {
    title: '需求日期',
    dataIndex: 'reqDate',
    key: 'reqDate',
    width: '80px'
  },
  {
    title: '备注',
    dataIndex: 'remarks',
    key: 'remarks',
    width: '100px'
  }
]

const ProductInfo=observer(({style = {}})=> {
  const [tableDdata, setTableData] = useState([])
  const [total, setMaterialTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [tableColumns, setTableColumns] = useState(defaultColumns)
  const [tableWidth, setTableWidth] = useState(null)
  const {
      approveStore: { currentInfo }
    } = useStores()
  console.log(JSON.stringify(currentInfo),'currentInfo')
  const searchParams = useSearchParams()
  const busKeyValue = searchParams.get('key')
  const pagCode = searchParams.get('pagCode')
  const wfType = typeMap[pagCode]?.pagCode
  const busKey = typeMap[pagCode]?.busKey
  const {COM_CODE,ORD_NO,REC_VERSION,REC_VERSION_OLD}=currentInfo
  // 产品信息
  const getMaterialInfo = async (page=1) => {
    try {
      const result = await request(
        `/business/om/auto/bzs_om2120/query/tabdehead`,
        'GET',
        {
          params:JSON.stringify({
            COM_CODE:COM_CODE,
            ORD_NO:ORD_NO,
            REC_VERSION:REC_VERSION,
            REC_VERSION_OLD:REC_VERSION_OLD,
          }),
          COM_CODE:COM_CODE,
          ORD_NO:ORD_NO,
          REC_VERSION:REC_VERSION,
          REC_VERSION_OLD:REC_VERSION_OLD,
          page: page,
          start: 0,
          limit: 200
        }
      )
      if (result && result.success) {
        const data = result.data ? result.data || [] : []
        const total = result.data ? result.total || 0 : 0
        setTableData(data)
        setMaterialTotal(total)
      }
    } catch (err) {}
  }

  const loadMore = async () => {
    if (tableDdata.length >= total) {
      setHasMore(false)
      return
    }
    setPage(page + 1)
    const append = (await getMaterialInfo(page + 1)) || []
    setHasMore(tableDdata.length + append.length < total)
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
          dataSource={tableDdata}
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
export default ProductInfo;
