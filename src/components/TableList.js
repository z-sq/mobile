'use client'

import { InfiniteScroll } from 'antd-mobile'
import { useState, useEffect, useRef } from 'react'

import styles from './TableList.module.css'

const TableList = ({
  columns = [],
  dataSource = [],
  orderColumn = false,
  width,
  infiniteScroll = false,
  loadMore,
  hasMore,
  threshold = 100
}) => {
  const [headHeight, setHeadHeight] = useState(0)

  const headRef = useRef(null)
  const bodyRef = useRef(null)

  const stickyStyle = styles['sticky-element']

  useEffect(() => {
    if (headRef.current) {
      const computedHeight = headRef.current.offsetHeight
      setHeadHeight(computedHeight)
    }
  }, [headRef])

  return (
    <div
      className={`flex w-full flex-col overflow-x-auto ${styles['table-wrapper']}`}
      style={{ height: '100%' }}
    >
      <div>
        <div
          className={`overflow-auto bg-white ${styles['headRef-wrapper']}`}
          ref={headRef}
          onScroll={() => {
            if (bodyRef.current && headRef.current) {
              bodyRef.current.scrollLeft = headRef.current.scrollLeft
            }
          }}
        >
          <table
            className="table-fixed"
            style={{
              minWidth: width ? width + 'px' : 'auto',
              width: width ? 'auto' : '100%'
            }}
          >
            <thead>
              <tr className="h-20px">
                {orderColumn && (
                  <th
                    key="orderColumn"
                    className={`bg-fill-gray1 border-bor-gray3 sticky left-0 box-border whitespace-nowrap border border-solid ${stickyStyle}`}
                    style={{ width: '28px' }}
                  ></th>
                )}
                {columns.map((col, index) => (
                  <th
                    key={col.key}
                    className={`border-bor-gray3 box-border w-[200px] border border-solid bg-white ${col.fixed ? stickyStyle + ' sticky left-[28px]' : ''}`}
                    style={{ width: col.width ? col.width : 'auto' }}
                  >
                    {col.title}
                  </th>
                ))}
              </tr>
            </thead>
          </table>
        </div>
      </div>
      <div
        className="width-[100%]"
        style={{ height: `calc(100% - ${headHeight}px)` }}
      >
        <div
          className={`width-[100%] h-[100%] ${styles['bodyRef-wrapper']} overflow-x-auto overflow-y-auto`}
        >
          <div
            className={` ${styles['bodyRef-wrapper']} overflow-x-auto overflow-y-hidden`}
            ref={bodyRef}
            onScroll={() => {
              if (bodyRef.current && headRef.current) {
                headRef.current.scrollLeft = bodyRef.current.scrollLeft
              }
            }}
          >
            <table
              className="table-fixed"
              style={{
                minWidth: width ? width + 'px' : 'auto',
                width: width ? 'auto' : '100%'
              }}
            >
              <tbody>
                {dataSource.map((row, rowIndex) => (
                  <tr key={rowIndex} className="h-40px">
                    {orderColumn && (
                      <td
                        key="order"
                        className={`border-bor-gray3 bg-fill-gray1 sticky left-0 box-border whitespace-nowrap border border-solid ${stickyStyle}`}
                        style={{ width: '28px' }}
                      >
                        {rowIndex + 1}
                      </td>
                    )}
                    {columns.map((column, columnIndex) => (
                      <td
                        key={columnIndex}
                        className={`border-bor-gray3 border border-solid bg-white bg-center bg-no-repeat ${column.fixed ? stickyStyle + ' sticky left-[28px]' : ''}`}
                        style={{
                          width: column.width ? column.width : 'auto',
                          backgroundImage: column.backgroundImage
                            ? column.backgroundImage(row[column.key])
                              ? column.backgroundImage(row[column.key])
                              : null
                            : null,
                          backgroundSize: '0.8rem'
                        }}
                        onClick={
                          column.onClick
                            ? () => column.onClick(row[column.key], row)
                            : null
                        }
                      >
                        {column.render
                          ? column.render(row[column.dataIndex], row)
                          : row[column.dataIndex] || ''}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {infiniteScroll && (
            <InfiniteScroll
              loadMore={loadMore}
              hasMore={hasMore}
              threshold={threshold}
            ></InfiniteScroll>
          )}
        </div>
        {/* {infiniteScroll && (
          <InfiniteScroll
            loadMore={loadMore}
            hasMore={hasMore}
            threshold={threshold}
          ></InfiniteScroll>
        )} */}
      </div>
    </div>
  )
}

export default TableList
