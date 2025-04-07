"use client";

import { Checkbox, Table, ConfigProvider } from "antd";
import { DownFill } from "antd-mobile-icons";
import { useState, useEffect } from "react";
import request from "@/utils/request";

const TableData = ({
  columns,
  apiParams,
  apiUrl,
  width,
  height,
}) => {
  const [data, setData] = useState([]);
  const [columnsState, setColumnsState] = useState(
    columns.map((col) => ({
      ...col,
      hidden: col.hidden || false,
    }))
  );

  function handleChangeCheckbox(index, checked) {
    setColumnsState((preState) =>
      preState.map((item, _index) => {
        if (index == _index) {
          return {
            ...item,
            hidden: !checked,
          };
        }
        return item;
      })
    );
  }

  const getColumnFilter = () => ({
    filterDropdown: () => (
      <div className="px-2 max-h-80 overflow-y-auto">
        {columnsState.map((item, index) => (
          <Checkbox
            key={item.dataIndex}
            className="px-2 py-1 flex border-t border-bor-gray first:border-0"
            checked={!item.hidden}
            onChange={(e) => handleChangeCheckbox(index, e.target.checked)}
          >
            {item.title}
          </Checkbox>
        ))}
      </div>
    ),
    filterIcon: () => <DownFill color="#000" fontSize={8} />,
  });

  const newColumns = columnsState.map((item) => {
    return {
      ...item,
      ...getColumnFilter(),
    };
  });

  async function getData() {
    try {
      const result = await request(apiUrl, "GET", {
        params: JSON.stringify(apiParams),
        page: 1,
        start: 0,
        limit: 200,
      });
      if (result?.success && result.data) {
        setData(result.data);
      } else {
        // 错误提示
      }
    } catch (err) {}
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <ConfigProvider
      theme={{
        components: {
          Checkbox: {
            colorPrimary: "#005bac",
            fontSize: "12px",
          },
          Table: {
            /* 这里是你的组件 token */
            cellFontSizeSM: 12,
            headerBg: "#ffffff",
            headerBorderRadius: 0,
          },
        },
      }}
    >
      <Table
        rowKey="UU_ID"
        showSorterTooltip={false}
        dataSource={data}
        columns={newColumns}
        pagination={false}
        bordered
        size="small"
        scroll={{ x: width, y: height }}
      />
    </ConfigProvider>
  );
};

export default TableData;
