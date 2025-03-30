'use client'

import { observer } from 'mobx-react'
import { useState, useEffect } from 'react'
import Title from '@/components/Title'
import Button from '@/components/Button'
import request from '@/utils/request'
import { useStores } from '@/utils/useStores'

const PreviewAtta = observer(()=>{
  const [attList, setAttList] = useState([]);
  const {
    approveStore: { currentInfo }
  } = useStores()

  const getAtta = async () => {
    const companyCode = window.localStorage.getItem('companyCode');
    const {
      busKey: tabName,
      busKeyValue: busValue
    } = currentInfo
    const result = await request(
      `/base/SysAttaInf/getAttachments`,
      'GET',
      {
        tabName,
        companyCode,
        busValue,
        page: 1,
        start: 0,
        limit: 25,
      }
    )
    if (result && result.success) {
      setAttList(result.data || [])
    }
  }

  const handleDownload = (file) => {
    const link = document.createElement('a')
    link.href = `${location.origin}/base/${file.attPath}`
    link.download = file.filName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleAllDownload = ()=>{

  }

  function formatFileSize(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'kb', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
  }

  useEffect(()=>{
    getAtta()
  },[])

  return (
    <div className="relative h-[100%] w-[100%] overflow-hidden bg-white">
      <div className="h-40px sticky left-0 top-0 z-[99] w-[100%] overflow-hidden bg-white pt-[1px]">
        <Title isShowBack={true} title="查看附件" rightIcon="3" />
      </div>

      {attList.map((item) => (
        <div className="flex items-end border-bottom-gray mx-3 py-2" key={item.uuId}>
          {/* <div className='size-4 bg-blue rounded'></div> */}
          <div className="flex-1 border-r-gray border-r">
            <div>{item.filName}</div>
            <div className="text-gray mt-1">{formatFileSize(item.attSize)}</div>
          </div>
          <div className="p-2 ml-2" onClick={() => handleDownload(item)}>
            下载
          </div>
        </div>
      ))}

      <div className='absolute bottom-0 inset-x-0'>
      <Button
        className="!w-full"
        color="primary"
        fill="solid"
        onClick={handleAllDownload}
      >
        全部下载
      </Button>
      </div>
    </div>
  )
})

export default PreviewAtta;