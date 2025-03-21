import { useRouter } from 'next/navigation'

import BasicFormItem from '../components/BasicInformation/BasicFormItem'
import FiewViewer from '../components/FileViewer'

import Loading from '@/components/Loading'
import TableList from '@/components/TableList'
import { BASE_PATH } from '@/config/app'
import { addCommas } from '@/utils/method'
import { useStores } from '@/utils/useStores'

export default function BasicInformation({
  data,
  procCode,
  pagCode,
  supplierData,
  state,
  purMet,
  attaDataList = []
}) {
  const router = useRouter()

  const {
    approveStore: { updateVenName }
  } = useStores()

  const columns = [
    {
      title: pagCode === 'tp2032' ? '中标' : '成交',
      // dataIndex: 'winFlag',
      key: 'winFlag',
      backgroundImage: (param) => {
        if (param === 'Y') return `url('${BASE_PATH}/images/select.png')`
        return ''
      },
      width: '32px'
    },
    {
      title: '供应商名称',
      dataIndex: 'venName',
      key: 'venName'
    },
    {
      title: '得分',
      dataIndex: 'sumScore',
      key: 'sumScore',
      width: '32px'
    },
    {
      title: '中标总金额',
      dataIndex: 'winSumAmt',
      key: 'winSumAmt'
    },
    ,
    {
      title: '币别',
      dataIndex: 'curName',
      key: 'curName',
      width: '48px'
    },
    ,
    {
      title: '税率',
      dataIndex: 'taxRate',
      key: 'taxRate',
      width: '32px'
    },
    {
      title: '明细',
      key: 'bilNo',
      onClick: (param, row) => {
        updateVenName(row.venName)
        router.push(
          '/detail/bid/detail?key=' +
            param +
            '&type=' +
            procCode +
            '&taxRegNo=' +
            row.taxRegNo +
            '&state=' +
            state +
            '&pagCode=' +
            pagCode +
            '&purMet' +
            purMet
        )
      },
      backgroundImage: (param) => {
        return `url('${BASE_PATH}/images/detail.png')`
      },
      width: '32px'
    }
  ]

  return (
    <div className="text-12px px-10px py-10px h-[100%] overflow-y-auto">
      {!data ? (
        <Loading />
      ) : (
        <>
          <table className="w-full">
            <tbody>
              <tr>
                <BasicFormItem label="采购名称" text={data.purTitle || ''} />
                <BasicFormItem label="项目名称" text={data.proName || ''} />
              </tr>
              <tr>
                <BasicFormItem label="采购内容" text={data.purName || ''} />
                <BasicFormItem label="业务分类" text={data.busClsName || ''} />
              </tr>
              <tr>
                <BasicFormItem
                  label={`预算金额${data.curName ? '（' + data.curName + '）' : ''}`}
                  text={addCommas(data.bugAmt)}
                />
                <BasicFormItem label="采购方式" text={data.purMetName || ''} />
              </tr>
              <tr>
                <BasicFormItem label="委托代理机构" text={data.autAge || ''} />
                <BasicFormItem label="资格审查" text={data.quaExaName || ''} />
              </tr>
              <tr>
                <BasicFormItem label="完成日期" text={data.finDate || ''} />
                <BasicFormItem label="签约类型" text={data.conName || ''} />
              </tr>
              <tr>
                <BasicFormItem
                  label={pagCode === 'tp2032' ? '中标日期' : '成交日期'}
                  text={data.reqDate || ''}
                />
                <BasicFormItem
                  label="附件"
                  text={() => {
                    return attaDataList.map((atta, index) => (
                      <FiewViewer key={index} className="pr-4" file={atta} />
                    ))
                  }}
                />
              </tr>
              <tr>
                <BasicFormItem
                  label="备注"
                  text={data.remarks || ''}
                  textColSpan={3}
                />
              </tr>
              {data.chaFlag === 'Y' ? (
                <tr>
                  <BasicFormItem
                    label="变更原因"
                    text={data.chaCause || ''}
                    textColSpan={3}
                  />
                </tr>
              ) : null}
            </tbody>
          </table>
          <div className="text-12px mt-16px">
            {pagCode === 'tp2032' ? '中标信息' : '成交信息'}
          </div>
          <div className="text-12px mt-10px w-full">
            <TableList
              columns={columns}
              dataSource={supplierData}
              orderColumn={true}
            />
          </div>
        </>
      )}
    </div>
  )
}
