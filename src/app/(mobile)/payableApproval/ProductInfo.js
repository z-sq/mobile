'use client'
import { observer } from 'mobx-react'
import { useState, useEffect } from 'react'

import TableList from '@/components/TableList'
import request from '@/utils/request'
import { useStores } from '@/utils/useStores'
import { payApprovalApi } from '@/request/apis/payableApproval'

const defaultColumns = [
  {
    title: '序号',
    dataIndex: 'SEQ_NO',
    key: 'SEQ_NO',
    sorter: {
      compare: (a, b) => a.SEQ_NO - b.SEQ_NO,
      multiple: 1
    },
    defaultSortOrder: 'ascend'
  },
  {
    title: '付款方式',
    dataIndex: 'PAY_KIN_NAME',
    key: 'PAY_KIN_NAME',
    sorter: {
      compare: (a, b) => a.PAY_KIN_NAME - b.PAY_KIN_NAME,
      multiple: 2
    },
    defaultSortOrder: 'ascend'
  },
  {
    title: '银行开户行',
    dataIndex: 'BANK',
    key: 'BANK',
    sorter: {
      compare: (a, b) => a.BANK - b.BANK,
      multiple: 3
    }
  },
  {
    title: '银行账号',
    dataIndex: 'BAN_ID',
    key: 'BAN_ID',
    sorter: {
      compare: (a, b) => a.BAN_ID - b.BAN_ID,
      multiple: 4
    }
  },
  {
    title: '银行单据号',
    dataIndex: 'BAN_BIL_ID',
    key: 'BAN_BIL_ID',
    sorter: {
      compare: (a, b) => a.BAN_BIL_ID - b.BAN_BIL_ID,
      multiple: 5
    }
  },
  {
    title: '票据分类',
    dataIndex: 'KIN_NAME',
    key: 'KIN_NAME',
    sorter: {
      compare: (a, b) => a.KIN_NAME - b.KIN_NAME,
      multiple: 6
    }
  },
  {
    title: '票据类型',
    dataIndex: 'TYP_NAME',
    key: 'TYP_NAME',
    sorter: {
      compare: (a, b) => a.TYP_NAME - b.TYP_NAME,
      multiple: 7
    }
  },
  {
    title: '票据号',
    dataIndex: 'BIL_ID',
    key: 'BIL_ID',
    sorter: {
      compare: (a, b) => a.BIL_ID - b.BIL_ID,
      multiple: 8
    }
  },
  {
    title: '申请金额',
    dataIndex: 'APP_AMT',
    key: 'APP_AMT',
    sorter: {
      compare: (a, b) => a.APP_AMT - b.APP_AMT,
      multiple: 9
    }
  },
  {
    title: '票据期限',
    dataIndex: 'LIM_DATE',
    key: 'LIM_DATE',
    sorter: {
      compare: (a, b) => a.LIM_DATE - b.LIM_DATE,
      multiple: 10
    }
  },
  {
    title: '票据承兑日期',
    dataIndex: 'COM_DATE',
    key: 'COM_DATE',
    sorter: {
      compare: (a, b) => a.COM_DATE - b.COM_DATE,
      multiple: 11
    }
  },
  {
    title: '供应商开户行',
    dataIndex: 'VEN_BANK',
    key: 'VEN_BANK',
    sorter: {
      compare: (a, b) => a.VEN_BANK - b.VEN_BANK,
      multiple: 12
    }
  },
  {
    title: '供应商开户行账号',
    dataIndex: 'VEN_BAN_ID',
    key: 'VEN_BAN_ID',
    sorter: {
      compare: (a, b) => a.VEN_BAN_ID - b.VEN_BAN_ID,
      multiple: 13
    }
  }
]
const secondTable = [
  {
    title: '采购订单号',
    dataIndex: 'ORD_ID',
    key: 'ORD_ID',
    sorter: {
      compare: (a, b) => a.ORD_ID - b.ORD_ID,
      multiple: 1
    },
    defaultSortOrder: 'ascend'
  },
  {
    title: '采购订单名称',
    dataIndex: 'ORD_NAME',
    key: 'ORD_NAME',
    sorter: {
      compare: (a, b) => a.ORD_NAME - b.ORD_NAME,
      multiple: 2
    },
    defaultSortOrder: 'ascend'
  },
  {
    title: '订单金额',
    dataIndex: 'ITE_NAME',
    key: 'ITE_NAME',
    sorter: {
      compare: (a, b) => a.ITE_NAME - b.ITE_NAME,
      multiple: 3
    }
  },
  {
    title: '已付款金额',
    dataIndex: 'ITE_NORM',
    key: 'ITE_NORM',
    sorter: {
      compare: (a, b) => a.ITE_NORM - b.ITE_NORM,
      multiple: 4
    }
  },
  {
    title: '已付款比例',
    dataIndex: 'ITE_MODEL',
    key: 'ITE_MODEL',
    sorter: {
      compare: (a, b) => a.ITE_MODEL - b.ITE_MODEL,
      multiple: 5
    }
  },
  {
    title: '剩余未付款金额',
    dataIndex: 'REQ_QTY',
    key: 'REQ_QTY',
    sorter: {
      compare: (a, b) => a.REQ_QTY - b.REQ_QTY,
      multiple: 6
    }
  },
  {
    title: '开票金额',
    dataIndex: 'OM_UNI_NAME',
    key: 'OM_UNI_NAME',
    sorter: {
      compare: (a, b) => a.OM_UNI_NAME - b.OM_UNI_NAME,
      multiple: 7
    }
  },
  {
    title: '已占用付款比例',
    dataIndex: 'PRICE',
    key: 'PRICE',
    sorter: {
      compare: (a, b) => a.PRICE - b.PRICE,
      multiple: 8
    }
  },
  {
    title: '已审核未付款',
    dataIndex: 'AMT',
    key: 'AMT',
    sorter: {
      compare: (a, b) => a.AMT - b.AMT,
      multiple: 9
    }
  },
  {
    title: '已申请未审核',
    dataIndex: 'TAX_RATE',
    key: 'TAX_RATE',
    sorter: {
      compare: (a, b) => a.TAX_RATE - b.TAX_RATE,
      multiple: 10
    }
  },
  {
    title: '已占用金额',
    dataIndex: 'TAX_AMT',
    key: 'TAX_AMT',
    sorter: {
      compare: (a, b) => a.TAX_AMT - b.TAX_AMT,
      multiple: 11
    }
  },
  {
    title: '申请金额',
    dataIndex: 'PAY_AMT',
    key: 'PAY_AMT',
    sorter: {
      compare: (a, b) => a.PAY_AMT - b.PAY_AMT,
      multiple: 12
    }
  }
]

const ProductInfo = observer(({ style = {} }) => {
  const [tableData, setTableData] = useState([])
  const [total, setMaterialTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [tableColumns, setTableColumns] = useState(defaultColumns)
  const [tableColumns2, setTableColumns2] = useState(secondTable)
  const [tableData2, setTableData2] = useState([])
  const [tableWidth, setTableWidth] = useState(1200)
  const [total2, setMaterialTotal2] = useState(0)
  const [hasMore2, setHasMore2] = useState(true)
  const [page2, setPage2] = useState(1)
  const {
    approveStore: { currentInfo }
  } = useStores()
  // 产品信息
  const getMaterialInfo = async (page = 1) => {
    try {
      const result = await request(payApprovalApi.getTable1, 'GET', {
        params: JSON.stringify({
            HUU_ID: currentInfo.HUU_ID,
          }),
          HUU_ID: currentInfo.HUU_ID,
        page: page,
        start: 0,
        limit: 200
      })
      if (result && result.success) {
        const data = result.data ? result.data || [] : []
        const total = result.data ? result.total || 0 : 0
        setTableData(data)
        setMaterialTotal(total)
        return data
      }
    } catch (err) {}
  }

  const getTableInfo = async (page = 1) => {
    try {
      const result = await request(payApprovalApi.getTable2, 'GET', {
        params: JSON.stringify({
          HUU_ID: currentInfo.HUU_ID,
        }),
        HUU_ID: currentInfo.HUU_ID,
        page: page,
        start: 0,
        limit: 200
      })
      if (result && result.success) {
        const data = result.data ? result.data || [] : [];
        const total = result.data ? result.total || 0 : 0
        setTableData2(data)
        setMaterialTotal2(total)
        return data
      }
    } catch (err) {}
  }

  const loadMore = async () => {
    console.log(page,total,'append.length11133')
    if (tableData.length >= total) {
      setHasMore(false)
      return
    }
    setPage(page + 1)
    const append = (await getMaterialInfo(page + 1)) || []
    setHasMore(tableData.length + append.length < total)
    console.log(page2,append.length,'append.length111')
    setTableData((val) => [...val, ...append])
  }

  const loadMoreTable=async()=>{
    console.log(page2,total2,'append.length')
    if (tableData2.length>=total2) {
        setHasMore2(false)
        return
    }
   
    setPage2(page2+1)
    const append=(await getTableInfo(page2+1))||[]
    setHasMore2(tableData2.length+append.length<total2)
    console.log(page2,append.length,'append.length')
    setTableData2((val)=>[...val,...append])
  }

  useEffect(() => {
    getMaterialInfo(1)
    getTableInfo(1)
  }, [])

  return (
    <div className="text-12px px-10px py-10px h-[100%] w-full" style={style}>
      <div className="h-[50%]">
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
      <div className="h-[50%]">
        <TableList
          columns={tableColumns2}
          dataSource={tableData2}
          orderColumn={true}
          width={tableWidth}
          loadMore={loadMoreTable}
          hasMore={hasMore2}
          threshold={100}
          infiniteScroll={false}
        />
      </div>
    </div>
  )
})
export default ProductInfo
