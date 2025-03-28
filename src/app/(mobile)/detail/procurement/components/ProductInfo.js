import TableList from '@/components/TableList'


export default function ProductInfo({ data }) {
  const columns = [
    {
      title: '物料专用分类',
      dataIndex: 'ATT_CLS_NAME',
      key: 'ATT_CLS_NAME',
      width: '80px'
    },
    {
      title: '物料编码',
      dataIndex: 'ITE_CODE',
      key: 'venName',
      width: '80px'
    },
    {
      title: '物料名称',
      dataIndex: 'ITE_NAME',
      key: 'ITE_NAME',
      width: '80px'
    },
    {
      title: '规格',
      dataIndex: 'ITE_NORM',
      key: 'ITE_NORM',
      width: '80px'
    },
    {
      title: '型号',
      dataIndex: 'ITE_MODEL',
      key: 'ITE_MODEL',
      width: '80px'
    },
    {
      title: '项目号',
      dataIndex: 'CON_NO',
      key: 'CON_NO',
      width: '80px'
    },
    {
      title: '项目名称',
      dataIndex: 'OM_CON_NAME',
      key: 'OM_CON_NAME',
      width: '80px'
    },
    {
      title: '客户名称',
      dataIndex: 'CUS_NAME',
      key: 'CUS_NAME',
      width: '80px'
    },
    {
      title: '品牌/厂家',
      dataIndex: 'FACTORY',
      key: 'FACTORY',
      width: '80px'
    },
    {
      title: '数量',
      dataIndex: 'QTY',
      key: 'QTY',
      width: '80px'
    },
    {
      title: '采购计量单位',
      dataIndex: 'PM_UNI_NAME',
      key: 'PM_UNI_NAME',
      width: '80px'
    },
    {
      title: '不含税单价',
      dataIndex: 'PRICE',
      key: 'PRICE',
      width: '80px'
    },
    {
      title: '不含税金额',
      dataIndex: 'NOT_TAX_AMT',
      key: 'NOT_TAX_AMT',
      width: '80px'
    },
    {
      title: '税率',
      dataIndex: 'TAX_RATE',
      key: 'TAX_RATE',
      width: '80px'
    },
    {
      title: '税金',
      dataIndex: 'TAX_AMT',
      key: 'TAX_AMT',
      width: '80px'
    },
    {
      title: '含税单价',
      dataIndex: 'TAX_PRICE',
      key: 'TAX_PRICE',
      width: '80px'
    },
    {
      title: '总金额',
      dataIndex: 'ORD_AMT',
      key: 'ORD_AMT',
      width: '80px'
    },
    {
      title: '到货日期',
      dataIndex: 'ARR_DATE',
      key: 'ARR_DATE',
      width: '80px'
    },
    {
      title: '货期',
      dataIndex: 'REM_INPUT',
      key: 'REM_INPUT',
      width: '80px'
    }
  ]
  return (
    <div className="overflow-x-auto pt-4">
      <TableList columns={columns} dataSource={data} />
    </div>
  )
}
