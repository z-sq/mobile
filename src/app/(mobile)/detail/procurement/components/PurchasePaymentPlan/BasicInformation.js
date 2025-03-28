'use client'

import BasicFormItem from '@/components/BasicFormItem'

import Loading from '@/components/Loading'

const defaultData = {
  "DEP_CODE": "10906",
  "VEN_NAME": "GYS供应商1",
  "VEN_CODE": "GYS001",
  "CON_NO": "0124001025",
  "ORD_NO": "2024103100010",
  "UU_ID": "2ee9fafed3db4b318305d541d247de7d",
  "ROWNUM_": "1",
  "COM_CODE": "01",
  "EDT_DATE": "2024/10/31",
  "PAY_TOT_AMT": "12",
  "AUD_TEXT": null,
  "COM_NAME": "北京机械工业自动化研究所有限公司软件分公司",
  "ORD_TOT_AMT": "261.03",
  "EDT_NAME": "李浩宇",
  "DEP_NAME": "客户服务部",
  "EDT_CODE": "lhy"
}

export default function BasicInformation({ data = defaultData }) {
  return (
    <div className="text-12px px-10px py-10px h-[100%] overflow-y-auto">
      {!data ? (
        <Loading />
      ) : (
        <>
          <table className="w-full">
            <tbody>
              <tr>
                <BasicFormItem label="单位" text={data.COM_NAME || ''} />
                <BasicFormItem label="业务部门" text={data.DEP_NAME || ''} />
              </tr>
              <tr>
                <BasicFormItem label="采购员" text={data.CRE_NAME || ''} />
                <BasicFormItem label="采购员合同号" text={data.ORD_NO || ''} />
              </tr>
              <tr>
                <BasicFormItem label="合同额" text={data.ORD_TOT_AMT || ''} />
                <BasicFormItem label="供方名称" text={data.VEN_NAME || ''} />
              </tr>
              <tr>
                <BasicFormItem label="计划付款总金额" text={data.PAY_TOT_AMT || ''} />
                <BasicFormItem label="" text={''} />
              </tr>
              <tr>
                <BasicFormItem label="审批意见" text={data.AUD_TEXT || ''} textColSpan={3} />
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}
