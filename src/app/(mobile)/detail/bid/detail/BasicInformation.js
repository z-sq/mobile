'use client'

import { observer } from 'mobx-react'
import { useRef } from 'react'

import BasicFormItem from '../../components/BasicInformation/BasicFormItem'
import MaterialInformation from '../../components/MaterialInformation'

import Loading from '@/components/Loading'
import { useStores } from '@/utils/useStores'

const columns = [
  {
    title: '物料名称',
    dataIndex: 'matName',
    key: 'matName',
    fixed: true,
    width: '80px'
  },
  {
    title: '规格',
    dataIndex: 'matNorm',
    key: 'matNorm',
    width: '80px'
  },
  {
    title: '型号',
    dataIndex: 'matModel',
    key: 'matModel',
    width: '80px'
  },
  {
    title: '图号',
    dataIndex: 'draNo',
    key: 'draNo',
    width: '80px'
  },
  {
    title: '品牌/厂家',
    dataIndex: 'factory',
    key: 'factory',
    width: '80px'
  },
  {
    title: '单位',
    dataIndex: 'pmUniName',
    key: 'pmUniName',
    width: '80px'
  },
  {
    title: '数量',
    dataIndex: 'qty',
    key: 'qty',
    width: '80px'
  },
  {
    title: '尺寸',
    dataIndex: 'size',
    key: 'size',
    width: '80px'
  },
  {
    title: '重量',
    dataIndex: 'sinWeight',
    key: 'sinWeight',
    width: '80px'
  },
  {
    title: '总重',
    dataIndex: 'totWeight',
    key: 'totWeight',
    width: '80px'
  },
  {
    title: '含税单价',
    dataIndex: 'taxPrice',
    key: 'taxPrice',
    width: '80px'
  },
  {
    title: '材料含税单价',
    dataIndex: 'matTaxPrice',
    key: 'matTaxPrice',
    width: '80px'
  },
  {
    title: '币别',
    dataIndex: 'curName',
    key: 'curName',
    width: '80px'
  },
  {
    title: '税率',
    dataIndex: 'taxRate',
    key: 'taxRate',
    width: '80px'
  },
  {
    title: '中标金额',
    dataIndex: 'winBidAmt',
    key: 'winBidAmt',
    width: '80px'
  },
  {
    title: '备注',
    dataIndex: 'remarks',
    key: 'remarks',
    width: '100px'
  }
]

const BasicInformation = observer(
  ({ data, tableData, tableTotal, taxRegNo }) => {
    // const [nameHeight, setNameHeight] = useState(0)
    // const [timeHeight, setTimeHeight] = useState(0)

    const nameRef = useRef(null)
    const timeRef = useRef(null)

    const {
      approveStore: { venName }
    } = useStores()

    // useEffect(() => {
    //   if (timeRef.current) {
    //     const computedHeight = timeRef.current.offsetHeight
    //     setTimeHeight(computedHeight)
    //   }
    //   if (nameRef.current) {
    //     const computedHeight = nameRef.current.offsetHeight
    //     setNameHeight(computedHeight)
    //   }
    // }, [timeRef, nameRef, tableData])

    return (
      <div className="text-12px px-10px py-10px h-[100%] overflow-y-auto">
        {!tableData ? (
          <Loading />
        ) : (
          <>
            <div className="text-12px mt-[12px]" ref={nameRef}>
              {venName}
            </div>
            <table className="mt-[12px] w-full" ref={timeRef}>
              <tbody>
                {/* <tr>
                  <td className={tdLabelClass}>有效期（开始）</td>
                  <td className={tdTextClass}>{data.depName || ''}</td>
                  <td className={tdLabelClass}>有效期（结束）</td>
                  <td className={tdTextClass}>{data.perName || ''}</td>
                </tr> */}
                <tr>
                  <BasicFormItem
                    label="结算方式"
                    text={data.bilTypName || ''}
                  />
                  <BasicFormItem
                    label="付款方式"
                    text={data.payMetName || ''}
                  />
                </tr>
                <tr>
                  <BasicFormItem label="付款比例" text={data.payPer || ''} />
                  <BasicFormItem label="承诺交货期" text={data.delDate || ''} />
                </tr>
                <tr>
                  <BasicFormItem
                    label="备注"
                    text={data.remarks || ''}
                    textColSpan={3}
                  />
                </tr>
              </tbody>
            </table>
            <div
              className="mt-[16px]"
              // style={{
              //   height: `calc(100% - ${nameHeight + timeHeight + 40}px)`
              // }}
            >
              <MaterialInformation
                data={tableData}
                total={tableTotal}
                style={{ padding: '0' }}
                columns={columns}
                width={1328}
                params={{ taxRegNo: taxRegNo }}
              />
            </div>
          </>
        )}
      </div>
    )
  }
)

export default BasicInformation
