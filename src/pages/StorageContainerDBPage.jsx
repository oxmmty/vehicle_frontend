import React, { useContext } from "react";
import { DatePicker, Table } from "antd";
import { Line, Column } from "@ant-design/plots";
import { ThemeContext } from "src/components/Theme";

const StorageContainerDBPage = () => {
  const { theme } = useContext(ThemeContext);

  const columns = [
    {
      key: "搬入日",
      title: "搬入日",
      dataIndex: "搬入日",
    },
    {
      key: "搬出日",
      title: "搬出日",
      dataIndex: "搬出日",
    },
    {
      key: "コンテナ№",
      title: "コンテナ№",
      dataIndex: "コンテナ№",
    },
    {
      key: "コンテナサイズ",
      title: "コンテナサイズ",
      dataIndex: "コンテナサイズ",
    },
    {
      key: "コンテナタイプ",
      title: "コンテナタイプ",
      dataIndex: "コンテナタイプ",
    },
    {
      key: "船社",
      title: "船社",
      dataIndex: "船社",
    },
    {
      key: "保管先",
      title: "保管先",
      dataIndex: "保管先",
    },
    {
      key: "搬入顧客",
      title: "搬入顧客",
      dataIndex: "搬入顧客",
    },
    {
      key: "搬出顧客",
      title: "搬出顧客",
      dataIndex: "搬出顧客",
    },
    {
      key: "搬出ブッキング№",
      title: "搬出ブッキング№",
      dataIndex: "搬出ブッキング№",
    },
  ];

  return (
    <div className="flex flex-col items-center w-full p-4">
      <Table
        columns={columns}
        pagination={true}
        bordered
        scroll={({ x: "max-content" }, { y: 900 })}
      />
    </div>
  );
};

export default StorageContainerDBPage;
