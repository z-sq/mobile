"use client";

import { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { useStores } from "@/utils/useStores";
import ApprovalCard from "./ApprovalCard";
import request from "@/utils/request";

const ApprovalOpinion = () => {
  const [data, setData] = useState([]);
  const {
    approveStore: { currentInfo },
  } = useStores();

  async function getData() {
    try {
      const {
        busKey,
        busKeyValue,
        procCode,
        procVersion,
        uuid: uuId,
      } = currentInfo;
      const result = await request(
        "/business/md/mbs/tp/manual/tp2100/getWfmApproveInfo",
        "GET",
        {
          busKey,
          busKeyValue,
          procCode,
          procVersion,
          uuId,
        }
      );
      if (result?.success && result.data) {
        let list = [];
        result.data.forEach((item) => {
          item.forEach((val) => {
            list.push(val);
          });
        });
        setData(list);
      } else {
        // 错误提示
      }
    } catch (err) {}
  }

  useEffect(() => {
    getData();
  }, [currentInfo]);

  return (
    <div className="h-full overflow-y-auto">
      {data.map((item, index) => (
        <ApprovalCard key={index} data={item} />
      ))}
    </div>
  );
};

export default observer(ApprovalOpinion);
