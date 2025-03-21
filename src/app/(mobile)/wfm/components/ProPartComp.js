'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

import SelectItem from './SelectItem'

import { BASE_PATH } from '@/config/app'

const ProPartComp = ({
  data = [],
  selected = [],
  selectChange,
  selectAllChange,
  hasSelectAll,
  selectedParType,
  setSelectedParType,
  partTypeMap,
  type,
  singleSelectChange
}) => {
  const [isSelectedAll, setIsSelectedAll] = useState(false)

  const onSelectAllClick = () => {
    let selectedData = []
    data.forEach((item) => {
      item.data.forEach((i) => {
        selectedData.push(i.acctCode)
      })
    })
    setIsSelectedAll(!isSelectedAll)
    selectAllChange(selectedData, !isSelectedAll)
  }

  const onItemSelectAllClick = (list = []) => {
    const flag = hasSelectAll(selected, list)
    const selectedData = list.map((item) => {
      return item.acctCode
    })
    selectAllChange(selectedData, !flag)
  }

  useEffect(() => {
    let selectedData = []
    data.forEach((item) => {
      item.data.forEach((i) => {
        selectedData.push(i)
      })
    })
    const flag = hasSelectAll(selected, selectedData)
    if (flag !== isSelectedAll) {
      setIsSelectedAll(flag)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  return (
    <>
      <div className="h-40px px-16px border-bottom-gray flex">
        {partTypeMap.map((item, index) => {
          return (
            <div
              key={index}
              className={`mr-16px flex items-center font-medium ${selectedParType === item.key ? 'text-blue' : ''}`}
              onClick={() => {
                setSelectedParType(item.key)
              }}
            >
              {item.title}
            </div>
          )
        })}
      </div>
      <div
        className={`${type === 'forward' ? 'px-8px h-40px bg-fill-gray2/[.06] border-bottom-gray flex items-center text-xs' : 'hidden'}`}
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
        className="border-bottom-gray overflow-y-auto text-base"
        style={{
          height:
            type === 'forward'
              ? 'calc(var(--vh, 1vh) * 100 - 17.5rem)'
              : 'calc(var(--vh, 1vh) * 100 - 15rem)'
        }}
      >
        {data.map((item, index) => {
          return (
            <div key={index}>
              <div className="px-8px h-40px bg-fill-gray2/[.06] border-bottom-gray flex items-center justify-between text-xs">
                <div>{item.title}</div>
                <div
                  onClick={() => {
                    onItemSelectAllClick(item.data)
                  }}
                  className={`${type === 'forward' ? '' : 'hidden'}`}
                >
                  {hasSelectAll(selected, item.data) ? '取消全选' : '全选'}
                </div>
              </div>
              <div className="px-8px border-bottom-gray">
                {item.data.map((i, idx) => {
                  return (
                    <SelectItem
                      key={i.acctCode}
                      data={i}
                      selected={selected}
                      selectChange={selectChange}
                      style={
                        idx === item.data.length - 1 ? { border: 'none' } : {}
                      }
                      type={type}
                      singleSelectChange={singleSelectChange}
                    />
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default ProPartComp
