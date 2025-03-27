import TableList from '@/components/TableList'

// TODO 静态数据
const defaultData = [
  {
      "REC_AMT": null,
      "OM_ORD_NO_HIS": null,
      "CUR_CODE": "RMB",
      "REC_FLAG": null,
      "EXE_CON_DATE": null,
      "CUS_ORD_NO": "0124001025",
      "VAL_DATE": "2024/10/31",
      "REMARKS": null,
      "OM_CON_NAME": "ar-测试",
      "QTY_HIS": null,
      "MOD_REASON": null,
      "CUS_NAME_HIS": null,
      "ROWNUM_": "1",
      "PUR_PER_CODE": "lhy",
      "CUS_CODE": "F00002",
      "REM_INPUT_HIS": null,
      "POI_ITE": null,
      "REC_NAME": "GYS供应商1",
      "VEN_ABV": "GYS供应商1",
      "TAX_DESC": "增值税13",
      "TAX_PRICE": "12.43",
      "PM_UNI_NAME_HIS": null,
      "TYP_CLASS": null,
      "COLOUR": null,
      "REC_QTY": null,
      "TAX_RATE_HIS": null,
      "CHA_CODE": null,
      "ATT_CLS_NAME_HIS": null,
      "PRO_ADDR": null,
      "REQ_TIME": null,
      "TRA_ORD_NO": "0124001025",
      "TRA_DESC": null,
      "PRICE_HIS": null,
      "PM_UNI_CODE": "jian",
      "TRA_MODE": null,
      "OM_ORD_NAME": "ar-测试",
      "OM_ORD_NO": "0124001025",
      "SOU_TYPE": null,
      "PM_CLS_CODE": null,
      "ARR_DATE_HIS": null,
      "EXE_CON_PER_NAME": null,
      "EXC_RATE": null,
      "GRO_NAME": null,
      "URG_FLAG": null,
      "ITE_NOTE": null,
      "CHA_MAN_CODE": null,
      "ITE_CODE": "001",
      "SAL_AMT": null,
      "BID_TAX_PRICE": "12.43",
      "CHA_TIME": null,
      "END_FLAG": "N",
      "QUA_QTY": null,
      "PM_UNI_NAME": "件",
      "SEQ_NO": "1",
      "CHA_MAN_NAME": null,
      "SIG_DATE": "2024/10/31",
      "SRC_UU_ID": null,
      "FACTORY": null,
      "END_CAU_DESC": null,
      "SEC_UNI_NAME": null,
      "REC_ABV": "GYS供应商1",
      "CHA_DATE": null,
      "BIL_NAME": "GYS供应商1",
      "VEN_NAME": "GYS供应商1",
      "ITE_MODEL_HIS": null,
      "CON_NO": "0124001025",
      "SCR_QTY": null,
      "MAN_CODE": null,
      "REC_VERSION_OLD": null,
      "MAN_ABV": null,
      "ATT_CLS_NAME": "物料",
      "RS_ID": null,
      "CON_NO_HIS": null,
      "IN_QTY": null,
      "ITE_NORM_HIS": null,
      "BUY_NAME": null,
      "PRI_SOURCE": null,
      "REC_CODE": "GYS001",
      "SEC_UNI": null,
      "DEP_CODE": "10906",
      "REM_INPUT": null,
      "CUS_NAME": "北京小米测试公司",
      "PUR_PER_NAME": "李浩宇",
      "END_DATE": null,
      "VEN_CODE": "GYS001",
      "ORD_NO": "2024103100010",
      "TAX_AMT": "0.31",
      "RET_QTY": null,
      "INV_AMT": null,
      "BIL_TYPE": "11",
      "QTY": "19",
      "CHA_NAME": null,
      "FACTORY_HIS": null,
      "BUY_CODE": null,
      "PM_CLS_NAME": null,
      "DRA_NO": null,
      "FREE_FLAG": "N",
      "ORD_AMT_HIS": null,
      "AP_REC_FLAG": null,
      "PRICE": "11",
      "UU_ID_HIS": null,
      "ITE_CODE_HIS": null,
      "GRO_ID": null,
      "MOD_MAN_ID": null,
      "REC_VERSION": "1",
      "COM_CODE": "01",
      "ITE_NAME_HIS": null,
      "BIL_ABV": "GYS供应商1",
      "BIL_CODE": "GYS001",
      "NOT_TAX_AMT_HIS": null,
      "TIC_QTY": "0",
      "CON_QTY": null,
      "ITE_NORM": "茶杯A",
      "LOT_NO": null,
      "NOT_TAX_AMT": "235.86",
      "REC_DATE": null,
      "ITE_STYLE": "M",
      "LOT_SEQ": null,
      "TAX_PRICE_HIS": null,
      "SEC_QTY": null,
      "TAX_AMT_HIS": null,
      "VAL_FLAG": "Y",
      "ORD_AMT": "236.17",
      "POI_ITE_FLAG": null,
      "UU_ID": "58167681193b468ebe92f864ccbdcfbf",
      "MAN_NAME": null,
      "TEC_DEMAND": null,
      "ARR_DATE": "2024/10/31",
      "ITE_VERSION": null,
      "CUS_CODE_HIS": null,
      "BUY_ID": "  lhy",
      "SOU_DESC": null,
      "END_CAUSE": null,
      "CUR_NAME": "人民币",
      "ATT_CLS_CODE": "M",
      "DIS_FLAG": null,
      "WAY_FLAG": null,
      "OM_CON_NAME_HIS": null,
      "COO_FLAG": null,
      "ITE_NAME": "茶杯",
      "EXE_CON_FLAG": null,
      "ITE_MODEL": "茶杯A",
      "EXE_CON_PER_CODE": null,
      "TAX_RATE": "0.13",
      "AUDIT_FLAG": null,
      "FIX_CON_QTY": null,
      "TAX_CODE": "13",
      "SRC_TAB_NAME": null,
      "QTY_DIF_RATE": null
  }
]
export default function ProductInfo({data = defaultData}) {
  const columns = [
    {
      title: '物料专用分类',
      dataIndex: 'ATT_CLS_NAME',
      key: 'ATT_CLS_NAME',
    },
    {
      title: '物料编码',
      dataIndex: 'ITE_CODE',
      key: 'venName'
    },
    {
      title: '物料名称',
      dataIndex: 'ITE_NAME',
      key: 'ITE_NAME',
    },
    {
      title: '规格',
      dataIndex: 'ITE_NORM',
      key: 'ITE_NORM'
    },
    ,
    {
      title: '型号',
      dataIndex: 'ITE_MODEL',
      key: 'ITE_MODEL',
    },
    ,
    {
      title: '项目号',
      dataIndex: 'OM_ORD_NO',
      key: 'OM_ORD_NO',
    },
    {
      title: '项目名称',
      dataIndex: 'OM_CON_NAME',
      key: 'OM_CON_NAME',
    }
  ]
  return (
    <div className="overflow-x-auto pt-4">
      <TableList columns={columns} dataSource={data} />
    </div>
  )
}
