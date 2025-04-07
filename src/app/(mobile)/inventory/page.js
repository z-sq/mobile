"use client";

import { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { useStores } from "@/utils/useStores";
import { useRouter } from "next/navigation";
import { Tabs, Dialog } from "antd-mobile";

import Title from "@/components/Title";
import BasicInfo from "./BaseInfo";
import DynamicTable from "@/components/DynamicTable";
import ApprovalOpinion from "@/components/ApprovalOpinion";
import ApproveTool from "@/components/ApproveTool";

import request from "@/utils/request";

const Page = () => {
  const router = useRouter();
  const [baseInfo, setBaseInfo] = useState({});
  const[tableData,setTableData]=useState([])
  const [hasMore,setHasMore]=useState(true)
  const {
    approveStore: { currentInfo },
  } = useStores();

  const tableColumns = [
    { width:150,
      title: "计划分类",
      dataIndex: "PAY_KIN_NAME",
      sorter: true,
    },
    {
      width:150,
      title: "物件名称",
      dataIndex: "BANK",
      sorter: true,
    },
    {
      width:150,
      title: "规格",
      dataIndex: "BAN_ID",
      sorter: true,
    },
    {
      width:150,
      title: "型号",
      dataIndex: "BAN_BIL_ID",
      sorter: true,
    },
    {
      width:150,
      title: "技术特征",
      dataIndex: "KIN_NAME",
      sorter: true,
    },
    {
      width:150,
      title: "颜色",
      dataIndex: "TYP_NAME",
      sorter: true,
    },
    {
      width:150,
      title: "品牌/厂家",
      dataIndex: "BIL_ID",
      sorter: true,
    },
    {
      width:150,
      title: "生产地",
      dataIndex: "APP_AMT",
      sorter: true,
    },
    {
      width:150,
      title: "批号",
      dataIndex: "LIM_DATE",
      sorter: true,
    },
    {
      width:150,
      title: "单位",
      dataIndex: "COM_DATE",
      sorter: true,
    },
    {
      width:150,
      title: "申请数量",
      dataIndex: "VEN_BANK",
      sorter: true,
    },
    {
      width:150,
      title: "出库仓库",
      dataIndex: "VEN_BAN_ID",
      sorter: true,
    },
    {
      width:150,
      title: "需求日期",
      dataIndex: "VEN_BAN_ID",
      sorter: true,
    },
    {
      width:150,
      title: "备注",
      dataIndex: "VEN_BAN_ID",
      sorter: true,
    },
  ];

  const getBaseInfo = async (params = {}) => {
    const result = await request(
      `/business/inv/auto/bzs_inv21141/query/uppanel`,
      'GET',
      // {"COM_CODE":"01","REQ_NO":"2025032500009","COM_NAME":"北京机械工业自动化研究所有限公司软件分公司","UPD_CODE":"lhy","UPD_NAME":"李浩宇"}
      {params:JSON.stringify( {
        COM_CODE: currentInfo.COM_CODE||'01',
        REQ_NO:currentInfo.REQ_NO||'2025032500009',
        COM_NAME:currentInfo.COM_NAME||'北京机械工业自动化研究所有限公司软件分公司',
        UPD_CODE:currentInfo.UPD_CODE||'lhy',
        UPD_NAME:currentInfo.UPD_NAME||"李浩宇"
      }),
      page: 1,
      start: 0,
      limit: 9999
    }
    )
    if (result && result.success) {
      setBaseInfo(result.data[0] || {})
    }
  }

const loadMore=()=>{

}
  useEffect(() => {
    getBaseInfo();
  }, []);

  return (
    <div className="relative bg-white w-full">
      <Title title={currentInfo.procName} rightIcon="2" />

      <div className="sticky top-10 z-10 bg-white">
        <Tabs
          style={{
            "--title-font-size": "12px",
            "--active-line-height": "3px",
            "--active-line-border-radius": "none",
          }}
        >
          <Tabs.Tab title="基本信息" key="1">
            <BasicInfo data={baseInfo} />
            <ApproveTool />
          </Tabs.Tab>
          <Tabs.Tab title="物料信息" key="2">
          <DynamicTable
          defaultColumns={tableColumns}
          initData={tableData}
          loadMoreData={loadMore}
          hasMore={hasMore}
        />
            <ApproveTool />
          </Tabs.Tab>
          <Tabs.Tab title="审核意见" key="3">
            <ApprovalOpinion />
            <ApproveTool />
          </Tabs.Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default observer(Page);
