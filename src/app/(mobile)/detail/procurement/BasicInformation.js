'use client'

import BasicFormItem from '../components/BasicInformation/BasicFormItem'

import Loading from '@/components/Loading'

const defaultData = {
  "BZS_SM_FLAG": "N",
  "TAX_TOT_AMT": "0.34",
  "CUR_CODE": "RMB",
  "TAX_TOT_AMT_HIS": null,
  "DEP_CODE": "10906",
  "PUR_PER_NAME": "李浩宇",
  "VEN_CODE": "GYS001",
  "MOD_REASON": "321",
  "ORD_NO": "2024103100010",
  "ORD_TOT_AMT_HIS": null,
  "ROWNUM_": "1",
  "CRE_CODE": "lhy",
  "ORD_NOTE_HIS": null,
  "PUR_PER_CODE": "lhy",
  "BIL_TYPE": "11",
  "ORD_NOTE": null,
  "COM_NAME": "北京机械工业自动化研究所有限公司软件分公司",
  "TAX_DESC": "增值税13",
  "DEP_NAME": "客户服务部",
  "PUR_MET_NAME": "直接采购",
  "CON_CLS_CODE": null,
  "TAX_RATE_HIS": null,
  "BUS_CLS_NAME": null,
  "TYP_DESC": null,
  "REC_VERSION": "1",
  "COM_CODE": "01",
  "PURC_BUD_AMT": null,
  "BUS_CLS_CODE": null,
  "MOD_REASON_HIS": null,
  "CRE_NAME": "李浩宇",
  "NOT_TAX_TOT_AMT": "260.69",
  "ORDER_AMT": null,
  "VAL_FLAG": "N",
  "SHI_EXP_FLAG_HIS": null,
  "SHI_EXP_FLAG": null,
  "UU_ID": "2ee9fafed3db4b318305d541d247de7d",
  "DOW_PAY_RATIO": null,
  "CRE_DATE": "2024/10/31",
  "SIG_DATE": "2024/10/31",
  "ORD_TOT_AMT": "261.03",
  "DOW_PAY_RATIO_HIS": null,
  "BZS_OA_DZQ_FLAG_HIS": null,
  "DOW_PAY_AMT_HIS": null,
  "BZS_OA_DZQ_FLAG": "N",
  "BZS_SM_FLAG_HIS": null,
  "NOT_TAX_TOT_AMT_HIS": null,
  "CUR_NAME": "人民币",
  "CON_NO_T": "0124001025",
  "VEN_NAME": "GYS供应商1",
  "CON_NO": "0124001025",
  "SPE_CLASS": null,
  "ORD_NAME": "20241031010",
  "REC_VERSION_OLD": null,
  "DOW_PAY_AMT": null,
  "TAX_RATE": "0.13",
  "PUR_MET_CODE": "01",
  "TAX_CODE": "13",
  "CON_CLS_NAME": null
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
                {/* TODO */}
                <BasicFormItem label="首付款" text={data.purTitle || ''} />
                <BasicFormItem label="首付比例(%)" text={data.purTitle || ''} />
              </tr>
              <tr>
                <BasicFormItem label="供方名称" text={data.VEN_NAME || ''} />
                {/* TODO */}
                <BasicFormItem label="业务分类" text={data.purTitle || ''} />
              </tr>
              <tr>
                <BasicFormItem label="税率" text={data.TAX_RATE || ''} />
                <BasicFormItem label="不含税金额" text={data.NOT_TAX_TOT_AMT || ''} />
              </tr>
              <tr>
                <BasicFormItem label="税金" text={data.TAX_TOT_AMT || ''} />
                {/* TODO */}
                <BasicFormItem label="合同类型" text={data.purTitle || ''} />
              </tr>
              <tr>
                <BasicFormItem label="合同模板号" text={data.purTitle || ''} />
                <BasicFormItem label="是否含运费" text={data.purTitle || ''} />
              </tr>
              <tr>
                <BasicFormItem label="合同额" text={data.ORD_TOT_AMT || ''} />
                {/* TODO */}
                <BasicFormItem label="SM" text={data.BZS_SM_FLAG || ''} />
              </tr>
              <tr>
                <BasicFormItem label="备注" text={data.purTitle || ''} textColSpan={3} />
              </tr>
              <tr>
                {/* TODO */}
                <BasicFormItem label="是否电子签章" text={data.BZS_OA_DZQ_FLAG || ''} />
                <BasicFormItem label="" text={''} />
              </tr>
              <tr>
                <BasicFormItem label="变更原因" text={data.MOD_REASON || ''} textColSpan={3} />
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}
