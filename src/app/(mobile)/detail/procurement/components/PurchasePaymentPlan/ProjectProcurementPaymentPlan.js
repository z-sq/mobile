import TableList from '@/components/TableList'

// TODO 静态数据
const defaultData = [
    {
        "ORD_NO_T": "0124001025",
        "COM_CODE": "01",
        "PLN_AMT": "100",
        "USABLE_AMT": "100",
        "CUR_CODE": "RMB",
        "OCUP_AMT": null,
        "CUR_NAME": "人民币",
        "AMT": null,
        "PLN_PAY_DATE": "2024/09/22",
        "UU_ID": "6ebbd9aea91341468ee24cecbbe5471e",
        "ROWNUM_": "1"
    },
    {
        "ORD_NO_T": "0124001025",
        "COM_CODE": "01",
        "PLN_AMT": "100",
        "USABLE_AMT": "100",
        "CUR_CODE": "RMB",
        "OCUP_AMT": null,
        "CUR_NAME": "人民币",
        "AMT": null,
        "PLN_PAY_DATE": "2024/09/30",
        "UU_ID": "c9edf1cbd95e4df3abffa5843fc95887",
        "ROWNUM_": "2"
    },
    {
        "ORD_NO_T": "0124001025",
        "COM_CODE": "01",
        "PLN_AMT": "30000",
        "USABLE_AMT": "30000",
        "CUR_CODE": "RMB",
        "OCUP_AMT": null,
        "CUR_NAME": "人民币",
        "AMT": null,
        "PLN_PAY_DATE": "2024/10/01",
        "UU_ID": "0844ece9859a4533a10a41254de4d357",
        "ROWNUM_": "3"
    },
    {
        "ORD_NO_T": "0124001025",
        "COM_CODE": "01",
        "PLN_AMT": "100",
        "USABLE_AMT": "40",
        "CUR_CODE": "RMB",
        "OCUP_AMT": "60",
        "CUR_NAME": "人民币",
        "AMT": null,
        "PLN_PAY_DATE": "2024/10/19",
        "UU_ID": "7cae0353dfcc471eaa7c9e4b62bfb353",
        "ROWNUM_": "4"
    },
    {
        "ORD_NO_T": "0124001025",
        "COM_CODE": "01",
        "PLN_AMT": "700",
        "USABLE_AMT": "356.01",
        "CUR_CODE": "RMB",
        "OCUP_AMT": "343.99",
        "CUR_NAME": "人民币",
        "AMT": "12",
        "PLN_PAY_DATE": "2024/10/31",
        "UU_ID": "838d8b88e7444783bd8d94726143a55c",
        "ROWNUM_": "5"
    },
    {
        "ORD_NO_T": "0124001025",
        "COM_CODE": "01",
        "PLN_AMT": "60000",
        "USABLE_AMT": "59990.01",
        "CUR_CODE": "RMB",
        "OCUP_AMT": "9.99",
        "CUR_NAME": "人民币",
        "AMT": null,
        "PLN_PAY_DATE": "2024/11/01",
        "UU_ID": "e1a4d4c4aed243c187af5538f41ef528",
        "ROWNUM_": "6"
    },
    {
        "ORD_NO_T": "0124001025",
        "COM_CODE": "01",
        "PLN_AMT": "10000",
        "USABLE_AMT": "9753.12",
        "CUR_CODE": "RMB",
        "OCUP_AMT": "246.88",
        "CUR_NAME": "人民币",
        "AMT": null,
        "PLN_PAY_DATE": "2024/12/01",
        "UU_ID": "0cb6de074d0948c8a5a56d45aad6453e",
        "ROWNUM_": "7"
    }
]
export default function ProductInfo({data = defaultData}) {
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
