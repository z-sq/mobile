'use client'

import { SearchBar } from 'antd-mobile'

import { BASE_PATH } from '@/config/app'
import './index.css'

const SearchInput = ({
  setKeyWord,
  onSearch,
  wrapperClassName,
  className,
  ...props
}) => {
  return (
    <div
      className={`border-bor-gray1 pr-8px h-28px flex w-[100%] items-center border border-solid bg-[#F2F2F2] ${wrapperClassName}`}
    >
      <SearchBar
        icon={null}
        clearable
        className={`flex-1 ${className}`}
        style={{
          '--height': '1.25rem'
        }}
        onChange={(val) => {
          setKeyWord && setKeyWord(val)
        }}
        onSearch={() => {
          onSearch && onSearch()
        }}
        {...props}
      />
      <div
        className="h-16px w-16px relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${BASE_PATH}/images/search.png')` }}
        onClick={() => {
          onSearch && onSearch()
        }}
      ></div>
    </div>
  )
}

export default SearchInput
