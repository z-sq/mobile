'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

import SelectItem from './SelectItem'

import { BASE_PATH } from '@/config/app'

const RecentComp = ({
  data = [],
  selected = [],
  selectChange,
  selectAllChange,
  hasSelectAll,
  hasSelectBar = false,
  type,
  singleSelectChange,
  searchResult = false,
  style = {}
}) => {
  const [isSelectedAll, setIsSelectedAll] = useState(false)

  const onSelectAllClick = () => {
    const selectedData = data.map((item) => {
      return item
    })
    setIsSelectedAll(!isSelectedAll)
    selectAllChange(selectedData, !isSelectedAll)
  }

  useEffect(() => {
    const flag = hasSelectAll(selected, data)
    if (flag !== isSelectedAll) {
      setIsSelectedAll(flag)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  return (
    <div style={style}>
      <div
        className={`${type === 'forward' && !searchResult ? 'px-8px h-40px bg-fill-gray2/[.06] border-bottom-gray flex items-center text-xs' : 'hidden'}`}
      >
        <Image
          src={
            isSelectedAll
              ? `${BASE_PATH}/images/selected.png`
              : `${BASE_PATH}/images/unselected.png`
          }
          alt=""
          width={16}
          height={16}
          onClick={() => onSelectAllClick()}
        />
        <div className="ml-4px">全选</div>
      </div>
      <div
        className="px-8px border-bottom-gray overflow-y-auto text-base"
        style={{
          height: hasSelectBar
            ? `calc(var(--vh, 1vh) * 100 - ${type === 'forward' && !searchResult ? '17.5rem' : '15rem'})`
            : `calc(var(--vh, 1vh) * 100 - ${type === 'forward' && !searchResult ? '15rem' : '12.5rem'})`
        }}
      >
        {data.map((item, index) => {
          return (
            <SelectItem
              key={index}
              data={item}
              selected={selected}
              style={index === data.length - 1 ? { border: 'none' } : {}}
              selectChange={selectChange}
              type={type}
              singleSelectChange={singleSelectChange}
            />
          )
        })}
      </div>
    </div>
  )
}

export default RecentComp
