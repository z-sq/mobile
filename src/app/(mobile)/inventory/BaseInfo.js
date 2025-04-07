'use client'

import BasicFormItem from './components/BasicFormItem'

import Loading from '@/components/Loading'


export default function BasicInformation({ style = {},data }) {

  return (
    <div
      className="text-12px px-10px py-10px h-[100%] overflow-y-auto"
      style={style}
    >
      {!data ? (
        <Loading />
      ) : (
        <table className="w-full">
          <tbody>
            <tr>
              <BasicFormItem label="申请单号" text={data.REQ_NO || ''} />
              <BasicFormItem label="公司" text={data.COM_NAME || ''} />
            </tr>
            <tr>
              <BasicFormItem label="申请日期" text={data.REQ_DATE || ''} />
              <BasicFormItem label="业务部门" text={data.DEP_NAME || ''} />
            </tr>
            <tr>
              <BasicFormItem label="业务人员" text={data.REQ_PER_NAME || ''} />
              <BasicFormItem label="业务类型" text={data.BUS_NAME || ''} />
            </tr>
            <tr>
              <BasicFormItem label="申请单名称" text={data.REQ_NAME || ''} />
              <BasicFormItem label="工作令" text={data.WOR_NAME || ''} />
            </tr>
            <tr>
              <BasicFormItem label="项目号" text={data.TRA_ORD_NO || ''} />
              <BasicFormItem label="" text={ ''} />
            </tr>
            <tr>
              <BasicFormItem
                label="备注"
                text={data.REMARKS || ''}
                textColSpan={3}
              />
            </tr>
          </tbody>
        </table>
      )} 
    </div>
  )
}
