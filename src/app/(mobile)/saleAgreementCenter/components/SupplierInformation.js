'use client'

import { useSearchParams } from 'next/navigation'

import TableList from '@/components/TableList'
import { typeMap } from '@/config/configData'

export default function SupplierInformation({ data }) {
  const searchParams = useSearchParams()
  const busKeyValue = searchParams.get('key')
  const pagCode = searchParams.get('pagCode')
  const wfType = typeMap[pagCode]?.pagCode
  const busKey = typeMap[pagCode]?.busKey

  const columns = [
    {
      title: '供应商名称',
      dataIndex: 'venName',
      key: 'venName',
      fixed: true,
      width: '140px'
    },
    wfType === 'tp2800'
      ? {
          title: '供应商业务类型',
          dataIndex: 'typGName',
          key: 'typGName',
          width: '140px'
        }
      : {
          title: '供应商业务类型',
          dataIndex: 'venTypeName',
          key: 'venTypeName',
          width: '140px'
        },
    {
      title: '供货方式',
      dataIndex: 'supClsNameNew',
      key: 'supClsNameNew',
      width: '120px'
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      key: 'remarks',
      width: '100px'
    }
  ]
  return (
    <div className="text-12px px-10px py-10px h-[100%] w-full overflow-y-auto">
      <TableList
        columns={columns}
        dataSource={data}
        orderColumn={true}
        width={528}
      />
    </div>
  )
}
