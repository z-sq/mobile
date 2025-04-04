'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

import FiewViewer from './FileViewer'

import TableList from '@/components/TableList'
import { typeMap } from '@/config/configData'
import { replaceString } from '@/utils/method'
import request from '@/utils/request'

const defaultColumns = [
  {
    title: '物料名称',
    dataIndex: 'iteName',
    key: 'iteName',
    fixed: true,
    width: '80px'
  },
  {
    title: '规格',
    dataIndex: 'iteNorm',
    key: 'iteNorm',
    width: '80px'
  },
  {
    title: '型号',
    dataIndex: 'iteModel',
    key: 'iteModel',
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
    title: ' 交货期（天)',
    dataIndex: 'delTime',
    key: 'reqDate',
    width: '80px'
  },
  {
    title: '备注',
    dataIndex: 'remarks',
    key: 'remarks',
    width: '100px'
  },
  {
    title: '附件',
    dataIndex: 'atta',
    key: 'atta',
    width: '150px',
    render: (text, record) => {
      let atta = []
      if (record.iteFilInfo && record.iteFilInfo.length) {
        atta = record.iteFilInfo
      }
      return (
        <div>
          {atta.map((atta, index) => {
            atta.attPath = replaceString(atta.attPath, '/usr/attachment', '')
            return (
              <FiewViewer
                key={index}
                className="pr-4"
                file={atta}
                name="filName"
                urlName="attPath"
              />
            )
          })}
        </div>
      )
    }
  }
]

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

export default function MaterialInformation({
  data,
  total,
  style = {},
  columns,
  width,
  params
}) {
  const [tableDdata, setTableData] = useState(data)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [tableColumns, setTableColumns] = useState([])
  const [tableWidth, setTableWidth] = useState(null)

  const searchParams = useSearchParams()
  const busKeyValue = searchParams.get('key')
  const pagCode = searchParams.get('pagCode')
  const wfType = typeMap[pagCode]?.pagCode
  const busKey = typeMap[pagCode]?.busKey

  const getMaterialInfo = async (page) => {
    try {
      const result = await request(
        `/business/mas/tp/manual/${wfType}/getItemInfo`,
        'GET',
        {
          [busKey]: busKeyValue,
          page,
          limit: 20,
          ...params
        }
      )
      if (result.success) {
        const data = result.data ? result.data.records || [] : []
        return data
      } else {
        // 错误提示
      }
    } catch (err) { }
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
    if (columns) {
      setTableColumns(columns)
      if (width) {
        setTableWidth(width)
      }
    } else {
      if (wfType === 'tp2200' || wfType === 'tp2800') {
        setTableColumns(otherColumns)
        setTableWidth(848)
      } else if (wfType === 'tp2100') {
        if (data && data.length && data[0].proName) {
          const newColumns = [
            ...defaultColumns.slice(0, 1),
            ,
            {
              title: '项目名称',
              dataIndex: 'proName',
              key: 'proName',
              width: '80px'
            },
            ...defaultColumns.slice(1)
          ]
          setTableColumns(newColumns)
          setTableWidth(1078)
        } else {
          setTableColumns(defaultColumns)
          setTableWidth(998)
        }
      }
    }
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
}
