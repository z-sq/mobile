'use client'

import { Checkbox, InfiniteScroll, Loading } from 'antd-mobile'
import { useState, useEffect, useRef } from 'react'
import { Table, Checkbox,Popover } from 'antd'

const DynamicTable = ({ defaultColumns, fetchData }) => {
  const [activeColumns, setActiveColumns] = useState([])
  const [selectedColumns, setSelectedColumns] = useState(
    defaultColumns.map((col) => col.key)
  )
  const [dataSource, setDataSource] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)

  const handleColumnChange = (checkedVal) => {
    setSelectedColumns(checkedVal)
  }
  const handleConfirm = () => {
    const newColumns = defaultColumns.filter((col) =>
      selectedColumns.includes(col.key)
    )
    setActiveColumns(newColumns)
  }
  const columnSelector = (
    <div style={{ padding: '12px' }}>
      <Checkbox.Group
        options={plainOptions}
        value={selectedColumns}
        onChange={handleColumnChange}
      >
        {defaultColumns.map((col) => (
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
  useEffect(()=>{
loadMoreData()
  },[])

  return <>
  <Popover content={columnSelector} title="选择显示列" trigger="click" placement='bottomRight'>
      <Button style={{marginBottom:'16px'}}>列</Button>
    </Popover>
    <InfiniteScroll loadMore={loadMoreData} hasMore={hasMore} loading={loading}>
    <Table
    columns={activeColumns}
    dataSource={dataSource}
    pagination={false}
  />
    </InfiniteScroll>
  </>
}

export default DynamicTable
