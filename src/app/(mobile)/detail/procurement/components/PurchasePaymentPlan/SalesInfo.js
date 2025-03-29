import TableList from '@/components/TableList'

export default function ProductInfo({data}) {
  // TODO 确认字段
  const columns = [
    {
      title: '项目号',
      dataIndex: 'OM_ORD_NO',
      key: 'OM_ORD_NO',
      width: '80px'
    },
    {
      title: '项目名称',
      dataIndex: 'ORD_NAME',
      key: 'ORD_NAME',
      width: '80px'
    },
    {
      title: '项目总金额',
      dataIndex: 'ORD_TOT_AMT',
      key: 'ORD_TOT_AMT',
      width: '80px'
    },
    {
      title: '已采购总金额',
      dataIndex: 'ALLO_AMT',
      key: 'ALLO_AMT',
      width: '80px'
    },
    {
      title: '本次采购金额',
      dataIndex: 'CURR_PM_AMT',
      key: 'CURR_PM_AMT',
      width: '80px'
    }
  ]
  return (
    <div className="overflow-x-auto">
      <TableList columns={columns} dataSource={data} />
    </div>
  )
}
