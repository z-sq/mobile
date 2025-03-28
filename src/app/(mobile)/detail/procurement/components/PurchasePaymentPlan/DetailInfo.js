import TableList from '@/components/TableList'

export default function ProductInfo({data}) {
  // TODO 等数据修改对应字段
  const columns = [
    {
      title: '采购付款类型',
      dataIndex: 'OM_ORD_NO',
      key: 'OM_ORD_NO',
    },
    {
      title: '采购付款日期',
      dataIndex: 'OM_CON_NAME',
      key: 'OM_CON_NAME',
    },
    {
      title: '采购付款形式',
      dataIndex: 'ORD_NO',
      key: 'ORD_NO',
    },
    {
      title: '本次付款金额',
      dataIndex: 'ORD_NO',
      key: 'ORD_NO'
    },
    {
      title: '本次采购金额',
      dataIndex: 'ORD_NO',
      key: 'ORD_NO',
    }
  ]
  return (
    <div className="overflow-x-auto">
      <TableList columns={columns} dataSource={data} />
    </div>
  )
}
