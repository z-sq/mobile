'use client'

import React from 'react'

const Card = ({ data = {}, style = {}, onClick }) => {
  let title = ''
  if (data.busData) {
    const busData = JSON.parse(data.busData)
    const showTitle = Object.values(busData).filter((item) => item)
    title = showTitle.join('-')
  }
  if (title) {
    title = `【${data.procName}】-${title}`
  } else {
    title = `【${data.procName}】`
  }

  return (
    <div
      className="py-12px px-12px border-bottom-gray relative box-border"
      style={style}
      onClick={onClick ? () => onClick(data) : null}
    >
      <div className="flex w-full items-start">
        <div
          className="w-10px h-10px mt-6px mr-8px rounded-[50%]"
          style={{ backgroundColor: !data.reaStatus ? '#D9001B' : 'none' }}
        ></div>
        <div
          className="ml-2px flex flex-1 items-center break-all text-base text-black"
          style={{ fontWeight: !data.reaStatus ? '600' : '400' }}
        >
          {title}
        </div>
      </div>
      <div className="text-gray ml-16px mt-8px text-14px flex items-center justify-between">
        <div>{`申请人：${data.busTabParName || ''}`}</div>
        <div>{`${data.insStaDate} ${data.insStaTime}`}</div>
      </div>
    </div>
  )
}

export default Card
