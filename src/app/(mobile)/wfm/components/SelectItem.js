'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

import { BASE_PATH } from '@/config/app'

const SelectItem = ({
  data = {},
  selected = [],
  style = {},
  selectChange,
  type,
  singleSelectChange
}) => {
  return (
    <div
      style={style}
      className="py-12px border-bottom-gray flex items-center"
      onClick={() => {
        if (type === 'forward') {
          selectChange(data)
        } else {
          singleSelectChange(data)
        }
      }}
    >
      <Image
        src={
          selected.find(
            (item) =>
              item.actCode === data.actCode && item.comCode === data.comCode
          )
            ? `${BASE_PATH}/images/selected.png`
            : `${BASE_PATH}/images/unselected.png`
        }
        alt=""
        width={16}
        height={16}
      />
      <div className="px-16px flex-1">
        <div>
          <div className="mb-8px">{data.comName}</div>
        </div>
        <div className="flex justify-between">
          <div className="">{data.actName}</div>
          <div className="">{data.orgName}</div>
        </div>
      </div>
    </div>
  )
}

export default SelectItem
