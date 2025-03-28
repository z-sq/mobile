'use client'

import { observer } from 'mobx-react'
import { useStores } from '@/utils/useStores'
import { Collapse } from 'antd-mobile'
import SalesInfo from './SalesInfo'
import ProjectProcurementPaymentPlan from './ProjectProcurementPaymentPlan'
import BasicInformation from './BasicInformation'
import DetailInfo from './DetailInfo'
import SectionTitle from '@/components/SectionTitle'

import { useState, useEffect } from 'react'

// 调试参数
const _params = {
  COM_CODE: '01',
  COM_NAME: '北京机械工业自动化研究所有限公司软件分公司',
  UPD_CODE: 'lhy',
  DEP_NAME: '客户服务部',
  PUR_PER_NAME: '李浩宇',
  ORD_NO: '2024103100010',
  CON_NO: '0124001025',
  ORD_TOT_AMT: 1122914,
  ALLO_AMT: 'null',
  CURR_PM_AMT: 236.17
}
const PurchasePaymentPlan = observer(({ apiParams = _params }) => {
  const [salesInfoData, setSalesInfoData] = useState([])
  const [projectData, setProjectData] = useState([])
  const [basicInfoData, setBasicInfoData] = useState({})
  const [detailInfoData, setDetailInfoData] = useState([])

  const {
    approveStore: { currentInfo }
  } = useStores()

  // 基本信息
  const getBaseInfo = async () => {
    const {
      COM_CODE,
      COM_NAME,
      UPD_CODE,
      DEP_NAME,
      PUR_PER_NAME,
      ORD_NO,
      CON_NO,
      ORD_TOT_AMT,
      ALLO_AMT,
      CURR_PM_AMT
    } = apiParams
    try {
      const result = await request(
        '/business/pm/auto/pm_cgfk_sp/query/headpanel',
        'GET',
        {
          params: JSON.stringify({
            COM_CODE,
            COM_NAME,
            UPD_CODE,
            DEP_NAME,
            PUR_PER_NAME,
            ORD_NO,
            CON_NO,
            ORD_TOT_AMT,
            ALLO_AMT,
            CURR_PM_AMT
          }),
          page: 1,
          start: 0,
          limit: 200
        }
      )
      if (result?.success) {
        const baseInfo = result.data.find(
          (item) => item.UU_ID == currentInfo.uuid
        )
        setBasicInfoData(baseInfo || {})
      } else {
        // 错误提示
      }
    } catch (err) {}
  }

  async function getTableListData(url, callback) {
    const { COM_CODE, COM_NAME, UPD_CODE, ORD_NO, CON_NO } = apiParams
    try {
      const result = await request(url, 'GET', {
        params: JSON.stringify({
          COM_CODE,
          COM_NAME,
          UPD_CODE,
          ORD_NO,
          CON_NO
        }),
        page: 1,
        start: 0,
        limit: 200
      })
      if (result?.success) {
        callback(result.data || [])
      } else {
        // 错误提示
      }
    } catch (err) {}
  }

  useEffect(() => {
    // 基本信息
    getBaseInfo()
    // 销售信息
    getTableListData(
      'business/pm/auto/pm_cgfk_sp/query/uppanel',
      setSalesInfoData
    )
    // 明细信息
    getTableListData(
      '/business/pm/auto/pm_cgfk_sp/query/downpane',
      setDetailInfoData
    )
    // 项目采购计划信息
    getTableListData(
      '/business/pm/auto/pm_cgfk_sp/query/centerpanel',
      setProjectData
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Collapse accordion defaultActiveKey={'3'}>
      <Collapse.Panel key="1" title="销售合同信息">
        <div className="text-black -m-3">
          <SalesInfo data={salesInfoData} />
        </div>
      </Collapse.Panel>
      <Collapse.Panel key="2" title="项目采购付款计划">
        <div className="text-black -m-3">
          <ProjectProcurementPaymentPlan data={projectData} />
        </div>
      </Collapse.Panel>
      <Collapse.Panel key="3" title="采购付款计划">
        <div className="text-black -m-3">
          <div className="mx-3">
            <SectionTitle title="基本信息" />
          </div>
          <BasicInformation data={basicInfoData} />
          <div className="mx-3">
            <SectionTitle title="明细信息" />
          </div>
          <DetailInfo data={detailInfoData} />
        </div>
      </Collapse.Panel>
    </Collapse>
  )
})

export default PurchasePaymentPlan
