'use client'

import { InfiniteScroll, Loading } from 'antd-mobile'
import { useState, useEffect, useRef } from 'react'

import styles from './TableList.module.css'

const TableList = ({
  columns = [],
  dataSource = [],
  rowKey = 'id',
  emptyText = '暂无数据',
  orderColumn = false,
  width,
  infiniteScroll = false,
  loadMore,
  hasMore,
  threshold = 100
}) => {
  const [headHeight, setHeadHeight] = useState(0)
  const [tableColumns, setTableColumns] = useState(columns)
  const [tableData, setTableData] = useState(dataSource)

  const headRef = useRef(null)
  const bodyRef = useRef(null)

  const stickyStyle = styles['sticky-element']
  useEffect(() => {
    setTableData(dataSource)
  }, [dataSource])

  useEffect(() => {
    setTableColumns(columns)
  }, [columns])

  useEffect(() => {
    if (headRef.current) {
      const computedHeight = headRef.current.offsetHeight
      setHeadHeight(computedHeight)
    }
  }, [headRef])
  const handleRowClick = (record, index) => {
    if (onRowClick && typeof onRowClick === 'function') {
      onRowClick(record, index)
    }
  }

  const renderHeader = () => {
    return (
      <tr className={style.headerRow}>
        {tableColumns.map((column, index) => (
          <th
            key={column.key || column.dataIndex || index}
            className={styles.headerCell}
            style={{
              width: column.width,
              minWidth: column.minWidth || '80px',
              ...column.headerStyle
            }}
          >
            {column.title}
          </th>
        ))}
      </tr>
    )
  }

  const renderCell = (record, column, index) => {
    const { dataIndex, render } = column
    if (render && typeof render === 'function') {
      return render(record[dataIndex], record, index)
    }
    return record[dataIndex]
  }
  const renderBody = () => {
    if (Loading) {
      return (
        <tr>
          <td colSpan={tableColumns.length} className={styles.loadingCell}>
            加载中...
          </td>
        </tr>
      )
    }
    if (tableData.length === 0) {
      return (
        <tr>
          <td colSpan={tableColumns.length} className={styles.emptyCell}>
            {emptyText}
          </td>
        </tr>
      )
    }
    return tableData.map((record, index) => (
      <tr
        key={record[rowKey] || index}
        className={styles.bodyRow}
        onClick={() => handleRowClick(record, index)}
      >
        {tableColumns.map((column, colIndex) => (
          <td
            key={column.key || column.dataIndex || colIndex}
            className={styles.bodyCell}
            style={{
              width: column.width,
              minWidth: column.minWidth || '80px',
              ...column.headerStyle
            }}
          >
            {renderCell(record, column, index)}
          </td>
        ))}
      </tr>
    ))
  }
  const tableContainerStyle = {
    ...style,
    overflowX: scroll.x ? 'auto' : 'visible',
    overflowY: scroll.y ? 'auto' : 'visible',
    minHeight: scroll.y
      ? typeof scroll.y === 'boolean'
        ? '400px'
        : scroll.y
      : 'none'
  }
  return (
    <div
      className={`${styles.tableContainer}${className}`}
      style={tableContainerStyle}
    >
      <table>
        <thead>{renderHeader()}</thead>
        <tbody>{renderBody()}</tbody>
      </table>
    </div>
  )
}

export default TableList
