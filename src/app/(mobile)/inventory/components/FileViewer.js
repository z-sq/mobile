'use client'

import { Dialog } from 'antd-mobile'

const FiewViewer = ({ file = {}, className, name, urlName }) => {
  const handlePreview = () => {
    // 检查文件类型，支持图片和 PDF
    // if (file.type.startsWith('image/')) {
    //   window.open(file.url, '_blank')
    // } else if (file.type === 'application/pdf') {
    //   window.open(file.url, '_blank')
    // } else {
    //   alert('不支持的文件类型')
    // }
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href =
      location.origin + '/base/' + (urlName ? file[urlName] : file.fileUrl)
    // link.href = 'http://192.168.168.221:30333/base/' + file.fileUrl
    link.download = name ? file[name] : file.fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const onClick = () => {
    handleDownload()
    // Dialog.show({
    //   content: '请选择',
    //   closeOnAction: true,
    //   closeOnMaskClick: true,
    //   actions: [
    //     {
    //       key: 'download',
    //       text: '下载文件',
    //       onClick: () => {
    //         handleDownload()
    //       }
    //     },
    //     [
    //       {
    //         key: 'cancel',
    //         text: '取消'
    //       }
    //     ]
    //   ]
    // })
  }

  return (
    <div className={`text-blue block ${className}`} onClick={onClick}>
      {name ? file[name] : file.fileName || '附件'}
    </div>
  )
}

export default FiewViewer
