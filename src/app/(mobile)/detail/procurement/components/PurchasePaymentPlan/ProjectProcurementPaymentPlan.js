import TableList from '@/components/TableList'

export default function ProductInfo({data}) {
  const columns = [
    {
      title: '付款日期',
      dataIndex: 'PLN_PAY_DATE',
      key: 'PLN_PAY_DATE',
    },
    {
      title: '计划付款金额',
      dataIndex: 'PLN_AMT',
      key: 'PLN_AMT',
    },
    {
      title: '可用付款金额',
      dataIndex: 'USABLE_AMT',
      key: 'USABLE_AMT',
    },
    {
      title: '本次付款金额',
      dataIndex: 'AMT',
      key: 'AMT'
    },
  ]
  return (
    <div className="overflow-x-auto text-black">
      <TableList columns={columns} dataSource={data} />
    </div>
  )
}
