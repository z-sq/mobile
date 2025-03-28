'use client'

import BasicFormItem from '../../components/BasicInformation/BasicFormItem'

import Loading from '@/components/Loading'

export default function BasicInformation({ data }) {
  return (
    <div className="text-12px px-10px py-10px h-[100%] overflow-y-auto">
      {!data ? (
        <Loading />
      ) : (
        <>
          <table className="w-full">
            <tbody>
              <tr>
                <BasicFormItem label="采购合同号" text={data.ORD_NO || ''} />
                <BasicFormItem label="单位" text={data.COM_NAME || ''} />
              </tr>
              <tr>
                {/* TODO */}
                <BasicFormItem label="申请日期" text={data.purTitle || ''} />
                <BasicFormItem label="业务部门" text={data.DEP_NAME || ''} />
              </tr>
              <tr>
                <BasicFormItem label="采购员" text={data.CRE_NAME || ''} />
                <BasicFormItem label="采购内容" text={data.ORD_NAME || ''} />
              </tr>
              <tr>
                <BasicFormItem label="采购方式" text={data.PUR_MET_NAME || ''} />
                <BasicFormItem label="币别" text={data.CUR_NAME || ''} />
              </tr>
              <tr>
                <BasicFormItem label="首付款" text={data.DOW_PAY_AMT || ''} />
                <BasicFormItem label="首付比例(%)" text={data.DOW_PAY_RATIO || ''} />
              </tr>
              <tr>
                <BasicFormItem label="供方名称" text={data.VEN_NAME || ''} />
                <BasicFormItem label="业务分类" text={data.BUS_CLS_NAME || ''} />
              </tr>
              <tr>
                <BasicFormItem label="税率" text={data.TAX_RATE || ''} />
                <BasicFormItem label="不含税金额" text={data.NOT_TAX_TOT_AMT || ''} />
              </tr>
              <tr>
                <BasicFormItem label="税金" text={data.TAX_TOT_AMT || ''} />
                <BasicFormItem label="合同类型" text={data.TYP_DESC || ''} />
              </tr>
              <tr>
                <BasicFormItem label="合同模板号" text={data.CON_CLS_CODE || ''} />
                <BasicFormItem label="是否含运费" text={data.SHI_EXP_FLAG || ''} />
              </tr>
              <tr>
                <BasicFormItem label="合同额" text={data.ORD_TOT_AMT || ''} />
                <BasicFormItem label="SM" text={data.BZS_SM_FLAG || ''} />
              </tr>
              <tr>
                <BasicFormItem label="备注" text={data.ORD_NOTE || ''} textColSpan={3} />
              </tr>
              <tr>
                <BasicFormItem label="是否电子签章" text={data.BZS_OA_DZQ_FLAG || ''} />
                <BasicFormItem label="" text={''} />
              </tr>
              <tr>
                {/* TODO */}
                <BasicFormItem label="变更原因" text={data.MOD_REASON || ''} textColSpan={3} />
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}
