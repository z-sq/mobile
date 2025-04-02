'use client'

import { InfiniteScroll, Loading } from 'antd-mobile'
import { useState, useEffect, useRef } from 'react'
import { Table, Checkbox, Popover, Button } from 'antd'
import { FilterOutlined } from '@ant-design/icons'

const DynamicTable = ({
  defaultColumns,
  initData,
  fetchData,
  allColumns = defaultColumns
}) => {
  const [activeColumns, setActiveColumns] = useState(defaultColumns)
  const [selectedColumns, setSelectedColumns] = useState(
    allColumns.map((col) => col.key)
  )
  const [dataSource, setDataSource] = useState(initData)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [openPopover,setOpenPopover]=useState({})

  const handleColumnChange = (checkedVal) => {
    setSelectedColumns(checkedVal)
  }
  const handleConfirm = () => {
    const newColumns = allColumns.filter((col) =>
      selectedColumns.includes(col.key)
    )
    setActiveColumns(newColumns)
    setOpenPopover({})
  }
  const columnSelector = (
    <div style={{ padding: '12px' }}>
      <Checkbox.Group value={selectedColumns} onChange={handleColumnChange}>
        {allColumns.map((col) => (
          <div key={col.key} style={{ marginBottom: '8px' }}>
            <Checkbox value={col.key}>{col.title}</Checkbox>
          </div>
        ))}
      </Checkbox.Group>
      <Button
        type="primary"
        size="small"
        style={{ marginTop: '12px' }}
        onClick={handleConfirm}
      >
        确定
      </Button>
    </div>
  )
  const handleOpenChange = (colKey,open) => {
    setOpenPopover(pre=>({...pre,[colKey]:open}));
  }
  const columnsWithSelector = activeColumns.map((col) => ({
    ...col,
    title: (
      <div style={{display:"flex",alignItems:'center'}}>
        {col.title}
        <Popover
          content={
            <div style={{ padding: '12px',width:'200px' }}>
              <Checkbox.Group
                value={selectedColumns}
                onChange={handleColumnChange}
              >
                {allColumns.map((col) => (
                  <div key={col.key} style={{ marginBottom: '8px' }}>
                    <Checkbox value={col.key}>{col.title}</Checkbox>
                  </div>
                ))}
              </Checkbox.Group>
              <Button
                type="primary"
                size="small"
                style={{ marginTop: '12px' }}
                onClick={handleConfirm}
              >
                确定
              </Button>
            </div>
          }
          title="选择显示列"
          trigger="click"
          placement="bottomRight"
          open={openPopover[col.key]}
          onOpenChange={(visible)=>handleOpenChange(col.key,visible)}
        >
         <FilterOutlined />
        </Popover>
      </div>
    )
  }))
  // 加载更多数据
  const loadMoreData = async () => {
    if (loading || !hasMore) return
    setLoading(true)
    const newData = await fetchData(page)
    if (newData.length === 0) {
      setHasMore(false)
    } else {
      setDataSource((prev) => [...prev, ...newData])
      setPage((prev) => prev + 1)
    }
    setLoading(false)
  }
  useEffect(() => {
    loadMoreData()
  }, [])

  return (
    <>
      <InfiniteScroll
        loadMore={loadMoreData}
        hasMore={hasMore}
        loading={loading}
      >
        <Table
          columns={columnsWithSelector}
          dataSource={dataSource}
          pagination={false}
        />
      </InfiniteScroll>
    </>
  )
}

export default DynamicTable
