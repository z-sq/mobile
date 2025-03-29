import TableList from '@/components/TableList'

// TODO 静态数据
const defaultData = [
    {
        "IN_AMT": "32.08522",
        "PM_OTHER_AMT": "3972.72",
        "PM_OTHER_TOT_AMT": "4299.26",
        "CON_NO": "0124001025",
        "ORD_NAME": "ar-测试",
        "ORD_NO": "2024103100010",
        "UU_ID": "e9ff2fba77764aac8081dc6a2dd7576d",
        "ROWNUM_": "1",
        "COM_CODE": "01",
        "OUT_AMT": "3.83522",
        "CURR_PM_AMT": "236.17",
        "ORD_TOT_AMT": "1122914",
        "OM_BUD_AMT": "100000",
        "OM_ORD_NO": "0124001025",
        "PM_NOW_AMT": "235.86"
    }
]
export default function ProductInfo({data = defaultData}) {
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
